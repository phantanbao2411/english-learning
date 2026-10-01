"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { X, LogIn, UserPlus, LogOut, CheckCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
  onUserChanged: (email: string | null, userId: string | null) => void;
}

export function AuthModal({ isOpen, onClose, userEmail, onUserChanged }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isOpen) return null;

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setMessage(null);

    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage({
          text: "Tạo tài khoản thành công! Bạn có thể đăng nhập ngay.",
          error: false,
        });
        if (data.user) {
          onUserChanged(data.user.email ?? null, data.user.id);
          setTimeout(() => onClose(), 1200);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          onUserChanged(data.user.email ?? null, data.user.id);
          setMessage({ text: "Đăng nhập thành công!", error: false });
          setTimeout(() => onClose(), 800);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại.";
      setMessage({ text: msg, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onUserChanged(null, null);
    onClose();
  };

  // Quick switch profile for local demo/testing
  const handleQuickSelect = (name: string) => {
    const fakeEmail = `${name.toLowerCase()}@english.app`;
    localStorage.setItem("eng_active_user", fakeEmail);
    onUserChanged(fakeEmail, `user_${name.toLowerCase()}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-base">
            {userEmail ? "Tài khoản học tập" : isRegister ? "Tạo tài khoản học" : "Đăng nhập học tập"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {userEmail ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center uppercase">
                  {userEmail[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-600 font-semibold uppercase">Đang đăng nhập</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{userEmail}</p>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Tiến độ từ vựng và tự học của bạn đang được lưu trữ riêng biệt trên tài khoản này.
              </p>

              <button
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 flex items-center justify-center space-x-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="vi_du@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mật khẩu</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                    message.error ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{message.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                <span>{loading ? "Đang xử lý..." : isRegister ? "Tạo tài khoản" : "Đăng nhập"}</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  {isRegister ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Bấm để tạo mới"}
                </button>
              </div>

              {/* Fast switch between 2 users */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 text-center mb-2">Chọn nhanh người học (Không cần gõ mật khẩu):</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickSelect("Bao")}
                    className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    👤 Tài khoản: Bảo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickSelect("BanHoc")}
                    className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    👥 Tài khoản: Bạn học
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
