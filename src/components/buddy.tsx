'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RadialMenu } from '@/components/animate-ui/components/community/radial-menu';
import { Smile, Brain, Keyboard, Moon, Activity, Music } from 'lucide-react'; // İkonları aksiyonlara göre güncelledik

// En popüler 6 aksiyonu ve onlara uygun ikonları tanımlıyoruz
const MENU_ITEMS = [
  { id: 1, label: 'Happy', icon: Smile, gifPath: '/assets/clawd/clawd-happy.gif' },
  { id: 2, label: 'Think', icon: Brain, gifPath: '/assets/clawd/clawd-thinking.gif' },
  { id: 3, label: 'Type', icon: Keyboard, gifPath: '/assets/clawd/clawd-typing.gif' },
  { id: 4, label: 'Sleep', icon: Moon, gifPath: '/assets/clawd/clawd-sleeping.gif' },
  { id: 5, label: 'Juggle', icon: Activity, gifPath: '/assets/clawd/clawd-juggling.gif' },
  { id: 6, label: 'Groove', icon: Music, gifPath: '/assets/clawd/clawd-headphones-groove.gif' },
];

const IDLE_GIFS = ['/assets/clawd/clawd-idle.gif'];

const ACTION_GIFS = [
  '/assets/clawd/clawd-headphones-groove.gif',
  '/assets/clawd/clawd-happy.gif',
  '/assets/clawd/clawd-error.gif',
  '/assets/clawd/clawd-conducting.gif',
  '/assets/clawd/clawd-carrying.gif',
  '/assets/clawd/clawd-building.gif',
  '/assets/clawd/clawd-bubble.gif',
  '/assets/clawd/clawd-react-annoyed.gif',
  '/assets/clawd/clawd-notification.gif',
  '/assets/clawd/clawd-juggling.gif',
  '/assets/clawd/clawd-sweeping.gif',
  '/assets/clawd/clawd-sleeping.gif',
  '/assets/clawd/clawd-typing.gif',
  '/assets/clawd/clawd-thinking.gif',
];

const EDGE_GAP = 16;
const SIZE = 250;

function randomIdleGif() {
  return IDLE_GIFS[Math.floor(Math.random() * IDLE_GIFS.length)];
}

function randomActionGif() {
  return ACTION_GIFS[Math.floor(Math.random() * ACTION_GIFS.length)];
}

function randomPosition() {
  const x = EDGE_GAP + Math.random() * (window.innerWidth - SIZE - EDGE_GAP * 2);
  const y = EDGE_GAP + Math.random() * (window.innerHeight - SIZE - EDGE_GAP * 2);
  return { x, y };
}

type State = 'idle' | 'wandering' | 'acting' | 'dragging';

export default function Buddy() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gif, setGif] = useState(IDLE_GIFS[0]);
  const [state, setState] = useState<State>('idle');
  const [mounted, setMounted] = useState(false);

  const isDragging = useRef(false);
  const wasDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const wanderTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const actionTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const actingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const stateRef = useRef<State>('idle');

  const clearTimers = useCallback(() => {
    if (wanderTimer.current) clearTimeout(wanderTimer.current);
    if (actionTimer.current) clearTimeout(actionTimer.current);
    if (actingTimer.current) clearTimeout(actingTimer.current);
  }, []);

  const scheduleNextWander = useCallback(() => {
    if (wanderTimer.current) clearTimeout(wanderTimer.current);
    const delay = 30000 + Math.random() * 60000;
    wanderTimer.current = setTimeout(() => {
      if (stateRef.current === 'dragging' || stateRef.current === 'acting') {
        scheduleNextWander();
        return;
      }
      const newPos = randomPosition();
      setPosition(newPos);
      setState('wandering');
      stateRef.current = 'wandering';
      setTimeout(() => {
        if (stateRef.current === 'wandering') {
          setState('idle');
          stateRef.current = 'idle';
        }
      }, 3000);
      scheduleNextWander();
    }, delay);
  }, []);

  const scheduleNextAction = useCallback(() => {
    if (actionTimer.current) clearTimeout(actionTimer.current);
    const delay = 12000 + Math.random() * 12000;
    actionTimer.current = setTimeout(() => {
      if (stateRef.current === 'dragging' || stateRef.current === 'acting') {
        scheduleNextAction();
        return;
      }
      const actionGif = randomActionGif();
      setGif(actionGif);
      setState('acting');
      stateRef.current = 'acting';
      const duration = 2000 + Math.random() * 3000;
      actingTimer.current = setTimeout(() => {
        if (stateRef.current !== 'acting') return;
        setGif(actionGif);
        const duration2 = 2000 + Math.random() * 3000;
        actingTimer.current = setTimeout(() => {
          if (stateRef.current !== 'acting') return;
          setGif(randomIdleGif());
          setState('idle');
          stateRef.current = 'idle';
          scheduleNextAction();
        }, duration2);
      }, duration);
    }, delay);
  }, []);

  // YENİ: Menüden seçilen aksiyonu 2 kez (yaklaşık 6 saniye) çalıştıran fonksiyon
  const triggerSpecificAction = useCallback(
    (actionGif: string) => {
      clearTimers(); // Rastgele hareketleri durdur
      setState('acting');
      stateRef.current = 'acting';
      setGif(actionGif); // Seçilen GIF'i oynatmaya başla

      // Çoğu GIF yaklaşık 2-3 saniye sürer. 6 saniye (6000ms) bekletmek
      // GIF'in kendi içinde otomatik olarak yaklaşık 2 kez loop olmasını (tekrarlanmasını) sağlar.
      actingTimer.current = setTimeout(() => {
        if (stateRef.current !== 'acting') return;

        setGif(randomIdleGif()); // Süre bitince Idle'a dön
        setState('idle');
        stateRef.current = 'idle';

        // Normal rutini tekrar başlat
        scheduleNextWander();
        scheduleNextAction();
      }, 6000);
    },
    [clearTimers, scheduleNextWander, scheduleNextAction],
  );

  useEffect(() => {
    setMounted(true);
    setPosition(randomPosition());
    setGif(randomIdleGif());

    scheduleNextWander();
    scheduleNextAction();

    return () => clearTimers();
  }, [clearTimers, scheduleNextWander, scheduleNextAction]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;

      wasDragging.current = false;
      isDragging.current = true;
      stateRef.current = 'dragging';
      setState('dragging');
      setGif(randomIdleGif());
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        posX: position.x,
        posY: position.y,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position.x, position.y],
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    wasDragging.current = true;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({
      x: dragStart.current.posX + dx,
      y: dragStart.current.posY + dy,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    setState('idle');
    stateRef.current = 'idle';
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 9999,
        width: SIZE,
        height: SIZE,
        transition: state === 'idle' || state === 'wandering' ? 'left 3s ease, top 3s ease' : 'none',
        userSelect: 'none',
        touchAction: 'none',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '80px',
          height: '60px',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        <RadialMenu
          // @ts-ignore - RadialMenu tipin MenuItem içerisinde gifPath beklemiyor olabilir, sorun teşkil etmez
          menuItems={MENU_ITEMS}
          onSelect={(item: any) => {
            console.log('Tetiklenen Aksiyon:', item.label);
            triggerSpecificAction(item.gifPath); // Seçilen menünün GIF'ini tetikle
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              cursor: isDragging.current ? 'grabbing' : 'grab',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClick={(e) => {
              if (wasDragging.current) e.stopPropagation();
            }}
          />
        </RadialMenu>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={gif}
        alt="buddy"
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
