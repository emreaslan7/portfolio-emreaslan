'use client';

import React, { forwardRef, useRef } from 'react';
import { motion, useTransform, MotionValue } from 'motion/react';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { Book, BookTitle, BookDescription } from '@/components/ui/book';
import { DynamicIcon } from './icons';
import { KNOWLEDGE_BOOKS } from './data';
import { cn } from '@/lib/utils';

interface IngestingPillNodeProps {
  label: string;
  iconName: string;
  pillClasses?: string;
  iconClasses?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetYDelta?: number;
  className?: string;
}

const IngestingPillNode = forwardRef<HTMLDivElement, IngestingPillNodeProps>(
  (
    {
      label,
      iconName,
      pillClasses = 'border-border/80 bg-background/95 dark:bg-card/90',
      iconClasses = 'bg-muted/80 text-foreground ring-1 ring-border/80',
      progress,
      range,
      targetYDelta = 210,
      className = '',
    },
    ref
  ) => {
    // Scroll-driven motion downwards into the book
    const y = useTransform(progress, range, [0, targetYDelta]);
    const scale = useTransform(progress, [range[0], range[1] * 0.88, range[1]], [1, 0.9, 0.1]);
    const opacity = useTransform(progress, [range[0], range[1] * 0.92, range[1]], [1, 0.95, 0]);

    return (
      <motion.div
        style={{ y, scale, opacity }}
        className={cn('flex items-center group relative will-change-transform z-10', className)}
      >
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full border backdrop-blur-md shadow-2xs hover:shadow-xs transition-all duration-200 select-none cursor-default',
            pillClasses
          )}
        >
          <div className={cn('flex size-4 sm:size-4.5 shrink-0 items-center justify-center rounded-full transition-colors', iconClasses)}>
            <DynamicIcon name={iconName} className="size-2.5 sm:size-3" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium tracking-tight text-foreground/90 whitespace-nowrap pr-0.5">
            {label}
          </span>
        </div>
      </motion.div>
    );
  }
);

IngestingPillNode.displayName = 'IngestingPillNode';

interface BookCardSectionProps {
  progress: MotionValue<number>;
}

