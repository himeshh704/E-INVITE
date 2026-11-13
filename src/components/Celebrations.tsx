import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FeatureCarousel } from './ui/feature-carousel';

export const Celebrations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={sectionRef} id="celebrations" className="relative py-8 sm:py-20 px-0 sm:px-6 md:px-12 bg-gradient-to-b from-[#E8F3F8] via-[#FDF2F8] to-[#E0F2FE] text-[#1E293B] overflow-hidden min-h-screen flex flex-col items-center justify-center">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div style={{ y: parallaxY }} className="w-full max-w-7xl mx-auto relative z-10 px-0 sm:px-2">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-10 px-4 space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-white/80 border border-[#D4AF37]/50 text-[#0284C7] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
            <span className="text-[10px] sm:text-xs uppercase font-cinzel tracking-[0.25em] font-bold text-[#0369A1]">
              WEDDING CELEBRATION PROGRAMME
            </span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#0F172A] tracking-tight">
            Events &amp; Ceremonies
          </h2>
          <p className="text-xs sm:text-sm font-cormorant italic text-[#64748B] max-w-xl mx-auto hidden sm:block">
            Explore the sacred Anand Karaj festivities, venues, timings, and celebratory gatherings for Ashi &amp; Deep.
          </p>
        </div>

        {/* Feature Carousel Component for Events */}
        <FeatureCarousel />

      </motion.div>
    </section>
  );
};


