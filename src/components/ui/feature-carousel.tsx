"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  MapPin,
  Sun,
  Wine,
  Music,
  Clock,
  Shirt,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "../../lib/utils";

export interface EventFeatureItem {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  image: string;
  venue: string;
  time: string;
  dressCode: string;
  description: string;
}

const EVENTS_DATA: EventFeatureItem[] = [
  {
    id: "sahej-path-samapti",
    label: "Sahej Path Samapti",
    sublabel: "8 Dec • Morning",
    icon: Sparkles,
    image: "/images/ad_event_sahej_path.jpg",
    venue: "Gurudwara Gurunanak Pura, Dhanbad",
    time: "Tuesday, 8th Dec • Morning Onwards",
    dressCode: "Traditional / Head Covered",
    description: "Seeking the divine blessings of Sri Guru Granth Sahib Ji as we commence the wedding celebrations of Ashi & Deep.",
  },
  {
    id: "ring-ceremony",
    label: "Cheers to Forever (Ring Ceremony)",
    sublabel: "15 Dec • 7:00 PM",
    icon: Wine,
    image: "/images/ad_event_ring_ceremony.jpg",
    venue: "The Grand, Murgasol, Asansol",
    time: "Tuesday, 15th Dec • 7:00 PM Onwards",
    dressCode: "Evening Glitz & Glamour",
    description: "An evening of sparkling rings, champagne toasts, melodious music, and celebrating the beginning of forever.",
  },
  {
    id: "phoolon-ki-haldi",
    label: "Phoolon Ki Haldi",
    sublabel: "16 Dec • 11:00 AM",
    icon: Sun,
    image: "/images/ad_event_haldi.jpg",
    venue: "The Grand, Murgasol, Asansol",
    time: "Wednesday, 16th Dec • 11:00 AM Onwards",
    dressCode: "Sunshine Yellow & Soft Blush Rose",
    description: "A joyous celebration of auspicious turmeric, a shower of fragrant rose petals, dholki tunes, and bright smiles.",
  },
  {
    id: "band-baaja-brigade",
    label: "Band Baaja Brigade (Baraat)",
    sublabel: "16 Dec • 7:00 PM",
    icon: Music,
    image: "/images/ad_event_baraat.jpg",
    venue: "The Grand, Murgasol, Asansol",
    time: "Wednesday, 16th Dec • 7:00 PM Onwards",
    dressCode: "Royal Festive Punjabi",
    description: "High-octane Punjabi dhol beats, brass band fanfare, and energetic bhangra as the groom's brigade arrives in grand style!",
  },
  {
    id: "anand-karaj",
    label: "The Blissful Union (Anand Karaj)",
    sublabel: "17 Dec • 11:00 AM",
    icon: Heart,
    image: "/images/ad_event_anand_karaj.jpg",
    venue: "Shri Guru Nanak Gurudwara (Lunch @ The Grand)",
    time: "Thursday, 17th Dec • 11:00 AM Onwards",
    dressCode: "Pastel Elegance / Gurdwara Formal",
    description: "The holy Four Laavan nuptials uniting Ashi & Deep into one spiritual light before Sri Guru Granth Sahib Ji, followed by lunch at The Grand.",
  },
  {
    id: "reception-party",
    label: "Grand Reception Party",
    sublabel: "19 Dec • 7:00 PM",
    icon: Sparkles,
    image: "/images/ad_event_reception.jpg",
    venue: "Asansol Club, Asansol",
    time: "Saturday, 19th Dec • 7:00 PM Onwards",
    dressCode: "Black Tie & Indian Regal Formals",
    description: "A gala night of music, gourmet dining, and celebrations welcoming the newlyweds Ashi & Deep into married life.",
  },
];

