'use client';

import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { BookCardSection } from '@/components/knowledge-book/book-card-section';
import { BookMarked } from 'lucide-react';

export default function KnowledgeVaultSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll strictly while this section is pinned
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="knowledge-vault" ref={containerRef} className="relative w-full h-[220vh]">
      {/* Sticky Container: Balanced top offset and comfortable spacing on mobile & desktop */}
      <div className="sticky top-2 sm:top-6 w-full flex flex-col items-center justify-center text-center gap-y-1.5 sm:gap-y-3">
        {/* Section Pill Badge */}
        <div className="flex items-center w-full max-w-2xl">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="border border-border bg-card/90 dark:bg-card/70 backdrop-blur-md z-10 rounded-xl px-3.5 sm:px-4 py-0.5 sm:py-1 flex items-center gap-1.5 sm:gap-2 shadow-2xs">
            <BookMarked className="size-3.5 text-foreground" />
            <span className="text-foreground text-xs sm:text-sm font-medium">Knowledge Vault</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-transparent" />
        </div>

        {/* Section Heading & Subtitle */}
        <div className="flex flex-col gap-y-1 items-center justify-center max-w-2xl px-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">
            Technical Notebooks & Study Vault
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed text-balance">
            Comprehensive engineering notebooks & study compendiums written while mastering core domains & specializations:{' '}
            <a
              href="https://ai.emreaslan.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a87954] dark:text-[#c29b7f] font-mono font-medium underline underline-offset-2 decoration-[#a87954]/50 hover:decoration-[#c29b7f] hover:text-[#deb89a] transition-colors"
            >
              ai.emreaslan.dev
            </a>
            ,{' '}
            <a
              href="https://cryptomath.emreaslan.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#658b4e] dark:text-[#82ad66] font-mono font-medium underline underline-offset-2 decoration-[#658b4e]/50 hover:decoration-[#82ad66] hover:text-[#a0cb84] transition-colors"
            >
              cryptomath.emreaslan.dev
            </a>
            , and{' '}
            <a
              href="https://software.emreaslan.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-[#94a3b8] font-mono font-medium underline underline-offset-2 decoration-slate-400/50 hover:decoration-slate-300 hover:text-slate-200 transition-colors"
            >
              software.emreaslan.dev
            </a>
            .
          </p>
        </div>

        {/* Interactive 21 Nodes + Beams + 3 Books Canvas (with comfortable top margin) */}
        <div className="w-full flex flex-col items-center justify-center pt-2.5 sm:pt-4">
          <BookCardSection progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
