import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Dumbbell } from 'lucide-react';
import { KEVIN_DATA } from '../../data/kevinData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Método', href: '#method' },
    { label: 'Servicios', href: '#services' },
    { label: 'MyProgress', href: '#myprogress' },
    { label: 'Planes', href: '#plans' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3.5 bg-[#050608]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#121722] to-[#0a0d14] border border-white/10 flex items-center justify-center group-hover:border-[#0066ff] transition-all duration-300">
            <Dumbbell className="w-5 h-5 text-[#00d2ff] group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-wider text-white group-hover:text-[#00d2ff] transition-colors">
              KEVIN NEFI
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#94a3b8]">
              Personal Trainer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-xs uppercase font-medium tracking-wider text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={KEVIN_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider text-white bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] hover:from-[#00d2ff] hover:to-[#a855f7] shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-all duration-300"
          >
            <span>EMPEZAR →</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-[#0e131f] border border-white/10 text-white hover:border-[#0066ff] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#07090e]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl transition-all">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-sm font-semibold uppercase tracking-wider text-[#cbd5e1] hover:text-[#00d2ff] border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={KEVIN_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full text-center py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest text-white bg-gradient-to-r from-[#0066ff] to-[#8b5cf6] shadow-[0_0_25px_rgba(0,102,255,0.5)]"
          >
            EMPEZAR MI PROCESO →
          </a>
        </div>
      )}
    </header>
  );
};
