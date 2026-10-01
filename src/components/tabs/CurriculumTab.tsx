"use client";

import { useState, useEffect } from "react";
import { Unit, VocabularyItem, VocabularyStatus } from "@/types/database";
import { fetchVocabularyByUnit, saveVocabularyStatus } from "@/lib/db";
import { playNativeAudio } from "@/lib/speech";
import {
  Volume2,
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen,
  Home,
  Check,
  RotateCcw
} from "lucide-react";

interface CurriculumTabProps {
  units: Unit[];
  activeUnit: Unit | null;
  onSelectUnit: (unit: Unit | null) => void;
  userId?: string | null;
  onBackToHome?: () => void;
}

export function CurriculumTab({
  units,
  activeUnit,
  onSelectUnit,
  userId,
  onBackToHome,
}: CurriculumTabProps) {
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"vocab" | "grammar">("vocab");
  const [accent, setAccent] = useState<"uk" | "us">("uk");
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  useEffect(() => {
    if (activeUnit) {
      setLoading(true);
      fetchVocabularyByUnit(activeUnit.id, userId || undefined).then((items) => {
        setVocabList(items);
        setLoading(false);
      });
    }
  }, [activeUnit, userId]);

  const handlePlay = (text: string, customAccent?: "uk" | "us") => {
    const acc = customAccent || accent;
    setPlayingWord(text);
    playNativeAudio(text, acc).finally(() => {
      setTimeout(() => setPlayingWord(null), 1200);
    });
  };

  const handleStatusChange = async (vocabId: number, newStatus: VocabularyStatus) => {
    setVocabList((prev) =>
      prev.map((item) => (item.id === vocabId ? { ...item, user_status: newStatus } : item))
    );
    await saveVocabularyStatus(vocabId, newStatus, userId || undefined);
  };

  // ==========================================
  // VIEW 1: CHI TIẾT 1 UNIT KHI ĐÃ CHỌN BÀI
  // ==========================================
  if (activeUnit) {
    const masteredCount = vocabList.filter((v) => v.user_status === "mastered").length;

    return (
      <div className="p-4 space-y-4 pb-28 animate-in fade-in duration-200">
        {/* NÚT QUAY LẠI TRÊN CÙNG */}
        <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm">
          <button
            onClick={() => onSelectUnit(null)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>20 Units</span>
          </button>

          {/* Toggle chọn giọng UK / US */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[11px] font-bold">
            <button
              onClick={() => setAccent("uk")}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                accent === "uk"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>🇬🇧 UK</span>
            </button>
            <button
              onClick={() => setAccent("us")}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                accent === "us"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>🇺🇸 US</span>
            </button>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-1 px-2.5 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-semibold text-xs transition-colors"
              title="Về Trang chủ"
            >
              <Home className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tiêu đề Unit & Thống kê từ thuộc */}
        <div>
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
            Unit {activeUnit.unit_number} • Prepare L3
          </span>
          <h2 className="font-extrabold text-lg text-slate-900 mt-1 leading-snug">
            {activeUnit.title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">{activeUnit.topic}</p>
        </div>

        {/* Tiến độ thuộc từ trong Unit */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-700">Đã thuộc:</span>
            <span className="font-extrabold text-blue-700">
              {masteredCount} / {vocabList.length} từ
            </span>
          </div>
          <div className="w-28 bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${vocabList.length ? (masteredCount / vocabList.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Tab chuyển đổi: Từ vựng vs Ngữ pháp */}
        <div className="flex bg-slate-100 p-1 rounded-xl space-x-1">
          <button
            onClick={() => setActiveSubTab("vocab")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "vocab"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Từ vựng ({vocabList.length})
          </button>
          <button
            onClick={() => setActiveSubTab("grammar")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "grammar"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Ngữ pháp trọng tâm
          </button>
        </div>

        {/* Danh sách Từ vựng */}
        {activeSubTab === "vocab" ? (
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                Đang tải từ vựng Unit {activeUnit.unit_number}...
              </div>
            ) : vocabList.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                Chưa có từ vựng cho bài học này.
              </div>
            ) : (
              vocabList.map((item) => {
                const isMastered = item.user_status === "mastered";
                const isLearning = item.user_status === "learning";
                const isPlaying = playingWord === item.word;

                return (
                  <div
                    key={item.id}
                    className={`bg-white border rounded-2xl p-4 shadow-sm transition-all ${
                      isMastered
                        ? "border-emerald-200 bg-emerald-50/20"
                        : "border-slate-200/90"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-extrabold text-base text-slate-900 capitalize">
                            {item.word}
                          </h3>
                          <span className="text-[11px] font-semibold text-slate-400 italic">
                            ({item.part_of_speech})
                          </span>
                        </div>
                        <p className="text-xs font-medium text-blue-600 font-mono">{item.ipa}</p>
                      </div>

                      {/* NÚT PHÁT ÂM CHUẨN NATIVE MP3 */}
                      <button
                        onClick={() => handlePlay(item.word)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-sm ${
                          isPlaying
                            ? "bg-blue-600 text-white shadow-blue-500/30 animate-pulse"
                            : "bg-blue-50 hover:bg-blue-100 text-blue-700"
                        }`}
                        title="Nghe phát âm chuẩn giọng bản xứ"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Nghĩa tiếng Việt */}
                    <div className="pt-2 pb-1">
                      <p className="text-sm font-semibold text-slate-800 leading-snug">
                        {item.meaning_vi}
                      </p>
                    </div>

                    {/* Ví dụ thực tế */}
                    {item.example_en && (
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs space-y-1 mt-1">
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-slate-800 font-medium italic">
                            &ldquo;{item.example_en}&rdquo;
                          </p>
                          <button
                            onClick={() => handlePlay(item.example_en!)}
                            className="text-slate-400 hover:text-blue-600 ml-1 shrink-0 p-1"
                            title="Nghe cả câu ví dụ"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.example_vi && (
                          <p className="text-slate-500 text-[11px]">{item.example_vi}</p>
                        )}
                      </div>
                    )}

                    {/* Các nút trạng thái cá nhân */}
                    <div className="flex items-center space-x-2 pt-3 mt-1 border-t border-slate-100">
                      <button
                        onClick={() => handleStatusChange(item.id, "new")}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-colors ${
                          item.user_status === "new"
                            ? "bg-slate-200 text-slate-800"
                            : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        Chưa nhớ
                      </button>
                      <button
                        onClick={() => handleStatusChange(item.id, "learning")}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-colors ${
                          isLearning
                            ? "bg-amber-500 text-white shadow-xs"
                            : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        Đang học
                      </button>
                      <button
                        onClick={() => handleStatusChange(item.id, "mastered")}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center space-x-1 ${
                          isMastered
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>Đã thuộc</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Sub tab: Ngữ pháp */
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
            <div className="flex items-center space-x-2 text-indigo-600">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-bold text-sm">Trọng tâm ngữ pháp Unit {activeUnit.unit_number}</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
              {activeUnit.grammar_summary || "Xem thêm trong tài liệu Student's Book Cambridge Prepare L3."}
            </p>
          </div>
        )}

        {/* NÚT QUAY LẠI PHÍA DƯỚI CÙNG */}
        <div className="pt-2 flex items-center space-x-3">
          <button
            onClick={() => onSelectUnit(null)}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-98"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách 20 Units</span>
          </button>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-slate-50 active:scale-98"
            >
              <Home className="w-4 h-4" />
              <span>Trang chủ</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: MÀN HÌNH DANH SÁCH 20 UNITS (LIST VIEW)
  // ==========================================
  return (
    <div className="p-4 space-y-4 pb-28 animate-in fade-in duration-200">
      {/* HEADER CÓ NÚT QUAY LẠI TRANG CHỦ */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors active:scale-95"
              title="Quay lại Trang chủ"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="text-base font-extrabold text-slate-900 leading-tight">
              Giáo trình từ vựng 20 Units
            </h2>
            <p className="text-xs text-slate-500">Cambridge Prepare! Level 3</p>
          </div>
        </div>

        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {units.map((unit) => (
          <button
            key={unit.id}
            onClick={() => onSelectUnit(unit)}
            className="w-full text-left bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition-all flex items-center justify-between space-x-3 group"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center shrink-0 text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {unit.unit_number}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-sm truncate">{unit.title}</h3>
                <p className="text-[11px] text-slate-500 truncate">{unit.topic}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 shrink-0 group-hover:translate-x-0.5 transition-transform">
              Vào học ➔
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
