"use client";

import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/app/actions/settings";
import { useTranslations } from "next-intl";

export default function SettingsDashboard() {
  const t = useTranslations("Admin");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then(data => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const res = await updateSettings(formData);
    
    setSaving(false);
    if (res.success) {
      alert(t('successSettings'));
    } else {
      alert(t('failSettings'));
    }
  };

  if (loading) {
    return <div className="text-center font-mono text-[var(--cyan-bright)] animate-pulse py-20">{t('initializingConfig')}</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Global Site Settings */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6 rounded-lg">
          <h3 className="font-mono text-xs text-[var(--cyan-bright)] tracking-widest mb-6 border-b border-[var(--border-subtle)] pb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--cyan-bright)] rounded-full"></span>
            {t('globalSettings')}
          </h3>
          
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('siteTitle')}</label>
              <input 
                name="site_title" 
                defaultValue={settings.site_title || "TechIntel - Global Intelligence"}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-sans text-sm" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('xRedirectUrl')}</label>
              <input 
                name="x_account_url" 
                defaultValue={settings.x_account_url || "https://x.com/SentientWireHQ"}
                placeholder="https://x.com/SentientWireHQ"
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-sans text-sm" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('maintenanceMode')}</label>
              <input 
                name="maintenance_mode" 
                defaultValue={settings.maintenance_mode || "false"}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('rssFeeds')}</label>
              <textarea 
                name="rss_feeds" 
                rows={3}
                defaultValue={settings.rss_feeds || "https://news.ycombinator.com/rss, https://techcrunch.com/feed/"}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-xs leading-relaxed" 
              />
            </div>
          </div>
        </div>

        {/* X (Twitter) Bot Automation Settings */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6 rounded-lg">
          <h3 className="font-mono text-xs text-[var(--cyan-bright)] tracking-widest mb-6 border-b border-[var(--border-subtle)] pb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            {t('xBotSettings')}
          </h3>
          
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('xApiKey')}</label>
              <input 
                name="x_api_key" 
                type="password"
                defaultValue={settings.x_api_key || ""}
                placeholder="************************"
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('xApiSecret')}</label>
              <input 
                name="x_api_secret" 
                type="password"
                defaultValue={settings.x_api_secret || ""}
                placeholder="************************"
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('xAccessToken')}</label>
              <input 
                name="x_access_token" 
                type="password"
                defaultValue={settings.x_access_token || ""}
                placeholder="************************"
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('xAccessSecret')}</label>
              <input 
                name="x_access_secret" 
                type="password"
                defaultValue={settings.x_access_secret || ""}
                placeholder="************************"
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('openaiKey')}</label>
              <input 
                name="openai_api_key" 
                type="password"
                defaultValue={settings.openai_api_key || ""}
                placeholder="sk-************************"
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('botFrequency')}</label>
              <select 
                name="bot_frequency_hours" 
                defaultValue={settings.bot_frequency_hours || "1"}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm"
              >
                <option value="1">{t('every1Hour')}</option>
                <option value="3">{t('every3Hours')}</option>
                <option value="6">{t('every6Hours')}</option>
                <option value="12">{t('every12Hours')}</option>
                <option value="24">{t('every24Hours')}</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('botPersona')}</label>
              <select 
                name="bot_persona" 
                defaultValue={settings.bot_persona || "analytical"}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm"
              >
                <option value="analytical">{t('analytical')}</option>
                <option value="provocative">{t('provocative')}</option>
                <option value="urgent">{t('urgent')}</option>
                <option value="academic">{t('academic')}</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            disabled={saving}
            className="bg-[var(--cyan-bright)] text-[#020408] font-bold font-mono px-8 py-3 rounded tracking-widest hover:bg-[var(--cyan)] transition-colors disabled:opacity-50"
          >
            {saving ? t('encrypting') : t('saveConfig')}
          </button>
        </div>
      </form>
      
    </div>
  );
}
