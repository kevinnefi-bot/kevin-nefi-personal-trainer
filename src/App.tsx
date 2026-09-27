import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PresentationProvider, usePresentation } from './engine/usePresentation';
import { ChapterNav } from './components/ui/ChapterNav';
import { TransitionOverlay } from './components/ui/TransitionOverlay';
import { CustomCursor } from './components/layout/CustomCursor';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Scene01_Meet } from './scenes/Scene01_Meet';
import { Scene02_Story } from './scenes/Scene02_Story';
import { Scene03_Problem } from './scenes/Scene03_Problem';
import { Scene04_Method } from './scenes/Scene04_Method';
import { Scene05_Services } from './scenes/Scene05_Services';
import { Scene06_MyProgress } from './scenes/Scene06_MyProgress';
import { Scene07_Values } from './scenes/Scene07_Values';
import { Scene08_Plans } from './scenes/Scene08_Plans';
import { Scene09_Final } from './scenes/Scene09_Final';

const SCENES_COMPONENTS = [
  Scene01_Meet,
  Scene02_Story,
  Scene03_Problem,
  Scene04_Method,
  Scene05_Services,
  Scene06_MyProgress,
  Scene07_Values,
  Scene08_Plans,
  Scene09_Final,
];

function PresentationStage() {
  const { currentScene, isTransitioning, direction, transitionType } = usePresentation();
  const stageRef = useRef<HTMLDivElement>(null);
  const prevScene = useRef<number>(currentScene);

  useEffect(() => {
    if (prevScene.current !== currentScene && stageRef.current) {
      // Animate stage entry
      gsap.fromTo(
        stageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out', delay: 0.32 }
      );
      prevScene.current = currentScene;
    }
  }, [currentScene]);

  const ActiveScene = SCENES_COMPONENTS[currentScene];

  return (
    <>
      {/* Full-screen scene container */}
      <div
        ref={stageRef}
        className="w-full min-h-screen"
        style={{ paddingBottom: '72px' }} // space for ChapterNav
      >
        {ActiveScene ? <ActiveScene /> : null}
      </div>

      {/* Cinematic transition overlay */}
      <TransitionOverlay
        isActive={isTransitioning}
        type={transitionType}
        direction={direction}
      />
    </>
  );
}

function AppInner() {
  // Disable body scroll — this is a presentation, not a scroll page
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hide default scrollbar — scenes fill viewport
    document.body.style.overflow = prefersReducedMotion ? 'auto' : 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-[#050608] text-white selection:bg-[#00d2ff] selection:text-[#050608] relative overflow-hidden"
      style={{ height: '100dvh' }}
    >
      <CustomCursor />

      {/* Main presentation stage */}
      <div className="w-full h-full overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
        <PresentationStage />
      </div>

      {/* Fixed navigation bar at bottom */}
      <ChapterNav />
    </div>
  );
}

export default function App() {
  return (
    <PresentationProvider>
      <AppInner />
    </PresentationProvider>
  );
}
