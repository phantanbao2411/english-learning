"use client";

import { useState } from "react";
import { PronunciationUnit, PronunciationSound } from "@/types/database";
import { PRONUNCIATION_UNITS } from "@/data/pronunciation";
import { playNativeAudio } from "@/lib/speech";
import {
  ArrowLeft,
  Volume2,
  Mic,
  Info,
  MessageSquare,
  Home,
  CheckCircle2,
  Sparkles,
  Headphones,
  Globe,
  Play
} from "lucide-react";

export const IPA_REPRESENTATIVE_WORDS: Record<string, string> = {
  "/ɪ/": "sit",
  "/i:/": "seat",
  "/iː/": "seat",
  "/ʊ/": "pull",
  "/u:/": "pool",
  "/uː/": "pool",
  "/e/": "bed",
  "/æ/": "cat",
  "/ə/": "banana",
  "/ɜː/": "bird",
  "/eɪ/": "rain",
  "/ɔɪ/": "boy",
  "/aɪ/": "sky",
  "/ʊə/": "tour",
  "/ʌ/": "sun",
  "/ɑː/": "car",
  "/ɔː/": "door",
  "/ɪə/": "near",
  "/eə/": "chair",
  "/aʊ/": "house",
  "/oʊ/": "boat",
  "/əʊ/": "boat",
  "/θ/": "think",
  "/ð/": "this",
  "/s/": "see",
  "/ʃ/": "she",
  "/tʃ/": "chair",
  "/dʒ/": "jump",
  "/z/": "zoo",
  "/ʒ/": "vision",
  "/t/ - /d/": "train",
  "Đuôi -ed": "wanted",
  "Ôn tập: /i:/ vs /ɪ/": "sheep",
  "Ôn tập: /u:/ vs /ʊ/": "pool",
};

interface PronunciationTabProps {
  units: PronunciationUnit[];
  onBackToHome?: () => void;
}

