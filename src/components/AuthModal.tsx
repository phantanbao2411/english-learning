"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { X, LogIn, LogOut, CheckCircle, UserCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
  onUserChanged: (email: string | null, userId: string | null) => void;
}

export function AuthModal({ isOpen, onClose, userEmail, onUserChanged }: AuthModalProps) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isOpen) return null;

  const supabase = createClient();

  const resolveEmail = (input: string) => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed.includes("@")) return trimmed;
    return `${trimmed}@english.app`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail || !password) return;
    setLoading(true);
    setMessage(null);

    const email = resolveEmail(usernameOrEmail);

    try {
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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đăng nhập thất bại, vui lòng kiểm tra lại.";
      setMessage({ text: msg, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (accountUsername: string) => {
    setLoading(true);
    setMessage(null);
    const email = `${accountUsername}@english.app`;
    const defaultPass = "123456";

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: defaultPass,
      });

      if (error) throw error;
      if (data.user) {
        onUserChanged(data.user.email ?? null, data.user.id);
        setMessage({ text: `Chào mừng ${accountUsername === "phamphantanbao" ? "Tấn Bảo" : "Lệ Thanh"}!`, error: false });
        setTimeout(() => onClose(), 700);
      }
    } catch {
      // Fallback local
      onUserChanged(email, `user_${accountUsername}`);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onUserChanged(null, null);
    onClose();
  };

  let currentDisplayName = "Người học";
  if (userEmail) {
    if (userEmail.includes("phamphantanbao") || userEmail.toLowerCase().includes("bao")) {
      currentDisplayName = "Phạm Phan Tấn Bảo";
    } else if (userEmail.includes("lethilethanh") || userEmail.toLowerCase().includes("thanh")) {
      currentDisplayName = "Lê Thị Lệ Thanh";
    } else {
      currentDisplayName = userEmail.split("@")[0];
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-base">
            {userEmail ? "Tài khoản học tập" : "Đăng nhập người học"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {userEmail ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center uppercase text-base">
                  {currentDisplayName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">
                    Đang đăng nhập
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 truncate">
                    {currentDisplayName}
                  </p>
                  <p className="text-xs text-slate-500 font-mono truncate">{userEmail}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">📌 Chế độ học tập:</p>
                <p>• Lịch học với giáo viên: Cả hai bạn cùng xem chung.</p>
                <p>• Tiến độ từ vựng: Lưu trữ riêng cho {currentDisplayName}.</p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() =>
                    handleQuickLogin(
                      userEmail.includes("phamphantanbao") ? "lethilethanh" : "phamphantanbao"
                    )
                  }
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>
                    Chuyển sang tài khoản{" "}
                    {userEmail.includes("phamphantanbao") ? "Lê Thị Lệ Thanh" : "Tấn Bảo"}
                  </span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 flex items-center justify-center space-x-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* 1-CLICK LOGIN FOR THE 2 USERS */}
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">Chọn nhanh tài khoản của bạn:</p>
                <div className="space-y-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickLogin("phamphantanbao")}
                    className="w-full p-3 rounded-xl border-2 border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-left flex items-center justify-between active:scale-[0.98] transition-all"
                  >
                    <div>
                      <p className="font-extrabold text-sm text-blue-900">👤 Phạm Phan Tấn Bảo</p>
                      <p className="text-[11px] font-mono text-blue-600">phamphantanbao</p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-white px-2 py-1 rounded-lg border border-blue-200">
                      Vào học ➔
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickLogin("lethilethanh")}
                    className="w-full p-3 rounded-xl border-2 border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 text-left flex items-center justify-between active:scale-[0.98] transition-all"
                  >
                    <div>
                      <p className="font-extrabold text-sm text-purple-900">👩 Lê Thị Lệ Thanh</p>
                      <p className="text-[11px] font-mono text-purple-600">lethilethanh</p>
                    </div>
                    <span className="text-xs font-bold text-purple-700 bg-white px-2 py-1 rounded-lg border border-purple-200">
                      Vào học ➔
                    </span>
                  </button>
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200" />
                <span className="shrink mx-2 text-[11px] text-slate-400 font-semibold">
                  Hoặc đăng nhập bằng form
                </span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              {/* MANUAL FORM */}
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="phamphantanbao hoặc lethilethanh"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu</label>
                  <input
                    type="password"
                    required
                    placeholder="123456"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                  />
                </div>

                {message && (
                  <div
                    className={`p-2.5 rounded-xl text-xs flex items-center space-x-2 ${
                      message.error
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{message.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{loading ? "Đang xử lý..." : "Đăng nhập"}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
