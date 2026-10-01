"use client";

import { useState, useEffect } from "react";
import { BottomNav, NavTab } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { AuthModal } from "@/components/AuthModal";
import { HomeTab } from "@/components/tabs/HomeTab";
import { CurriculumTab } from "@/components/tabs/CurriculumTab";
import { PronunciationTab } from "@/components/tabs/PronunciationTab";
import { ListeningTab } from "@/components/tabs/ListeningTab";
import { ScheduleTab } from "@/components/tabs/ScheduleTab";
import { Unit, PronunciationUnit, StudySession } from "@/types/database";
import {
  fetchUnits,
  fetchPronunciationUnits,
  fetchStudySessions,
} from "@/lib/db";
import { createClient } from "@/lib/supabase/client";

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>("home");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Curriculum & Data states
  const [units, setUnits] = useState<Unit[]>([]);
  const [pronunciationUnits, setPronunciationUnits] = useState<PronunciationUnit[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // 1. Initial Load & Auth Check
  useEffect(() => {
    // Check Supabase session
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserEmail(data.user.email ?? null);
        setUserId(data.user.id);
      } else {
        // Fallback to local profile selection
        const localUser = localStorage.getItem("eng_active_user");
        if (localUser) {
          setUserEmail(localUser);
          setUserId(`user_${localUser.split("@")[0]}`);
        } else {
          // Default to first learner
          setUserEmail("bao@english.app");
          setUserId("user_bao");
        }
      }
    });

    // Load initial data
    Promise.all([fetchUnits(), fetchPronunciationUnits(), fetchStudySessions()])
      .then(([u, p, s]) => {
        setUnits(u);
        setPronunciationUnits(p);
        setSessions(s);
        if (u.length > 0) {
          setActiveUnit(u[0]); // Default to Unit 1
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUserChanged = (email: string | null, id: string | null) => {
    setUserEmail(email);
    setUserId(id);
    if (email) {
      localStorage.setItem("eng_active_user", email);
    } else {
      localStorage.removeItem("eng_active_user");
    }
  };

  const handleOpenUnitFromHome = (unit: Unit) => {
    setActiveUnit(unit);
    setCurrentTab("curriculum");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Top Header */}
      <Header userEmail={userEmail} onOpenAuth={() => setIsAuthOpen(true)} />

      {/* Main Tab Content */}
      <main className="flex-1">
        {loading ? (
          <div className="py-24 text-center text-xs text-slate-400">
            Đang tải dữ liệu học tập...
          </div>
        ) : (
          <>
            {currentTab === "home" && units.length > 0 && (
              <HomeTab
                currentUnit={activeUnit || units[0]}
                sessions={sessions}
                onNavigateToTab={setCurrentTab}
                onOpenUnit={handleOpenUnitFromHome}
              />
            )}

            {currentTab === "curriculum" && (
              <CurriculumTab
                units={units}
                activeUnit={activeUnit}
                onSelectUnit={setActiveUnit}
                userId={userId}
              />
            )}

            {currentTab === "pronunciation" && (
              <PronunciationTab units={pronunciationUnits} />
            )}

            {currentTab === "listening" && <ListeningTab />}

            {currentTab === "schedule" && (
              <ScheduleTab sessions={sessions} onSessionsChange={setSessions} />
            )}
          </>
        )}
      </main>

      {/* Fixed Mobile Bottom Navigation */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Auth & Profile Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        userEmail={userEmail}
        onUserChanged={handleUserChanged}
      />
    </div>
  );
}
