'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Context ───────────────────────────────────────────────────────────────

interface ExpandableScreenContextValue {
  isExpanded: boolean;
  expand: () => void;
  collapse: () => void;
  animationDuration: number;
}

const ExpandableScreenContext = createContext<ExpandableScreenContextValue | null>(null);

function useExpandableScreen() {
  const ctx = useContext(ExpandableScreenContext);
  if (!ctx) {
    throw new Error('useExpandableScreen must be used within <ExpandableScreen>');
  }
  return ctx;
}

export { useExpandableScreen };

// ─── Root ──────────────────────────────────────────────────────────────────

interface ExpandableScreenProps {
  children: React.ReactNode;
  animationDuration?: number;
  defaultExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
  lockScroll?: boolean;
}

function ExpandableScreen({
  children,
  animationDuration = 0.3,
  defaultExpanded = false,
  onExpandChange,
  lockScroll = true,
}: ExpandableScreenProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const expand = useCallback(() => {
    setIsExpanded(true);
    onExpandChange?.(true);
  }, [onExpandChange]);

  const collapse = useCallback(() => {
    setIsExpanded(false);
    onExpandChange?.(false);
  }, [onExpandChange]);

  // Scroll lock
  useEffect(() => {
    if (!lockScroll || !isExpanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lockScroll, isExpanded]);

  // Escape key
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') collapse();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isExpanded, collapse]);

  return (
    <ExpandableScreenContext.Provider
      value={{
        isExpanded,
        expand,
        collapse,
        animationDuration,
      }}
    >
      {children}
    </ExpandableScreenContext.Provider>
  );
}

export { ExpandableScreen };

// ─── Trigger ───────────────────────────────────────────────────────────────

interface ExpandableScreenTriggerProps {
  children: React.ReactNode;
  className?: string;
}

function ExpandableScreenTrigger({ children, className }: ExpandableScreenTriggerProps) {
  const { isExpanded, expand } = useExpandableScreen();

  if (isExpanded) return null;

  return (
    <div className={cn('cursor-pointer', className)} onClick={expand}>
      {children}
    </div>
  );
}

export { ExpandableScreenTrigger };

// ─── Portal Content ────────────────────────────────────────────────────────

interface ExpandableScreenContentProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
}

function ExpandableScreenContent({
  children,
  className,
  showCloseButton = true,
  closeButtonClassName,
}: ExpandableScreenContentProps) {
  const { isExpanded, collapse, animationDuration } = useExpandableScreen();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isExpanded && showCloseButton) {
      const id = setTimeout(() => closeRef.current?.focus(), 100);
      return () => clearTimeout(id);
    }
  }, [isExpanded, showCloseButton]);

  const portalContent = (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationDuration }}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background"
            onClick={(e) => {
              e.stopPropagation();
              collapse();
            }}
          />

          {/* Close button */}
          {/* {showCloseButton && (
            <button
              ref={closeRef}
              onClick={(e) => {
                e.stopPropagation();
                collapse();
              }}
              className={cn(
                'fixed top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg border border-border backdrop-blur-sm transition-colors hover:bg-accent',
                closeButtonClassName,
              )}
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          )} */}

          {/* Content */}
          <div
            className={cn('relative z-10 flex items-center justify-center p-4 md:p-8', className)}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(portalContent, document.body);
}

export { ExpandableScreenContent };

// ─── Background ────────────────────────────────────────────────────────────

interface ExpandableScreenBackgroundProps {
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

function ExpandableScreenBackground({ trigger, content, className }: ExpandableScreenBackgroundProps) {
  const { isExpanded } = useExpandableScreen();

  return <div className={cn(className)}>{isExpanded ? content : trigger}</div>;
}

export { ExpandableScreenBackground };
