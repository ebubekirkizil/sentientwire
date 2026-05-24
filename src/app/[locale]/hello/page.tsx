"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

export default function HelloPage() {
  return (
    <div className="relative min-h-screen bg-[#020408] flex items-center justify-center overflow-hidden font-sans">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 relative inline-block"
        >
          {/* Glowing Orb */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 blur-sm animate-pulse" />
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-400 flex items-center justify-center border border-white/20">
            <span className="text-3xl">👋</span>
          </div>
          <div className="absolute -inset-4 rounded-full border border-cyan-500/20 animate-[spin_10s_linear_infinite]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tighter"
        >
          HELLO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">WORLD</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed font-light"
        >
          Welcome to the next generation of news intelligence. 
          Everything is set up and ready for exploration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">BACK TO HOME</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg 
              className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 2 }}
          className="mt-20 flex justify-center gap-8 text-[10px] tracking-[0.3em] text-cyan-500 font-mono uppercase"
        >
          <span>System Online</span>
          <span>•</span>
          <span>Ready for Deployment</span>
          <span>•</span>
          <span>V2.4.0</span>
        </motion.div>
      </div>
    </div>
  );
}
