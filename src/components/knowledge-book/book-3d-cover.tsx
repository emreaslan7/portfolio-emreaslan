'use client';

import React from 'react';
import { BookCategory } from './types';
import { THEME_CONFIGS } from './data';
import { BookOpen, Sparkles, Binary, Award, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { DynamicIcon } from './icons';

interface Book3DCoverProps {
  book: BookCategory;
  glarePosition: { x: number; y: number; opacity: number };
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const Book3DCover: React.FC<Book3DCoverProps> = ({
  book,
  glarePosition,
  isOpen,
  onToggleOpen,
}) => {
  const themeConfig = THEME_CONFIGS[book.theme];

  return (
    <div
      onClick={onToggleOpen}
      className={`group relative h-full w-full select-none cursor-pointer rounded-r-2xl rounded-l-md border border-white/20 bg-linear-to-br ${themeConfig.gradientCover} p-6 text-white shadow-2xl transition-all duration-300 overflow-hidden`}
      style={{
        boxShadow: `
          inset 4px 0 10px rgba(0, 0, 0, 0.5),
          inset -2px 0 8px rgba(255, 255, 255, 0.15),
          0 20px 40px -15px ${themeConfig.glow},
          0 10px 20px -5px rgba(0, 0, 0, 0.4)
        `,
      }}
    >
      {/* 1. Spine Simulation / Left Crease Shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-7 bg-linear-to-r from-black/60 via-black/20 to-transparent border-r border-white/10 z-10 flex flex-col justify-between py-6 items-center">
        <div className="w-0.5 h-12 bg-white/20 rounded-full" />
        <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase rotate-90 whitespace-nowrap">
          {book.volume}
        </div>
        <div className="w-0.5 h-12 bg-white/20 rounded-full" />
      </div>

      {/* 2. Geometric Tech Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* 3. Dynamic Cursor Glare / Light Reflection */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle 280px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.28), transparent 70%)`,
          opacity: glarePosition.opacity,
          mixBlendMode: 'overlay',
        }}
      />

      {/* 4. Gold / Metallic Embossed Frame Border */}
      <div className="pointer-events-none absolute inset-3 rounded-r-xl rounded-l-xs border border-white/20 p-2 opacity-80 group-hover:border-white/40 transition-colors">
        <div className="h-full w-full rounded-r-lg border border-dashed border-white/15" />
      </div>

      {/* 5. Main Cover Content */}
      <div className="relative z-10 flex h-full flex-col justify-between pl-4">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white/90 uppercase backdrop-blur-md border border-white/15">
              <Sparkles className="size-3 text-amber-300" />
              {book.volume} • {book.tagline}
            </div>

            <div className="size-7 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xs border border-white/20">
              <BookOpen className="size-3.5 text-white/90" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="mt-8 space-y-2">
            <div className="inline-block text-[11px] font-mono tracking-widest text-white/70 uppercase">
              {book.edition}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight drop-shadow-md">
              {book.title}
            </h3>
            <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
              {book.subtitle}
            </p>
          </div>
        </div>

        {/* Middle Feature Highlights Visual */}
        <div className="my-auto py-4">
          <div className="rounded-xl bg-black/30 border border-white/10 p-3 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-[10px] text-white/60 font-mono">
              <span>5 CURATED PILLARS</span>
              <span>INDEXED & COMPILED</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {book.subtopics.map((st, i) => (
                <div
                  key={st.id}
                  title={st.title}
                  className="flex flex-col items-center justify-center rounded-lg bg-white/10 hover:bg-white/25 transition-colors p-1.5 border border-white/10 text-white"
                >
                  <DynamicIcon name={st.iconName} className="size-3.5" />
                  <span className="text-[8px] font-bold mt-1 opacity-80">0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Open CTA */}
        <div>
          <div className="flex items-center justify-between border-t border-white/15 pt-3">
            <div>
              <div className="text-[9px] font-mono uppercase tracking-wider text-white/60">AUTHOR SPEC</div>
              <div className="text-xs font-bold text-white tracking-wide">Emre Aslan</div>
            </div>

            <button
              type="button"
              className="group/btn inline-flex items-center gap-1.5 rounded-full bg-white text-stone-950 px-3 py-1.5 text-xs font-bold shadow-lg hover:bg-white/95 hover:scale-105 transition-all"
            >
              <span>{isOpen ? 'Close' : 'Open Index'}</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
