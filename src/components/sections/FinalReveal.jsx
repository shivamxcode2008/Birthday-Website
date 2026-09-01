import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button } from '../ui/primitives';
import { Sparkle, FloatingParticles } from '../ui/Decorations';
import { PandaMascot } from '../ui/PandaMascot';
import { content } from '../../content/content';
import { audio } from '../../lib/audio';
import { cn } from '../../lib/utils';

// Lightweight, finite confetti burst using Framer Motion
function ConfettiBurst({ active }) {
  if (!active) return null;
  
  const colors = ['bg-[#f4b4be]', 'bg-amber-300', 'bg-white', 'bg-[#c5e1a5]', 'bg-[#b3e5fc]'];
  const confettiCount = 50;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(confettiCount)].map((_, i) => {
        // Randomize physics properties
        const xStart = 50; // Center %
        const xEnd = 50 + (Math.random() - 0.5) * 120; // Spread wide
        const yEnd = 100 + Math.random() * 20; // Fall past bottom
        const duration = 2.5 + Math.random() * 2;
        const delay = Math.random() * 0.2;
        const rotation = Math.random() * 360;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = Math.random() > 0.5 ? 'rounded-sm' : 'rounded-full'; // mix of squares and circles
        const size = 6 + Math.random() * 6;

        return (
          <motion.div
            key={i}
            initial={{ 
              top: '30%', 
              left: '50%', 
              opacity: 1,
              scale: 0,
              rotate: 0 
            }}
            animate={{ 
              top: `${yEnd}%`, 
              left: `${xEnd}%`, 
              opacity: [0, 1, 1, 0],
              scale: 1,
              rotate: rotation + 720
            }}
            transition={{ 
              duration, 
              delay, 
              ease: [0.25, 1, 0.5, 1] // Fast out, slow down, then fall
            }}
            className={cn("absolute opacity-80", color, shape)}
            style={{ width: size, height: size }}
          />
        );
      })}
    </div>
  );
}

