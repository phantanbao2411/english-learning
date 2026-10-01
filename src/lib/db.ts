import { createClient } from "@/lib/supabase/client";
import { Unit, VocabularyItem, PronunciationUnit, StudySession, VocabularyStatus } from "@/types/database";
import { PREPARE_UNITS, INITIAL_VOCABULARY } from "@/data/curriculum";
import { PRONUNCIATION_UNITS } from "@/data/pronunciation";

function getSupabase() {
  return createClient();
}

// STORAGE KEYS FOR LOCAL RESILIENCE / OFFLINE
const LOCAL_VOCAB_PROGRESS_KEY = "eng_vocab_progress";
const LOCAL_SESSIONS_KEY = "eng_study_sessions";

// ========================
// 1. CURRICULUM (UNITS & VOCABULARY)
// ========================

export async function fetchUnits(): Promise<Unit[]> {
  try {
    const { data, error } = await getSupabase().from("units").select("*").order("unit_number");
    if (!error && data && data.length > 0) {
      return data as Unit[];
    }
  } catch {
    // Fallback below
  }
  return PREPARE_UNITS;
}

export async function fetchVocabularyByUnit(unitId: number, userId?: string): Promise<VocabularyItem[]> {
  // Get base words
  let words: VocabularyItem[] = [];
  try {
    const { data, error } = await getSupabase().from("vocabulary").select("*").eq("unit_id", unitId);
    if (!error && data && data.length > 0) {
      words = data as VocabularyItem[];
    } else {
      words = INITIAL_VOCABULARY.filter((v) => v.unit_id === unitId);
    }
  } catch {
    words = INITIAL_VOCABULARY.filter((v) => v.unit_id === unitId);
  }

  // Get user progress
  const progressMap: Record<number, VocabularyStatus> = {};

  // Try Supabase first if logged in
  if (userId) {
    try {
      const { data } = await supabase
        .from("vocabulary_progress")
        .select("vocabulary_id, status")
        .eq("user_id", userId);
      if (data) {
        data.forEach((item: { vocabulary_id: number; status: string }) => {
          progressMap[item.vocabulary_id] = item.status as VocabularyStatus;
        });
      }
    } catch {}
  }

  // Merge with localStorage
  if (typeof window !== "undefined") {
    try {
      const local = JSON.parse(localStorage.getItem(LOCAL_VOCAB_PROGRESS_KEY) || "{}");
      Object.assign(progressMap, local);
    } catch {}
  }

  return words.map((w) => ({
    ...w,
    user_status: progressMap[w.id] || "new",
  }));
}

