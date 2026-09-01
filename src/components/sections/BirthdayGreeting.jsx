import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button, Card } from '../ui/primitives';
import { content } from '../../content/content';
import { Sparkle, DecorativeContainer, FloatingParticles } from '../ui/Decorations';
import { PandaMascot } from '../ui/PandaMascot';
import { audio } from '../../lib/audio';

export function BirthdayGreeting({ onComplete }) {
  // State machine for the greeting sequence
  // 0: Intro ("Hey...")
  // 1: Birthday Reveal ("Happy Birthday!")
  // 2: Interactive Prompt ("Ready to see what I made?")
  // 3: User Interacted (Reaction plays)
  // 4: Tease Reveal ("Good. Because I'm not done yet.")
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Auto-advance the initial reading sequence
    const t1 = setTimeout(() => setStep(1), 1200); // Reveal "Happy Birthday!"
    const t2 = setTimeout(() => setStep(2), 3200); // Reveal the prompt
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleInteraction = () => {
    if (step !== 2) return;
    audio.playPop();
    setStep(3);
    // After reaction, show the final continue state
    setTimeout(() => setStep(4), 1200);
  };

  return (
    <Section className="relative flex-col items-center justify-center min-h-[100dvh]">
      
      {/* Background atmosphere */}
      <DecorativeContainer className="inset-0 pointer-events-none">
        <FloatingParticles active={true} count={20} />
        <div className="absolute top-1/4 -left-4 w-16 h-20 bg-pastel-blush/30 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-sm" />
        <div className="absolute bottom-1/3 -right-8 w-20 h-24 bg-pastel-lavender/30 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-sm" />
        <div className="absolute top-1/3 right-10 w-12 h-16 bg-pastel-yellow/30 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-sm" />
      </DecorativeContainer>

      {/* 1. Main Greeting Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto z-10 min-h-[250px]">
        <AnimatePresence>
          {step >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center w-full relative"
            >
              <Typography variant="h3" className="text-primary mb-2 text-2xl drop-shadow-sm">
                Hey, {content.global.friendName} ✨
              </Typography>
              <PandaMascot pose="waving" className="absolute -bottom-4 right-2 scale-110 rotate-12" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-center relative mt-2 w-full"
            >
              <Typography variant="h1" className="text-text leading-tight text-[4rem] drop-shadow-md">
                Happy<br/>Birthday!
              </Typography>

              {/* Cute Reaction around the text */}
              <DecorativeContainer className="inset-0">
                <Sparkle className="absolute -top-4 -left-4 text-primary w-6 h-6" delay={0.1} />
                <Sparkle className="absolute -bottom-2 -right-2 text-accent w-8 h-8" delay={0.3} />
                <Sparkle className="absolute top-1/2 -right-6 text-primary w-4 h-4" delay={0.2} />
              </DecorativeContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Interactive Area */}
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-xs mx-auto z-20 min-h-[250px]">
        <AnimatePresence mode="wait">
          {step === 2 && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <Typography variant="body" className="text-center font-medium text-text/80">
                Okay... ready to see what I made? 👀
              </Typography>
              <Button 
                onClick={handleInteraction} 
                variant="primary" 
                className="shadow-soft px-12"
              >
                Show me!
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="reaction"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1.2, 1] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex items-center justify-center h-24"
            >
              <div className="relative">
                <Sparkle className="text-primary w-12 h-12" delay={0} />
                <Sparkle className="absolute -top-2 -right-4 text-accent w-6 h-6" delay={0.1} />
                <Sparkle className="absolute -bottom-2 -left-4 text-accent w-6 h-6" delay={0.2} />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="tease"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <Card className="bg-surface/80 backdrop-blur border-none shadow-soft text-center py-5 px-6">
                <Typography variant="body" className="mb-0">
                  Good. Because I'm not done yet. 😌
                </Typography>
              </Card>
              <Button 
                onClick={onComplete} 
                variant="outline"
                className="bg-white/50 backdrop-blur"
              >
                Continue &rarr;
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </Section>
  );
}
