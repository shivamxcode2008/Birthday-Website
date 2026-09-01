import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button, Card } from '../ui/primitives';
import { FloatingParticles, DecorativeContainer } from '../ui/Decorations';
import { PandaMascot } from '../ui/PandaMascot';
import { audio } from '../../lib/audio';

// Mini bar component
function StatBar({ label, percentage, delay, barColor = "bg-primary" }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-primary mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden border border-black/5 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className={`absolute top-0 left-0 bottom-0 ${barColor}`}
        />
        {/* Render overflow if percentage > 100 */}
        {percentage > 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 1.5 }}
            className={`absolute top-0 right-0 bottom-0 w-4 bg-red-400 mix-blend-multiply flex items-center justify-center`}
          >
            <span className="text-[8px] font-bold text-white">!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function FriendshipStats({ onComplete }) {
  const [step, setStep] = useState('intro');

  useEffect(() => {
    if (step === 'intro') {
      const t1 = setTimeout(() => {
        audio.playSlide();
        setStep('stats');
      }, 2000);
      return () => clearTimeout(t1);
    }

    if (step === 'stats') {
      const t2 = setTimeout(() => {
        audio.playPop();
        setStep('punchline');
      }, 4500); // After bars finish animating
      return () => clearTimeout(t2);
    }
  }, [step]);

  return (
    <Section className="relative overflow-hidden justify-center min-h-[100dvh]">
      <DecorativeContainer className="inset-0 pointer-events-none opacity-50">
        <FloatingParticles active={true} count={10} />
      </DecorativeContainer>

      <div className="relative z-10 w-full max-w-sm mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          
          {/* Intro Screen */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <Typography variant="body" className="text-text/80 font-medium">
                Hold on, let me check the analytics...
              </Typography>
              <PandaMascot pose="curious" className="mt-8 scale-110" />
            </motion.div>
          )}

          {/* Stats Screen */}
          {(step === 'stats' || step === 'punchline') && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center w-full"
            >
              <Typography variant="h2" className="text-primary mb-6">
                Friendship Report
              </Typography>

              <Card className="w-full bg-white/90 backdrop-blur-sm p-6 text-left shadow-lg border-primary/20 relative mb-8">
                <StatBar label="Random conversations" percentage={100} delay={0.5} barColor="bg-pastel-peach" />
                <StatBar label="Laughing" percentage={100} delay={1.0} barColor="bg-pastel-yellow" />
                <StatBar label="Bakchodi" percentage={110} delay={1.5} barColor="bg-accent" />
                <StatBar label="Serious conversations" percentage={60} delay={2.0} barColor="bg-pastel-lavender" />
                <StatBar label="Normal behaviour" percentage={2} delay={2.5} barColor="bg-pastel-mint" />

                {/* Panda Reaction to "Normal behaviour" */}
                <AnimatePresence>
                  {step === 'punchline' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      className="absolute -bottom-10 -right-6"
                    >
                      <div className="bg-white px-3 py-1 rounded-2xl shadow-md border border-primary/10 text-xs font-bold text-primary mb-1 ml-4 absolute -top-8 -left-4 w-max">
                        2% ???
                      </div>
                      <PandaMascot pose="confused" className="scale-75 origin-bottom-right" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Continue Button */}
              <AnimatePresence>
                {step === 'punchline' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="w-full"
                  >
                    <Typography variant="body" className="mb-4 text-text/70 italic text-sm">
                      Seems accurate.
                    </Typography>
                    <Button onClick={() => { audio.playPop(); onComplete(); }} variant="primary" className="w-full shadow-soft">
                      Next ✨
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </Section>
  );
}
