'use client';

import React, { useEffect, useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookTheme, Point, BeamPathData } from './types';
import { THEME_CONFIGS } from './data';

interface AnimatedBeamCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  fromRefs: React.RefObject<(HTMLDivElement | null)[]>;
  toRef: React.RefObject<HTMLDivElement | null>;
  theme: BookTheme;
  hoveredIndex: number | null;
  activeBookId: string;
  isBookOpen?: boolean;
}

export const AnimatedBeamCanvas: React.FC<AnimatedBeamCanvasProps> = ({
  containerRef,
  fromRefs,
  toRef,
  theme,
  hoveredIndex,
  activeBookId,
  isBookOpen = false,
}) => {
  const [beams, setBeams] = useState<BeamPathData[]>([]);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  const uniqueId = useId().replace(/:/g, '');
  const themeConfig = THEME_CONFIGS[theme];

  const updateCoordinates = React.useCallback(() => {
    if (!containerRef.current || !toRef.current || !fromRefs.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();

    if (containerRect.width === 0 || containerRect.height === 0) return;

    setCanvasDimensions({
      width: containerRect.width,
      height: containerRect.height,
    });

    const newBeams: BeamPathData[] = [];
    const sourceElements = fromRefs.current;

    sourceElements.forEach((fromEl, index) => {
      if (!fromEl) return;

      const fromRect = fromEl.getBoundingClientRect();

      // Start coordinate (Right center of source topic card)
      const start: Point = {
        x: fromRect.right - containerRect.left,
        y: fromRect.top + fromRect.height / 2 - containerRect.top,
      };

      // End coordinate (Target attachment point on book left spine/edge)
      // When book is closed or open, calculate optimal target spine docking points
      const spineOffsetY = (toRect.height * (0.24 + index * 0.13));
      const end: Point = {
        x: toRect.left + 12 - containerRect.left,
        y: toRect.top + spineOffsetY - containerRect.top,
      };

      // Calculate smooth cubic bezier path
      const dx = end.x - start.x;
      const cp1X = start.x + dx * 0.45;
      const cp1Y = start.y;
      const cp2X = end.x - dx * 0.35;
      const cp2Y = end.y;

      const path = `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} C ${cp1X.toFixed(2)} ${cp1Y.toFixed(2)}, ${cp2X.toFixed(2)} ${cp2Y.toFixed(2)}, ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;

      newBeams.push({
        id: `beam-${activeBookId}-${index}`,
        path,
        start,
        end,
        index,
      });
    });

    setBeams(newBeams);
  }, [containerRef, toRef, fromRefs, activeBookId]);

  useEffect(() => {
    // Immediate calculation
    updateCoordinates();

    // Recompute after microtask and brief animation frames
    const rafId = requestAnimationFrame(updateCoordinates);
    const timeoutId = setTimeout(updateCoordinates, 120);

    const resizeObserver = new ResizeObserver(() => {
      updateCoordinates();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (toRef.current) {
      resizeObserver.observe(toRef.current);
    }
    fromRefs.current?.forEach((el) => {
      if (el) resizeObserver.observe(el);
    });

    window.addEventListener('resize', updateCoordinates);
    window.addEventListener('scroll', updateCoordinates, true);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCoordinates);
      window.removeEventListener('scroll', updateCoordinates, true);
    };
  }, [updateCoordinates, containerRef, toRef, fromRefs, activeBookId, isBookOpen]);

  if (beams.length === 0 || canvasDimensions.width === 0) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
      width={canvasDimensions.width}
      height={canvasDimensions.height}
      viewBox={`0 0 ${canvasDimensions.width} ${canvasDimensions.height}`}
    >
      <defs>
        {/* Glow Filters */}
        <filter id={`beam-glow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id={`beam-intense-glow-${uniqueId}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Dynamic Beam Gradients for each node */}
        {beams.map((beam) => {
          const isHovered = hoveredIndex === beam.index;
          return (
            <linearGradient
              key={`grad-${beam.id}`}
              id={`grad-${uniqueId}-${beam.index}`}
              gradientUnits="userSpaceOnUse"
              x1={beam.start.x}
              y1={beam.start.y}
              x2={beam.end.x}
              y2={beam.end.y}
            >
              <stop offset="0%" stopColor={themeConfig.primary} stopOpacity={isHovered ? 0.9 : 0.6} />
              <stop offset="50%" stopColor={themeConfig.secondary} stopOpacity={isHovered ? 1 : 0.8} />
              <stop offset="100%" stopColor={themeConfig.primary} stopOpacity={isHovered ? 0.9 : 0.4} />
            </linearGradient>
          );
        })}
      </defs>

      <AnimatePresence>
        {beams.map((beam) => {
          const isHovered = hoveredIndex === beam.index;
          const isAnyHovered = hoveredIndex !== null;
          const opacityBase = isHovered ? 0.9 : isAnyHovered ? 0.15 : 0.35;
          const strokeWidth = isHovered ? 2.5 : 1.5;
          const duration = isHovered ? 1.4 : 2.6 + beam.index * 0.3;
          const delay = beam.index * 0.25;

          return (
            <g key={beam.id} className="transition-all duration-300">
              {/* 1. Subtle Background Guide Track */}
              <path
                d={beam.path}
                fill="none"
                stroke={themeConfig.primary}
                strokeWidth={strokeWidth}
                strokeOpacity={opacityBase * 0.4}
                strokeLinecap="round"
                className="transition-opacity duration-300"
              />

              {/* 2. Primary Animated Light Pulse along Path */}
              <motion.path
                d={beam.path}
                fill="none"
                stroke={`url(#grad-${uniqueId}-${beam.index})`}
                strokeWidth={isHovered ? 3.5 : 2}
                strokeLinecap="round"
                filter={isHovered ? `url(#beam-intense-glow-${uniqueId})` : `url(#beam-glow-${uniqueId})`}
                strokeDasharray="40 180"
                initial={{ strokeDashoffset: 220, opacity: 0 }}
                animate={{
                  strokeDashoffset: [-220, 0],
                  opacity: [0.3, isHovered ? 1 : 0.8, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration,
                  ease: 'linear',
                  delay,
                }}
              />

              {/* 3. High-Speed Core Photon Packet (accent glow) */}
              <motion.path
                d={beam.path}
                fill="none"
                stroke="#ffffff"
                strokeWidth={isHovered ? 1.8 : 1.2}
                strokeLinecap="round"
                strokeDasharray="14 206"
                initial={{ strokeDashoffset: 220 }}
                animate={{
                  strokeDashoffset: [-220, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration,
                  ease: 'linear',
                  delay,
                }}
              />

              {/* 4. Start Anchor Pulse Dot */}
              <circle
                cx={beam.start.x}
                cy={beam.start.y}
                r={isHovered ? 4.5 : 3}
                fill={themeConfig.primary}
                className="transition-all duration-300"
              />
              <circle
                cx={beam.start.x}
                cy={beam.start.y}
                r={isHovered ? 8 : 5}
                fill={themeConfig.primary}
                opacity={isHovered ? 0.6 : 0.25}
                className="transition-all duration-300"
              />

              {/* 5. End Target Spine Ingestion Anchor Dot */}
              <circle
                cx={beam.end.x}
                cy={beam.end.y}
                r={isHovered ? 4.5 : 3}
                fill={themeConfig.secondary}
                className="transition-all duration-300"
              />
              <circle
                cx={beam.end.x}
                cy={beam.end.y}
                r={isHovered ? 9 : 5}
                fill={themeConfig.secondary}
                opacity={isHovered ? 0.6 : 0.2}
                className="transition-all duration-300"
              />
            </g>
          );
        })}
      </AnimatePresence>
    </svg>
  );
};
