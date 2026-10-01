"use client";

import { useState } from "react";
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
  Home,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Volume2
} from "lucide-react";
import { speakText } from "@/lib/speech";

export interface ListeningTrack {
  id: number;
  unit: number;
  trackNumber: string;
  title: string;
  topic: string;
  duration: string;
  description: string;
  dialogue: string;
  question: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const LISTENING_TRACKS: ListeningTrack[] = [
  {
    id: 1,
    unit: 1,
    trackNumber: "Track 01",
    title: "The Duke of Edinburgh's Award",
    topic: "It's a challenge! (Hoạt động thử thách)",
    duration: "0:35",
    description: "Nghe đoạn phỏng vấn Daniel về các hoạt động thử thách cá nhân bổ ích.",
    dialogue: `Interviewer: Hello Daniel! Tell us about the Duke of Edinburgh's Award you are doing.
Daniel: Well, it's a great challenge. There are four parts: Volunteering, Fitness, Skills, and Expedition.
Interviewer: What skills are you learning?
Daniel: I am learning to play the guitar and also learning photography!
Interviewer: That sounds exciting. What about the expedition?
Daniel: We are going to camp in the mountains for three days next month!`,
    question: {
      prompt: "How many parts does the Duke of Edinburgh's Award have?",
      options: ["A. Three parts", "B. Four parts", "C. Five parts"],
      correctIndex: 1,
      explanation: "Daniel nói rõ: 'There are four parts: Volunteering, Fitness, Skills, and Expedition.'"
    }
  },
  {
    id: 2,
    unit: 2,
    trackNumber: "Track 02",
    title: "Wildlife Conservation",
    topic: "Our changing planet (Hành tinh xanh)",
    duration: "0:40",
    description: "Đoạn hội thoại về việc bảo vệ rùa biển và dọn dẹp rác thải bờ biển.",
    dialogue: `Presenter: Today on Planet Earth, we speak with Dr. Sarah about sea turtles.
Dr. Sarah: Sea turtles have existed for over 100 million years, but pollution and climate change are threatening their nesting beaches.
Presenter: What can volunteers do to help?
Dr. Sarah: People can help by cleaning up plastic waste on coastlines and protecting turtle nests from predators.`,
    question: {
      prompt: "What is the main danger to sea turtles mentioned in the conversation?",
      options: [
        "A. Pollution and climate change",
        "B. Cold weather in the ocean",
        "C. Too many tourists taking photos"
      ],
      correctIndex: 0,
      explanation: "Tiến sĩ Sarah khẳng định: 'pollution and climate change are threatening their nesting beaches.'"
    }
  },
  {
    id: 3,
    unit: 3,
    trackNumber: "Track 03",
    title: "Adventure Holiday Camp",
    topic: "On holiday (Kỳ nghỉ trải nghiệm)",
    duration: "0:38",
    description: "Emma kể cho Lucas nghe về trại hè mạo hiểm ngoài trời ở Scotland.",
    dialogue: `Lucas: Guess where you went last summer, Emma?
Emma: I went to an adventure camp in Scotland! We tried kayaking, rock climbing, and even mountain biking.
Lucas: Wow, wasn't rock climbing scary?
Emma: At first it was, but the instructor was amazing and safety ropes kept us completely secure.`,
    question: {
      prompt: "Where did Emma go for her summer holiday?",
      options: [
        "A. To Spain to visit her grandparents",
        "B. To an adventure camp in Scotland",
        "C. To a resort by the sea"
      ],
      correctIndex: 1,
      explanation: "Emma nói: 'I went to an adventure camp in Scotland! We tried kayaking, rock climbing...'"
    }
  },
  {
    id: 4,
    unit: 4,
    trackNumber: "Track 04",
    title: "Shopping for Clothes",
    topic: "My style (Phong cách thời trang)",
    duration: "0:30",
    description: "Chloe mua sắm áo hoodie và quần jeans năng động cho năm học mới.",
    dialogue: `Shop Assistant: Can I help you find anything today?
Chloe: Yes, I am looking for a casual hoodie and a pair of dark jeans for school.
Shop Assistant: We have these organic cotton hoodies on discount. What size are you?
Chloe: Medium, please. Do you have it in navy blue?
Shop Assistant: Yes, right here. Would you like to try it on in the fitting room?`,
    question: {
      prompt: "What color hoodie is Chloe looking for?",
      options: ["A. Bright yellow", "B. Navy blue", "C. Dark green"],
      correctIndex: 1,
      explanation: "Chloe hỏi người bán hàng: 'Do you have it in navy blue?'"
    }
  },
  {
    id: 5,
    unit: 5,
    trackNumber: "Track 05",
    title: "Staying Fit & Healthy",
    topic: "Sport and health (Thể thao & Sức khỏe)",
    duration: "0:35",
    description: "Huấn luyện viên dặn dò Tom về tầm quan trọng của việc nghỉ ngơi và uống đủ nước.",
    dialogue: `Coach: Great job today, Tom. Your running pace is improving every week.
Tom: Thanks coach! I ran 10 kilometers this morning without stopping.
Coach: Excellent, but remember that rest and hydration are just as important as running. Drink plenty of water and get eight hours of sleep!
Tom: Understood, coach. I'll make sure to stretch before going to bed.`,
    question: {
      prompt: "What does the coach advise Tom to focus on besides running?",
      options: [
        "A. Eating fast food before workout",
        "B. Rest and hydration (drinking water)",
        "C. Running 20 kilometers every morning"
      ],
      correctIndex: 1,
      explanation: "HLV dặn: 'rest and hydration are just as important as running. Drink plenty of water...'"
    }
  }
];

interface ListeningTabProps {
  onBackToHome?: () => void;
}

export function ListeningTab({ onBackToHome }: ListeningTabProps) {
  const [selectedTrack, setSelectedTrack] = useState<ListeningTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);
  const [showTranscript, setShowTranscript] = useState(false);
  const [completedMap, setCompletedMap] = useState<Record<number, boolean>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handlePlayVoice = (text: string) => {
    if (isPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakText(text, speechSpeed);
      // Rough timer estimate based on words
      const words = text.split(/\s+/).length;
      const estimatedSec = Math.max(8, Math.round((words / 2.5) * (1 / speechSpeed)));
      setTimeout(() => setIsPlaying(false), estimatedSec * 1000);
    }
  };

