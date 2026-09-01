import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button } from '../ui/primitives';
import { Sparkle, FloatingParticles, DecorativeContainer } from '../ui/Decorations';
import { PandaMascot } from '../ui/PandaMascot';
import { cn } from '../../lib/utils';
import { audio } from '../../lib/audio';

// Helper component for the Cake and Candle
function Cake({ candleState, onBlowOut }) {
  const isBurning = candleState === 'intro' || candleState === 'ready';
  const isExtinguishing = candleState === 'extinguishing';
  const isExtinguished = candleState === 'wish_complete' || candleState === 'final_reveal_ready';

  return (
    <div className="relative mt-20 mb-10 flex flex-col items-center">
      
      {/* The Candle Interaction Area */}
      <motion.button
        className="absolute -top-16 z-20 w-16 h-24 flex flex-col items-center justify-end cursor-pointer outline-none group"
        onClick={isBurning ? onBlowOut : undefined}
        whileTap={isBurning ? { scale: 0.9, y: 2 } : {}}
        aria-label={isBurning ? "Tap to blow out candle" : "Candle extinguished"}
        disabled={!isBurning}
      >
        {/* Flame */}
        <AnimatePresence>
          {!isExtinguished && !isExtinguishing && (
            <motion.div
              key="flame"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.05, 0.95, 1.1, 1],
                rotate: [0, -2, 2, -1, 0]
              }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-4 h-7 bg-gradient-to-b from-amber-200 to-amber-500 rounded-[50%_50%_20%_20%/_60%_60%_40%_40%] shadow-[0_0_20px_rgba(251,191,36,0.8)] origin-bottom mb-1"
            />
          )}
        </AnimatePresence>

        {/* Smoke (appears exactly when flame exits) */}
        <AnimatePresence>
          {isExtinguishing && (
            <motion.div
              key="smoke"
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 0.6, scale: 1.5, y: -30, filter: "blur(2px)" }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-2 w-2 h-6 bg-gray-400 rounded-full mix-blend-multiply"
            />
          )}
        </AnimatePresence>

        {/* Wick */}
        <div className="w-[2px] h-2 bg-gray-800 rounded-full mb-0.5" />

        {/* Candle Stick */}
        <div className="w-3 h-12 bg-[#fffaf0] border border-black/5 rounded-sm overflow-hidden relative shadow-sm">
          {/* Diagonal Stripes */}
          <div 
            className="absolute inset-0 opacity-40" 
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #f4b4be 4px, #f4b4be 8px)' }} 
          />
        </div>
      </motion.button>

      {/* The Cake */}
      <div className="relative w-48 h-20 bg-pastel-blush rounded-t-xl rounded-b-md shadow-float border border-black/5 mt-10 z-10 flex items-start justify-center overflow-hidden">
        {/* Frosting base */}
        <div className="absolute top-0 inset-x-0 h-8 bg-white/60 backdrop-blur-sm" />
        
        {/* Cute frosting drips */}
        <div className="absolute top-7 flex gap-1 px-1">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="w-7 h-4 bg-white/60 rounded-b-full"
              style={{ transform: `translateY(${i % 2 === 0 ? '-2px' : '2px'})` }}
            />
          ))}
        </div>

        {/* Sprinkles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-6 w-1 h-2 bg-accent rounded-full rotate-45" />
          <div className="absolute top-3 left-16 w-1 h-2 bg-white rounded-full -rotate-12" />
          <div className="absolute top-5 right-12 w-1.5 h-1.5 bg-accent rounded-full" />
          <div className="absolute top-3 right-6 w-1 h-2 bg-white rounded-full rotate-12" />
        </div>
        
        {/* Cake Shadow */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-black/[0.02]" />
      </div>

      {/* Panda Watcher */}
      <PandaMascot pose={isExtinguished ? 'surprised' : 'idle'} className="absolute bottom-0 -right-16 scale-75 z-0" />
    </div>
  );
}

export function CandleExperience({ onComplete }) {
  // States: intro -> ready -> extinguishing -> wish_complete -> final_reveal_ready
  const [step, setStep] = useState('intro');

  useEffect(() => {
    if (step === 'intro') {
      const timer = setTimeout(() => setStep('ready'), 2500);
      return () => clearTimeout(timer);
    }
    
    if (step === 'extinguishing') {
      const timer = setTimeout(() => setStep('wish_complete'), 1000);
      return () => clearTimeout(timer);
    }

    if (step === 'wish_complete') {
      const timer = setTimeout(() => setStep('final_reveal_ready'), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleBlowOut = () => {
    if (step === 'ready') {
      audio.playBlowout();
      setStep('extinguishing');
    }
  };

  const isDarkened = step === 'wish_complete' || step === 'final_reveal_ready';

  return (
    <Section className={cn(
      "relative overflow-hidden justify-center min-h-[100dvh] transition-colors duration-1000",
      isDarkened ? "bg-background/95" : "bg-transparent"
    )}>
      
      {/* Magic Background Change when candle is out */}
      <AnimatePresence>
        {isDarkened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-stone-900/40 pointer-events-none z-10 transition-colors duration-2000"
          />
        )}
      </AnimatePresence>
      
      {/* Magical Background Stars appearing in the dark state */}
      <AnimatePresence>
        {isDarkened && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 pointer-events-none z-20"
          >
            <FloatingParticles active={true} count={15} />
            <Sparkle className="absolute top-1/4 left-1/4 text-primary w-6 h-6" delay={0} />
            <Sparkle className="absolute top-1/3 right-1/4 text-accent w-4 h-4" delay={0.5} />
            <Sparkle className="absolute bottom-1/3 left-1/3 text-primary w-5 h-5" delay={1} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center w-full px-6 text-center mt-[-10dvh]">
        
        {/* Text Area */}
        <div className="h-24 flex items-end justify-center mb-4">
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div
                key="introText"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="body" className="text-text/80 font-medium">
                  There's one last birthday thing...
                </Typography>
              </motion.div>
            )}

            {(step === 'ready' || step === 'extinguishing') && (
              <motion.div
                key="readyText"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <Typography variant="h2" className="text-primary mb-2">
                  Make a wish ✨
                </Typography>
                <Typography variant="muted" className="text-sm tracking-widest uppercase">
                  (Tap the candle)
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* The Cake & Candle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Cake candleState={step} onBlowOut={handleBlowOut} />
        </motion.div>

        {/* Final Continue Button */}
        <div className="h-24 mt-12 flex items-center justify-center">
          <AnimatePresence>
            {step === 'final_reveal_ready' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Button onClick={onComplete} variant="primary" className="px-12 shadow-float">
                  Continue &rarr;
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </Section>
  );
}
