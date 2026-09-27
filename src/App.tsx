import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { HeroSection } from './sections/HeroSection';
import { ProblemSection } from './sections/ProblemSection';
import { MethodSection } from './sections/MethodSection';
import { ServicesSection } from './sections/ServicesSection';
import { MyProgressSection } from './sections/MyProgressSection';
import { PhilosophySection } from './sections/PhilosophySection';
import { ValuesSection } from './sections/ValuesSection';
import { PricingSection } from './sections/PricingSection';
import { ContactSection } from './sections/ContactSection';

export default function App() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#ff003c] selection:text-white relative">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <HeroSection />
        <PhilosophySection />
        <ProblemSection />
        <MethodSection />
        <ServicesSection />
        <MyProgressSection />
        <ValuesSection />
        <PricingSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
