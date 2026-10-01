"use client";

import { UserCircle2, Sparkles } from "lucide-react";

interface HeaderProps {
  userEmail?: string | null;
  onOpenAuth: () => void;
}

export function Header({ userEmail, onOpenAuth }: HeaderProps) {
  const displayName = userEmail ? userEmail.split("@")[0] : "Người học";

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
          <p className="text-[11px] text-slate-500 leading-none">Prepare L3 & Phát âm</p>
        </div>
      </div>

      <button
        onClick={onOpenAuth}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-medium"
      >
        <UserCircle2 className="w-4 h-4 text-blue-600" />
        <span className="max-w-[100px] truncate">{displayName}</span>
      </button>
    </header>
  );
}