const ITEM_HEIGHT = 68;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);

  const currentIndex =
    ((step % EVENTS_DATA.length) + EVENTS_DATA.length) % EVENTS_DATA.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleChipClick = (index: number) => {
    setStep(index);
  };

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = EVENTS_DATA.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-0 sm:px-4 md:p-4">
      <div className="relative overflow-hidden rounded-none sm:rounded-[2.5rem] lg:rounded-[3.5rem] flex flex-col lg:flex-row min-h-[88vh] lg:min-h-[580px] lg:aspect-video border-0 sm:border border-[#D4AF37]/40 shadow-2xl bg-gradient-to-br from-[#0B1526] via-[#111C33] to-[#1E1B4B]">
        
        {/* Mobile Horizontal Pill Strip (< lg screens) */}
        <div className="flex lg:hidden overflow-x-auto scrollbar-none py-3 px-3 gap-2 border-b border-[#D4AF37]/30 bg-gradient-to-r from-[#0B1526] via-[#111C33] to-[#1E1B4B] z-40 shrink-0">
          {EVENTS_DATA.map((feature, index) => {
            const isActive = index === currentIndex;
            const IconComponent = feature.icon;

            return (
              <button
                key={feature.id}
                onClick={() => handleChipClick(index)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all text-left shrink-0 border cursor-pointer",
                  isActive
                    ? "bg-gradient-to-r from-[#38BDF8] via-[#F472B6] to-[#D4AF37] text-white border-white shadow-md font-bold scale-105"
                    : "bg-black/40 text-sky-100/70 border-sky-400/20 hover:border-sky-400/50"
                )}
              >
                <IconComponent className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-white" : "text-[#D4AF37]")} />
                <span className="font-serif-luxury font-bold text-[11px] whitespace-nowrap uppercase">
                  {feature.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop Vertical Navigation Rail (>= lg screens) */}
        <div className="hidden lg:flex w-[42%] h-full relative z-30 flex-col items-start justify-center overflow-hidden pl-12 bg-gradient-to-b from-[#0B1526] via-[#111C33] to-[#1E1B4B]">
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0B1526] via-[#0B1526]/80 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/80 to-transparent z-40" />
          
          <div className="relative w-full h-full flex items-center justify-start z-20">
            {EVENTS_DATA.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(EVENTS_DATA.length / 2),
                EVENTS_DATA.length / 2,
                distance
              );

              const IconComponent = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    className={cn(
                      "relative flex items-center gap-4 px-8 py-3 rounded-full transition-all duration-700 text-left group border cursor-pointer",
                      isActive
                        ? "bg-gradient-to-r from-[#D4AF37] via-[#FDE68A] to-[#B5965A] text-[#291C1A] border-amber-300 shadow-xl z-10 font-bold scale-105"
                        : "bg-black/30 text-amber-100/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500 shrink-0",
                        isActive ? "text-[#0284C7]" : "text-[#D4AF37]"
                      )}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-serif-luxury font-bold text-sm tracking-wide whitespace-nowrap uppercase">
                        {feature.label}
                      </span>
                      <span className="text-[11px] font-sans-body opacity-80 whitespace-nowrap">
                        {feature.sublabel}
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Full-Bleed Event Visual Stage & Card */}
        <div className="flex-1 min-h-[500px] sm:min-h-[560px] lg:h-full relative bg-[#070D19]/90 flex items-center justify-center py-4 sm:py-12 md:py-20 lg:py-12 px-2 sm:px-6 md:px-10 lg:px-8 overflow-hidden border-t lg:border-t-0 lg:border-l border-[#D4AF37]/30">
          
          {/* Mobile Touch / Navigation Arrows */}
          <button
            onClick={prevStep}
            aria-label="Previous Event"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/70 text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-[#291C1A] transition-all shadow-2xl active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextStep}
            aria-label="Next Event"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/70 text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-[#291C1A] transition-all shadow-2xl active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative w-[92%] sm:w-full max-w-[360px] sm:max-w-[390px] md:max-w-[420px] aspect-[3/4] sm:aspect-[4/5] flex items-center justify-center">
            {EVENTS_DATA.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -80 : isNext ? 80 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[1.75rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-3 sm:border-4 md:border-6 border-[#D4AF37] bg-[#0B1526] shadow-2xl origin-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  {/* Active Event Info Backdrop Overlay */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 pt-24 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        {/* Event Title Badge */}
                        <div className="bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#DB2777] text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-[0.2em] w-fit shadow-md mb-2.5 border border-amber-200/60">
                          {index + 1} • {feature.label}
                        </div>

                        {feature.description && (
                          <p className="text-[#FFF9EF]/90 text-xs sm:text-sm font-sans-body mb-2.5 leading-relaxed line-clamp-3">
                            {feature.description}
                          </p>
                        )}

                        {/* Timing & Venue Pills */}
                        <div className="space-y-1.5 text-[11px] sm:text-xs font-sans-body border-t border-[#D4AF37]/40 pt-2 text-[#FFF9EF]/90 pointer-events-auto">
                          <div className="flex items-center gap-1.5 text-amber-200">
                            <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                            <span className="truncate">{feature.time}</span>
                          </div>
                          {feature.venue && (
                            <a
                              href="https://maps.app.goo.gl/PanroztgtnnRfbyLA?g_st=iw"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-amber-200 hover:text-amber-300 transition-colors group/map"
                            >
                              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] group-hover/map:scale-110 transition-transform shrink-0" />
                              <span className="truncate underline underline-offset-2 decoration-[#D4AF37]/60">{feature.venue} 📍</span>
                            </a>
                          )}
                          {feature.dressCode && (
                            <div className="flex items-center gap-1.5 text-amber-200">
                              <Shirt className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                              <span className="truncate">DRESS CODE: {feature.dressCode}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Live Event Indicator */}
                  <div
                    className={cn(
                      "absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#D4AF37]/50",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                    <span className="text-amber-200 text-[9px] sm:text-[10px] font-cinzel uppercase tracking-[0.2em] font-bold">
                      #DeepWedsAshi
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
