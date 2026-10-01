"use client";

import { useState } from "react";
import { PronunciationUnit, PronunciationSound } from "@/types/database";
import { speakText } from "@/lib/speech";
import { ArrowLeft, Volume2, Mic, Info, MessageSquare } from "lucide-react";

interface PronunciationTabProps {
  units: PronunciationUnit[];
}

export function PronunciationTab({ units }: PronunciationTabProps) {
  const [selectedUnit, setSelectedUnit] = useState<PronunciationUnit | null>(null);
  const [selectedSoundIndex, setSelectedSoundIndex] = useState(0);

  // MÀN HÌNH CHI TIẾT BÀI PHÁT ÂM
  if (selectedUnit) {
    const sounds = selectedUnit.sounds || [];
    const currentSound: PronunciationSound | undefined = sounds[selectedSoundIndex];

    return (
      <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-200">
        {/* Top bar */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedUnit(null)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
              Unit {selectedUnit.unit_number} Phát âm
            </span>
            <h2 className="font-extrabold text-base text-slate-900 truncate">
              {selectedUnit.sound_pair}
            </h2>
          </div>
        </div>

        {/* Sound tabs */}
        {sounds.length > 0 && (
          <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 overflow-x-auto no-scrollbar">
            {sounds.map((snd, idx) => (
              <button
                key={snd.id}
                onClick={() => setSelectedSoundIndex(idx)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
                  selectedSoundIndex === idx
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {snd.ipa}
              </button>
            ))}
          </div>
        )}

        {currentSound ? (
          <div className="space-y-4">
            {/* Khẩu hình & Hướng dẫn */}
            <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-rose-600">
                <Info className="w-4 h-4 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Khẩu hình & Cách phát âm âm {currentSound.ipa}
                </h3>
              </div>
              <p className="text-xs font-medium text-slate-800 leading-relaxed">
                {currentSound.mouth_guide}
              </p>
            </div>

            {/* Bảng cặp từ tương phản Minimal Pairs */}
            {currentSound.minimal_pairs && currentSound.minimal_pairs.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Cặp từ so sánh (Minimal Pairs)
                  </h3>
                  <span className="text-[11px] text-slate-400">Bấm loa để nghe so sánh</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {currentSound.minimal_pairs.map((pair, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      {/* Từ 1 */}
                      <button
                        onClick={() => speakText(pair.word1)}
                        className="flex-1 text-left p-1.5 rounded-lg hover:bg-slate-50 transition-colors group flex items-center space-x-2"
                      >
                        <Volume2 className="w-4 h-4 text-rose-500 shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-extrabold text-sm text-slate-900 capitalize">
                            {pair.word1}
                          </p>
                          <p className="text-[11px] font-mono text-slate-500">{pair.ipa1}</p>
                        </div>
                      </button>

                      <span className="text-xs font-bold text-slate-300 px-2">vs</span>

                      {/* Từ 2 */}
                      <button
                        onClick={() => speakText(pair.word2)}
                        className="flex-1 text-left p-1.5 rounded-lg hover:bg-slate-50 transition-colors group flex items-center space-x-2"
                      >
                        <Volume2 className="w-4 h-4 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-extrabold text-sm text-slate-900 capitalize">
                            {pair.word2}
                          </p>
                          <p className="text-[11px] font-mono text-slate-500">{pair.ipa2}</p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Câu ví dụ kèm IPA */}
            {currentSound.example_sentences && currentSound.example_sentences.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Câu luyện tập mẫu kèm IPA
                </h3>
                <div className="space-y-2.5">
                  {currentSound.example_sentences.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl flex items-start justify-between space-x-2"
                    >
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">&ldquo;{ex.sentence}&rdquo;</p>
                        <p className="text-[11px] font-mono text-blue-600 mt-0.5">{ex.ipa}</p>
                      </div>
                      <button
                        onClick={() => speakText(ex.sentence)}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-blue-600 flex items-center justify-center shrink-0 transition-colors shadow-2xs"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hội thoại ứng dụng */}
            {selectedUnit.dialogue && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2">
                <div className="flex items-center space-x-2 text-indigo-600 mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">Đoạn hội thoại thực hành</h3>
                </div>
                <div className="bg-indigo-50/40 p-3 rounded-xl border border-indigo-100/60 whitespace-pre-line text-xs font-medium text-slate-700 leading-relaxed font-sans">
                  {selectedUnit.dialogue}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 text-xs text-slate-400">
            Chưa có chi tiết âm cho Unit này.
          </div>
        )}
      </div>
    );
  }

  // DANH SÁCH 11 UNITS PHÁT ÂM
  return (
    <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Giáo trình phát âm</h2>
          <p className="text-xs text-slate-500">11 Units cặp âm đối chiếu & khẩu hình</p>
        </div>
        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
          11 Units
        </span>
      </div>

      <div className="space-y-2.5">
        {units.map((unit) => (
          <button
            key={unit.id}
            onClick={() => {
              setSelectedUnit(unit);
              setSelectedSoundIndex(0);
            }}
            className="w-full text-left bg-white border border-slate-200 hover:border-rose-300 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition-all flex items-center justify-between space-x-3"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 font-black flex items-center justify-center shrink-0 text-sm">
                U{unit.unit_number}
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-900 text-sm truncate font-mono">
                  {unit.sound_pair}
                </h3>
                <p className="text-[11px] text-slate-500 truncate">{unit.title}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-rose-600 shrink-0">Luyện ➔</span>
          </button>
        ))}
      </div>
    </div>
  );
}
