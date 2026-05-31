'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export function NewsletterModal({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const t = useTranslations();

  useEffect(() => {
    // Check if user has already subscribed or closed the modal recently
    const hasSeenModal = localStorage.getItem('sw_newsletter_seen');
    if (!hasSeenModal) {
      // Show modal after 15 seconds of browsing
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
    
    const handleOpen = () => setIsOpen(true);
    document.addEventListener('openNewsletterModal', handleOpen);
    
    return () => {
      document.removeEventListener('openNewsletterModal', handleOpen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Don't show again for 7 days
    localStorage.setItem('sw_newsletter_seen', (Date.now() + 7 * 24 * 60 * 60 * 1000).toString());
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });

      if (res.ok) {
        setStatus('success');
        localStorage.setItem('sw_newsletter_seen', 'subscribed');
        setTimeout(() => setIsOpen(false), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-glow)] rounded-xl shadow-[0_0_50px_rgba(0,255,255,0.1)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--cyan-bright)] to-transparent" />
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="p-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--cyan-dim)] mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-bright)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {t('Newsletter.title') || "Secure Your Intelligence Briefing"}
          </h2>
          <p className="text-center text-[var(--text-secondary)] mb-6 text-sm">
            {t('Newsletter.subtitle') || "Get decrypted tech analysis and defense contract leaks delivered directly to your inbox before they hit the mainstream."}
          </p>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <input 
                type="email" 
                placeholder={t('Newsletter.placeholder') || "Enter your secure email..."}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--cyan-bright)] focus:ring-1 focus:ring-[var(--cyan-bright)] rounded-lg px-4 py-3 text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--text-muted)]"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-[var(--cyan-bright)] hover:bg-[var(--cyan-glow)] text-[#020408] font-bold py-3 rounded-lg transition-colors flex justify-center items-center font-mono"
            >
              {status === 'loading' ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-[#020408]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : status === 'success' ? (
                <span>{t('Newsletter.success') || "ACCESS GRANTED"}</span>
              ) : (
                <span>{t('Newsletter.button') || "INITIALIZE UPLINK"}</span>
              )}
            </button>
            
            {status === 'error' && (
              <p className="text-red-500 text-xs text-center font-mono mt-2">Error processing request. Try again.</p>
            )}
            
            <p className="text-center text-[var(--text-muted)] text-xs mt-4">
              {t('Newsletter.disclaimer') || "Zero spam. End-to-end encrypted database. Opt-out anytime."}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
