import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button, Card } from '../ui/primitives';
import { Sparkle, FloatingParticles, DecorativeContainer, DoodleArrow } from '../ui/Decorations';
import { content } from '../../content/content';
import { audio } from '../../lib/audio';
import { cn } from '../../lib/utils';
import { PandaMascot } from '../ui/PandaMascot';

export function FriendCheckpoint({ onComplete }) {
  // 'intro' -> 'level1' -> 'level2' -> 'level3' -> 'success'
  const [step, setStep] = useState('intro');
  const [inputValue, setInputValue] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const hasCompleted = useRef(false);

  // Automatic transition when access is granted
  useEffect(() => {
    if (step === 'success' && !hasCompleted.current) {
      hasCompleted.current = true;
      const timer = setTimeout(() => {
        onComplete();
      }, 4500); // Wait for the "ACCESS GRANTED" terminal cinematic
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  const handleStart = () => {
    audio.playPop();
    setStep('level1');
  };

  const handleCheckLevel1 = () => {
    const isCorrect = inputValue.trim().toLowerCase() === content.checkpoint.level1.answer.toLowerCase();
    if (isCorrect || inputValue.trim() === 'skip') { // 'skip' for dev ease
      audio.playSuccess();
      setErrorState(false);
      setInputValue('');
      setAttempts(0);
      setStep('level1-success');
      setTimeout(() => setStep('level2'), 1500);
    } else {
      audio.playError();
      setErrorState(true);
      setAttempts(prev => prev + 1);
      setTimeout(() => setErrorState(false), 500);
    }
  };

  const handleCheckLevel2 = (option) => {
    const isCorrect = option === content.checkpoint.level2.answer;
    if (isCorrect || option === 'skip') {
      audio.playSuccess();
      setStep('level2-success');
      setTimeout(() => setStep('level3'), 1500);
    } else {
      audio.playError();
      setErrorState(true);
      setTimeout(() => setErrorState(false), 500);
    }
  };

  const handleCheckLevel3 = () => {
    const isCorrect = inputValue.trim().toLowerCase() === content.checkpoint.level3.answer.toLowerCase();
    if (isCorrect || inputValue.trim() === 'skip') {
      audio.playSuccess();
      setErrorState(false);
      setStep('success');
    } else {
      audio.playError();
      setErrorState(true);
      setAttempts(prev => prev + 1);
      setTimeout(() => setErrorState(false), 500);
    }
  };

  return (
    <Section className="relative overflow-hidden justify-center min-h-[100dvh]">
      
      {/* Ambient Environment */}
      <DecorativeContainer className="inset-0 pointer-events-none">
        <FloatingParticles active={true} count={12} />
        <Sparkle className="absolute top-20 left-10 text-pastel-peach w-6 h-6" delay={0.5} />
        <Sparkle className="absolute bottom-32 right-12 text-pastel-lavender w-8 h-8" delay={1.5} />
        <DoodleArrow className="absolute top-40 right-20 w-12 h-12 text-pastel-mint opacity-60 -rotate-45" />
      </DecorativeContainer>

      <div className="relative z-10 w-full max-w-sm mx-auto px-6">
        <AnimatePresence mode="wait">
          
          {/* INTRO */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center flex flex-col items-center"
            >
              <Typography variant="h2" className="text-primary mb-2 text-3xl">Okay... before I let you in 👀</Typography>
              <Typography variant="body" className="mb-8 text-text/80 font-medium">Let's see if you actually know me.</Typography>
              
              <Card className="w-full bg-white/80 backdrop-blur-sm border border-primary/20 p-8 mb-8 relative shadow-lg">
                <Typography variant="h3" className="text-text mb-2">Friend Checkpoint</Typography>
                <Typography variant="muted">3 tiny questions. That's it.</Typography>
                
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-pastel-yellow rounded-full flex items-center justify-center shadow-md transform rotate-12 border border-white">
                  <span className="text-xl">🔒</span>
                </div>
                
                <PandaMascot pose={errorState ? 'confused' : 'thinking'} className="absolute -bottom-10 -left-6 transform -rotate-12 scale-110" />
              </Card>

              <Button onClick={handleStart} className="w-full shadow-soft hover:shadow-float">Let's see ✨</Button>
            </motion.div>
          )}

          {/* LEVEL 1 */}
          {(step === 'level1' || step === 'level1-success') && (
            <motion.div
              key="level1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <div className="mb-6 relative">
                <Typography variant="muted" className="tracking-widest uppercase text-xs font-bold text-primary mb-2">QUESTION 01</Typography>
                <Typography variant="h3">{content.checkpoint.level1.question}</Typography>
                <PandaMascot pose={errorState ? 'surprised' : 'thinking'} className="absolute -top-8 right-0 scale-75" />
              </div>

              {step === 'level1' ? (
                <div className="flex flex-col gap-4">
                  <motion.input 
                    animate={errorState ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your answer..."
                    className={cn(
                      "w-full px-6 py-4 rounded-xl border-2 bg-white/70 backdrop-blur-md outline-none transition-all font-sans text-lg text-text shadow-sm focus:shadow-md",
                      errorState ? "border-red-400 focus:border-red-500 bg-red-50" : "border-primary/30 focus:border-primary"
                    )}
                  />
                  
                  <AnimatePresence>
                    {errorState && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Typography variant="muted" className="text-red-400 text-sm text-center">Hmm... nice try 👀</Typography>
                      </motion.div>
                    )}
                    {attempts >= 2 && !errorState && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Typography variant="muted" className="text-sm text-center">Hint: {content.checkpoint.level1.hint}</Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button onClick={handleCheckLevel1} disabled={!inputValue.trim()}>Check ✨</Button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-10">
                  <div className="w-16 h-16 bg-pastel-mint text-white rounded-full flex items-center justify-center text-3xl mb-4 shadow-soft">
                    ✓
                  </div>
                  <Typography variant="h3" className="text-pastel-mint">Yep. That's you. 😌</Typography>
                  <PandaMascot pose="happy" className="mt-4 scale-110" />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* LEVEL 2 */}
          {(step === 'level2' || step === 'level2-success') && (
            <motion.div
              key="level2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <div className="mb-6 relative">
                <Typography variant="muted" className="tracking-widest uppercase text-xs font-bold text-primary mb-2">QUESTION 02</Typography>
                <Typography variant="body" className="mb-2 italic text-muted">Okay, let's make this one a little harder...</Typography>
                <Typography variant="h3">{content.checkpoint.level2.question}</Typography>
                <PandaMascot pose={errorState ? 'confused' : 'idle'} className="absolute -top-6 right-0 scale-75" />
              </div>

              {step === 'level2' ? (
                <motion.div animate={errorState ? { x: [-10, 10, -10, 10, 0] } : {}} className="flex flex-col gap-3">
                  {content.checkpoint.level2.options.map((option, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { audio.playPop(); handleCheckLevel2(option); }}
                      className="w-full p-4 rounded-xl bg-white/90 border-2 border-primary/20 text-left shadow-sm hover:shadow-md hover:border-primary/50 transition-all font-sans text-text text-lg"
                    >
                      {option}
                    </motion.button>
                  ))}
                  <AnimatePresence>
                    {errorState && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2">
                        <Typography variant="muted" className="text-red-400 text-sm text-center">Nope. Guess again.</Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-10">
                  <div className="w-16 h-16 bg-pastel-peach text-white rounded-full flex items-center justify-center text-3xl mb-4 shadow-soft">
                    ✓
                  </div>
                  <Typography variant="h3" className="text-pastel-peach">Okay... you remember. 👀</Typography>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* LEVEL 3 */}
          {step === 'level3' && (
            <motion.div
              key="level3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full"
            >
              <div className="mb-6 relative">
                <Typography variant="muted" className="tracking-widest uppercase text-xs font-bold text-primary mb-2">QUESTION 03</Typography>
                <Typography variant="body" className="mb-2 italic text-muted">One last thing...</Typography>
                <Typography variant="h3">{content.checkpoint.level3.question}</Typography>
                <PandaMascot pose={errorState ? 'surprised' : 'thinking'} className="absolute -top-6 right-0 scale-75" />
              </div>

              <div className="flex flex-col gap-4">
                <motion.input 
                  animate={errorState ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="The secret word..."
                  className={cn(
                    "w-full px-6 py-4 rounded-xl border-2 bg-white/70 backdrop-blur-md outline-none transition-all font-sans text-lg text-center font-bold tracking-widest uppercase text-text shadow-sm focus:shadow-md",
                    errorState ? "border-red-400 focus:border-red-500 bg-red-50" : "border-primary/30 focus:border-primary"
                  )}
                />

                <Button onClick={handleCheckLevel3} disabled={!inputValue.trim()}>Unlock ✨</Button>
              </div>
            </motion.div>
          )}

          {/* ACCESS GRANTED CINEMATIC */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center -mt-10"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="w-24 h-24 bg-gradient-to-tr from-pastel-mint to-pastel-yellow rounded-full flex items-center justify-center shadow-float mb-8 relative"
              >
                <Sparkle className="absolute -top-4 -right-4 text-white w-8 h-8" delay={0.2} />
                <Sparkle className="absolute -bottom-2 -left-2 text-pastel-blush w-6 h-6" delay={0.4} />
                <span className="text-4xl">🔓</span>
                <PandaMascot pose="celebrating" className="absolute -bottom-10 scale-125" />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-[280px]"
              >
                <Typography variant="h2" className="text-primary tracking-widest text-2xl mb-4">ACCESS GRANTED</Typography>
                
                <div className="bg-black/80 p-4 rounded-md text-left font-mono text-[11px] text-green-400 shadow-inner overflow-hidden relative">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                    <p className="mb-1">ANJALI.exe</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
                    <p className="mb-1 text-green-300">Loading... ████████████ 100%</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
                    <p className="mb-0">Loading memories...</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
                    <p className="mb-0">Loading chaos...</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
                    <p className="mb-2">Loading Butki mode...</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                    <p className="text-pastel-yellow font-bold">STATUS: READY ✨</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </Section>
  );
}
