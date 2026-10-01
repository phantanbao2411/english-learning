"use client";

import { useState, useEffect } from "react";
import { Unit, VocabularyItem, VocabularyStatus } from "@/types/database";
import { fetchVocabularyByUnit, saveVocabularyStatus } from "@/lib/db";
import { speakText } from "@/lib/speech";
import { Volume2, ArrowLeft, CheckCircle2, Bookmark, Sparkles, BookOpen } from "lucide-react";

interface CurriculumTabProps {
  units: Unit[];
  activeUnit: Unit | null;
  onSelectUnit: (unit: Unit | null) => void;
  userId?: string | null;
}

export function CurriculumTab({ units, activeUnit, onSelectUnit, userId }: CurriculumTabProps) {
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"vocab" | "grammar">("vocab");

  useEffect(() => {
    if (activeUnit) {
      setLoading(true);
      fetchVocabularyByUnit(activeUnit.id, userId || undefined).then((items) => {
        setVocabList(items);
        setLoading(false);
      });
    }
  }, [activeUnit, userId]);

  const handleStatusChange = async (vocabId: number, newStatus: VocabularyStatus) => {
    setVocabList((prev) =>
      prev.map((item) => (item.id === vocabId ? { ...item, user_status: newStatus } : item))
    );
    await saveVocabularyStatus(vocabId, newStatus, userId || undefined);
  };

  // 1. MÀN HÌNH CHI TIẾT UNIT KHI ĐÃ CHỌN BÀI
  if (activeUnit) {
    const masteredCount = vocabList.filter((v) => v.user_status === "mastered").length;

    return (
      <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-200">
        {/* Back navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSelectUnit(null)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
              Unit {activeUnit.unit_number}
            </span>
            <h2 className="font-extrabold text-base text-slate-900 truncate">
              {activeUnit.title}
            </h2>
          </div>
        </div>

        {/* Sub tabs: Từ vựng & Ngữ pháp */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab("vocab")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "vocab"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Từ vựng ({vocabList.length})
          </button>
          <button
            onClick={() => setActiveSubTab("grammar")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "grammar"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Ngữ pháp
          </button>
        </div>

        {activeSubTab === "vocab" ? (
          <div className="space-y-3">
            {/* Mastered progress bar */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-900">Tiến độ từ vựng của bạn</p>
                <p className="text-[11px] text-blue-700">
                  Đã thuộc {masteredCount} / {vocabList.length} từ
                </p>
              </div>
              <span className="text-sm font-black text-blue-700">
                {vocabList.length > 0
                  ? Math.round((masteredCount / vocabList.length) * 100)
                  : 0}
                %
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-slate-500">Đang tải từ vựng...</div>
            ) : vocabList.length === 0 ? (
              <div className="py-8 text-center bg-slate-50 rounded-xl text-xs text-slate-500">
                Chưa có từ vựng cho Unit này.
              </div>
            ) : (
              vocabList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2.5 transition-all hover:border-slate-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">
                          {item.word}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-400 italic">
                          ({item.part_of_speech})
                        </span>
                      </div>
                      <p className="text-xs font-medium text-blue-600 font-mono">{item.ipa}</p>
                    </div>

                    <button
                      onClick={() => speakText(item.word)}
                      className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors active:scale-95"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Nghĩa tiếng Việt */}
                  <div className="pt-1 pb-1">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                      {item.meaning_vi}
                    </p>
                  </div>

                  {/* Ví dụ */}
                  {item.example_en && (
                    <div className="bg-slate-50 rounded-xl p-2.5 text-xs space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="text-slate-800 font-medium italic">
                          &ldquo;{item.example_en}&rdquo;
                        </p>
                        <button
                          onClick={() => speakText(item.example_en!)}
                          className="text-slate-400 hover:text-blue-600 ml-1 shrink-0"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {item.example_vi && (
                        <p className="text-slate-500 text-[11px]">{item.example_vi}</p>
                      )}
                    </div>
                  )}

                  {/* Trạng thái học tập cá nhân */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400">Trạng thái:</span>
                    <div className="flex space-x-1.5">
                      {(
                        [
                          { key: "new", label: "Chưa nhớ", color: "text-slate-600 bg-slate-100" },
                          { key: "learning", label: "Đang học", color: "text-amber-700 bg-amber-50 border border-amber-200" },
                          { key: "mastered", label: "Đã thuộc ✓", color: "text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold" },
                        ] as const
                      ).map((st) => (
                        <button
                          key={st.key}
                          onClick={() => handleStatusChange(item.id, st.key)}
                          className={`text-[11px] px-2.5 py-1 rounded-full transition-all ${
                            item.user_status === st.key ? st.color : "text-slate-400 bg-slate-50 hover:bg-slate-100"
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Sub tab: Ngữ pháp */
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center space-x-2 text-indigo-600">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-bold text-sm">Trọng tâm ngữ pháp Unit {activeUnit.unit_number}</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
              {activeUnit.grammar_summary || "Xem thêm trong tài liệu Student's Book."}
            </p>
          </div>
        )}
      </div>
    );
  }

  // 2. MÀN HÌNH DANH SÁCH 20 UNITS
  return (
    <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Giáo trình chuẩn</h2>
          <p className="text-xs text-slate-500">Cambridge Prepare! Level 3 (20 Units)</p>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          20 Units
        </span>
      </div>

      <div className="space-y-2.5">
        {units.map((unit) => (
          <button
            key={unit.id}
            onClick={() => onSelectUnit(unit)}
            className="w-full text-left bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition-all flex items-center justify-between space-x-3"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center shrink-0 text-sm">
                {unit.unit_number}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-sm truncate">{unit.title}</h3>
                <p className="text-[11px] text-slate-500 truncate">{unit.topic}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-600 shrink-0">Học ➔</span>
          </button>
        ))}
      </div>
    </div>
  );
}
