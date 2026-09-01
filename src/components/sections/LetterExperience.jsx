import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button } from '../ui/primitives';
import { FoldedNote } from '../ui/FoldedNote';
import { Sparkle, DecorativeContainer, FloatingParticles, WashiTape } from '../ui/Decorations';
import { PandaMascot } from '../ui/PandaMascot';
import { content } from '../../content/content';
import { audio } from '../../lib/audio';

// Animation variants for staggering the letter text
const letterContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8, // Slow, comfortable reading pace
      delayChildren: 0.5,
    }
  }
};

const textFade = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: "easeOut" }
  }
};

export function LetterExperience({ onComplete }) {
  // view: 'intro' | 'note' | 'reading'
  const [view, setView] = useState('intro');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (view === 'intro') {
      const timer = setTimeout(() => setView('note'), 2500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleNoteTap = () => {
    // Small delay to let the tap animation (scale down) play out
    audio.playOpen();
    setTimeout(() => {
      setView('reading');
    }, 300);
  };

  // Scroll to bottom when letter finishes revealing (optional, but helps if letter is long)
  // We'll let the user scroll naturally instead of forcing it, to keep it calm.

  return (
    <Section className="relative overflow-hidden justify-center min-h-[100dvh]">
      <AnimatePresence mode="wait">
        
        {/* INTRO VIEW */}
        {view === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center w-full px-6"
          >
            <Typography variant="body" className="text-text/80 text-lg">
              And now, something a little more personal.
            </Typography>
          </motion.div>
        )}

        {/* FOLDED NOTE VIEW */}
        {view === 'note' && (
          <motion.div
            key="note"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <FoldedNote onClick={handleNoteTap} />
          </motion.div>
        )}

        {/* OPEN LETTER VIEW */}
        {view === 'reading' && (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full flex flex-col items-center max-h-[100dvh] overflow-y-auto pt-16 pb-24 px-4 custom-scrollbar"
            ref={scrollRef}
          >
            {/* Atmosphere */}
            <DecorativeContainer className="inset-0 pointer-events-none opacity-50 mix-blend-multiply">
              <FloatingParticles active={view === 'reading'} count={10} />
            </DecorativeContainer>

            <div className="w-full max-w-sm relative">
              <Sparkle className="absolute -top-6 -right-2 text-primary w-5 h-5 z-20" delay={2} />
              
              {/* The physical paper */}
              <div className="bg-[#fdfcfb] w-full rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-black/[0.03] p-8 md:p-10 relative z-10">
                
                {/* Washi Tape */}
                <WashiTape className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg] bg-pastel-mint/60 w-32 shadow-sm z-20" />

                {/* Subtle paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

                <motion.div 
                  variants={letterContainer} 
                  initial="hidden" 
                  animate="visible"
                  className="relative z-10"
                >
                  <motion.p variants={textFade} className="font-script text-3xl md:text-4xl text-primary mb-8 transform -rotate-1">
                    {content.letter.greeting}
                  </motion.p>
                  
                  <div className="space-y-6">
                    {content.letter.paragraphs.map((paragraph, idx) => (
                      <motion.p key={idx} variants={textFade} className="text-text/90 font-medium leading-[1.8] text-[15px] md:text-[16px]">
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div variants={textFade} className="mt-12 text-right">
                    <p className="text-text/70 mb-2 text-sm">{content.letter.closing}</p>
                    <p className="font-script text-4xl text-primary transform -rotate-2">{content.letter.signature}</p>
                  </motion.div>
                </motion.div>
              </div>

              {/* PHOTO 4 - Taped Photograph alongside letter */}
              <motion.div
                initial={{ opacity: 0, rotate: 10, x: 20 }}
                animate={{ opacity: 1, rotate: 5, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute -bottom-8 -right-6 w-32 bg-white p-2 pb-6 shadow-lg border border-black/5 rounded-sm z-20"
              >
                <img 
                  src="/assets/photo4.jpg" 
                  alt="Us" 
                  className="w-full aspect-[4/5] object-cover rounded-sm grayscale-[10%]"
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full aspect-[4/5] bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">Photo missing</div>'; }}
                />
                <WashiTape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-8deg] bg-pastel-yellow/80 w-16 shadow-sm" />
                <div className="text-[8px] font-script text-center mt-2 text-black/60">Good times</div>
              </motion.div>

              {/* Reveal the Continue button after the letter text has mostly appeared */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 4 }} // Wait for reading stagger
                className="mt-12 flex flex-col items-center text-center relative z-20"
              >
                <Typography variant="body" className="mb-4 text-text/80 font-medium">
                  There's one last birthday thing...
                </Typography>
                <Button onClick={() => { audio.playPop(); onComplete(); }} variant="primary" className="px-10 shadow-soft">
                  Continue &rarr;
                </Button>
                <PandaMascot pose="idle" className="absolute -bottom-16 right-0 scale-75 opacity-80" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
