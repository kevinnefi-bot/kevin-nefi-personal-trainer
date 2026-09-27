import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  createElement,
} from 'react';
import type { ReactNode } from 'react';
import { SCENES, TOTAL_SCENES } from './sceneConfig';

export interface PresentationState {
  currentScene: number;
  isTransitioning: boolean;
  direction: 'forward' | 'backward';
  goNext: () => void;
  goPrev: () => void;
  goTo: (n: number) => void;
  loopToStart: () => void;
  transitionType: string;
}

const PresentationContext = createContext<PresentationState | null>(null);

const TRANSITION_DURATION_MS = 650;
const WHEEL_COOLDOWN_MS = 900;

interface PresentationProviderProps {
  children: ReactNode;
}

export function PresentationProvider({ children }: PresentationProviderProps) {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastWheelTime = useRef<number>(0);
  const pendingScene = useRef<number | null>(null);

  const triggerTransition = useCallback(
    (targetScene: number, dir: 'forward' | 'backward') => {
      if (isTransitioning) return;
      if (targetScene < 0 || targetScene >= TOTAL_SCENES) return;
      if (targetScene === currentScene) return;

      pendingScene.current = targetScene;
      setDirection(dir);
      setIsTransitioning(true);

      if (transitionTimer.current) clearTimeout(transitionTimer.current);

      transitionTimer.current = setTimeout(() => {
        if (pendingScene.current !== null) {
          setCurrentScene(pendingScene.current);
          pendingScene.current = null;
        }
        setIsTransitioning(false);
        transitionTimer.current = null;
      }, TRANSITION_DURATION_MS);
    },
    [isTransitioning, currentScene]
  );

  const goNext = useCallback(() => {
    if (currentScene >= TOTAL_SCENES - 1) {
      // Loop seamlessly back to start
      triggerTransition(0, 'forward');
    } else {
      triggerTransition(currentScene + 1, 'forward');
    }
  }, [currentScene, triggerTransition]);

  const goPrev = useCallback(() => {
    if (currentScene > 0) {
      triggerTransition(currentScene - 1, 'backward');
    }
  }, [currentScene, triggerTransition]);

  const loopToStart = useCallback(() => {
    triggerTransition(0, 'forward');
  }, [triggerTransition]);

  const goTo = useCallback(
    (n: number) => {
      if (n === currentScene) return;
      triggerTransition(n, n > currentScene ? 'forward' : 'backward');
    },
    [currentScene, triggerTransition]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Smooth wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < WHEEL_COOLDOWN_MS) return;

      if (Math.abs(e.deltaY) > 35) {
        lastWheelTime.current = now;
        if (e.deltaY > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev]);

  // Touch swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = touchStartX - e.changedTouches[0].clientX;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
        deltaX > 0 ? goNext() : goPrev();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  const transitionType = SCENES[currentScene]?.transition ?? 'plate-wipe';

  const value: PresentationState = {
    currentScene,
    isTransitioning,
    direction,
    goNext,
    goPrev,
    goTo,
    loopToStart,
    transitionType,
  };

  return createElement(PresentationContext.Provider, { value }, children);
}

export function usePresentation(): PresentationState {
  const context = useContext(PresentationContext);
  if (!context) throw new Error('usePresentation must be used within a PresentationProvider');
  return context;
}
