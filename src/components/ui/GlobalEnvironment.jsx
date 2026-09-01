import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingParticles, Sparkle } from './Decorations';
import { PandaMascot } from './PandaMascot';
import { audio } from '../../lib/audio';

function EasterEgg({ icon, message, positionClasses, delay = 0, onFind }) {
  const [discovered, setDiscovered] = useState(false);

  const handleClick = () => {
    if (discovered) return;
    audio.playPop();
    setDiscovered(true);
    if (onFind) onFind();
    setTimeout(() => setDiscovered(false), 3000);
  };

  return (
    <div className={`absolute ${positionClasses} pointer-events-auto z-50`}>
      <motion.button 
        onClick={handleClick}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay }}
        className="relative flex flex-col items-center justify-center opacity-30 hover:opacity-100 transition-opacity cursor-pointer outline-none"
      >
        <span className="text-lg drop-shadow-sm">{icon}</span>
        <AnimatePresence>
          {discovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -20, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-10 whitespace-nowrap bg-white/90 px-3 py-1 rounded-full shadow-sm border border-primary/20 text-xs font-bold text-primary"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// This component handles the desktop background environment that lives outside the max-w-md center column
export function GlobalEnvironment({ currentPhase }) {
  
  const isDark = currentPhase === 'candle' || currentPhase === 'reveal';

  // Collectible Stars Logic
  const [starsFound, setStarsFound] = useState(0);

  const handleStarFind = () => {
    setStarsFound(prev => prev + 1);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Global Gradients */}
      <motion.div 
        animate={{ opacity: isDark ? 0.1 : 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-pastel-peach/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pastel-lavender/20 via-transparent to-transparent mix-blend-multiply opacity-80" />
      </motion.div>

      {/* Dark Mode Overlay */}
      <AnimatePresence>
        {isDark && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[#3a2827]/90"
          />
        )}
      </AnimatePresence>

      {/* Global Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Desktop Floating Decor (hidden on small screens) */}
      <div className="hidden md:block">
        <AnimatePresence>
          {currentPhase === 'greeting' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
              <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-pastel-lavender/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute top-[40%] right-[10%] w-48 h-48 bg-pastel-mint/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
              <Sparkle className="absolute top-[30%] left-[15%] text-primary w-8 h-8 opacity-50" delay={1} />
              <Sparkle className="absolute bottom-[30%] right-[15%] text-accent w-12 h-12 opacity-50" delay={2} />
            </motion.div>
          )}

          {currentPhase === 'gifts' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
              <div className="absolute top-[10%] right-[20%] w-64 h-64 bg-pastel-yellow/10 rounded-full blur-3xl" />
              <div className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-pastel-peach/10 rounded-full blur-3xl" />
            </motion.div>
          )}

          {currentPhase === 'memories' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
              <FloatingParticles active={true} count={15} />
            </motion.div>
          )}

          {currentPhase === 'reveal' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
              <FloatingParticles active={true} count={30} />
              <Sparkle className="absolute top-[20%] left-[20%] text-pastel-yellow w-12 h-12 opacity-80" delay={0.5} />
              <Sparkle className="absolute top-[15%] right-[25%] text-pastel-blush w-8 h-8 opacity-80" delay={1.2} />
              <Sparkle className="absolute bottom-[20%] right-[15%] text-pastel-mint w-10 h-10 opacity-80" delay={2.1} />
              <Sparkle className="absolute bottom-[25%] left-[25%] text-white w-6 h-6 opacity-80" delay={1.8} />
              {/* Desktop Panda Celebration */}
              <div className="absolute bottom-10 right-10 opacity-50">
                <PandaMascot pose="celebrating" className="scale-[2]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Secret Collectible Reward: Panda Drop */}
      <AnimatePresence>
        {starsFound >= 3 && !isDark && (
          <motion.div
            initial={{ y: -200, opacity: 0, rotate: 15 }}
            animate={{ y: '20vh', opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="absolute right-[20%] z-50 flex flex-col items-center"
          >
            <div className="bg-white/90 px-4 py-2 rounded-xl shadow-lg border-2 border-primary/20 text-primary font-bold text-sm mb-4">
              You found all 3 stars! ✨
            </div>
            <PandaMascot pose="happy" className="scale-[1.5]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5 Hidden Easter Eggs (Global) */}
      {!isDark && (
        <>
          <EasterEgg icon="⭐" message="Butki mode activated 😂" positionClasses="top-12 left-[5%]" delay={0} onFind={handleStarFind} />
          <EasterEgg icon="💗" message="Nice try 😂" positionClasses="bottom-20 left-[10%]" delay={1.5} />
          <EasterEgg icon="🐼" message="Okay detective..." positionClasses="top-[40%] right-[5%]" delay={0.8} />
          <EasterEgg icon="⭐" message="Wasn't supposed to find that 😭" positionClasses="top-32 right-[15%]" delay={2.1} onFind={handleStarFind} />
          <EasterEgg icon="⭐" message="You're too good at this." positionClasses="bottom-32 right-[8%]" delay={1.1} onFind={handleStarFind} />
        </>
      )}

    </div>
  );
}
