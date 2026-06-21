'use client';

import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence, type Transition } from 'motion/react';
import { cn } from '@/lib/utils';

type RadialMenuProps = {
  children?: React.ReactNode;
  menuItems: MenuItem[];
  size?: number;
  iconSize?: number;
  bandWidth?: number;
  innerGap?: number;
  outerGap?: number;
  outerRingWidth?: number;
  onSelect?: (item: MenuItem) => void;
};

type MenuItem = {
  id: number;
  label: string;
  icon: LucideIcon;
};

type Point = { x: number; y: number };

const menuTransition: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
  mass: 1,
};

const wedgeTransition: Transition = {
  duration: 0.05,
  ease: 'easeOut',
};

const FULL_CIRCLE = 360;
const START_ANGLE = -90;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(radius: number, angleDeg: number): Point {
  const rad = degToRad(angleDeg);
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function slicePath(index: number, total: number, wedgeRadius: number, innerRadius: number) {
  if (total <= 0) return '';

  if (total === 1) {
    return `
      M ${wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${-wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${wedgeRadius} 0
      M ${innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${-innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${innerRadius} 0
    `;
  }

  const anglePerSlice = FULL_CIRCLE / total;
  const midDeg = START_ANGLE + anglePerSlice * index;
  const halfSlice = anglePerSlice / 2;

  const startDeg = midDeg - halfSlice;
  const endDeg = midDeg + halfSlice;

  const outerStart = polarToCartesian(wedgeRadius, startDeg);
  const outerEnd = polarToCartesian(wedgeRadius, endDeg);
  const innerStart = polarToCartesian(innerRadius, startDeg);
  const innerEnd = polarToCartesian(innerRadius, endDeg);

  const largeArcFlag = anglePerSlice > 180 ? 1 : 0;

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${wedgeRadius} ${wedgeRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
}

function RadialMenu({
  children,
  menuItems,
  size = 240,
  iconSize = 18,
  bandWidth = 50,
  outerGap = 8,
  outerRingWidth = 12,
  onSelect,
}: RadialMenuProps) {
  const radius = size / 2;

  const outerRingOuterRadius = radius;
  const outerRingInnerRadius = outerRingOuterRadius - outerRingWidth;

  const wedgeOuterRadius = outerRingInnerRadius - outerGap;
  const wedgeInnerRadius = wedgeOuterRadius - bandWidth;

  const iconRingRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;
  const slice = 360 / menuItems.length;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleGlobalPointerDown = (e: PointerEvent) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('pointerdown', handleGlobalPointerDown);
    }
    return () => {
      document.removeEventListener('pointerdown', handleGlobalPointerDown);
    };
  }, [open]);

  return (
    <div
      className="relative w-full h-full"
      onClick={(e) => {
        if (!open) {
          e.stopPropagation();
          setOpen(true);
        }
      }}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            className="absolute top-1/2 left-1/2 z-[99999] outline-none"
            style={{
              width: size,
              height: size,
              marginTop: -radius,
              marginLeft: -radius,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={menuTransition}
          >
            <svg
              className="absolute inset-0 size-full filter drop-shadow-xl"
              viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
            >
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const midDeg = START_ANGLE + slice * index;
                const { x: iconX, y: iconY } = polarToCartesian(iconRingRadius, midDeg);
                const ICON_BOX = iconSize * 2;
                const isActive = activeIndex === index;

                return (
                  <g
                    key={item.id}
                    className="cursor-pointer"
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      onSelect?.(item);
                      setOpen(false);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {/* Dış Halka */}
                    <motion.path
                      d={slicePath(index, menuItems.length, outerRingOuterRadius, outerRingInnerRadius)}
                      className={cn('transition-colors duration-200', {
                        'fill-[#D97757] dark:fill-[#D97757]': isActive, // Claude Turuncusu
                        'fill-[#F3F2EF] dark:fill-[#242321]': !isActive, // Krem / Koyu Kahve-Gri
                      })}
                      initial={false}
                      transition={wedgeTransition}
                    />

                    {/* İç Halka (Ana Buton Alanı) */}
                    <motion.path
                      d={slicePath(index, menuItems.length, wedgeOuterRadius, wedgeInnerRadius)}
                      className={cn('stroke-[#E6E4DD] dark:stroke-[#3D3B38] stroke-1 transition-colors duration-200', {
                        'fill-[#D97757] dark:fill-[#D97757]': isActive, // Claude Turuncusu
                        'fill-[#FAF9F6] dark:fill-[#2B2A27]': !isActive, // Yumuşak Bej / Koyu Antrasit
                      })}
                      initial={false}
                      transition={wedgeTransition}
                    />

                    {/* İkon */}
                    <foreignObject
                      x={iconX - ICON_BOX / 2}
                      y={iconY - ICON_BOX / 2}
                      width={ICON_BOX}
                      height={ICON_BOX}
                      style={{ pointerEvents: 'none' }}
                    >
                      <div
                        className={cn(
                          'size-full flex items-center justify-center rounded-full transition-colors duration-200',
                          {
                            'text-[#FAF9F6] dark:text-[#FAF9F6]': isActive, // Aktifken Beyaz
                            'text-[#5C5A56] dark:text-[#A3A19C]': !isActive, // Pasifken Claude Grisi
                          },
                        )}
                      >
                        <Icon style={{ height: iconSize, width: iconSize }} />
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { RadialMenu };
