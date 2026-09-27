import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 right-0 z-50 w-1 h-full bg-white/5 pointer-events-none">
      <div
        className="w-full bg-gradient-to-b from-[#ff003c] via-[#ff0055] to-[#990022] shadow-[0_0_12px_#ff003c] transition-all duration-75 ease-out"
        style={{ height: `${scrollPercentage}%` }}
      />
    </div>
  );
};
