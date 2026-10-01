"use client";

import { useState } from "react";
import { StudySession, SessionStatus } from "@/types/database";
import {
  calculateDurationMinutes,
  formatMinutesToHours,
  saveStudySession,
  deleteStudySession,
  computeStudyStats,
} from "@/lib/db";
import { Plus, Trash2, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";

interface ScheduleTabProps {
  sessions: StudySession[];
  onSessionsChange: (updated: StudySession[]) => void;
}

export function ScheduleTab({ sessions, onSessionsChange }: ScheduleTabProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Form states for adding session
  const today = new Date().toISOString().slice(0, 10);
  const [sessionDate, setSessionDate] = useState(today);
  const [startTime, setStartTime] = useState("19:00");
  const [endTime, setEndTime] = useState("20:30");
  const [teacherName, setTeacherName] = useState("Cô giáo");
  const [unitTitle, setUnitTitle] = useState("Unit 1 – It's a challenge!");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<SessionStatus>("completed");
  const [saving, setSaving] = useState(false);

  const durationMin = calculateDurationMinutes(startTime, endTime);
  const stats = computeStudyStats(sessions);

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionDate || !startTime || !endTime) return;
    setSaving(true);

    try {
      const created = await saveStudySession({
        session_date: sessionDate,
        start_time: startTime,
        end_time: endTime,
        teacher_name: teacherName,
        unit_title: unitTitle,
        notes,
        status,
      });

      onSessionsChange([created, ...sessions.filter((s) => s.id !== created.id)]);
      setIsAddModalOpen(false);
      // Reset form
      setNotes("");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa buổi học này không?")) {
      await deleteStudySession(id);
      onSessionsChange(sessions.filter((s) => s.id !== id));
    }
  };

  const filteredSessions = sessions.filter((s) => {
    if (filterStatus === "all") return true;
    return s.status === filterStatus;
  });

  return (
    <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-200">
      {/* 1. HEADER & THỐNG KÊ GIỜ HỌC */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Lịch học với giáo viên</h2>
          <p className="text-xs text-slate-500">Buổi học chung & Tính học phí tự động</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Thêm buổi</span>
        </button>
      </div>

      {/* Grid thống kê tổng thời gian */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-sm space-y-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Tổng thời gian học tích lũy
          </span>
          <p className="text-2xl font-black text-amber-400 mt-0.5">{stats.totalFormatted}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/60 text-xs">
          <div>
            <p className="text-slate-400 text-[10px]">Tháng này</p>
            <p className="font-bold text-white text-xs">{stats.monthFormatted}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px]">Năm nay</p>
            <p className="font-bold text-white text-xs">{stats.yearFormatted}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px]">Đã học</p>
            <p className="font-bold text-white text-xs">{stats.totalCompletedCount} buổi</p>
          </div>
        </div>
      </div>

      {/* 2. FILTER TRẠNG THÁI */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
        {[
          { key: "all", label: "Tất cả" },
          { key: "completed", label: "Đã hoàn thành" },
          { key: "scheduled", label: "Sắp tới" },
          { key: "cancelled", label: "Đã hủy" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilterStatus(f.key)}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              filterStatus === f.key
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 3. DANH SÁCH CÁC BUỔI HỌC */}
      <div className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-medium text-slate-500">Chưa có buổi học nào.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              + Bấm để thêm buổi học mới
            </button>
          </div>
        ) : (
          filteredSessions.map((session) => {
            const isCompleted = session.status === "completed";
            const isCancelled = session.status === "cancelled";
            const dur = calculateDurationMinutes(session.start_time, session.end_time);

            return (
              <div
                key={session.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2 relative"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-extrabold text-slate-900">
                        {session.session_date}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-700"
                            : isCancelled
                            ? "bg-red-50 text-red-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {isCompleted
                          ? "Đã hoàn thành"
                          : isCancelled
                          ? "Đã hủy (Không tính giờ)"
                          : "Đã lên lịch"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {session.start_time} – {session.end_time}
                      </span>
                      <span className="font-bold text-slate-800 font-mono">
                        ({formatMinutesToHours(dur)})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(session.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    title="Xóa buổi học"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Chi tiết nội dung & giáo viên */}
                <div className="bg-slate-50 rounded-xl p-2.5 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Giáo viên:</span>
                    <span className="font-bold text-slate-800">{session.teacher_name}</span>
                  </div>
                  {session.unit_title && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bài học:</span>
                      <span className="font-bold text-blue-700 truncate max-w-[200px]">
                        {session.unit_title}
                      </span>
                    </div>
                  )}
                  {session.notes && (
                    <div className="pt-1 border-t border-slate-200/60 text-slate-600 italic">
                      &ldquo;{session.notes}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. MODAL THÊM BUỔI HỌC (THAO TÁC TRONG VÀI CHỤC GIÂY) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Thêm buổi học với giáo viên</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSession} className="p-5 space-y-3.5">
              {/* Ngày */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ngày học</label>
                <input
                  type="date"
                  required
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Giờ bắt đầu & Giờ kết thúc */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bắt đầu</label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kết thúc</label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tự động tính thời lượng */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <span className="text-blue-700 font-medium">Thời lượng tự tính:</span>
                <span className="font-extrabold text-blue-900 font-mono">
                  {durationMin} phút ({formatMinutesToHours(durationMin)})
                </span>
              </div>

              {/* Tên giáo viên */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Giáo viên</label>
                <input
                  type="text"
                  required
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="Ví dụ: Cô Lan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Bài học / Nội dung */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung bài học</label>
                <input
                  type="text"
                  value={unitTitle}
                  onChange={(e) => setUnitTitle(e.target.value)}
                  placeholder="Ví dụ: Unit 3 – On holiday..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Trạng thái */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trạng thái buổi học</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { key: "completed", label: "Đã học" },
                      { key: "scheduled", label: "Sắp tới" },
                      { key: "cancelled", label: "Hủy" },
                    ] as const
                  ).map((st) => (
                    <button
                      type="button"
                      key={st.key}
                      onClick={() => setStatus(st.key)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                        status === st.key
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ghi chú (Tùy chọn)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Bài tập về nhà, nhắc nhở..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{saving ? "Đang lưu..." : "Lưu buổi học"}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
