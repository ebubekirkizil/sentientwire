"use client";

import React, { useState } from "react";
import { login } from "@/app/actions/auth";
import { useRouter, useParams } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (username.toLowerCase() === "admin") {
      const res = await login(password);
      if (res.success) {
        onClose();
        router.push(`/${locale}/admin`);
      } else {
        setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
        setLoading(false);
      }
    } else {
      // Fake error for non-admin attempts to maintain the illusion
      setTimeout(() => {
        setError("Hesap bulunamadı veya şifre hatalı.");
        setLoading(false);
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl w-full max-w-sm shadow-xl overflow-hidden relative"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="p-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[var(--border-strong)] flex items-center justify-center mb-6 text-[var(--text-secondary)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          
          <h2 className="font-sans text-xl font-bold text-[var(--text-primary)] mb-1 text-center">Hesap Girişi</h2>
          <p className="font-sans text-sm text-[var(--text-muted)] mb-8 text-center">Devam etmek için giriş yapın veya kayıt olun</p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Kullanıcı Adı veya E-posta"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--cyan-dim)] rounded-md p-3 text-[var(--text-primary)] text-sm outline-none transition-colors"
            />
            <input 
              type="password" 
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--cyan-dim)] rounded-md p-3 text-[var(--text-primary)] text-sm outline-none transition-colors"
            />
            
            {error && <div className="text-red-500 text-sm text-center animate-pulse">{error}</div>}

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 bg-[#06b6d4] text-white font-medium py-3 rounded-md hover:bg-[#0891b2] transition-colors disabled:opacity-50"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
            
            <div className="mt-4 text-center">
              <button type="button" onClick={(e) => e.preventDefault()} className="text-sm text-[var(--text-muted)] hover:text-[#06b6d4] transition-colors">
                Hesabınız yok mu? Yeni Kayıt
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
