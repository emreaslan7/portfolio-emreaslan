'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookCategory, Subtopic } from './types';
import { THEME_CONFIGS } from './data';
import { DynamicIcon } from './icons';
import {
  BookOpen,
  X,
  Sparkles,
  Code2,
  Bookmark,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Hash,
  Terminal,
} from 'lucide-react';

interface Book3DInteriorProps {
  book: BookCategory;
  onClose: () => void;
  selectedSubtopic?: Subtopic | null;
}

export const Book3DInterior: React.FC<Book3DInteriorProps> = ({
  book,
  onClose,
  selectedSubtopic,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(
    selectedSubtopic
      ? Math.max(
          0,
          book.subtopics.findIndex((s) => s.id === selectedSubtopic.id)
        )
      : 0
  );

  const themeConfig = THEME_CONFIGS[book.theme];
  const activeTopic = book.subtopics[activeChapterIndex] || book.subtopics[0];

  return (
    <div
      className="relative flex h-full w-full flex-col rounded-2xl border border-stone-800 bg-stone-950 text-stone-100 shadow-2xl overflow-hidden"
      style={{
        boxShadow: `0 25px 50px -12px ${themeConfig.glow}, 0 10px 30px -5px rgba(0, 0, 0, 0.8)`,
      }}
    >
      {/* Top Interior Header Bar */}
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
          onClick={onClose}
          type="button"
          className="flex size-7 items-center justify-center rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white transition-colors"
          title="Close / Flip Book"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Main 2-Column Split: Chapter Index (Left) & Deep Dive Viewer (Right) */}
      <div className="grid flex-1 grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-stone-800">
        {/* Left Column: 5 Chapters List (4 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between bg-stone-950/80 p-3.5 overflow-y-auto">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2 px-1">
              Curated Chapters ({book.subtopics.length})
            </div>

            <div className="space-y-1.5">
              {book.subtopics.map((topic, i) => {
                const isActive = activeChapterIndex === i;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveChapterIndex(i)}
                    type="button"
                    className={`w-full flex items-center justify-between rounded-xl p-2.5 text-left transition-all duration-200 border ${
                      isActive
                        ? `${themeConfig.badgeBg} ${themeConfig.border} border text-white shadow-xs`
                        : 'border-transparent text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-mono font-bold ${
                          isActive
                            ? `${themeConfig.accentBg} text-stone-950`
                            : 'bg-stone-900 text-stone-400'
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{topic.title}</div>
                        <div className="text-[10px] text-stone-400 truncate">{topic.badge}</div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`size-3.5 shrink-0 transition-transform ${
                        isActive ? `${themeConfig.accentText} translate-x-0.5` : 'text-stone-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Book Spec Footer */}
          <div className="mt-3 rounded-xl border border-stone-800/80 bg-stone-900/50 p-2.5 text-[11px] text-stone-400">
            <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 mb-1">
              <span>EST. READ: {book.stats.readTime}</span>
              <span>{book.totalPages} PAGES</span>
            </div>
            <p className="line-clamp-2 text-stone-400 text-[10px]">
              {book.description}
            </p>
          </div>
        </div>

        {/* Right Column: Selected Chapter Deep Dive (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between bg-stone-900/40 p-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-3.5"
            >
              {/* Chapter Header */}
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
                <h3 className="text-lg font-bold text-white tracking-tight">{activeTopic.title}</h3>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">{activeTopic.summary}</p>
              </div>

              {/* Key Concept Chips */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  Key Architectural Concepts
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeTopic.keyConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-md bg-stone-800/80 border border-stone-700/60 px-2 py-1 text-[10px] text-stone-200"
                    >
                      <CheckCircle2 className={`size-2.5 ${themeConfig.accentText}`} />
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code Snippet Box */}
              {activeTopic.codeSnippet && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span className="flex items-center gap-1">
                      <Terminal className="size-3 text-stone-400" />
                      SYNTAX / KERNEL SPEC
                    </span>
                    <span className="text-stone-400">Python 3.12+</span>
                  </div>
                  <div className="rounded-lg border border-stone-800 bg-stone-950 p-2.5 font-mono text-[11px] text-emerald-400/90 overflow-x-auto leading-relaxed shadow-inner">
                    <pre>
                      <code>{activeTopic.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Mathematical Formulation */}
              {activeTopic.formula && (
                <div className="rounded-lg border border-stone-800/80 bg-stone-950/60 p-2.5">
                  <div className="text-[9px] font-mono uppercase text-stone-400 mb-1">
                    Mathematical Formulation
                  </div>
                  <div className="font-mono text-xs text-amber-300/90 tracking-wide">
                    {activeTopic.formula}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action Bar */}
          <div className="flex items-center justify-between border-t border-stone-800/80 pt-3 mt-3">
            <button
              onClick={onClose}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
            >
              <RotateCcw className="size-3.5" />
              Flip to 3D Cover
            </button>

            <div className="text-[10px] font-mono text-stone-400">
              0{activeChapterIndex + 1} / 0{book.subtopics.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
