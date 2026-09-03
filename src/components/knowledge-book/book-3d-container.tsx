'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { BookCategory, Subtopic } from './types';
import { THEME_CONFIGS } from './data';
import { Book3DCover } from './book-3d-cover';
import { Book3DInterior } from './book-3d-interior';
import { BookOpen, Sparkles, RotateCcw, Maximize2 } from 'lucide-react';

interface Book3DContainerProps {
  book: BookCategory;
  isOpen: boolean;
  onToggleOpen: () => void;
  selectedSubtopic?: Subtopic | null;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

export const Book3DContainer: React.FC<Book3DContainerProps> = ({
  book,
  isOpen,
  onToggleOpen,
  selectedSubtopic,
  targetRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const themeConfig = THEME_CONFIGS[book.theme];

  // Mouse tilt spring values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

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
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.9 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlarePosition({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* 3D Book Stage Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center [perspective:1400px] w-full max-w-[440px] md:max-w-[540px] min-h-[460px] sm:min-h-[500px]"
      >
        {/* Beam Dock Anchor Port (Spine Intake Target) */}
        <div
          ref={targetRef}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center justify-center"
        >
          <div
            className={`flex size-6 items-center justify-center rounded-full border border-white/40 ${themeConfig.accentBg} shadow-lg shadow-black/50`}
          >
            <div className="size-2 rounded-full bg-white animate-pulse" />
          </div>
          <span className="mt-1 text-[9px] font-mono text-muted-foreground uppercase tracking-widest hidden sm:block">
            INLET
          </span>
        </div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ====================================================
               CLOSED 3D BOOK STATE (Tilt, Spine, Multi-Layer Pages)
               ==================================================== */
            <motion.div
              key="closed-book"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ scale: 0.95, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.95, opacity: 0, rotateY: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="relative h-[440px] sm:h-[480px] w-[310px] sm:w-[340px] rounded-r-2xl rounded-l-md transition-shadow duration-300"
            >
              {/* Stacked Page Thickness (Right Edge 3D Effect) */}
              <div
                className="absolute right-0 top-3 bottom-3 w-5 bg-stone-100 dark:bg-stone-200 rounded-r-md border-y border-r border-stone-300 dark:border-stone-400 shadow-md"
                style={{
                  transform: 'translateX(14px) translateZ(-10px) rotateY(90deg)',
                  transformOrigin: 'left center',
                  backgroundImage:
                    'repeating-linear-gradient(to right, #d4d4d8 0, #f4f4f5 2px, #e4e4e7 3px)',
                }}
              />

              {/* Stacked Page Thickness (Bottom Edge 3D Effect) */}
              <div
                className="absolute left-4 right-0 bottom-0 h-4 bg-stone-100 dark:bg-stone-200 rounded-b-md border-x border-b border-stone-300 dark:border-stone-400 shadow-inner"
                style={{
                  transform: 'translateY(10px) translateZ(-10px) rotateX(-90deg)',
                  transformOrigin: 'top center',
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, #d4d4d8 0, #f4f4f5 2px, #e4e4e7 3px)',
                }}
              />

              {/* Back Cover Layer */}
              <div
                className="absolute inset-0 rounded-r-2xl rounded-l-md bg-stone-900 shadow-2xl"
                style={{
                  transform: 'translateZ(-14px)',
                }}
              />

              {/* Front Cover Interactive 3D Component */}
              <div
                className="relative h-full w-full rounded-r-2xl rounded-l-md"
                style={{
                  transform: 'translateZ(0px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <Book3DCover
                  book={book}
                  glarePosition={glarePosition}
                  isOpen={isOpen}
                  onToggleOpen={onToggleOpen}
                />
              </div>
            </motion.div>
          ) : (
            /* ====================================================
               OPEN 3D BOOK STATE (2-Page Table of Contents Interior)
               ==================================================== */
            <motion.div
              key="open-book"
              initial={{ scale: 0.92, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.92, opacity: 0, rotateY: 30 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="relative h-[480px] sm:h-[520px] w-full max-w-[540px] rounded-2xl"
            >
              <Book3DInterior
                book={book}
                onClose={onToggleOpen}
                selectedSubtopic={selectedSubtopic}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Bottom Control Prompt */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={onToggleOpen}
          type="button"
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold shadow-xs transition-all duration-200 ${
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
    </div>
  );
};