export const BookCardSection: React.FC<BookCardSectionProps> = ({ progress }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. AI: Warm Mocha / Espresso Taupe (Distinct & clear)
  const aiPill =
    'border-[#a87954]/65 hover:border-[#c29b7f] dark:border-[#c29b7f]/50 dark:hover:border-[#deb89a] bg-[#a87954]/12 hover:bg-[#a87954]/20 dark:bg-[#a87954]/18 dark:hover:bg-[#a87954]/28';
  const aiIcon =
    'bg-[#a87954]/25 text-[#784f31] dark:text-[#f5e3d5] ring-1 ring-[#a87954]/40';

  // 2. Cryptomath: Haki / Canlı Haki Yeşili (Distinct & clear)
  const cryptoPill =
    'border-[#658b4e]/65 hover:border-[#82ad66] dark:border-[#82ad66]/50 dark:hover:border-[#a0cb84] bg-[#658b4e]/12 hover:bg-[#658b4e]/20 dark:bg-[#658b4e]/18 dark:hover:bg-[#658b4e]/28';
  const cryptoIcon =
    'bg-[#658b4e]/25 text-[#3d5c2a] dark:text-[#d7f0c7] ring-1 ring-[#658b4e]/40';

  // 3. Software: Çelik Gri - Siyah (Slate Zinc - Distinct & clear)
  const softwarePill =
    'border-slate-400/65 hover:border-slate-300 dark:border-slate-400/50 dark:hover:border-slate-200 bg-slate-500/12 hover:bg-slate-500/20 dark:bg-slate-400/18 dark:hover:bg-slate-400/28';
  const softwareIcon =
    'bg-slate-500/25 text-slate-800 dark:text-slate-100 ring-1 ring-slate-400/40';

  // Amber Refs (ai.emreaslan.dev - 7 Nodes)
  const a1Ref = useRef<HTMLDivElement>(null);
  const a2Ref = useRef<HTMLDivElement>(null);
  const a3Ref = useRef<HTMLDivElement>(null);
  const a4Ref = useRef<HTMLDivElement>(null);
  const a5Ref = useRef<HTMLDivElement>(null);
  const a6Ref = useRef<HTMLDivElement>(null);
  const a7Ref = useRef<HTMLDivElement>(null);
  const amberBookRef = useRef<HTMLDivElement>(null);

  // Emerald Refs (cryptomath.emreaslan.dev - 7 Nodes)
  const e1Ref = useRef<HTMLDivElement>(null);
  const e2Ref = useRef<HTMLDivElement>(null);
  const e3Ref = useRef<HTMLDivElement>(null);
  const e4Ref = useRef<HTMLDivElement>(null);
  const e5Ref = useRef<HTMLDivElement>(null);
  const e6Ref = useRef<HTMLDivElement>(null);
  const e7Ref = useRef<HTMLDivElement>(null);
  const emeraldBookRef = useRef<HTMLDivElement>(null);

  // Violet Refs (software.emreaslan.dev - 7 Nodes)
  const v1Ref = useRef<HTMLDivElement>(null);
  const v2Ref = useRef<HTMLDivElement>(null);
  const v3Ref = useRef<HTMLDivElement>(null);
  const v4Ref = useRef<HTMLDivElement>(null);
  const v5Ref = useRef<HTMLDivElement>(null);
  const v6Ref = useRef<HTMLDivElement>(null);
  const v7Ref = useRef<HTMLDivElement>(null);
  const violetBookRef = useRef<HTMLDivElement>(null);

  // Shared beam opacities across 7 tiers
  const beam1Opacity = useTransform(progress, [0.05, 0.40], [1, 0]);
  const beam2Opacity = useTransform(progress, [0.10, 0.45], [1, 0]);
  const beam3Opacity = useTransform(progress, [0.15, 0.50], [1, 0]);
  const beam4Opacity = useTransform(progress, [0.20, 0.55], [1, 0]);
  const beam5Opacity = useTransform(progress, [0.25, 0.60], [1, 0]);
  const beam6Opacity = useTransform(progress, [0.30, 0.65], [1, 0]);
  const beam7Opacity = useTransform(progress, [0.35, 0.70], [1, 0]);

  const bookScale = useTransform(progress, [0, 0.4, 0.8, 1], [1, 1.04, 1.04, 1]);

  const book1 = KNOWLEDGE_BOOKS[0]; // ai.emreaslan.dev
  const book2 = KNOWLEDGE_BOOKS[1]; // cryptomath.emreaslan.dev
  const book3 = KNOWLEDGE_BOOKS[2]; // software.emreaslan.dev

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-between min-h-[500px] sm:min-h-[580px] w-full max-w-2xl mx-auto p-1 sm:p-2"
    >
      {/* =========================================================================
          TOP CONSTELLATION: Generous Vertical Spacing between Subtitle and Books
          ========================================================================= */}
      <div className="w-full max-w-xl mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 z-10 pt-1 sm:pt-2 pb-4 sm:pb-8">
        {/* Tier 1 */}
        <IngestingPillNode
          ref={a1Ref}
          label={book1.subtopics[0].title}
          iconName={book1.subtopics[0].iconName}
          pillClasses={aiPill}
          iconClasses={aiIcon}
          progress={progress}
          range={[0.05, 0.40]}
          targetYDelta={215}
        />
        <IngestingPillNode
          ref={e1Ref}
          label={book2.subtopics[0].title}
          iconName={book2.subtopics[0].iconName}
          pillClasses={cryptoPill}
          iconClasses={cryptoIcon}
          progress={progress}
          range={[0.05, 0.40]}
          targetYDelta={215}
        />
        <IngestingPillNode
          ref={v1Ref}
          label={book3.subtopics[0].title}
          iconName={book3.subtopics[0].iconName}
          pillClasses={softwarePill}
          iconClasses={softwareIcon}
          progress={progress}
          range={[0.05, 0.40]}
          targetYDelta={215}
        />

        {/* Tier 2 */}
        <IngestingPillNode
          ref={a2Ref}
          label={book1.subtopics[1].title}
          iconName={book1.subtopics[1].iconName}
          pillClasses={aiPill}
          iconClasses={aiIcon}
          progress={progress}
          range={[0.10, 0.45]}
          targetYDelta={190}
        />
        <IngestingPillNode
          ref={v2Ref}
          label={book3.subtopics[1].title}
          iconName={book3.subtopics[1].iconName}
          pillClasses={softwarePill}
          iconClasses={softwareIcon}
          progress={progress}
          range={[0.10, 0.45]}
          targetYDelta={190}
        />
        <IngestingPillNode
          ref={e2Ref}
          label={book2.subtopics[1].title}
          iconName={book2.subtopics[1].iconName}
          pillClasses={cryptoPill}
          iconClasses={cryptoIcon}
          progress={progress}
          range={[0.10, 0.45]}
          targetYDelta={190}
        />

        {/* Tier 3 */}
        <IngestingPillNode
          ref={e3Ref}
          label={book2.subtopics[2].title}
          iconName={book2.subtopics[2].iconName}
          pillClasses={cryptoPill}
          iconClasses={cryptoIcon}
          progress={progress}
          range={[0.15, 0.50]}
          targetYDelta={165}
        />
        <IngestingPillNode
          ref={a3Ref}
          label={book1.subtopics[2].title}
          iconName={book1.subtopics[2].iconName}
          pillClasses={aiPill}
          iconClasses={aiIcon}
          progress={progress}
          range={[0.15, 0.50]}
          targetYDelta={165}
        />
        <IngestingPillNode
          ref={v3Ref}
          label={book3.subtopics[2].title}
          iconName={book3.subtopics[2].iconName}
          pillClasses={softwarePill}
          iconClasses={softwareIcon}
          progress={progress}
          range={[0.15, 0.50]}
          targetYDelta={165}
        />

        {/* Tier 4 */}
        <IngestingPillNode
          ref={a4Ref}
          label={book1.subtopics[3].title}
          iconName={book1.subtopics[3].iconName}
          pillClasses={aiPill}
          iconClasses={aiIcon}
          progress={progress}
          range={[0.20, 0.55]}
          targetYDelta={140}
        />
        <IngestingPillNode
          ref={v4Ref}
          label={book3.subtopics[3].title}
          iconName={book3.subtopics[3].iconName}
          pillClasses={softwarePill}
          iconClasses={softwareIcon}
          progress={progress}
          range={[0.20, 0.55]}
          targetYDelta={140}
        />
        <IngestingPillNode
          ref={e4Ref}
          label={book2.subtopics[3].title}
          iconName={book2.subtopics[3].iconName}
          pillClasses={cryptoPill}
          iconClasses={cryptoIcon}
          progress={progress}
          range={[0.20, 0.55]}
          targetYDelta={140}
        />

        {/* Tier 5 */}
        <IngestingPillNode
          ref={a5Ref}
          label={book1.subtopics[4].title}
          iconName={book1.subtopics[4].iconName}
          pillClasses={aiPill}
          iconClasses={aiIcon}
          progress={progress}
          range={[0.25, 0.60]}
          targetYDelta={120}
        />
        <IngestingPillNode
          ref={e5Ref}
          label={book2.subtopics[4].title}
          iconName={book2.subtopics[4].iconName}
          pillClasses={cryptoPill}
          iconClasses={cryptoIcon}
          progress={progress}
          range={[0.25, 0.60]}
          targetYDelta={120}
        />
        <IngestingPillNode
          ref={v5Ref}
          label={book3.subtopics[4].title}
          iconName={book3.subtopics[4].iconName}
          pillClasses={softwarePill}
          iconClasses={softwareIcon}
          progress={progress}
          range={[0.25, 0.60]}
          targetYDelta={120}
        />

        {/* Tier 6 */}
        <IngestingPillNode
          ref={a6Ref}
          label={book1.subtopics[5].title}
          iconName={book1.subtopics[5].iconName}
          pillClasses={aiPill}
          iconClasses={aiIcon}
          progress={progress}
          range={[0.30, 0.65]}
          targetYDelta={100}
        />
        <IngestingPillNode
          ref={e6Ref}
          label={book2.subtopics[5].title}
          iconName={book2.subtopics[5].iconName}
          pillClasses={cryptoPill}
          iconClasses={cryptoIcon}
          progress={progress}
          range={[0.30, 0.65]}
          targetYDelta={100}
        />
        <IngestingPillNode
          ref={v6Ref}
          label={book3.subtopics[5].title}
          iconName={book3.subtopics[5].iconName}
          pillClasses={softwarePill}
          iconClasses={softwareIcon}
          progress={progress}
          range={[0.30, 0.65]}
          targetYDelta={100}
        />

        {/* Tier 7 */}
        <IngestingPillNode
          ref={a7Ref}
          label={book1.subtopics[6].title}
          iconName={book1.subtopics[6].iconName}
          pillClasses={aiPill}
          iconClasses={aiIcon}
          progress={progress}
          range={[0.35, 0.70]}
          targetYDelta={80}
        />
        <IngestingPillNode
          ref={e7Ref}
          label={book2.subtopics[6].title}
          iconName={book2.subtopics[6].iconName}
          pillClasses={cryptoPill}
          iconClasses={cryptoIcon}
          progress={progress}
          range={[0.35, 0.70]}
          targetYDelta={80}
        />
        <IngestingPillNode
          ref={v7Ref}
          label={book3.subtopics[6].title}
          iconName={book3.subtopics[6].iconName}
          pillClasses={softwarePill}
          iconClasses={softwareIcon}
          progress={progress}
          range={[0.35, 0.70]}
          targetYDelta={80}
        />
      </div>

      {/* =========================================================================
          BOTTOM BOOKS: 3 Clean Obsidian Books with Custom Bookmark Ribbons (Kitap Ayracı)
          ========================================================================= */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 z-10 pb-2 sm:pb-3 mt-auto px-1">
        {/* Book 1 (ai.emreaslan.dev - Espresso Mocha Ribbon) */}
        <motion.div style={{ scale: bookScale, transformStyle: 'preserve-3d' }} ref={amberBookRef}>
          <a href="https://ai.emreaslan.dev" target="_blank" rel="noopener noreferrer" className="block group">
            <div className="block sm:hidden">
              <Book size="xs" ribbonColor="#c29b7f">
                <BookTitle>{book1.title}</BookTitle>
                <BookDescription>Machine Learning</BookDescription>
              </Book>
            </div>
            <div className="hidden sm:block">
              <Book size="sm" ribbonColor="#c29b7f">
                <BookTitle>{book1.title}</BookTitle>
                <BookDescription>Machine Learning Notes</BookDescription>
              </Book>
            </div>
          </a>
        </motion.div>

        {/* Book 2 (cryptomath.emreaslan.dev - Khaki Olive Ribbon) */}
        <motion.div style={{ scale: bookScale, transformStyle: 'preserve-3d' }} ref={emeraldBookRef}>
          <a href="https://cryptomath.emreaslan.dev" target="_blank" rel="noopener noreferrer" className="block group">
            <div className="block sm:hidden">
              <Book size="xs" ribbonColor="#82ad66">
                <BookTitle>{book2.title}</BookTitle>
                <BookDescription>Number Theory & ZKP</BookDescription>
              </Book>
            </div>
            <div className="hidden sm:block">
              <Book size="sm" ribbonColor="#82ad66">
                <BookTitle>{book2.title}</BookTitle>
                <BookDescription>Number Theory & ZKP</BookDescription>
              </Book>
            </div>
          </a>
        </motion.div>

        {/* Book 3 (software.emreaslan.dev - Titanium Slate Ribbon) */}
        <motion.div style={{ scale: bookScale, transformStyle: 'preserve-3d' }} ref={violetBookRef}>
          <a href="https://software.emreaslan.dev" target="_blank" rel="noopener noreferrer" className="block group">
            <div className="block sm:hidden">
              <Book size="xs" ribbonColor="#94a3b8">
                <BookTitle>{book3.title}</BookTitle>
                <BookDescription>Systems & Web3</BookDescription>
              </Book>
            </div>
            <div className="hidden sm:block">
              <Book size="sm" ribbonColor="#94a3b8">
                <BookTitle>{book3.title}</BookTitle>
                <BookDescription>Systems & Web3</BookDescription>
              </Book>
            </div>
          </a>
        </motion.div>
      </div>

      {/* =========================================================================
          21 COLOR-HARMONIZED FIBER-OPTIC ANIMATED BEAMS (7 per book)
          ========================================================================= */}
      {/* 7 Beams -> Book 1 (ai.emreaslan.dev - Mocha Stream) */}
      <motion.div style={{ opacity: beam1Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={a1Ref} toRef={amberBookRef} curvature={-25} endYOffset={-40} gradientStartColor="#c29b7f" gradientStopColor="#784f31" pathColor="#a87954" pathOpacity={0.15} duration={4} />
      </motion.div>
      <motion.div style={{ opacity: beam2Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={a2Ref} toRef={amberBookRef} curvature={-18} endYOffset={-40} gradientStartColor="#c29b7f" gradientStopColor="#784f31" pathColor="#a87954" pathOpacity={0.15} duration={4.2} delay={0.3} />
      </motion.div>
      <motion.div style={{ opacity: beam3Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={a3Ref} toRef={amberBookRef} curvature={-10} endYOffset={-40} gradientStartColor="#c29b7f" gradientStopColor="#784f31" pathColor="#a87954" pathOpacity={0.15} duration={4.4} delay={0.6} />
      </motion.div>
      <motion.div style={{ opacity: beam4Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={a4Ref} toRef={amberBookRef} curvature={0} endYOffset={-40} gradientStartColor="#c29b7f" gradientStopColor="#784f31" pathColor="#a87954" pathOpacity={0.15} duration={4.2} delay={0.9} />
      </motion.div>
      <motion.div style={{ opacity: beam5Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={a5Ref} toRef={amberBookRef} curvature={10} endYOffset={-40} gradientStartColor="#c29b7f" gradientStopColor="#784f31" pathColor="#a87954" pathOpacity={0.15} duration={4} delay={1.2} />
      </motion.div>
      <motion.div style={{ opacity: beam6Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={a6Ref} toRef={amberBookRef} curvature={18} endYOffset={-40} gradientStartColor="#c29b7f" gradientStopColor="#784f31" pathColor="#a87954" pathOpacity={0.15} duration={4.2} delay={1.5} />
      </motion.div>
      <motion.div style={{ opacity: beam7Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={a7Ref} toRef={amberBookRef} curvature={25} endYOffset={-40} gradientStartColor="#c29b7f" gradientStopColor="#784f31" pathColor="#a87954" pathOpacity={0.15} duration={4.4} delay={1.8} />
      </motion.div>

      {/* 7 Beams -> Book 2 (cryptomath.emreaslan.dev - Khaki Olive Stream) */}
      <motion.div style={{ opacity: beam1Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={e1Ref} toRef={emeraldBookRef} curvature={-25} endYOffset={-40} gradientStartColor="#82ad66" gradientStopColor="#3d5c2a" pathColor="#658b4e" pathOpacity={0.15} duration={4} />
      </motion.div>
      <motion.div style={{ opacity: beam2Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={e2Ref} toRef={emeraldBookRef} curvature={-18} endYOffset={-40} gradientStartColor="#82ad66" gradientStopColor="#3d5c2a" pathColor="#658b4e" pathOpacity={0.15} duration={4.2} delay={0.3} />
      </motion.div>
      <motion.div style={{ opacity: beam3Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={e3Ref} toRef={emeraldBookRef} curvature={-10} endYOffset={-40} gradientStartColor="#82ad66" gradientStopColor="#3d5c2a" pathColor="#658b4e" pathOpacity={0.15} duration={4.4} delay={0.6} />
      </motion.div>
      <motion.div style={{ opacity: beam4Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={e4Ref} toRef={emeraldBookRef} curvature={0} endYOffset={-40} gradientStartColor="#82ad66" gradientStopColor="#3d5c2a" pathColor="#658b4e" pathOpacity={0.15} duration={4.2} delay={0.9} />
      </motion.div>
      <motion.div style={{ opacity: beam5Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={e5Ref} toRef={emeraldBookRef} curvature={10} endYOffset={-40} gradientStartColor="#82ad66" gradientStopColor="#3d5c2a" pathColor="#658b4e" pathOpacity={0.15} duration={4} delay={1.2} />
      </motion.div>
      <motion.div style={{ opacity: beam6Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={e6Ref} toRef={emeraldBookRef} curvature={18} endYOffset={-40} gradientStartColor="#82ad66" gradientStopColor="#3d5c2a" pathColor="#658b4e" pathOpacity={0.15} duration={4.2} delay={1.5} />
      </motion.div>
      <motion.div style={{ opacity: beam7Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={e7Ref} toRef={emeraldBookRef} curvature={25} endYOffset={-40} gradientStartColor="#82ad66" gradientStopColor="#3d5c2a" pathColor="#658b4e" pathOpacity={0.15} duration={4.4} delay={1.8} />
      </motion.div>

      {/* 7 Beams -> Book 3 (software.emreaslan.dev - Slate Titanium Stream) */}
      <motion.div style={{ opacity: beam1Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={v1Ref} toRef={violetBookRef} curvature={-25} endYOffset={-40} gradientStartColor="#cbd5e1" gradientStopColor="#64748b" pathColor="#94a3b8" pathOpacity={0.15} duration={4} />
      </motion.div>
      <motion.div style={{ opacity: beam2Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={v2Ref} toRef={violetBookRef} curvature={-18} endYOffset={-40} gradientStartColor="#cbd5e1" gradientStopColor="#64748b" pathColor="#94a3b8" pathOpacity={0.15} duration={4.2} delay={0.3} />
      </motion.div>
      <motion.div style={{ opacity: beam3Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={v3Ref} toRef={violetBookRef} curvature={-10} endYOffset={-40} gradientStartColor="#cbd5e1" gradientStopColor="#64748b" pathColor="#94a3b8" pathOpacity={0.15} duration={4.4} delay={0.6} />
      </motion.div>
      <motion.div style={{ opacity: beam4Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={v4Ref} toRef={violetBookRef} curvature={0} endYOffset={-40} gradientStartColor="#cbd5e1" gradientStopColor="#64748b" pathColor="#94a3b8" pathOpacity={0.15} duration={4.2} delay={0.9} />
      </motion.div>
      <motion.div style={{ opacity: beam5Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={v5Ref} toRef={violetBookRef} curvature={10} endYOffset={-40} gradientStartColor="#cbd5e1" gradientStopColor="#64748b" pathColor="#94a3b8" pathOpacity={0.15} duration={4} delay={1.2} />
      </motion.div>
      <motion.div style={{ opacity: beam6Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={v6Ref} toRef={violetBookRef} curvature={18} endYOffset={-40} gradientStartColor="#cbd5e1" gradientStopColor="#64748b" pathColor="#94a3b8" pathOpacity={0.15} duration={4.2} delay={1.5} />
      </motion.div>
      <motion.div style={{ opacity: beam7Opacity }} className="pointer-events-none absolute inset-0">
        <AnimatedBeam containerRef={containerRef} fromRef={v7Ref} toRef={violetBookRef} curvature={25} endYOffset={-40} gradientStartColor="#cbd5e1" gradientStopColor="#64748b" pathColor="#94a3b8" pathOpacity={0.15} duration={4.4} delay={1.8} />
      </motion.div>
    </div>
  );
};

export default BookCardSection;
