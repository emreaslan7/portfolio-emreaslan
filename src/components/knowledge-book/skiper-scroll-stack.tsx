'use client';

import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { BookCardSection } from './book-card-section';

export const SkiperScrollStack: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  
  // Track scroll strictly from when the container hits the sticky top position
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={container}
      className="relative w-full h-[190vh] flex flex-col items-center"
    >
      {/* 100% Perfectly Centered Sticky Stage */}
      <div className="sticky top-16 sm:top-20 w-full flex flex-col items-center justify-center">
        <BookCardSection progress={scrollYProgress} />
      </div>
    </div>
  );
};

export default SkiperScrollStack;
