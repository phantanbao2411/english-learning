"use client";

import { useState } from "react";
import { Headphones, Play, Pause, RotateCcw, Eye, EyeOff, CheckCircle } from "lucide-react";
import { speakText } from "@/lib/speech";

interface ListeningTabProps {
  onBackToHome?: () => void;
}

export function ListeningTab({}: ListeningTabProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const sampleDialogue = `Interviewer: Hello Daniel! Tell us about the Duke of Edinburgh's Award you are doing.\nDaniel: Well, it's a great challenge. There are four parts: Volunteering, Fitness, Skills, and Expedition.\nInterviewer: What skills are you learning?\nDaniel: I am learning to play the guitar and also learning photography!`;

  const handlePlayVoice = () => {
    if (isPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakText(sampleDialogue, 0.85);
      setTimeout(() => setIsPlaying(false), 12000);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-24 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Luyện nghe (Listening)</h2>
          <p className="text-xs text-slate-500">Bài nghe theo Unit & Lời thoại</p>
        </div>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          Track 01
        </span>
      </div>

      {/* Card bài nghe */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
            Unit 1 • Exercise 2
          </span>
          <h3 className="font-extrabold text-base text-slate-900 mt-0.5">
            The Duke of Edinburgh&apos;s Award
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Nghe đoạn phỏng vấn Daniel về các hoạt động thử thách cá nhân.
          </p>
        </div>

        {/* Audio Player Controller */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                if (typeof window !== "undefined" && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                }
                setIsPlaying(false);
              }}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100"
              title="Phát lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handlePlayVoice}
              className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            <span className="text-xs font-mono font-bold text-slate-500">
              {isPlaying ? "0:12" : "0:00"} / 0:35
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            {isPlaying ? "Đang phát đoạn hội thoại..." : "Bấm nút Play để bắt đầu nghe"}
          </p>
        </div>

        {/* Câu hỏi trắc nghiệm bài nghe */}
        <div className="space-y-2 pt-1">
          <p className="text-xs font-bold text-slate-900">
            Câu hỏi: How many parts does the award have?
          </p>
          <div className="space-y-1.5">
            {[
              { id: 1, text: "A. Three parts" },
              { id: 2, text: "B. Four parts (Đúng)" },
              { id: 3, text: "C. Five parts" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedAnswer(opt.id)}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  selectedAnswer === opt.id
                    ? opt.id === 2
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                      : "bg-red-50 border-red-300 text-red-800"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>

        {/* Nút Ẩn/Hiện Transcript */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-slate-50 transition-colors"
          >
            {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showTranscript ? "Ẩn lời thoại (Transcript)" : "Xem lời thoại (Transcript)"}</span>
          </button>

          {showTranscript && (
            <div className="mt-3 p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-slate-800 font-medium leading-relaxed whitespace-pre-line animate-in fade-in duration-150">
              {sampleDialogue}
            </div>
          )}
        </div>

        {/* Nút đánh dấu hoàn thành */}
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors ${
            isCompleted
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isCompleted ? "Đã hoàn thành bài nghe ✓" : "Đánh dấu đã hoàn thành"}</span>
        </button>
      </div>
    </div>
  );
}
