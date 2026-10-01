export type VocabularyStatus = "new" | "learning" | "mastered";
export type SessionStatus = "scheduled" | "completed" | "cancelled";

export interface Unit {
  id: number;
  unit_number: number;
  title: string;
  topic: string;
  grammar_summary?: string;
}

export interface VocabularyItem {
  id: number;
  unit_id: number;
  topic: string;
  word: string;
  part_of_speech: string;
  ipa: string;
  meaning_vi: string;
  example_en?: string;
  example_vi?: string;
  audio_url?: string;
  user_status?: VocabularyStatus; // Joined per user
}

export interface PronunciationUnit {
  id: number;
  unit_number: number;
  sound_pair: string;
  title: string;
  guide_summary?: string;
  dialogue?: string;
  sounds?: PronunciationSound[];
}

export interface PronunciationSound {
  id: number;
  unit_id: number;
  ipa: string;
  sound_type: "vowel" | "consonant" | "diphthong";
  mouth_guide: string;
  minimal_pairs: {
    word1: string;
    ipa1: string;
    word2: string;
    ipa2: string;
  }[];
  example_sentences: {
    sentence: string;
    ipa: string;
  }[];
}

export interface StudySession {
  id: string;
  created_by?: string;
  teacher_name: string;
  unit_id?: number | null;
  unit_title?: string;
  session_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  status: SessionStatus;
  notes?: string;
  created_at?: string;
  // Computed client-side
  duration_minutes?: number;
}
