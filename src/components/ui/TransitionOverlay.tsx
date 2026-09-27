import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TransitionOverlayProps {
  isActive: boolean;
  type: string;
  direction: 'forward' | 'backward';
}

export function TransitionOverlay({ isActive, type, direction }: TransitionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }

    if (!isActive) {
      gsap.set(overlayRef.current, { xPercent: direction === 'forward' ? 110 : -110, opacity: 1 });
      return;
    }

    const fromX = direction === 'forward' ? -110 : 110;
    const toX   = direction === 'forward' ?  110 : -110;

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.fromTo(
      overlayRef.current,
      { xPercent: fromX, opacity: 1 },
      { xPercent: 0, duration: 0.38, ease: 'power3.inOut' }
    );
    tl.to(overlayRef.current, { duration: 0.22 }); // hold
    tl.to(overlayRef.current, { xPercent: toX, duration: 0.28, ease: 'power3.inOut' });

    if (innerRef.current) {
      gsap.fromTo(
        innerRef.current,
        { rotate: 0, scale: 0.6, opacity: 0 },
        { rotate: 360, scale: 1.2, opacity: 0.6, duration: 0.88, ease: 'power2.out' }
      );
    }

    return () => { tl.kill(); };
  }, [isActive, type, direction]);

  if (!isActive) return null;

  const isPlate = type === 'plate-wipe';
  const isBurst = type === 'blue-burst';

  const bg = isPlate
    ? '#050608'
    : isBurst
    ? 'linear-gradient(135deg, #00d2ff 0%, #0066ff 50%, #8b5cf6 100%)'
    : 'linear-gradient(135deg, #0a1020 0%, #050608 100%)';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
      style={{ background: bg, willChange: 'transform' }}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="w-72 h-72 rounded-full"
        style={{
          border: `3px solid ${isPlate ? 'rgba(0,210,255,0.3)' : 'rgba(255,255,255,0.2)'}`,
          background: isPlate
            ? 'radial-gradient(circle at 40% 40%, rgba(0,210,255,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