export function PronunciationTab({ units, onBackToHome }: PronunciationTabProps) {
  const [selectedUnit, setSelectedUnit] = useState<PronunciationUnit | null>(null);
  const [selectedSoundIndex, setSelectedSoundIndex] = useState(0);
  const [accent, setAccent] = useState<"uk" | "us">("uk");
  const [currentlyPlayingWord, setCurrentlyPlayingWord] = useState<string | null>(null);

  const handlePlayWord = (word: string, customAccent?: "uk" | "us") => {
    // If the word contains slashes (IPA), resolve to actual representative English word
    let textToPlay = word.trim();
    if (IPA_REPRESENTATIVE_WORDS[textToPlay]) {
      textToPlay = IPA_REPRESENTATIVE_WORDS[textToPlay];
    } else if (textToPlay.startsWith("/") && textToPlay.endsWith("/")) {
      textToPlay = textToPlay.replace(/\//g, "").trim();
    }

    const acc = customAccent || accent;
    setCurrentlyPlayingWord(word);
    playNativeAudio(textToPlay, acc).finally(() => {
      setTimeout(() => setCurrentlyPlayingWord(null), 1200);
    });
  };

  // ==========================================
  // VIEW 1: CHI TIẾT 1 BÀI PHÁT ÂM (UNIT DETAIL)
  // ==========================================
  if (selectedUnit) {
    // Guaranteed fallback so sounds is NEVER empty
    const fallbackSounds =
      PRONUNCIATION_UNITS.find((u) => u.unit_number === selectedUnit.unit_number)?.sounds ||
      PRONUNCIATION_UNITS[0].sounds ||
      [];
    const sounds: PronunciationSound[] =
      selectedUnit.sounds && selectedUnit.sounds.length > 0 ? selectedUnit.sounds : fallbackSounds;

    const currentSound: PronunciationSound = sounds[selectedSoundIndex] || sounds[0];

    // Pick representative words for this sound from minimal pairs
    const sampleWords = currentSound?.minimal_pairs?.map((p) => p.word1) || [];
    const repWord =
      sampleWords[0] || IPA_REPRESENTATIVE_WORDS[currentSound.ipa] || "hello";

    return (
      <div className="p-4 space-y-4 pb-28 animate-in fade-in duration-200">
        {/* THANH ĐIỀU HƯỚNG TRÊN CÙNG */}
        <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm">
          <button
            onClick={() => setSelectedUnit(null)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-rose-600" />
            <span>11 Units</span>
          </button>

          {/* Toggle chọn giọng Anh - Anh (UK) hoặc Anh - Mỹ (US) */}
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

        {/* Tiêu đề Unit */}
        <div>
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full">
            Unit {selectedUnit.unit_number} • Phát âm chuẩn
          </span>
          <h2 className="font-extrabold text-lg text-slate-900 mt-1 leading-snug">
            {selectedUnit.sound_pair}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">{selectedUnit.title}</p>
        </div>

        {/* Bộ chọn âm tab (Sound tabs) */}
        {sounds.length > 0 && (
          <div className="flex bg-slate-100 p-1.5 rounded-2xl space-x-1.5 overflow-x-auto no-scrollbar">
            {sounds.map((snd, idx) => {
              const isSelected = selectedSoundIndex === idx;
              return (
                <button
                  key={snd.id || idx}
                  onClick={() => setSelectedSoundIndex(idx)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center justify-center space-x-1.5 ${
                    isSelected
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
                      : "text-slate-600 hover:text-slate-900 bg-white/60"
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Âm {snd.ipa}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* HERO CARD: NÚT BẤM NGHE PHÁT ÂM CHUẨN TO VÀ RÕ RÀNG */}
        <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50 border-2 border-rose-300/80 rounded-2xl p-4 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white font-extrabold flex items-center justify-center text-xl shadow-md shadow-rose-500/25 font-mono">
                {currentSound.ipa}
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-rose-700 uppercase tracking-wider bg-rose-100/80 px-2 py-0.5 rounded">
                  Phát âm chuẩn bản xứ
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-0.5">
                  Âm {currentSound.ipa}
                </h3>
                <p className="text-xs text-slate-500">
                  Từ mẫu: <span className="font-bold text-slate-800">{repWord}</span> ({accent.toUpperCase()})
                </p>
              </div>
            </div>
          </div>

          {/* NÚT BẤM TO: NGHE ÂM NÀY NGAY LẬP TỨC */}
          <button
            onClick={() => handlePlayWord(repWord)}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 active:scale-[0.98] text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-md shadow-rose-600/25 transition-all"
          >
            <Volume2 className="w-5 h-5 animate-bounce" />
            <span>BẤM ĐỂ NGHE PHÁT ÂM CHUẨN: &ldquo;{repWord}&rdquo;</span>
          </button>

          {/* Các từ mẫu tiêu biểu chứa âm này */}
          {sampleWords.length > 0 && (
            <div className="pt-2 border-t border-rose-100">
              <p className="text-[11px] font-bold text-slate-600 mb-2">
                Chạm vào bất kỳ từ nào để nghe cách phát âm âm {currentSound.ipa}:
              </p>
              <div className="flex flex-wrap gap-2">
                {sampleWords.map((w) => {
                  const isPlaying = currentlyPlayingWord === w;
                  return (
                    <button
                      key={w}
                      onClick={() => handlePlayWord(w)}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-95 shadow-2xs ${
                        isPlaying
                          ? "bg-rose-600 border-rose-600 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-800 hover:border-rose-400 hover:bg-rose-50"
                      }`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? "text-white" : "text-rose-500"}`} />
                      <span>{w}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Khẩu hình & Hướng dẫn miệng, lưỡi */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center space-x-2 text-rose-600">
            <Info className="w-4 h-4 shrink-0" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Khẩu hình & Cách phát âm âm {currentSound.ipa}
            </h3>
          </div>
          <p className="text-xs font-medium text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            {currentSound.mouth_guide}
          </p>
        </div>

        {/* Bảng cặp từ tương phản (Minimal Pairs) */}
        {currentSound.minimal_pairs && currentSound.minimal_pairs.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Cặp từ so sánh đối chiếu (Minimal Pairs)
              </h3>
              <span className="text-[11px] text-slate-400">Bấm loa để nghe so sánh</span>
            </div>

            <div className="divide-y divide-slate-100">
              {currentSound.minimal_pairs.map((pair, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-2">
                  {/* Từ 1 */}
                  <button
                    onClick={() => handlePlayWord(pair.word1)}
                    className={`flex-1 text-left p-2.5 rounded-xl transition-all border flex items-center justify-between ${
                      currentlyPlayingWord === pair.word1
                        ? "bg-rose-100 border-rose-400 shadow-sm"
                        : "bg-slate-50/80 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div>
                      <p className="font-extrabold text-sm text-slate-900 capitalize">
                        {pair.word1}
                      </p>
                      <p className="text-[11px] font-mono text-slate-500">{pair.ipa1}</p>
                    </div>
                    <Volume2 className="w-4 h-4 text-rose-600 shrink-0" />
                  </button>

                  <span className="text-xs font-bold text-slate-300 shrink-0">vs</span>

                  {/* Từ 2 */}
                  <button
                    onClick={() => handlePlayWord(pair.word2)}
                    className={`flex-1 text-left p-2.5 rounded-xl transition-all border flex items-center justify-between ${
                      currentlyPlayingWord === pair.word2
                        ? "bg-blue-100 border-blue-400 shadow-sm"
                        : "bg-slate-50/80 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div>
                      <p className="font-extrabold text-sm text-slate-900 capitalize">
                        {pair.word2}
                      </p>
                      <p className="text-[11px] font-mono text-slate-500">{pair.ipa2}</p>
                    </div>
                    <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
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
              Câu luyện tập thực tế kèm phiên âm IPA
            </h3>
            <div className="space-y-2.5">
              {currentSound.example_sentences.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-xl flex items-start justify-between space-x-2 border border-slate-100"
                >
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">&ldquo;{ex.sentence}&rdquo;</p>
                    <p className="text-[11px] font-mono text-blue-600 mt-0.5">{ex.ipa}</p>
                  </div>
                  <button
                    onClick={() => handlePlayWord(ex.sentence)}
                    className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center shrink-0 transition-colors shadow-2xs active:scale-95"
                    title="Nghe cả câu"
                  >
                    <Volume2 className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Đoạn hội thoại ứng dụng thực tế */}
        {selectedUnit.dialogue && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-indigo-600">
                <MessageSquare className="w-4 h-4" />
                <h3 className="font-bold text-xs uppercase tracking-wider">
                  Hội thoại mẫu chứa cặp âm
                </h3>
              </div>
              <button
                onClick={() => handlePlayWord(selectedUnit.dialogue!)}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe hội thoại</span>
              </button>
            </div>
            <div className="p-3.5 bg-indigo-50/40 border border-indigo-100 rounded-xl text-xs text-slate-800 leading-relaxed whitespace-pre-line font-medium">
              {selectedUnit.dialogue}
            </div>
          </div>
        )}

        {/* NÚT QUAY LẠI PHÍA DƯỚI CÙNG (DỄ BẤM TRÊN ĐIỆN THOẠI) */}
        <div className="pt-2 flex items-center space-x-3">
          <button
            onClick={() => setSelectedUnit(null)}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-98"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách âm</span>
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
  // VIEW 2: DANH SÁCH 11 BÀI PHÁT ÂM (LIST VIEW)
  // ==========================================
  const displayUnits = units.length > 0 ? units : PRONUNCIATION_UNITS;

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
              Luyện phát âm chuẩn IPA
            </h2>
            <p className="text-xs text-slate-500">Giáo trình 11 Units Cặp âm đối chiếu</p>
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

      {/* Banner giới thiệu phát âm chuẩn */}
      <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-2xl p-4 text-white shadow-md shadow-rose-500/15">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-rose-200" />
            <h3 className="font-bold text-sm">Âm chuẩn bản xứ Anh - Anh & Anh - Mỹ</h3>
          </div>
          <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
            {displayUnits.length} Units
          </span>
        </div>
        <p className="text-xs text-rose-100 leading-relaxed">
          Bấm trực tiếp vào từng bài để luyện nghe phát âm chuẩn, so sánh cặp từ Minimal Pairs và xem hướng dẫn khẩu hình.
        </p>
      </div>

      {/* Danh sách 11 Units phát âm */}
      <div className="space-y-3">
        {displayUnits.map((unit) => {
          // Find sample word for quick listen
          const firstSound = unit.sounds?.[0] || PRONUNCIATION_UNITS.find(p => p.unit_number === unit.unit_number)?.sounds?.[0];
          const quickWord = firstSound?.minimal_pairs?.[0]?.word1 || IPA_REPRESENTATIVE_WORDS[firstSound?.ipa || ""] || "seat";

          return (
            <div
              key={unit.id}
              className="bg-white border border-slate-200 hover:border-rose-400 rounded-2xl p-4 shadow-sm transition-all flex flex-col space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div
                  onClick={() => {
                    setSelectedUnit(unit);
                    setSelectedSoundIndex(0);
                  }}
                  className="flex items-center space-x-3 min-w-0 flex-1 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 font-extrabold flex items-center justify-center shrink-0 text-sm">
                    {unit.unit_number}
                  </div>
                  <div className="min-w-0 pr-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600">
                      {unit.sound_pair}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm truncate mt-0.5">
                      {unit.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {unit.guide_summary}
                    </p>
                  </div>
                </div>

                {/* NÚT NGHE THỬ NHANH NGAY TỪ DANH SÁCH */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayWord(quickWord);
                  }}
                  className="w-10 h-10 rounded-full bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs active:scale-95"
                  title={`Nghe thử từ mẫu: ${quickWord}`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Dòng điều hướng vào học */}
              <div
                onClick={() => {
                  setSelectedUnit(unit);
                  setSelectedSoundIndex(0);
                }}
                className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs cursor-pointer hover:text-rose-600 transition-colors"
              >
                <span className="text-[11px] text-slate-500">
                  Từ mẫu: <span className="font-semibold text-slate-800">{quickWord}</span>
                </span>
                <span className="font-extrabold text-rose-600 flex items-center space-x-0.5">
                  <span>Vào luyện phát âm</span>
                  <span>➔</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
