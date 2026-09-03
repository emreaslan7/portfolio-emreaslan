'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BookProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  ribbonColor?: string;
  duration?: number;
  isStatic?: boolean;
  radius?: 'sm' | 'md' | 'lg' | 'full';
  children?: React.ReactNode;
}

const sizeConfig = {
  xs: {
    width: 96,
    pagesWidth: 26,
    translateX: 82,
    translateZ: 14,
  },
  sm: {
    width: 140,
    pagesWidth: 38,
    translateX: 118,
    translateZ: 20,
  },
  md: {
    width: 180,
    pagesWidth: 48,
    translateX: 152,
    translateZ: 25,
  },
  lg: {
    width: 220,
    pagesWidth: 48,
    translateX: 192,
    translateZ: 25,
  },
};

export const Book = forwardRef<HTMLDivElement, BookProps>(
  (
    {
      className,
      size = 'sm',
      color,
      ribbonColor,
      duration = 1000,
      isStatic = false,
      radius = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const config = sizeConfig[size] || sizeConfig.sm;

    return (
      <div
        ref={ref}
        className={cn(
          'z-10 group [perspective:800px] w-min select-none',
          className
        )}
        {...props}
      >
        <div
          style={{
            width: `${config.width}px`,
            transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
          className={cn(
            'relative [transform-style:preserve-3d] [transform:rotateY(0deg)] aspect-[3/4] rounded-md',
            !isStatic && 'group-hover:[transform:rotateY(-30deg)]'
          )}
        >
          {/* Front Cover - Unified Obsidian / Matte Dark Zinc Finish */}
          <div
            className="absolute inset-y-0 overflow-hidden size-full left-0 text-white flex flex-col justify-end p-2.5 sm:p-4 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 rounded-md border border-white/15 dark:border-white/10 group-hover:border-white/30 transition-colors duration-300"
            style={{
              transform: `translateZ(${config.translateZ}px)`,
            }}
          >
            {/* Bookmark Ribbon (Kitap Ayracı) */}
            {ribbonColor && (
              <div
                className="absolute -top-1 right-2.5 sm:right-3.5 w-2.5 sm:w-3.5 h-6 sm:h-8 rounded-b-xs pointer-events-none z-20 transition-transform duration-300 group-hover:translate-y-0.5"
                style={{
                  backgroundColor: ribbonColor,
                  boxShadow: `0 2px 8px ${ribbonColor}50`,
                }}
              />
            )}

            {/* Spine lighting overlay */}
            <div
              className="absolute left-0 top-0 h-full pointer-events-none"
              style={{
                minWidth: '9%',
                background:
                  'linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0) 12%, hsla(0, 0%, 100%, .25) 29.25%, hsla(0, 0%, 100%, 0) 50.5%, hsla(0, 0%, 100%, 0) 75.25%, hsla(0, 0%, 100%, .25) 91%, hsla(0, 0%, 100%, 0))',
                opacity: 0.35,
              }}
            />

            <div className="pl-0.5 z-10">{children}</div>
          </div>

          {/* Book Pages Thickness */}
          <div
            className="absolute left-0 bg-stone-200 dark:bg-stone-300"
            style={{
              top: '2px',
              bottom: '2px',
              width: `${config.pagesWidth}px`,
              transform: `translateX(${config.translateX}px) rotateY(90deg)`,
              background:
                'linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(220,220,220,1) 50%)',
            }}
          />

          {/* Back Cover */}
          <div
            className="absolute inset-y-0 overflow-hidden size-full left-0 text-white flex flex-col justify-end p-2.5 sm:p-4 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 rounded-md border border-white/10"
            style={{
              transform: `translateZ(-${config.translateZ}px)`,
            }}
          />
        </div>
      </div>
    );
  }
);

Book.displayName = 'Book';

export const BookHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('flex items-center justify-between gap-1 mb-1 sm:mb-1.5', className)} {...props}>
      {children}
    </div>
  );
};

export const BookTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h1
      className={cn('font-bold select-none text-[10px] sm:text-xs md:text-sm text-balance leading-tight text-white tracking-tight', className)}
      {...props}
    >
      {children}
    </h1>
  );
};

export const BookDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p
      className={cn('select-none text-[7.5px] sm:text-[9px] md:text-[10px]/relaxed text-zinc-300 mt-0.5 line-clamp-2 font-mono', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export default Book;
