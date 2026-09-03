'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Subtopic, BookTheme } from './types';
import { THEME_CONFIGS } from './data';
import { DynamicIcon } from './icons';

interface TopicNodeCardProps {
  subtopic: Subtopic;
  index: number;
  theme: BookTheme;
  isHovered: boolean;
  isSelected?: boolean;
  onHover: (index: number | null) => void;
  onSelect?: (subtopic: Subtopic) => void;
  nodeRef?: (el: HTMLDivElement | null) => void;
}

export const TopicNodeCard: React.FC<TopicNodeCardProps> = ({
  subtopic,
  index,
  theme,
  isHovered,
  isSelected = false,
  onHover,
  onSelect,
  nodeRef,
}) => {
  const themeConfig = THEME_CONFIGS[theme];

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.25, 1, 0.5, 1],
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect?.(subtopic)}
      className="group relative cursor-pointer w-full"
    >
      <div
        className={`relative flex items-center justify-between gap-3.5 rounded-2xl border p-3.5 sm:p-4 backdrop-blur-md transition-all duration-300 ${
          isHovered || isSelected
            ? `bg-white/95 shadow-xl dark:bg-stone-900/95 ${themeConfig.border} ${themeConfig.activeRing} ring-2 ring-offset-2 ring-offset-background`
            : 'border-border/60 bg-card/75 hover:border-border hover:bg-card/95 shadow-xs'
        }`}
        style={{
          boxShadow: isHovered
            ? `0 12px 28px -6px ${themeConfig.glow}, 0 4px 10px -2px rgba(0, 0, 0, 0.1)`
            : undefined,
        }}
      >
        {/* Left Glow Accent Bar */}
        <div
          className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-300 ${
            isHovered || isSelected ? themeConfig.accentBg : 'bg-transparent group-hover:bg-muted-foreground/30'
          }`}
        />

        {/* Left Side: Index & Icon */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={`relative flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
              isHovered || isSelected
                ? `${themeConfig.badgeBg} ${themeConfig.border} ${themeConfig.accentText} scale-105 shadow-inner`
                : 'border-border/60 bg-muted/60 text-muted-foreground group-hover:text-foreground'
            }`}
          >
            <DynamicIcon name={subtopic.iconName} className="size-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1.5 -left-1.5 flex size-4.5 items-center justify-center rounded-full bg-background border border-border text-[9px] font-bold text-muted-foreground tabular-nums shadow-xs">
              0{index + 1}
            </span>
          </div>

          {/* Title & Full Summary */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4
                className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
                  isHovered || isSelected ? 'text-foreground font-bold' : 'text-foreground/90'
                }`}
              >
                {subtopic.title}
              </h4>
            </div>

            <p className="line-clamp-2 text-xs text-muted-foreground mt-0.5 font-normal leading-relaxed">
              {subtopic.summary}
            </p>
          </div>
        </div>

        {/* Right Side: Badge & Connection Anchor Dock */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span
            className={`hidden md:inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors duration-200 ${
              isHovered || isSelected
                ? `${themeConfig.badgeBg} ${themeConfig.badgeText} border ${themeConfig.border}`
                : 'bg-muted/60 text-muted-foreground border border-border/40'
            }`}
          >
            {subtopic.badge}
          </span>

          {/* Beam Emitter Port Indicator */}
          <div
            className={`relative flex size-3.5 items-center justify-center rounded-full border transition-all duration-300 ${
              isHovered || isSelected
                ? `border-white ${themeConfig.accentBg} shadow-sm shadow-current scale-125`
                : 'border-muted-foreground/30 bg-muted/80 group-hover:border-foreground/40'
            }`}
          >
            {isHovered && (
              <span className={`absolute size-5 rounded-full ${themeConfig.accentBg} opacity-40 animate-ping`} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
