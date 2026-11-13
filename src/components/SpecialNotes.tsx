import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const SpecialNotes: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="special-notes"
      className="min-h-screen py-24 sm:py-32 px-6 md:px-12 bg-[#FFF9EF] text-[#291C1A] flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Subtle paper texture & ambient warmth overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FAF2E4] via-[#FFF9EF] to-[#F5EAD7] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        style={{ y: parallaxY }}
        className="max-w-2xl w-full mx-auto relative z-10 text-center space-y-12 sm:space-y-16 will-change-transform"
      >
        {/* Top Minimal Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex flex-col items-center"
        >
          <span className="text-3xl sm:text-4xl font-serif text-[#0369A1] font-bold tracking-widest mb-1 select-none">
            ੴ
          </span>
          <span className="text-[10px] sm:text-xs font-cinzel font-semibold tracking-[0.3em] text-[#B5965A] uppercase">
            A Cordial Invitation
          </span>
          <div className="w-16 h-[1px] bg-[#B5965A]/30 mx-auto mt-4" />
        </motion.div>

        {/* Staggered Minimal Typography Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-12 sm:space-y-16"
        >
          {/* A Cordial Invitation From */}
          <motion.div variants={itemVariants} className="space-y-6">
            <span className="text-xs font-cinzel font-semibold uppercase tracking-[0.25em] text-[#B5965A] block">
              With Love &amp; Blessings From Both Families
            </span>

            <div className="space-y-6 font-cormorant text-xl sm:text-2xl text-[#291C1A] leading-relaxed">
              <motion.div variants={itemVariants} className="space-y-1">
                <p className="font-bold text-[#0369A1] tracking-wider uppercase text-2xl sm:text-3xl font-serif-luxury">
                  SD. Satyajit Singh &amp; SDR. Amarpreet Kaur
                </p>
                <p className="text-sm sm:text-base text-[#DB2777] font-sans-body font-medium">
                  (Parents of the Bride)
                </p>
              </motion.div>

              <div className="w-16 h-[1px] bg-[#B5965A]/25 mx-auto" />

              <motion.div variants={itemVariants} className="space-y-1">
                <p className="font-bold text-[#0369A1] tracking-wider uppercase text-2xl sm:text-3xl font-serif-luxury">
                  Vicky Singh &amp; Poonam Kaur
                </p>
                <p className="text-sm sm:text-base text-[#0284C7] font-sans-body font-medium">
                  (Parents of the Groom)
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Minimal Line Separator */}
          <motion.div variants={itemVariants} className="w-16 h-[1px] bg-[#B5965A]/30 mx-auto" />

          {/* Special Blessings of Grandparents */}
          <motion.div variants={itemVariants} className="space-y-6">
            <span className="text-xs font-cinzel font-semibold uppercase tracking-[0.25em] text-[#B5965A] block">
              With Celestial Blessings of Grandparents
            </span>
            <div className="space-y-4 font-cormorant text-xl sm:text-2xl text-[#291C1A] leading-relaxed">
              <motion.div variants={itemVariants} className="space-y-0.5">
                <p className="font-semibold text-[#0369A1] text-2xl sm:text-3xl font-serif-luxury">
                  SD. Kesar Singh &amp; SDR. Jogendra Kaur
                </p>
                <p className="text-xs sm:text-sm text-[#7A5C3D] font-sans-body">
                  (Grandparents of the Bride)
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-0.5 pt-2">
                <p className="font-semibold text-[#DB2777] text-2xl sm:text-3xl font-serif-luxury">
                  Jameet Singh &amp; Late Raj Kaur
                </p>
                <p className="text-xs sm:text-sm text-[#7A5C3D] font-sans-body">
                  (Grandparents of the Groom)
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Minimal Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-6"
        >
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#B5965A]/40 to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SpecialNotes;