export async function saveVocabularyStatus(
  vocabularyId: number,
  status: VocabularyStatus,
  userId?: string
): Promise<void> {
  // Update localStorage immediately
  if (typeof window !== "undefined") {
    try {
      const local = JSON.parse(localStorage.getItem(LOCAL_VOCAB_PROGRESS_KEY) || "{}");
      local[vocabularyId] = status;
      localStorage.setItem(LOCAL_VOCAB_PROGRESS_KEY, JSON.stringify(local));
    } catch {}
  }

  // Sync to Supabase if authenticated
  if (userId) {
    try {
      await getSupabase().from("vocabulary_progress").upsert(
        {
          user_id: userId,
          vocabulary_id: vocabularyId,
          status,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,vocabulary_id" }
      );
    } catch (e) {
      console.warn("Could not sync vocab progress to Supabase:", e);
    }
  }
}

// ========================
// 2. PRONUNCIATION
// ========================

export async function fetchPronunciationUnits(): Promise<PronunciationUnit[]> {
  try {
    const { data, error } = await getSupabase().from("pronunciation_units").select("*, sounds:pronunciation_sounds(*)").order("unit_number");
    if (!error && data && data.length > 0) {
      return data as PronunciationUnit[];
    }
  } catch {}
  return PRONUNCIATION_UNITS;
}

export async function fetchPronunciationUnitByNumber(unitNumber: number): Promise<PronunciationUnit | undefined> {
  const units = await fetchPronunciationUnits();
  return units.find((u) => u.unit_number === unitNumber);
}

// ========================
// 3. STUDY SESSIONS & HOURS
// ========================

export function calculateDurationMinutes(startTime: string, endTime: string): number {
  try {
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    return Math.max(0, endMinutes - startMinutes);
  } catch {
    return 0;
  }
}

export function formatMinutesToHours(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} phút`;
  if (minutes === 0) return `${hours} giờ`;
  return `${hours} giờ ${minutes} phút`;
}

export async function fetchStudySessions(): Promise<StudySession[]> {
  try {
    const { data, error } = await supabase
      .from("study_sessions")
      .select("*")
      .order("session_date", { ascending: false })
      .order("start_time", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((s: StudySession) => ({
        ...s,
        duration_minutes: calculateDurationMinutes(s.start_time, s.end_time),
      }));
    }
  } catch {}

  // Fallback to local storage
  if (typeof window !== "undefined") {
    try {
      const local = JSON.parse(localStorage.getItem(LOCAL_SESSIONS_KEY) || "[]");
      return local.map((s: StudySession) => ({
        ...s,
        duration_minutes: calculateDurationMinutes(s.start_time, s.end_time),
      }));
    } catch {}
  }
  return [];
}

export async function saveStudySession(session: Omit<StudySession, "id"> & { id?: string }): Promise<StudySession> {
  const id = session.id || (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `session_${Date.now()}`);
  const newSession: StudySession = {
    ...session,
    id,
    duration_minutes: calculateDurationMinutes(session.start_time, session.end_time),
    created_at: new Date().toISOString(),
  };

  // 1. Save to Supabase
  try {
    const { data, error } = await getSupabase().from("study_sessions").insert([
      {
        id: newSession.id,
        teacher_name: newSession.teacher_name,
        unit_id: newSession.unit_id || null,
        unit_title: newSession.unit_title || null,
        session_date: newSession.session_date,
        start_time: newSession.start_time,
        end_time: newSession.end_time,
        status: newSession.status,
        notes: newSession.notes || null,
      },
    ]).select().single();

    if (!error && data) {
      return {
        ...data,
        duration_minutes: calculateDurationMinutes(data.start_time, data.end_time),
      };
    }
  } catch (err) {
    console.warn("Supabase insert session fallback:", err);
  }

  // 2. Save to localStorage
  if (typeof window !== "undefined") {
    try {
      const current = JSON.parse(localStorage.getItem(LOCAL_SESSIONS_KEY) || "[]");
      const updated = [newSession, ...current.filter((s: StudySession) => s.id !== id)];
      localStorage.setItem(LOCAL_SESSIONS_KEY, JSON.stringify(updated));
    } catch {}
  }

  return newSession;
}

export async function deleteStudySession(id: string): Promise<boolean> {
  try {
    await getSupabase().from("study_sessions").delete().eq("id", id);
  } catch {}

  if (typeof window !== "undefined") {
    try {
      const current = JSON.parse(localStorage.getItem(LOCAL_SESSIONS_KEY) || "[]");
      const updated = current.filter((s: StudySession) => s.id !== id);
      localStorage.setItem(LOCAL_SESSIONS_KEY, JSON.stringify(updated));
    } catch {}
  }
  return true;
}

export function computeStudyStats(sessions: StudySession[]) {
  const completedSessions = sessions.filter((s) => s.status === "completed");
  const totalMinutes = completedSessions.reduce((acc, s) => {
    return acc + calculateDurationMinutes(s.start_time, s.end_time);
  }, 0);

  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7); // YYYY-MM
  const currentYear = now.getFullYear().toString();

  const monthMinutes = completedSessions
    .filter((s) => s.session_date.startsWith(currentMonth))
    .reduce((acc, s) => acc + calculateDurationMinutes(s.start_time, s.end_time), 0);

  const yearMinutes = completedSessions
    .filter((s) => s.session_date.startsWith(currentYear))
    .reduce((acc, s) => acc + calculateDurationMinutes(s.start_time, s.end_time), 0);

  // Find next upcoming scheduled session
  const todayStr = now.toISOString().slice(0, 10);
  const upcoming = sessions
    .filter((s) => s.status === "scheduled" && s.session_date >= todayStr)
    .sort((a, b) => a.session_date.localeCompare(b.session_date) || a.start_time.localeCompare(b.start_time))[0];

  return {
    totalMinutes,
    totalFormatted: formatMinutesToHours(totalMinutes),
    totalCompletedCount: completedSessions.length,
    monthFormatted: formatMinutesToHours(monthMinutes),
    yearFormatted: formatMinutesToHours(yearMinutes),
    upcomingSession: upcoming,
  };
}