export function FinalReveal({ onComplete }) {
  // States: 'dark' -> 'glow' -> 'intro' -> 'main' -> 'celebration'
  const [step, setStep] = useState('dark');

  useEffect(() => {
    // Cinematic Timing Sequence
    const timers = [
      setTimeout(() => setStep('glow'), 1000),         // 1.0s: soft central glow
      setTimeout(() => setStep('intro'), 2500),        // 2.5s: "Made this little thing..."
      setTimeout(() => {
        audio.duckBGM();
        audio.playBirthdayMelody();
        setStep('main');
      }, 4500),                                        // 4.5s: "HAPPY BIRTHDAY"
      setTimeout(() => setStep('celebration'), 7500),  // 7.5s: Celebration burst & final message
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    // Fake Ending Cinematic Timers
    if (step === 'fake_ending_dark') {
      const t1 = setTimeout(() => setStep('fake_ending_wait'), 2000);
      return () => clearTimeout(t1);
    }
    if (step === 'fake_ending_wait') {
      const t2 = setTimeout(() => setStep('fake_ending_message'), 4000);
      return () => clearTimeout(t2);
    }
  }, [step]);

  return (
    <Section className="relative overflow-hidden justify-center min-h-[100dvh]">
      
      {/* Cinematic Dark Background with Warm Glow */}
      <motion.div 
        className="absolute inset-0 bg-[#3a2827] z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute bottom-0 inset-x-0 h-[80%] bg-gradient-to-t from-pastel-peach/40 via-pastel-lavender/10 to-transparent pointer-events-none" />
      </motion.div>
      
      {/* Base Particles (Carry over from Candle pause) */}
      <FloatingParticles active={true} count={20} />

      {/* Stage 3: Central Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={step !== 'dark' ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[600px] max-h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0"
      />

      {/* Stage 8: Confetti Burst */}
      <ConfettiBurst active={step === 'celebration'} />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-center min-h-[60vh]">
        
        {/* Stage 4: Intro Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={['intro', 'main', 'celebration'].includes(step) ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 w-full flex justify-center"
        >
          <Typography variant="body" className="text-white/80 font-medium">
            Made this little thing just for you.
          </Typography>
        </motion.div>

        {/* Stage 5: Main Typography */}
        <div className="mt-16 mb-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={['main', 'celebration'].includes(step) ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <Typography variant="muted" className="text-primary/90 text-sm tracking-[0.3em] uppercase mb-2">
              Wishing a very
            </Typography>
            <Typography variant="h1" className="text-white text-5xl md:text-6xl tracking-tight leading-none mb-2 drop-shadow-lg">
              HAPPY
            </Typography>
            <Typography variant="h1" className="text-primary text-5xl md:text-6xl tracking-tight leading-none mb-6 drop-shadow-lg">
              BIRTHDAY
            </Typography>
          </motion.div>

          {/* Stage 6: Friend Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={['main', 'celebration'].includes(step) ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="w-full px-4 overflow-hidden relative mt-4 mb-8"
          >
            <Typography variant="script" className="text-7xl md:text-8xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              {content.global.friendName}
            </Typography>
            {/* Sparkles around name */}
            <Sparkle className="absolute top-0 left-4 text-pastel-yellow w-6 h-6" delay={3.5} />
            <Sparkle className="absolute bottom-0 right-4 text-pastel-lavender w-8 h-8" delay={3.8} />
          </motion.div>
        </div>

        {/* Stage 6.5: Emotional Final Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={step === 'celebration' ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="mt-4 mb-8 z-20 relative"
        >
          <div className="bg-white p-2 pb-8 shadow-2xl rounded-sm border border-black/5 rotate-2 relative">
            <img 
              src="/assets/photo5.jpg" 
              alt="Final memory" 
              className="w-full max-w-[240px] md:max-w-[300px] h-auto rounded-sm object-cover"
              onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full aspect-[4/5] bg-gray-100 flex items-center justify-center text-xs text-gray-400">Photo missing</div>'; }}
            />
            <Typography variant="script" className="absolute bottom-2 inset-x-0 text-center text-xl text-black/70">
              Best year yet.
            </Typography>
          </div>
        </motion.div>

        {/* Stage 7: Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={step === 'celebration' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          className="max-w-sm z-20"
        >
          <Typography variant="body" className="text-white/90 text-lg leading-relaxed font-medium">
            {content.final.message}
          </Typography>
        </motion.div>

        {/* Panda Celebration! */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={step === 'celebration' ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          className="mt-12 mb-4"
        >
          <PandaMascot pose="celebrating" className="scale-125" />
        </motion.div>

        {/* Decorative Sparkles that pop with the celebration */}
        <AnimatePresence>
          {step === 'celebration' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 pointer-events-none"
            >
              <Sparkle className="absolute top-[20%] left-[10%] text-white w-8 h-8" delay={0.1} />
              <Sparkle className="absolute top-[30%] right-[15%] text-primary w-6 h-6" delay={0.3} />
              <Sparkle className="absolute bottom-[20%] left-[20%] text-accent w-10 h-10" delay={0.5} />
              <Sparkle className="absolute bottom-[25%] right-[10%] text-white w-5 h-5" delay={0.2} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Stage 9: FINISH Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={step === 'celebration' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, delay: 3 }} // Appears long after celebration starts
        className="absolute bottom-12 w-full flex flex-col items-center justify-center z-20 pointer-events-none"
      >
        <Typography variant="muted" className="mb-2 text-white/50 text-sm italic">
          Wait... birthday celebration khatam ho gaya. 👀
        </Typography>
        <Button 
          onClick={() => { audio.playPop(); onComplete(); }} 
          variant="ghost" 
          className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 pointer-events-auto"
        >
          FINISH
        </Button>
      </motion.div>
    </Section>
  );
}
