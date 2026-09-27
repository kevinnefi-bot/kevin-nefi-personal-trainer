import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.closest('a') || target.closest('button') || target.closest('[data-cursor="hover"]'))) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#0066ff] transition-transform duration-150 ease-out ${
          isHovered ? 'w-12 h-12 -mt-6 -ml-6 bg-[#0066ff]/15 border-[#00d2ff] scale-110 shadow-[0_0_20px_rgba(0,102,255,0.4)]' : 'w-8 h-8 -mt-4 -ml-4 border-opacity-40 scale-100'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      />
      {/* Inner Dot */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 -mt-1 -ml-1 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#8b5cf6] shadow-[0_0_12px_#00d2ff] transition-transform duration-75 ease-out ${
          isHovered ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      />
    </div>
  );
};
