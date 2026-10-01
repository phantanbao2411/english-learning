"use client";

import { Unit, StudySession } from "@/types/database";
import { computeStudyStats } from "@/lib/db";
import { ArrowRight, Calendar, Clock, Trophy, BookOpen, Mic, CheckCircle2 } from "lucide-react";

interface HomeTabProps {
  currentUnit: Unit;
  sessions: StudySession[];
  onNavigateToTab: (tab: "curriculum" | "pronunciation" | "listening" | "schedule") => void;
  onOpenUnit: (unit: Unit) => void;
}

export function HomeTab({ currentUnit, sessions, onNavigateToTab, onOpenUnit }: HomeTabProps) {
  const stats = computeStudyStats(sessions);

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* 1. THẺ BÀI HỌC HIỆN TẠI */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-blue-100">
            Bài đang học
          </span>
          <span className="text-xs font-semibold text-blue-200">Prepare L3</span>
        </div>

        <h2 className="text-lg font-bold leading-tight mb-1">
          Unit {currentUnit.unit_number} – {currentUnit.title}
        </h2>
        <p className="text-xs text-blue-100 line-clamp-1 mb-4">{currentUnit.topic}</p>

        {/* Progress bar */}
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-blue-100">Tiến độ bài học</span>
            <span>60%</span>
          </div>
          <div className="w-full bg-blue-900/50 rounded-full h-2 overflow-hidden">
            <div className="bg-amber-400 h-2 rounded-full w-[60%] transition-all duration-500" />
          </div>
        </div>

        <button
          onClick={() => {
            onNavigateToTab("curriculum");
            onOpenUnit(currentUnit);
          }}
          className="w-full py-2.5 px-4 bg-white hover:bg-blue-50 text-blue-700 font-bold rounded-xl text-sm transition-transform active:scale-[0.98] flex items-center justify-center space-x-1.5 shadow-sm"
        >
          <span>Tiếp tục học ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. THỐNG KÊ TỔNG THỜI GIAN VỚI GIÁO VIÊN */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Thời gian học với giáo viên
              </h3>
              <p className="text-lg font-extrabold text-slate-900 leading-tight">
                {stats.totalFormatted}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab("schedule")}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Chi tiết
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 rounded-xl p-2.5">
            <p className="text-slate-500 text-[11px]">Tháng này</p>
            <p className="font-bold text-slate-800 text-sm">{stats.monthFormatted}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5">
            <p className="text-slate-500 text-[11px]">Tổng số buổi</p>
            <p className="font-bold text-slate-800 text-sm">{stats.totalCompletedCount} buổi</p>
          </div>
        </div>
      </div>

      {/* 3. BUỔI HỌC TIẾP THEO */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Buổi học tiếp theo
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            1vs1 Chung
          </span>
        </div>

        {stats.upcomingSession ? (
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3">
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-bold text-slate-900">
                {stats.upcomingSession.session_date}
              </p>
              <span className="text-xs font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                {stats.upcomingSession.start_time} - {stats.upcomingSession.end_time}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-700">
              Giáo viên: {stats.upcomingSession.teacher_name}
            </p>
            {stats.upcomingSession.unit_title && (
              <p className="text-xs text-blue-600 font-semibold mt-0.5">
                Nội dung: {stats.upcomingSession.unit_title}
              </p>
            )}
            {stats.upcomingSession.notes && (
              <p className="text-[11px] text-slate-500 mt-1 italic">
                &ldquo;{stats.upcomingSession.notes}&rdquo;
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-3 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-2">Chưa có lịch học sắp tới</p>
            <button
              onClick={() => onNavigateToTab("schedule")}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              + Đặt lịch hoặc ghi nhận buổi học
            </button>
          </div>
        )}
      </div>

      {/* 4. LỐI TẮT HỌC TẬP NHANH */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigateToTab("curriculum")}
          className="bg-white border border-slate-200 rounded-2xl p-3.5 text-left shadow-sm active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
            <BookOpen className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-900 text-xs mb-0.5">Từ vựng Unit</h4>
          <p className="text-[11px] text-slate-500 leading-tight">20 Units giáo trình Prepare</p>
        </button>

        <button
          onClick={() => onNavigateToTab("pronunciation")}
          className="bg-white border border-slate-200 rounded-2xl p-3.5 text-left shadow-sm active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
            <Mic className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-900 text-xs mb-0.5">Luyện Phát âm</h4>
          <p className="text-[11px] text-slate-500 leading-tight">11 Units cặp âm đối chiếu</p>
        </button>
      </div>
    </div>
  );
}
