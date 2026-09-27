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
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
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
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#00d2ff] selection:text-[#050608] relative">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        {/* 1. Hero — first impression, 3D digital character */}
        <HeroSection />

        {/* 2. Philosophy — cinematic statement of belief */}
        <PhilosophySection />

        {/* 3. Problem — why people struggle (pain points) */}
        <ProblemSection />

        {/* 4. Method — Kevin's training system */}
        <MethodSection />

        {/* 5. Services — what Kevin offers */}
        <ServicesSection />

        {/* 6. MyProgress — app feature showcase */}
        <MyProgressSection />

        {/* 7. Values — who Kevin is */}
        <ValuesSection />

        {/* 8. Pricing — transparent plans */}
        <PricingSection />

        {/* 9. Contact — final CTA */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
