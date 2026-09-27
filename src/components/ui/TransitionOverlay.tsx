import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TransitionOverlayProps {
  isActive: boolean;
  type: string;
  direction: 'forward' | 'backward';
}

export function TransitionOverlay({ isActive, type, direction }: TransitionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const portalRingRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (!isActive) {
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: 'none' });
      return;
    }

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Fast 2026 kinetic sweep with motion blur & lens flare streak
    const fromX = direction === 'forward' ? '-100%' : '100%';
    const toX = direction === 'forward' ? '100%' : '-100%';

    gsap.set(overlayRef.current, { opacity: 1, pointerEvents: 'auto' });

    if (type === 'phone-portal') {
      // 2026 Camera Dive Portal: circular iris zoom
      if (portalRingRef.current) {
        tl.fromTo(
          portalRingRef.current,
          { scale: 0.1, opacity: 0 },
          { scale: 3.5, opacity: 1, duration: 0.35, ease: 'power2.in' }
        ).to(portalRingRef.current, {
          scale: 8.0,
          opacity: 0,
          duration: 0.28,
          ease: 'power3.out',
        });
      }
    } else {
      // Shutter Light Streak Wipe
      tl.fromTo(
        overlayRef.current,
        { x: fromX },
        { x: '0%', duration: 0.28, ease: 'power3.inOut' }
      )
        .to(overlayRef.current, { duration: 0.08 }) // hold for frame swap
        .to(overlayRef.current, { x: toX, duration: 0.28, ease: 'power3.inOut' });

      if (flareRef.current) {
        gsap.fromTo(
          flareRef.current,
          { scaleX: 0.2, opacity: 0 },
          { scaleX: 2.5, opacity: 1, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 1 }
        );
      }
    }

    return () => {
      tl.kill();
    };
  }, [isActive, type, direction]);

  if (!isActive) return null;

  const isPortal = type === 'phone-portal';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        background: isPortal
          ? 'radial-gradient(circle at 50% 50%, rgba(0,210,255,0.4) 0%, rgba(5,6,8,0.95) 70%)'
          : 'linear-gradient(90deg, transparent 0%, rgba(5,6,8,0.92) 20%, rgba(5,6,8,0.98) 50%, rgba(5,6,8,0.92) 80%, transparent 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      aria-hidden="true"
    >
      {/* 2026 Kinetic Light Flare Streak */}
      {!isPortal && (
        <div
          ref={flareRef}
          className="absolute inset-y-0 w-32 pointer-events-none"
          style={{
            left: direction === 'forward' ? '50%' : '50%',
            transform: 'translateX(-50%)',
            background:
              'linear-gradient(90deg, transparent, rgba(0,210,255,0.7), rgba(139,92,246,0.7), transparent)',
            boxShadow: '0 0 60px 20px rgba(0,210,255,0.4)',
          }}
        />
      )}

      {/* Portal Dive Ring */}
      {isPortal && (
        <div
          ref={portalRingRef}
          className="w-48 h-48 rounded-full border-4 border-[#00d2ff]"
          style={{
            boxShadow: '0 0 100px 30px rgba(0,210,255,0.6), inset 0 0 60px rgba(139,92,246,0.6)',
            background: 'radial-gradient(circle, rgba(0,210,255,0.2) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
}
