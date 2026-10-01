"use client";

import { Home, BookOpen, Mic, Headphones, Calendar } from "lucide-react";

export type NavTab = "home" | "curriculum" | "pronunciation" | "listening" | "schedule";

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as NavTab, label: "Trang chủ", icon: Home },
    { id: "curriculum" as NavTab, label: "Học", icon: BookOpen },
    { id: "pronunciation" as NavTab, label: "Phát âm", icon: Mic },
    { id: "listening" as NavTab, label: "Luyện nghe", icon: Headphones },
    { id: "schedule" as NavTab, label: "Lịch học", icon: Calendar },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 safe-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors min-h-[48px] ${
                isActive ? "text-blue-600 font-semibold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-[1.75px]"}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
