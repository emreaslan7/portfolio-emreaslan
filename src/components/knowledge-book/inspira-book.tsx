'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { BookCategory, Subtopic } from './types';
import { THEME_CONFIGS } from './data';
import { DynamicIcon } from './icons';
import { BookOpen, Sparkles, ArrowUpRight, Bookmark, RotateCcw, X, CheckCircle2, Terminal } from 'lucide-react';

interface InspiraBookProps {
  book: BookCategory;
  isOpen: boolean;
  onToggleOpen: () => void;
  selectedSubtopic?: Subtopic | null;
  targetRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const InspiraBook: React.FC<InspiraBookProps> = ({
  book,
  isOpen,
  onToggleOpen,
  selectedSubtopic,
  targetRef,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const themeConfig = THEME_CONFIGS[book.theme];
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  // Mouse tilt physics for 3D hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 260, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);

  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.85 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlarePosition({ x: 50, y: 50, opacity: 0 });
  };

  const activeTopic = book.subtopics[activeChapterIndex] || book.subtopics[0];

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* 3D Perspective Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center [perspective:1400px] w-full min-h-[460px] sm:min-h-[500px]"
      >
        {/* Beam Dock Anchor Port (Spine Intake Target) */}
        <div
          ref={targetRef}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center justify-center"
        >
          <div
            className={`flex size-6 items-center justify-center rounded-full border border-white/60 ${themeConfig.accentBg} shadow-lg shadow-black/40`}
          >
            <div className="size-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ====================================================
               INSPIRA UI 3D BOOK (CLOSED STATE)
               ==================================================== */
            <motion.div
              key="inspira-closed"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ scale: 0.95, opacity: 0, rotateY: -10 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.95, opacity: 0, rotateY: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              onClick={onToggleOpen}
              className="group/book relative h-[440px] sm:h-[480px] w-[290px] sm:w-[330px] select-none cursor-pointer rounded-r-2xl rounded-l-md transition-all duration-300"
            >
              {/* Stacked Pages Thickness - Right Edge */}
              <div
                className="absolute right-0 top-3 bottom-3 w-6 bg-stone-100 dark:bg-stone-200 rounded-r-md border-y border-r border-stone-300 dark:border-stone-400 shadow-md"
                style={{
                  transform: 'translateX(16px) translateZ(-12px) rotateY(90deg)',
                  transformOrigin: 'left center',
                  backgroundImage:
                    'repeating-linear-gradient(to right, #d4d4d8 0, #f4f4f5 2px, #e4e4e7 3px)',
                }}
              />

              {/* Stacked Pages Thickness - Bottom Edge */}
              <div
                className="absolute left-4 right-0 bottom-0 h-5 bg-stone-100 dark:bg-stone-200 rounded-b-md border-x border-b border-stone-300 dark:border-stone-400 shadow-inner"
                style={{
                  transform: 'translateY(12px) translateZ(-12px) rotateX(-90deg)',
                  transformOrigin: 'top center',
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, #d4d4d8 0, #f4f4f5 2px, #e4e4e7 3px)',
                }}
              />

              {/* Back Cover Layer */}
              <div
                className="absolute inset-0 rounded-r-2xl rounded-l-md bg-stone-900 shadow-2xl"
                style={{
                  transform: 'translateZ(-16px)',
                }}
              />

              {/* Front Book Cover */}
              <div
                className={`relative h-full w-full rounded-r-2xl rounded-l-md border border-white/20 bg-linear-to-br ${themeConfig.gradientCover} p-6 text-white shadow-2xl overflow-hidden`}
                style={{
                  transform: 'translateZ(0px)',
                  transformStyle: 'preserve-3d',
                  boxShadow: `
                    inset 4px 0 10px rgba(0, 0, 0, 0.5),
                    inset -2px 0 8px rgba(255, 255, 255, 0.15),
                    0 25px 50px -15px ${themeConfig.glow},
                    0 10px 20px -5px rgba(0, 0, 0, 0.5)
                  `,
                }}
              >
                {/* Spine Fold Texture / Left Shadow Line */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-black/70 via-black/25 to-transparent border-r border-white/10 z-10 flex flex-col justify-between py-6 items-center">
                  <div className="w-0.5 h-12 bg-white/25 rounded-full" />
                  <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase rotate-90 whitespace-nowrap">
                    {book.volume}
                  </div>
                  <div className="w-0.5 h-12 bg-white/25 rounded-full" />
                </div>

                {/* Ribbon Bookmark hanging from top */}
                <div
                  className={`absolute right-8 -top-1 w-6 h-14 ${themeConfig.accentBg} shadow-md flex flex-col justify-between items-center z-10 [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]`}
                >
                  <div className="w-full h-1 bg-white/30" />
                </div>

                {/* Subtle Geometric Tech Grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Dynamic Specular Cursor Glare */}
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                  style={{
                    background: `radial-gradient(circle 280px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.28), transparent 70%)`,
                    opacity: glarePosition.opacity,
                    mixBlendMode: 'overlay',
                  }}
                />

                {/* Inner Embossed Gold/Metallic Frame */}
                <div className="pointer-events-none absolute inset-3 rounded-r-xl rounded-l-xs border border-white/20 p-2 opacity-80 group-hover/book:border-white/40 transition-colors">
                  <div className="h-full w-full rounded-r-lg border border-dashed border-white/15" />
                </div>

                {/* Cover Content */}
                <div className="relative z-10 flex h-full flex-col justify-between pl-4">
                  {/* Top Badge */}
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white/90 uppercase backdrop-blur-md border border-white/15">
                      <Sparkles className="size-3 text-amber-300" />
                      {book.volume} • {book.tagline}
                    </div>

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

                  {/* 5 Icons Row */}
                  <div className="my-auto py-3">
                    <div className="rounded-xl bg-black/30 border border-white/10 p-3 backdrop-blur-sm space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-white/60 font-mono">
                        <span>5 COMPILED CHAPTERS</span>
                        <span>{book.totalPages} PAGES</span>
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

                  {/* Bottom Author & CTA */}
                  <div className="flex items-center justify-between border-t border-white/15 pt-3">
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-white/60">AUTHOR SPEC</div>
                      <div className="text-xs font-bold text-white tracking-wide">Emre Aslan</div>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white text-stone-950 px-3 py-1.5 text-xs font-bold shadow-lg hover:bg-white/95 hover:scale-105 transition-all"
                    >
                      <span>Open Book</span>
                      <ArrowUpRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ====================================================
               INSPIRA UI 3D BOOK (OPENED SPREAD STATE)
               ==================================================== */
            <motion.div
              key="inspira-open"
              initial={{ scale: 0.94, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.94, opacity: 0, rotateY: 20 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="relative h-[480px] sm:h-[520px] w-full max-w-[580px] rounded-2xl border border-stone-800 bg-stone-950 text-stone-100 shadow-2xl overflow-hidden"
              style={{
                boxShadow: `0 25px 50px -12px ${themeConfig.glow}, 0 10px 30px -5px rgba(0, 0, 0, 0.8)`,
              }}
            >
              {/* Interior Header */}
              <div className="flex items-center justify-between border-b border-stone-800 bg-stone-900/90 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <div className={`flex size-7 items-center justify-center rounded-lg ${themeConfig.badgeBg} ${themeConfig.border} border`}>
                    <BookOpen className={`size-4 ${themeConfig.accentText}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeConfig.accentText}`}>
                        {book.volume} • TABLE OF CONTENTS
                      </span>
                      <span className="rounded-sm bg-stone-800 px-1.5 py-0.5 text-[9px] font-mono text-stone-400">
                        {book.stats.difficulty}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{book.title}</h4>
                  </div>
                </div>

                <button
                  onClick={onToggleOpen}
                  type="button"
                  className="flex size-7 items-center justify-center rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white transition-colors"
                  title="Close Book"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Interior 2-Column Split */}
              <div className="grid flex-1 grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-stone-800 h-[calc(100%-54px)]">
                {/* Chapters List */}
                <div className="md:col-span-5 flex flex-col justify-between bg-stone-950/90 p-3.5 overflow-y-auto">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2 px-1">
                      Curated Chapters ({book.subtopics.length})
                    </div>

                    {book.subtopics.map((topic, i) => {
                      const isActive = activeChapterIndex === i;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => setActiveChapterIndex(i)}
                          type="button"
                          className={`w-full flex items-center justify-between rounded-xl p-2 text-left transition-all duration-200 border ${
                            isActive
                              ? `${themeConfig.badgeBg} ${themeConfig.border} border text-white shadow-xs`
                              : 'border-transparent text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`flex size-5.5 shrink-0 items-center justify-center rounded-md text-[10px] font-mono font-bold ${
                                isActive
                                  ? `${themeConfig.accentBg} text-stone-950`
                                  : 'bg-stone-900 text-stone-400'
                              }`}
                            >
                              0{i + 1}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold truncate">{topic.title}</div>
                              <div className="text-[9px] text-stone-400 truncate">{topic.badge}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 rounded-xl border border-stone-800/80 bg-stone-900/50 p-2.5 text-[10px] text-stone-400">
                    <div className="flex justify-between items-center font-mono mb-1">
                      <span>EST. READ: {book.stats.readTime}</span>
                      <span>{book.totalPages} PAGES</span>
                    </div>
                    <p className="line-clamp-2 text-stone-400 text-[10px]">
                      {book.description}
                    </p>
                  </div>
                </div>

                {/* Chapter Deep Dive */}
                <div className="md:col-span-7 flex flex-col justify-between bg-stone-900/40 p-4 overflow-y-auto">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold ${themeConfig.badgeBg} ${themeConfig.badgeText} border ${themeConfig.border}`}>
                          <DynamicIcon name={activeTopic.iconName} className="size-3" />
                          {activeTopic.badge}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 uppercase">
                          CHAPTER 0{activeChapterIndex + 1}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight">{activeTopic.title}</h3>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">{activeTopic.summary}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[9px] font-mono uppercase tracking-wider text-stone-400">
                        Key Concepts
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {activeTopic.keyConcepts.map((concept, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 rounded-md bg-stone-800/80 border border-stone-700/60 px-1.5 py-0.5 text-[9px] text-stone-200"
                          >
                            <CheckCircle2 className={`size-2.5 ${themeConfig.accentText}`} />
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>

                    {activeTopic.codeSnippet && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[9px] font-mono text-stone-400">
                          <span className="flex items-center gap-1">
                            <Terminal className="size-3 text-stone-400" />
                            SYNTAX SPEC
                          </span>
                          <span className="text-stone-400">Python 3.12+</span>
                        </div>
                        <div className="rounded-lg border border-stone-800 bg-stone-950 p-2 font-mono text-[10px] text-emerald-400/90 overflow-x-auto leading-relaxed shadow-inner">
                          <pre>
                            <code>{activeTopic.codeSnippet}</code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {activeTopic.formula && (
                      <div className="rounded-lg border border-stone-800/80 bg-stone-950/60 p-2">
                        <div className="text-[8px] font-mono uppercase text-stone-400 mb-0.5">
                          Formulation
                        </div>
                        <div className="font-mono text-[11px] text-amber-300/90 tracking-wide">
                          {activeTopic.formula}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-800/80 pt-2.5 mt-2">
                    <button
                      onClick={onToggleOpen}
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
                    >
                      <RotateCcw className="size-3" />
                      Flip to Cover
                    </button>

                    <div className="text-[10px] font-mono text-stone-400">
                      0{activeChapterIndex + 1} / 0{book.subtopics.length}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Prompt */}
      <button
        onClick={onToggleOpen}
        type="button"
        className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold shadow-xs transition-all duration-200 ${
          isOpen
            ? 'border-border bg-background hover:bg-muted text-foreground'
            : `${themeConfig.badgeBg} ${themeConfig.border} ${themeConfig.accentText} hover:scale-105 hover:shadow-md`
        }`}
      >
        {isOpen ? (
          <>
            <RotateCcw className="size-3.5" />
            Close Book & View 3D Cover
          </>
        ) : (
          <>
            <BookOpen className="size-3.5" />
            Click Book to Open Table of Contents
          </>
        )}
      </button>
    </div>
  );
};
