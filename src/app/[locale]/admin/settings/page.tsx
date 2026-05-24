"use client";

import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/app/actions/settings";

export default function SettingsDashboard() {
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
      alert("SETTINGS UPDATED SUCCESSFULLY");
    } else {
      alert("FAILED TO UPDATE SETTINGS");
    }
  };

  if (loading) {
    return <div className="text-center font-mono text-[var(--cyan-bright)] animate-pulse py-20">INITIALIZING CONFIGURATION MODULE...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Global Site Settings */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6 rounded-lg">
          <h3 className="font-mono text-xs text-[var(--cyan-bright)] tracking-widest mb-6 border-b border-[var(--border-subtle)] pb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--cyan-bright)] rounded-full"></span>
            GLOBAL PLATFORM SETTINGS
          </h3>
          
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">SITE TITLE</label>
              <input 
                name="site_title" 
                defaultValue={settings.site_title || "TechIntel - Global Intelligence"}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-sans text-sm" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">MAINTENANCE MODE (TRUE/FALSE)</label>
              <input 
                name="maintenance_mode" 
                defaultValue={settings.maintenance_mode || "false"}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm" 
              />
            </div>
          </div>
        </div>

        {/* X (Twitter) Bot Automation Settings */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6 rounded-lg">
          <h3 className="font-mono text-xs text-[var(--cyan-bright)] tracking-widest mb-6 border-b border-[var(--border-subtle)] pb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            AI X-BOT AUTOMATION SETTINGS (COMING SOON)
          </h3>
          
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">X API KEY (BEARER TOKEN)</label>
              <input 
                name="x_api_key" 
                type="password"
                defaultValue={settings.x_api_key || ""}
                placeholder="************************"
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">OPENAI API KEY (FOR TWEET GENERATION)</label>
              <input 
                name="openai_api_key" 
                type="password"
                defaultValue={settings.openai_api_key || ""}
                placeholder="sk-************************"
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">BOT POST FREQUENCY (HOURS)</label>
              <select 
                name="bot_frequency_hours" 
                defaultValue={settings.bot_frequency_hours || "1"}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm"
              >
                <option value="1">EVERY 1 HOUR</option>
                <option value="3">EVERY 3 HOURS</option>
                <option value="6">EVERY 6 HOURS</option>
                <option value="12">EVERY 12 HOURS</option>
                <option value="24">EVERY 24 HOURS (DAILY SUMMARY)</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">BOT TONE / PERSONA</label>
              <select 
                name="bot_persona" 
                defaultValue={settings.bot_persona || "analytical"}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded p-3 text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] font-mono text-sm"
              >
                <option value="analytical">ANALYTICAL & NEUTRAL</option>
                <option value="provocative">PROVOCATIVE / DEBATE STARTER (HIGH ENGAGEMENT)</option>
                <option value="urgent">URGENT / ALARMIST (BREAKING NEWS)</option>
                <option value="academic">ACADEMIC / DEEP DIVE</option>
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
            {saving ? "ENCRYPTING CONFIG..." : "SAVE CONFIGURATION"}
          </button>
        </div>
      </form>
      
    </div>
  );
}