  const handleStopVoice = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handleSelectTrack = (track: ListeningTrack) => {
    handleStopVoice();
    setSelectedTrack(track);
    setShowTranscript(false);
    setSelectedAnswer(null);
  };

  const toggleCompleted = (trackId: number) => {
    setCompletedMap((prev) => ({
      ...prev,
      [trackId]: !prev[trackId]
    }));
  };

  // ==========================================
  // VIEW 1: CHI TIẾT 1 BÀI NGHE (PLAYER VIEW)
  // ==========================================
  if (selectedTrack) {
    const isCompleted = !!completedMap[selectedTrack.id];
    const isAnswerCorrect = selectedAnswer === selectedTrack.question.correctIndex;

    return (
      <div className="p-4 space-y-4 pb-28 animate-in fade-in duration-200">
        {/* NÚT QUAY LẠI TRÊN CÙNG - CỰC KỲ RÕ RÀNG */}
        <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm">
          <button
            onClick={() => {
              handleStopVoice();
              setSelectedTrack(null);
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>Danh sách bài nghe</span>
          </button>

          {onBackToHome && (
            <button
              onClick={() => {
                handleStopVoice();
                onBackToHome();
              }}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-semibold text-xs transition-colors"
              title="Về Trang chủ"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </button>
          )}
        </div>

        {/* Thẻ Chi Tiết Bài Nghe */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
                  Unit {selectedTrack.unit}
                </span>
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {selectedTrack.trackNumber}
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mt-1.5 leading-snug">
                {selectedTrack.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedTrack.topic}</p>
            </div>
            {isCompleted && (
              <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã xong</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
            {selectedTrack.description}
          </p>

          {/* Bộ điều khiển Audio / Player */}
          <div className="bg-gradient-to-b from-slate-50 to-blue-50/30 border border-slate-200 rounded-2xl p-4 flex flex-col items-center space-y-3.5 shadow-inner">
            {/* Tốc độ đọc */}
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-medium text-slate-500">Tốc độ nghe:</span>
              {[0.75, 0.85, 1.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSpeechSpeed(rate)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                    speechSpeed === rate
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {rate === 0.75 ? "Chậm (0.75x)" : rate === 0.85 ? "Chuẩn (0.85x)" : "Nhanh (1.0x)"}
                </button>
              ))}
            </div>

            {/* Các nút bấm Play / Pause / Reset */}
            <div className="flex items-center space-x-5">
              <button
                onClick={handleStopVoice}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100 active:scale-95 shadow-sm transition-all"
                title="Dừng / Phát lại từ đầu"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => handlePlayVoice(selectedTrack.dialogue)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-all ${
                  isPlaying
                    ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/30"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30"
                }`}
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </button>

              <button
                onClick={() => speakText(selectedTrack.question.prompt, speechSpeed)}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-indigo-600 flex items-center justify-center hover:bg-indigo-50 active:scale-95 shadow-sm transition-all"
                title="Đọc câu hỏi trắc nghiệm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs font-semibold text-slate-600 text-center">
              {isPlaying ? (
                <span className="text-blue-600 flex items-center justify-center space-x-1 animate-pulse">
                  <span>● Đang phát giọng đọc bản xứ...</span>
                </span>
              ) : (
                "Bấm nút Play để bắt đầu luyện nghe"
              )}
            </p>
          </div>

          {/* Câu hỏi trắc nghiệm kiểm tra hiểu bài */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">
                Câu hỏi trắc nghiệm
              </span>
              <span className="text-[11px] text-slate-400">Chọn 1 đáp án</span>
            </div>
            <p className="text-sm font-bold text-slate-900 leading-snug">
              {selectedTrack.question.prompt}
            </p>

            <div className="space-y-2">
              {selectedTrack.question.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === selectedTrack.question.correctIndex;

                let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";
                if (selectedAnswer !== null) {
                  if (isSelected && isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-50 border-rose-400 text-rose-800 font-bold";
                  } else if (isCorrect) {
                    btnStyle = "bg-emerald-50/50 border-emerald-300 text-emerald-700";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer !== null && isCorrect && (
                      <span className="text-emerald-600 font-bold text-xs">✓ Đúng</span>
                    )}
                    {selectedAnswer === idx && !isCorrect && (
                      <span className="text-rose-600 font-bold text-xs">✗ Sai</span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed animate-in fade-in">
                <span className="font-bold">Giải thích: </span>
                {selectedTrack.question.explanation}
              </div>
            )}
          </div>

          {/* Ẩn / Hiện Lời Thoại (Transcript) */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-slate-50 active:scale-[0.99] transition-all"
            >
              {showTranscript ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-blue-600" />}
              <span>{showTranscript ? "Ẩn lời thoại (Transcript)" : "Xem lời thoại bài nghe (Transcript)"}</span>
            </button>

            {showTranscript && (
              <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium leading-relaxed whitespace-pre-line animate-in fade-in duration-150">
                {selectedTrack.dialogue}
              </div>
            )}
          </div>

          {/* Đánh dấu đã hoàn thành */}
          <button
            onClick={() => toggleCompleted(selectedTrack.id)}
            className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all active:scale-[0.98] ${
              isCompleted
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? "Đã hoàn thành bài nghe này ✓" : "Đánh dấu đã hoàn thành bài này"}</span>
          </button>
        </div>

        {/* NÚT QUAY LẠI PHÍA DƯỚI CÙNG (DỄ BẤM TRÊN ĐIỆN THOẠI) */}
        <div className="pt-2 flex items-center space-x-3">
          <button
            onClick={() => {
              handleStopVoice();
              setSelectedTrack(null);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-98"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách bài nghe</span>
          </button>

          {onBackToHome && (
            <button
              onClick={() => {
                handleStopVoice();
                onBackToHome();
              }}
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
  // VIEW 2: DANH SÁCH TẤT CẢ CÁC BÀI NGHE (LIST VIEW)
  // ==========================================
  const completedCount = Object.values(completedMap).filter(Boolean).length;

  return (
    <div className="p-4 space-y-4 pb-28 animate-in fade-in duration-200">
      {/* THANH ĐIỀU HƯỚNG TRÊN CÙNG - CÓ NÚT QUAY LẠI TRANG CHỦ */}
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
              Luyện nghe (Listening)
            </h2>
            <p className="text-xs text-slate-500">Giáo trình Cambridge Prepare L3</p>
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

      {/* Banner Tiến độ bài nghe */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-md shadow-blue-500/15">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-2">
            <Headphones className="w-5 h-5 text-blue-200" />
            <h3 className="font-bold text-sm">Các bài nghe chuẩn giọng bản xứ</h3>
          </div>
          <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
            {completedCount}/{LISTENING_TRACKS.length} bài
          </span>
        </div>
        <p className="text-xs text-blue-100">
          Luyện nghe hội thoại thực tế, kiểm tra trắc nghiệm và đối chiếu lời thoại chi tiết.
        </p>
      </div>

      {/* Danh sách các Track nghe */}
      <div className="space-y-3">
        {LISTENING_TRACKS.map((track) => {
          const isDone = !!completedMap[track.id];
          return (
            <div
              key={track.id}
              onClick={() => handleSelectTrack(track)}
              className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-4 shadow-sm cursor-pointer transition-all active:scale-[0.99] group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                      Unit {track.unit}
                    </span>
                    <span className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {track.trackNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ⏱ {track.duration}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {track.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {track.description}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  {isDone ? (
                    <span className="text-emerald-600 text-xs font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Đã xong</span>
                    </span>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[200px]">{track.topic}</span>
                <span className="font-bold text-blue-600 group-hover:underline">Vào nghe →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
