import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Heart, ChevronRight, Play } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface GroomIntroOpeningProps {
  onOpen: () => void;
}

export const GroomIntroOpening: React.FC<GroomIntroOpeningProps> = ({ onOpen }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Play video with audio upon guest clicking "Accept Wedding Invitation"
  const startVideo = () => {
    soundEngine.playChime();
    setHasStarted(true);

    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.currentTime = 0;
      video
        .play()
        .then(() => setIsMuted(false))
        .catch(() => {
          // If browser policy blocks unmuted autoplay, fallback to muted
          video.muted = true;
          setIsMuted(true);
          video.play().catch(console.error);
        });
    }

    // After 2.5 seconds, display the interactive "Open Wedding Invitation" prompt
    setTimeout(() => {
      setShowPrompt(true);
    }, 2500);
  };

  const handleComplete = () => {
    if (isExiting) return;
    setIsExiting(true);
    soundEngine.playChime();

    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#38BDF8', '#F472B6', '#D4AF37', '#FFF9EF', '#BAE6FD'],
      });
    } catch (_) {}

    setTimeout(() => {
      onOpen();
    }, 800);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white overflow-hidden select-none"
        >
          {/* 1. INITIAL ROYAL COVER BEFORE VIDEO STARTS */}
          {!hasStarted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-20 w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0B1526] via-[#111C33] to-[#1E1B4B]"
            >
              {/* Ethereal Glow & Ornate Frame */}
              <div className="absolute inset-4 sm:inset-8 rounded-[32px] sm:rounded-[40px] border border-[#D4AF37]/50 pointer-events-none" />
              <div className="absolute inset-6 sm:inset-10 rounded-[28px] sm:rounded-[36px] border border-sky-400/20 pointer-events-none" />

              {/* Sacred Symbol */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-4xl sm:text-6xl text-[#FDE68A] font-serif mb-3 drop-shadow-[0_4px_20px_rgba(212,175,55,0.7)]"
              >
                ੴ
              </motion.div>

              <span className="text-xs sm:text-sm font-cinzel font-bold tracking-[0.35em] uppercase text-[#D4AF37] mb-2">
                Satnam Waheguru
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-great-vibes text-[#BAE6FD] font-bold leading-tight my-2">
                Deep &amp; Ashi
              </h1>

              <p className="text-xs sm:text-base font-serif-luxury italic text-[#FBCFE8] tracking-wider mb-8">
                Anand Karaj Nuptials • Thursday, 17th December 2026
              </p>

              {/* Central Interactive Button to Receive the Invitation */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={startVideo}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#DB2777] text-white font-sans-body font-bold text-sm sm:text-base tracking-widest uppercase shadow-[0_12px_40px_rgba(2,132,199,0.5)] border-2 border-amber-200 cursor-pointer"
              >
                <Play className="w-5 h-5 text-amber-200 fill-amber-200 transition-transform group-hover:scale-110" />
                <span>Receive Wedding Invitation</span>
                <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
              </motion.button>

              <p className="text-[11px] sm:text-xs font-sans-body text-sky-200/70 mt-4 tracking-wider">
                Click to watch groom hand over the wedding card
              </p>
            </motion.div>
          ) : (
            /* 2. FULLSCREEN GROOM HANDOVER VIDEO */
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video
                ref={(el) => {
                  videoRef.current = el;
                }}
                src="/videos/groom_handover.mp4"
                playsInline
                preload="auto"
                onEnded={handleComplete}
                className="w-full h-full object-cover object-center"
              />

              {/* Subtle top & bottom vignette to highlight controls and button */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

              {/* Top Controls: Sound & Skip Button */}
              <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-auto">
                {/* Sound Toggle */}
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-amber-300/40 text-amber-200 transition-all shadow-xl hover:scale-105 active:scale-95"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-amber-300" /> : <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />}
                  <span className="text-xs font-sans-body hidden sm:inline font-semibold">
                    {isMuted ? 'Sound Off' : 'Sound On'}
                  </span>
                </button>

                {/* Skip to Main Invitation */}
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-sans-body font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  <span>Skip to Invitation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Interactive "Open Card" Button (Appears as card is being offered) */}
              {showPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute bottom-8 sm:bottom-12 z-30 flex flex-col items-center pointer-events-auto px-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComplete}
                    className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#DB2777] text-white font-sans-body font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_10px_35px_rgba(219,39,119,0.5)] border-2 border-amber-200 cursor-pointer animate-pulse"
                  >
                    <Heart className="w-4 h-4 text-amber-200 fill-amber-200" />
                    <span>Open Ashi &amp; Deep's Card</span>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </motion.button>
                  <span className="text-[11px] font-sans-body text-white/80 mt-2 drop-shadow">
                    Click to explore the full wedding invitation
                  </span>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GroomIntroOpening;
