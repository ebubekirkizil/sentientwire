"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createArticle } from "@/app/actions/article";
import { analyzeArticle, chatWithAssistant, AssistantMessage, AnalysisResult } from "@/app/actions/assistant";
import { searchUnsplashImages, UnsplashImage } from "@/app/actions/unsplash";
import { useTranslations } from "next-intl";

export default function NewArticle() {
  const t = useTranslations("Admin");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const router = useRouter();

  // Form State
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("CYBERSECURITY");
  const [categoryColor, setCategoryColor] = useState("#ef4444");
  const [imageUrl, setImageUrl] = useState("");

  // AI Panel State
  const [activeTab, setActiveTab] = useState<"analysis" | "images" | "chat">("analysis");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  
  // Chat State
  const [chatHistory, setChatHistory] = useState<AssistantMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Unsplash State
  const [unsplashQuery, setUnsplashQuery] = useState("");
  const [unsplashImages, setUnsplashImages] = useState<UnsplashImage[]>([]);
  const [unsplashLoading, setUnsplashLoading] = useState(false);

  // Auto-color mapping when category changes
  const handleCategoryChange = (val: string) => {
    setCategory(val);
    const colorMap: Record<string, string> = {
      CYBERSECURITY: "#ef4444",
      "ARTIFICIAL INTELLIGENCE": "#8b5cf6",
      QUANTUM: "#818cf8",
      HARDWARE: "#f59e0b",
      DEFENSE: "#10b981",
    };
    if (colorMap[val]) {
      setCategoryColor(colorMap[val]);
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Submit Article to Database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("categoryColor", categoryColor);
    if (imageUrl) formData.append("imageUrl", imageUrl);
    formData.append("locale", locale);

    const res = await createArticle(formData);
    setLoading(false);

    if (res.success) {
      router.push(`/${locale}/admin`);
    } else {
      alert(t('failCreateReport'));
    }
  };

  // Trigger AI SEO & Retention Analysis
  const handleAnalyze = async () => {
    if (!title && !content) {
      alert(t('pleaseEnterHeadline'));
      return;
    }

    setAnalyzing(true);
    setActiveTab("analysis");
    
    const result = await analyzeArticle(title, summary, content);
    setAnalyzing(false);

    if (result) {
      setAnalysis(result);
      // If AI suggests keywords, trigger Unsplash search automatically in the background
      if (result.suggestedKeywords && result.suggestedKeywords.length > 0) {
        const primaryKeyword = result.suggestedKeywords[0];
        setUnsplashQuery(primaryKeyword);
        triggerUnsplashSearch(primaryKeyword);
      }
    } else {
      alert(t('aiAnalysisFailed'));
    }
  };

  // Trigger Unsplash Search
  const triggerUnsplashSearch = async (query: string) => {
    setUnsplashLoading(true);
    const images = await searchUnsplashImages(query);
    setUnsplashImages(images);
    setUnsplashLoading(false);
  };

  const handleUnsplashSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerUnsplashSearch(unsplashQuery);
  };

  // Send message to AI assistant chatbot
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: AssistantMessage = { role: "user", text: chatInput };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput("");
    setChatLoading(true);

    const context = { title, summary, content };
    const reply = await chatWithAssistant(userMessage.text, [...chatHistory, userMessage], context);
    setChatLoading(false);

    if (reply) {
      setChatHistory(prev => [...prev, reply]);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <Link 
          href={`/${locale}/admin`} 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--cyan-bright)] hover:border-[var(--cyan-dim)] transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <div>
          <h2 className="text-2xl font-bold font-sans tracking-tight text-[var(--text-primary)]">{t('logNewIntelligence')}</h2>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-1">{t('writeManualIntelReports')}</p>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Article Input Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('classificationSector')}</label>
                  <div className="flex gap-4">
                    <select 
                      name="category" 
                      value={category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="flex-1 bg-[#020408] border border-[var(--border-subtle)] rounded-lg p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] transition-colors"
                    >
                      <option value="CYBERSECURITY">CYBERSECURITY</option>
                      <option value="ARTIFICIAL INTELLIGENCE">ARTIFICIAL INTELLIGENCE</option>
                      <option value="QUANTUM">QUANTUM</option>
                      <option value="HARDWARE">HARDWARE</option>
                      <option value="DEFENSE">DEFENSE</option>
                    </select>
                    <input 
                      type="color" 
                      name="categoryColor" 
                      value={categoryColor}
                      onChange={(e) => setCategoryColor(e.target.value)}
                      className="w-12 h-[46px] p-1 bg-[#020408] border border-[var(--border-subtle)] rounded-lg cursor-pointer" 
                      title="Category Accent Color" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('heroImageUrl')}</label>
                  <input 
                    name="imageUrl" 
                    type="url" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="bg-[#020408] border border-[var(--border-subtle)] rounded-lg p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] transition-colors" 
                    placeholder={t('heroImagePlaceholder')} 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('headline')}</label>
                <input 
                  required 
                  name="title" 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[#020408] border border-[var(--border-subtle)] rounded-lg p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] transition-colors" 
                  placeholder={t('headlinePlaceholder')} 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('briefSummary')}</label>
                <textarea 
                  required 
                  name="summary" 
                  rows={2} 
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="bg-[#020408] border border-[var(--border-subtle)] rounded-lg p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] resize-y transition-colors" 
                  placeholder={t('summaryPlaceholder')} 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase flex items-center justify-between">
                  <span>{t('fullContent')}</span>
                  <span className="text-[var(--cyan-dim)]">{t('dynamicGridSupported')}</span>
                </label>
                <textarea 
                  required 
                  name="content" 
                  rows={14} 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-[#020408] border border-[var(--border-subtle)] rounded-lg p-4 text-[var(--cyan-bright)] outline-none focus:border-[var(--cyan-dim)] resize-y font-mono text-sm shadow-inner transition-colors" 
                  placeholder={t('contentPlaceholder')} 
                />
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                {/* Analyze Draft Button */}
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="border border-[var(--cyan-dim)] text-[var(--cyan-bright)] hover:bg-[var(--cyan-dim)] hover:text-white font-mono font-semibold px-6 py-3 rounded-lg tracking-wider transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-[var(--cyan-bright)]/20 border-t-[var(--cyan-bright)] animate-spin" />
                      {t('scanningPrompt')}
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      {t('analyzeSeoRetention')}
                    </>
                  )}
                </button>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[var(--cyan-bright)] text-[#020408] font-bold font-mono px-8 py-3 rounded-lg tracking-widest hover:bg-[var(--cyan)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-[#020408]/20 border-t-[#020408] animate-spin" />
                      {t('publishing')}
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      {t('publishReport')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: AI Co-Editor Sidebar Panel */}
        <div className="lg:col-span-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden h-[730px] sticky top-24">
          {/* Tabs header */}
          <div className="flex border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] font-mono text-xs">
            <button
              onClick={() => setActiveTab("analysis")}
              className={`flex-1 py-3 text-center border-r border-[var(--border-subtle)] tracking-wider font-semibold transition-colors ${activeTab === "analysis" ? "text-[var(--cyan-bright)] bg-[var(--bg-card)] border-b-2 border-b-[var(--cyan-bright)]" : "text-[var(--text-muted)] hover:text-white"}`}
            >
              {t('seoAnalysisTab')}
            </button>
            <button
              onClick={() => setActiveTab("images")}
              className={`flex-1 py-3 text-center border-r border-[var(--border-subtle)] tracking-wider font-semibold transition-colors ${activeTab === "images" ? "text-[var(--cyan-bright)] bg-[var(--bg-card)] border-b-2 border-b-[var(--cyan-bright)]" : "text-[var(--text-muted)] hover:text-white"}`}
            >
              {t('imageFinderTab')}
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 text-center tracking-wider font-semibold transition-colors ${activeTab === "chat" ? "text-[var(--cyan-bright)] bg-[var(--bg-card)] border-b-2 border-b-[var(--cyan-bright)]" : "text-[var(--text-muted)] hover:text-white"}`}
            >
              {t('coEditorChatTab')}
            </button>
          </div>

          {/* Tab Content Container */}
          <div className="flex-1 overflow-y-auto p-6 font-sans">
            
            {/* 1. ANALYSIS TAB */}
            {activeTab === "analysis" && (
              <div className="flex flex-col gap-6">
                {!analysis && !analyzing ? (
                  <div className="flex flex-col items-center justify-center text-center py-24 gap-4">
                    <div className="w-12 h-12 rounded-full border border-dashed border-[var(--cyan-dim)] flex items-center justify-center text-[var(--cyan-bright)] text-xl font-mono animate-pulse">AI</div>
                    <p className="font-mono text-xs text-[var(--text-muted)] max-w-xs">{t('aiAnalysisIntro')}</p>
                  </div>
                ) : analyzing ? (
                  <div className="flex flex-col items-center justify-center text-center py-24 gap-4 animate-pulse">
                    <div className="w-10 h-10 rounded-full border-2 border-[var(--cyan-bright)] border-t-transparent animate-spin" />
                    <p className="font-mono text-xs text-[var(--cyan-bright)]">{t('aiDecryptingSignature')}</p>
                  </div>
                ) : (
                  analysis && (
                    <div className="flex flex-col gap-6">
                      {/* Scores Card */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#020408] border border-[var(--border-subtle)] p-4 rounded-lg text-center">
                          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase mb-1">{t('seoOptimization')}</div>
                          <div className="text-3xl font-bold text-[var(--cyan-bright)] font-mono">{analysis.seoScore}/100</div>
                          <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-[var(--cyan-bright)] h-full" style={{ width: `${analysis.seoScore}%` }} />
                          </div>
                        </div>
                        <div className="bg-[#020408] border border-[var(--border-subtle)] p-4 rounded-lg text-center">
                          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase mb-1">{t('readerRetention')}</div>
                          <div className="text-3xl font-bold text-purple-400 font-mono">{analysis.retentionScore}/100</div>
                          <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-purple-500 h-full" style={{ width: `${analysis.retentionScore}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* SEO Audit details */}
                      <div className="bg-[#020408]/30 border border-[var(--border-subtle)] p-4 rounded-lg">
                        <h4 className="font-mono text-xs text-[var(--cyan-bright)] tracking-wider mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan-bright)]" />
                          {t('googleSeoMetaAudit')}
                        </h4>
                        <div className="text-xs text-[var(--text-secondary)] leading-relaxed prose prose-invert max-w-none">
                          {analysis.seoFeedback}
                        </div>
                      </div>

                      {/* Retention/Curiosity details */}
                      <div className="bg-[#020408]/30 border border-[var(--border-subtle)] p-4 rounded-lg">
                        <h4 className="font-mono text-xs text-purple-400 tracking-wider mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {t('engagementRetentionAudit')}
                        </h4>
                        <div className="text-xs text-[var(--text-secondary)] leading-relaxed prose prose-invert max-w-none">
                          {analysis.retentionFeedback}
                        </div>
                      </div>

                      {/* Alternative headlines */}
                      {analysis.suggestedTitles && analysis.suggestedTitles.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('aiHeadlineRecs')}</label>
                          <div className="flex flex-col gap-2">
                            {analysis.suggestedTitles.map((tVal, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setTitle(tVal)}
                                className="text-left text-xs bg-[#020408] border border-[var(--border-subtle)] hover:border-[var(--cyan-dim)] hover:bg-[var(--bg-secondary)] p-3 rounded-lg text-[var(--text-primary)] transition-all flex items-center justify-between group"
                              >
                                <span className="line-clamp-1 pr-2">{tVal}</span>
                                <span className="text-[var(--cyan-bright)] font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">{t('apply')}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Alternative summary */}
                      {analysis.suggestedSummary && (
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">{t('aiCardPreviewSummary')}</label>
                          <div className="text-xs bg-[#020408] border border-[var(--border-subtle)] p-4 rounded-lg text-[var(--text-secondary)] flex flex-col gap-3">
                            <p className="italic">"{analysis.suggestedSummary}"</p>
                            <button
                              type="button"
                              onClick={() => setSummary(analysis.suggestedSummary)}
                              className="self-end text-[var(--cyan-bright)] font-mono text-[10px] hover:underline"
                            >
                              {t('applyToSummary')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}

            {/* 2. IMAGE FINDER TAB */}
            {activeTab === "images" && (
              <div className="flex flex-col gap-4">
                {/* Search query box */}
                <form onSubmit={handleUnsplashSearchSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={unsplashQuery}
                    onChange={(e) => setUnsplashQuery(e.target.value)}
                    placeholder={t('searchUnsplashPlaceholder')}
                    className="flex-1 bg-[#020408] border border-[var(--border-subtle)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] transition-colors font-mono"
                  />
                  <button
                    type="submit"
                    disabled={unsplashLoading}
                    className="bg-[var(--cyan-bright)] text-[#020408] hover:bg-[var(--cyan)] font-mono font-bold text-xs px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {t('search')}
                  </button>
                </form>

                {/* AI keywords recommendations */}
                {analysis?.suggestedKeywords && analysis.suggestedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center mb-1">
                    <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider mr-1">{t('aiKeywords')}</span>
                    {analysis.suggestedKeywords.map((keyword, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setUnsplashQuery(keyword);
                          triggerUnsplashSearch(keyword);
                        }}
                        className="text-[10px] bg-[#020408] border border-[var(--border-subtle)] hover:border-[var(--cyan-dim)] text-[var(--cyan-bright)] px-2.5 py-1 rounded-full font-mono transition-colors"
                      >
                        #{keyword}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search result list */}
                {unsplashLoading ? (
                  <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-[var(--cyan-bright)] border-t-transparent animate-spin" />
                    <p className="font-mono text-xs text-[var(--text-muted)] animate-pulse">{t('searchingLibrary')}</p>
                  </div>
                ) : unsplashImages.length === 0 ? (
                  <div className="text-center py-20 font-mono text-xs text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-lg">
                    {t('noImagesFound')}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {unsplashImages.map((img) => (
                      <div 
                        key={img.id} 
                        className="group relative border border-[var(--border-subtle)] hover:border-[var(--cyan-bright)] rounded-lg overflow-hidden bg-[#020408] flex flex-col h-40 transition-all cursor-pointer"
                        onClick={() => {
                          setImageUrl(img.url);
                          alert(t('imageUpdatedTo') + img.author);
                        }}
                      >
                        <div 
                          className="h-28 bg-cover bg-center" 
                          style={{ backgroundImage: `url('${img.thumb}')` }}
                        />
                        <div className="flex-1 p-2 flex flex-col justify-between">
                          <p className="font-mono text-[9px] text-[var(--text-muted)] truncate">{t('by')} {img.author}</p>
                          <span className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-mono font-bold text-[var(--cyan-bright)] tracking-wider transition-opacity">
                            {t('usePhoto')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. CO-EDITOR CHAT TAB */}
            {activeTab === "chat" && (
              <div className="flex flex-col h-[610px] justify-between">
                {/* Chat Message Logs */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 scrollbar-thin">
                  {chatHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
                      <div className="w-12 h-12 rounded-full border border-[var(--cyan-dim)] flex items-center justify-center text-lg">🤖</div>
                      <p className="font-mono text-xs text-[var(--text-muted)] max-w-xs">{t('coEditorIntro')}</p>
                    </div>
                  ) : (
                    chatHistory.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col max-w-[85%] rounded-lg p-3.5 text-xs leading-relaxed ${msg.role === "user" ? "self-end bg-[var(--cyan-dim)]/20 border border-[var(--cyan-dim)]/40 text-white" : "self-start bg-[#020408] border border-[var(--border-subtle)] text-[var(--text-secondary)]"}`}
                      >
                        <span className="font-mono text-[8px] text-[var(--text-muted)] uppercase tracking-wider mb-1 block">
                          {msg.role === "user" ? (locale === "tr" ? "Editör" : "Editor") : (locale === "tr" ? "YZ YARDIMCI EDİTÖRÜ" : "AI CO-EDITOR")}
                        </span>
                        <div className="whitespace-pre-wrap prose prose-invert max-w-none">{msg.text}</div>
                      </div>
                    ))
                  )}
                  {chatLoading && (
                    <div className="self-start bg-[#020408] border border-[var(--border-subtle)] rounded-lg p-3 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-[var(--cyan-bright)] rounded-full animate-bounce" />
                      <div className="w-2.5 h-2.5 bg-[var(--cyan-bright)] rounded-full animate-bounce delay-150" />
                      <div className="w-2.5 h-2.5 bg-[var(--cyan-bright)] rounded-full animate-bounce delay-300" />
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat input box */}
                <form onSubmit={handleSendChatMessage} className="flex gap-2 pt-4 border-t border-[var(--border-subtle)] mt-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={t('askAiPlaceholder')}
                    className="flex-1 bg-[#020408] border border-[var(--border-subtle)] rounded-lg p-3 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--cyan-dim)] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !chatInput.trim()}
                    className="bg-[var(--cyan-bright)] text-[#020408] hover:bg-[var(--cyan)] font-mono font-bold text-xs px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {t('send')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
