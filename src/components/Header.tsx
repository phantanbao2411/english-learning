"use client";

import { UserCircle2, Sparkles } from "lucide-react";

interface HeaderProps {
  userEmail?: string | null;
  onOpenAuth: () => void;
}

export function Header({ userEmail, onOpenAuth }: HeaderProps) {
  let displayName = "Người học";
  if (userEmail) {
    if (userEmail.includes("phamphantanbao") || userEmail.toLowerCase().includes("bao")) {
      displayName = "Tấn Bảo";
    } else if (userEmail.includes("lethilethanh") || userEmail.toLowerCase().includes("thanh")) {
      displayName = "Lệ Thanh";
    } else {
      displayName = userEmail.split("@")[0];
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-200">
          E
        </div>
        <div>
          <h1 className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-1">
            Học Tiếng Anh <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </h1>
          <p className="text-[11px] text-slate-500 leading-none">Prepare L3 & Phát âm 1vs1</p>
        </div>
      </div>

      <button
        onClick={onOpenAuth}
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors text-xs font-bold border border-blue-200/60 shadow-2xs"
      >
        <UserCircle2 className="w-4 h-4 text-blue-600" />
        <span className="max-w-[120px] truncate">{displayName}</span>
      </button>
    </header>
  );
}
