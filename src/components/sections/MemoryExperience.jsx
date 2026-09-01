import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button } from '../ui/primitives';
import { Sparkle, FloatingParticles, DecorativeContainer, DoodleArrow, WashiTape } from '../ui/Decorations';
import { PandaMascot } from '../ui/PandaMascot';
import { EmptyPhotoWindow } from '../ui/EmptyPhotoWindow';
import { audio } from '../../lib/audio';

export function MemoryExperience({ onComplete }) {
  const [view, setView] = useState('intro');
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const handleStart = () => {
    audio.playPop();
    setView('memory');
  };

  const togglePhotoExpand = () => {
    audio.playPop();
    setIsPhotoExpanded(!isPhotoExpanded);
  };

  return (
    <Section className="relative overflow-hidden justify-center min-h-[100dvh]">
      
      {/* Scrapbook Table Background */}
      <div className="absolute inset-0 bg-[#fdfbf7] opacity-50 z-[-1]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #e5e5f7 20px)' }} />

      <AnimatePresence mode="wait">
        
        {/* INTRO VIEW */}
        {view === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center w-full max-w-sm px-6"
          >
            <Typography variant="h2" className="text-primary mb-4">
              A little moment worth keeping ✨
            </Typography>
            <Typography variant="body" className="mb-8 text-text/80">
              Because we don't take enough photos.
            </Typography>
            <Button onClick={handleStart} variant="primary" className="px-12">
              See it &rarr;
            </Button>
            <PandaMascot pose="curious" className="absolute -bottom-4 right-6 scale-90" />
          </motion.div>
        )}

        {/* SINGLE MEMORY HERO VIEW */}
        {view === 'memory' && (
          <motion.div
            key="memory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full h-full relative"
          >
            {/* Ambient background particles */}
            <DecorativeContainer className="inset-0 pointer-events-none z-0">
              <FloatingParticles active={true} count={12} />
              <DoodleArrow className="absolute top-[20%] left-4 w-12 h-12 text-pastel-blush/60 rotate-45" />
            </DecorativeContainer> 

            {/* EXPANDED MODAL OVERLAY */}
            <AnimatePresence>
              {isPhotoExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer touch-manipulation"
                  onClick={togglePhotoExpand}
                >
                  <motion.div
                    layoutId="hero-photo-container"
                    className="relative w-full max-w-lg bg-white p-2 md:p-4 rounded-md shadow-2xl"
                  >
                    {!photoError ? (
                      <img 
                        src="/assets/photo3.jpg" 
                        alt="Anjali Memory" 
                        className="w-full h-auto max-h-[80vh] object-contain rounded"
                      />
                    ) : (
                      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center text-gray-400 p-8 text-center rounded">
                        <EmptyPhotoWindow label="Waiting for photo upload..." />
                      </div>
                    )}
                    <Typography variant="script" className="text-primary text-center mt-4 text-3xl">
                      Just us ✨
                    </Typography>
                    
                    <PandaMascot pose="happy" className="absolute -bottom-10 -right-6 scale-75" />
                  </motion.div>
                  <div className="absolute top-8 right-8 text-white/50 text-sm font-bold uppercase tracking-widest">
                    Tap to close
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MAIN SCRAPBOOK CARD */}
            <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center">
              <motion.div
                layoutId="hero-photo-container"
                initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                className="w-full bg-[#faf9f7] rounded-sm p-5 pb-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-[#eaeaea] relative cursor-pointer"
                onClick={togglePhotoExpand}
                whileHover={{ scale: 1.02, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Scrapbook Decorations */}
                <WashiTape className="-top-4 left-1/2 -translate-x-1/2 rotate-[-5deg] w-24 bg-pastel-mint/70 z-20" />
                <Sparkle className="absolute -top-4 -right-4 text-pastel-yellow w-6 h-6" delay={1} />
                <Sparkle className="absolute bottom-10 -left-6 text-pastel-blush w-8 h-8" delay={1.5} />
                
                {/* Photo Area */}
                <div className="bg-white rounded p-1 shadow-inner border border-black/5 mb-4 relative overflow-hidden aspect-[4/5] flex items-center justify-center">
                  {!photoError ? (
                    <img 
                      src="/assets/photo3.jpg" 
                      alt="Anjali Memory" 
                      className="w-full h-full object-cover rounded-sm"
                      onError={() => setPhotoError(true)}
                    />
                  ) : (
                    <EmptyPhotoWindow label="Waiting for photo upload..." className="w-full h-full" />
                  )}
                  
                  {/* Subtle glare effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>
                
                {/* Caption */}
                <div className="text-center px-2">
                  <Typography variant="script" className="text-3xl font-bold text-text mb-1 leading-tight">
                    One for the books
                  </Typography>
                  <Typography variant="muted" className="text-sm font-medium">
                    (Tap to expand)
                  </Typography>
                </div>
              </motion.div>

              {/* Continue Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-12 flex flex-col items-center z-10"
              >
                <Typography variant="body" className="mb-4 text-text/80 font-medium">
                  There's one more thing...
                </Typography>
                <Button onClick={() => { audio.playPop(); onComplete(); }} variant="primary" className="px-10 shadow-float">
                  Continue &rarr;
                </Button>
              </motion.div>

              <PandaMascot pose="idle" className="absolute bottom-20 -right-4 scale-90 z-0 opacity-80 pointer-events-none" />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
