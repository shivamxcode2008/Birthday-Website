import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button } from '../ui/primitives';
import { Envelope } from '../ui/Envelope';
import { Sparkle, DecorativeContainer, FloatingParticles, WashiTape, DoodleArrow } from '../ui/Decorations';
import { PandaMascot } from '../ui/PandaMascot';
import { content } from '../../content/content';
import { audio } from '../../lib/audio';

export function OpeningExperience({ onComplete }) {
  // State machine: 'closed' -> 'wiggling' -> 'opening' -> 'opened'
  const [envelopeState, setEnvelopeState] = useState('closed');

  const handleEnvelopeTap = () => {
    if (envelopeState !== 'closed') return;
    
    // Tactile reaction
    audio.playPop();
    setEnvelopeState('opening');
    
    // SFX timing (synced with Envelope.jsx internal timers)
    setTimeout(() => audio.playOpen(), 600); // Flap lifts / sliding starts
    setTimeout(() => audio.playSlide(), 1200); // Letter emerges
    
    // Fully opened and ready to transition
    setTimeout(() => {
      audio.playSuccess();
      setEnvelopeState('opened');
    }, 1800);
  };

  const isOpened = envelopeState !== 'closed'; // True as soon as user clicks

  return (
    <Section className="relative overflow-hidden justify-center min-h-[100dvh]">
      
      {/* Background atmosphere */}
      <DecorativeContainer className="inset-0 pointer-events-none">
        <FloatingParticles active={isOpened} count={15} />
      </DecorativeContainer>

      {/* Intro Text */}
      <div className="flex-1 flex flex-col items-center justify-end pb-8 z-10 min-h-[120px]">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Typography variant="body" className="mb-1 tracking-wide font-medium text-text/80">
                {content.invitation.envelopeText}
              </Typography>
              <Typography variant="muted" className="text-sm uppercase tracking-widest font-bold text-primary">
                TAP TO OPEN ✨
              </Typography>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center"
            >
              <Typography variant="h2" className="mb-2 text-primary text-3xl">
                A Birthday Surprise
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Centerpiece: The Envelope */}
      <div className="flex-none relative z-20 flex items-center justify-center my-4">
        
        {/* Stationery Environment */}
        <DecorativeContainer className="w-[120%] h-[120%] -z-10 flex items-center justify-center opacity-90">
          {/* Paper sheet background behind envelope */}
          <div className="absolute w-[280px] h-[200px] bg-[#fffcf9] rounded-sm shadow-md rotate-2 border border-[#fcebe9]" />
          
          {/* PHOTO 1 - Small Polaroid */}
          <motion.div 
            initial={{ opacity: 0, rotate: -20, x: -50, y: 30 }}
            animate={{ opacity: 1, rotate: -15, x: -70, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bg-white p-1 pb-4 shadow-md rounded-sm border border-black/5 z-0"
          >
            <div className="w-16 h-16 bg-gray-100 overflow-hidden">
              <img src="/assets/photo1.jpg" alt="Anjali" className="w-full h-full object-cover grayscale opacity-80" onError={(e) => e.target.style.display='none'} />
            </div>
            <div className="text-[6px] font-script text-center mt-1 text-black/50">For you</div>
          </motion.div>

          <WashiTape className="-top-10 left-4 rotate-[-12deg] bg-pastel-mint/80 w-20 shadow-sm" />
          <WashiTape className="bottom-0 -right-6 rotate-[25deg] bg-pastel-lavender/70 w-24 shadow-sm" />
          <DoodleArrow className="absolute -bottom-14 left-0 w-12 h-12 text-primary rotate-[-15deg] opacity-70" />
          
          <div className="absolute top-16 -right-10 w-10 h-10 bg-pastel-yellow rounded-full shadow-soft flex items-center justify-center rotate-12 drop-shadow-md">
            <span className="text-sm">✨</span>
          </div>
          
          {/* Panda Peeking from behind the envelope */}
          <PandaMascot 
            pose={
              envelopeState === 'opened' ? 'happy' : 
              envelopeState === 'opening' ? 'surprised' : 
              envelopeState === 'wiggling' ? 'surprised' : 
              'peeking'
            } 
            className="absolute -top-16 right-4 scale-90 z-[-1]" 
          />
        </DecorativeContainer>

        {/* Sparkle burst on open */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              <DecorativeContainer className="w-full h-full">
                <Sparkle className="absolute -top-12 left-10 text-primary w-6 h-6" delay={0.4} />
                <Sparkle className="absolute -top-4 -right-8 text-primary w-8 h-8" delay={0.5} />
                <Sparkle className="absolute bottom-10 -left-6 text-accent w-5 h-5" delay={0.6} />
              </DecorativeContainer>
            </motion.div>
          )}
        </AnimatePresence>

        <Envelope 
          isOpen={isOpened} 
          onClick={handleEnvelopeTap} 
        />
      </div>

      {/* Call to action to proceed to the next phase */}
      <div className="flex-1 flex flex-col items-center justify-start pt-12 z-10 min-h-[120px]">
        <AnimatePresence>
          {envelopeState === 'opened' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button onClick={onComplete} variant="primary" className="shadow-soft px-10">
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </Section>
  );
}
