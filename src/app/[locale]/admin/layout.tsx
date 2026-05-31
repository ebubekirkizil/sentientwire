"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { logout } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "DATABANK", path: `/${locale}/admin`, icon: "M4 6h16M4 12h16M4 18h7" }
  ];

  const handleLogout = async () => {
    await logout();
    router.push(`/${locale}`);
  };

  return (
    <div className="flex h-screen bg-[#020408] overflow-hidden selection:bg-[var(--cyan-dim)] selection:text-[var(--cyan-bright)]">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col relative z-20">
        <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <Link href={`/${locale}`} className="block">
            <h1 className="font-mono text-xl font-bold text-[var(--cyan-bright)] tracking-widest hover:drop-shadow-[0_0_10px_var(--cyan-dim)] transition-all">
              TECH<span className="text-[var(--text-primary)]">INTEL</span>
            </h1>
            <p className="font-mono text-[10px] text-[var(--text-muted)] mt-1 tracking-widest uppercase">
              Command Center
            </p>
          </Link>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.path || (item.path !== `/${locale}/admin` && pathname.startsWith(item.path));
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 font-mono text-xs tracking-widest rounded-lg transition-all border ${
                  isActive 
                  ? 'bg-cyan-900/20 text-[var(--cyan-bright)] border-[var(--cyan-dim)] shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' 
                  : 'text-[var(--text-secondary)] border-transparent hover:border-[var(--border-subtle)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--border-subtle)]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 font-mono text-xs tracking-widest text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            DISCONNECT
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-[var(--bg-primary)] to-[#020408]">
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: "radial-gradient(circle at 100% 0%, var(--cyan-dim) 0%, transparent 40%)" }} />
        
        {/* Top Header */}
        <header className="h-20 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/50 backdrop-blur-md px-8 flex items-center justify-between relative z-10">
           <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded border border-[var(--cyan-dim)] bg-cyan-900/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[var(--cyan-bright)] animate-pulse shadow-[0_0_8px_var(--cyan-bright)]" />
             </div>
             <div>
               <h2 className="font-mono text-sm text-[var(--text-primary)] tracking-widest">NEXUS UPLINK ESTABLISHED</h2>
               <div className="font-mono text-[10px] text-[var(--text-muted)] flex items-center gap-2">
                 <span>ENCRYPTION: AES-256</span>
                 <span>|</span>
                 <span>LATENCY: 12ms</span>
               </div>
             </div>
           </div>

           <div className="flex items-center gap-4">
             {/* Language Selector */}
             <div className="relative flex items-center">
               <select
                 value={locale}
                 onChange={(e) => router.replace(pathname, { locale: e.target.value })}
                 className="bg-cyan-900/10 border border-[var(--cyan-dim)] rounded-md px-3 py-1.5 text-xs font-mono text-[var(--cyan-bright)] outline-none cursor-pointer hover:bg-cyan-900/20 transition-all"
               >
                 <option value="tr" className="bg-[#020408] text-white">TR (Türkçe)</option>
                 <option value="en" className="bg-[#020408] text-white">EN (English)</option>
                 <option value="de" className="bg-[#020408] text-white">DE (Deutsch)</option>
                 <option value="fr" className="bg-[#020408] text-white">FR (Français)</option>
                 <option value="es" className="bg-[#020408] text-white">ES (Español)</option>
                 <option value="it" className="bg-[#020408] text-white">IT (Italiano)</option>
                 <option value="ru" className="bg-[#020408] text-white">RU (Pусский)</option>
                 <option value="zh" className="bg-[#020408] text-white">ZH (中文)</option>
                 <option value="ar" className="bg-[#020408] text-white">AR (العربية)</option>
                 <option value="ja" className="bg-[#020408] text-white">JA (日本語)</option>
               </select>
             </div>

             <ThemeToggle />

             <Link 
               href={`/${locale}/admin/new`}
               className="bg-[var(--cyan-bright)] text-[#020408] font-bold font-mono text-xs tracking-widest px-6 py-2.5 rounded shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:bg-white transition-all transform hover:-translate-y-0.5"
             >
               + INITIATE REPORT
             </Link>
           </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10 scrollbar-thin scrollbar-thumb-[var(--border-glow)] scrollbar-track-transparent">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
