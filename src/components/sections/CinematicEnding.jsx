import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button } from '../ui/primitives';
import { Sparkle, WashiTape, DoodleArrow, FloatingParticles, DecorativeContainer } from '../ui/Decorations';
import { PandaMascot } from '../ui/PandaMascot';
import { audio } from '../../lib/audio';
import { cn } from '../../lib/utils';

export function CinematicEnding({ onRestart }) {
  const [step, setStep] = useState('wait');

  // Use a slightly cleaner effect for timeouts
  useEffect(() => {
    let t;
    switch (step) {
      case 'wait': t = setTimeout(() => setStep('one_last_thing'), 3500); break;
      case 'one_last_thing': t = setTimeout(() => setStep('photo1'), 3000); break;
      case 'photo1': t = setTimeout(() => { audio.playSlide(); setStep('photo2'); }, 4000); break;
      case 'photo2': t = setTimeout(() => { audio.playSlide(); setStep('photo3'); }, 4000); break;
      case 'photo3': t = setTimeout(() => { audio.playSlide(); setStep('photo4'); }, 4000); break;
      case 'photo4': t = setTimeout(() => { audio.playSlide(); setStep('photo5'); }, 4000); break;
      case 'photo5': t = setTimeout(() => setStep('photo6_intro'), 4000); break;
      case 'photo6_intro': t = setTimeout(() => { audio.playSparkle(); setStep('photo6'); }, 2500); break;
      case 'photo6': t = setTimeout(() => { audio.playPop(); setStep('collage'); }, 6000); break;
      case 'collage': t = setTimeout(() => setStep('final_message'), 5000); break;
      case 'final_message': t = setTimeout(() => setStep('bye'), 6000); break;
    }
    return () => clearTimeout(t);
  }, [step]);

  return (
    <Section className="relative overflow-hidden justify-center min-h-[100dvh] bg-[#111111]">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: WAIT */}
        {step === 'wait' && (
          <motion.div
            key="wait"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-6 text-center h-full w-full absolute inset-0"
          >
            <Typography variant="h2" className="text-white tracking-widest mb-12 uppercase text-3xl">WAIT...</Typography>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.5 }}>
              <PandaMascot pose="curious" className="scale-125 mb-8" />
              <Typography variant="body" className="text-white/80 font-medium text-lg max-w-sm">
                You really thought Shivam would stop there? 👀
              </Typography>
            </motion.div>
          </motion.div>
        )}

        {/* STEP 2: ONE LAST THING */}
        {step === 'one_last_thing' && (
          <motion.div
            key="one_last_thing"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center justify-center p-6 text-center h-full w-full absolute inset-0"
          >
            <Typography variant="muted" className="tracking-widest uppercase text-pastel-mint mb-6 font-bold">
              ONE LAST THING
            </Typography>
            <Typography variant="body" className="text-white/90 leading-relaxed font-medium text-xl max-w-sm">
              Before you go...<br/><br/>
              <span className="text-pastel-peach">Just one more little memory.</span>
            </Typography>
          </motion.div>
        )}

        {/* STEP 3-8: THE PHOTO SEQUENCE */}
        {(step.startsWith('photo') && step !== 'photo6_intro') && (
          <motion.div key="photo_sequence" className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              
              {/* Photo 1 */}
              {step === 'photo1' && (
                <motion.div key="p1" initial={{ opacity: 0, y: 20, scale: 0.9, rotate: -2 }} animate={{ opacity: 1, y: 0, scale: 1, rotate: 2 }} exit={{ opacity: 0, x: -50, scale: 0.8 }} transition={{ duration: 1, type: 'spring' }} className="absolute z-10">
                  <div className="bg-[#fcfbf9] p-3 pb-10 shadow-2xl rounded-sm border border-black/10 relative">
                    <WashiTape className="-top-3 right-4 rotate-[15deg] w-16 bg-pastel-yellow/70" />
                    <img src="/assets/photo1.jpg" alt="Memory 1" className="w-56 aspect-square object-cover rounded-sm grayscale-[10%]" />
                    <Typography variant="script" className="absolute bottom-2 text-center w-full text-black/70 text-xl">One little moment ✨</Typography>
                  </div>
                  <div className="absolute -bottom-10 -left-10"><PandaMascot pose="idle" className="scale-75 opacity-70" /></div>
                </motion.div>
              )}

              {/* Photo 2 */}
              {step === 'photo2' && (
                <motion.div key="p2" initial={{ opacity: 0, x: 50, rotate: 5 }} animate={{ opacity: 1, x: 0, rotate: -3 }} exit={{ opacity: 0, y: 50, scale: 0.8 }} transition={{ duration: 1, type: 'spring' }} className="absolute z-10">
                  <div className="bg-[#fcfbf9] p-2 pb-12 shadow-2xl rounded-sm border border-black/10 relative">
                    <img src="/assets/photo2.jpg" alt="Memory 2" className="w-60 aspect-[4/5] object-cover rounded-sm grayscale-[10%]" />
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-pastel-peach rounded-full flex items-center justify-center rotate-12 shadow-md text-sm">💕</div>
                    <Typography variant="script" className="absolute bottom-3 text-center w-full text-black/70 text-lg">Another one for the memory box.</Typography>
                  </div>
                  <Sparkle className="absolute top-0 -left-6 text-pastel-yellow w-6 h-6" delay={0.5} />
                </motion.div>
              )}

              {/* Photo 3 */}
              {step === 'photo3' && (
                <motion.div key="p3" initial={{ opacity: 0, y: -50, scale: 1.1 }} animate={{ opacity: 1, y: 0, scale: 1, rotate: 1 }} exit={{ opacity: 0, x: 50, scale: 0.8 }} transition={{ duration: 1.2, type: 'spring' }} className="absolute z-10">
                  <div className="bg-black p-4 pb-12 shadow-2xl rounded border border-white/20 relative">
                    <img src="/assets/photo3.jpg" alt="Memory 3" className="w-64 aspect-video object-cover rounded-sm" />
                    <Typography variant="script" className="absolute bottom-3 text-center w-full text-white/90 text-lg">Some moments are just worth keeping.</Typography>
                  </div>
                  <div className="absolute -bottom-8 -right-8"><PandaMascot pose="curious" className="scale-75 opacity-90" /></div>
                  <Sparkle className="absolute -top-6 right-10 text-pastel-mint w-5 h-5" delay={1} />
                </motion.div>
              )}

              {/* Photo 4 */}
              {step === 'photo4' && (
                <motion.div key="p4" initial={{ opacity: 0, y: 50, rotate: -10 }} animate={{ opacity: 1, y: 0, rotate: 4 }} exit={{ opacity: 0, y: -50, scale: 0.8 }} transition={{ duration: 1, type: 'spring' }} className="absolute z-10">
                  <div className="bg-white p-2 shadow-2xl border border-black/10 relative">
                    <WashiTape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-5deg] w-24 bg-pastel-lavender/80" />
                    <img src="/assets/photo4.jpg" alt="Memory 4" className="w-52 aspect-[3/4] object-cover" />
                  </div>
                  <div className="absolute -right-24 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <DoodleArrow className="w-10 h-10 text-white rotate-180 opacity-70" />
                    <Typography variant="script" className="text-white text-xl rotate-6">Yep... this one too 😂</Typography>
                  </div>
                </motion.div>
              )}

              {/* Photo 5 */}
              {step === 'photo5' && (
                <motion.div key="p5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1.05, rotate: -2 }} exit={{ opacity: 0, filter: "blur(10px)" }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute z-10">
                  <div className="absolute inset-0 bg-pastel-peach/10 blur-[100px] scale-[3]" />
                  <div className="bg-[#fdfcf9] p-4 pb-14 shadow-2xl rounded-sm border border-black/10 relative z-10">
                    <img src="/assets/photo5.jpg" alt="Memory 5" className="w-64 aspect-square object-cover rounded-sm" />
                    <Typography variant="script" className="absolute bottom-4 text-center w-full text-black/80 text-2xl">Okay, last few...</Typography>
                  </div>
                  <div className="absolute -bottom-12 right-0"><PandaMascot pose="celebrating" className="scale-90" /></div>
                </motion.div>
              )}

              {/* Photo 6 (Uses photo1.jpg as requested to adapt for 5 uploads) */}
              {step === 'photo6' && (
                <motion.div key="p6" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3, ease: "easeOut" }} className="absolute z-10 flex flex-col items-center">
                  <div className="absolute inset-0 bg-primary/20 blur-[120px] scale-[4] z-0" />
                  <FloatingParticles active={true} count={20} />
                  
                  <div className="bg-white p-3 pb-12 shadow-[0_0_50px_rgba(255,255,255,0.1)] rounded-sm relative z-10 mb-8 border border-white/20">
                    <img src="/assets/photo1.jpg" alt="Best Memory" className="w-72 aspect-[4/5] object-cover rounded-sm" />
                  </div>
                  
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 1.5 }} className="z-20 text-center">
                    <Typography variant="script" className="text-white text-4xl mb-2 drop-shadow-md">Definitely keeping this one. 🤍</Typography>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* STEP 7.5: PHOTO 6 INTRO */}
        {step === 'photo6_intro' && (
          <motion.div key="p6_intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center absolute inset-0">
            <Typography variant="body" className="text-white/60 text-xl font-medium tracking-wide">And this one...</Typography>
          </motion.div>
        )}

        {/* STEP 9: THE COLLAGE */}
        {step === 'collage' && (
          <motion.div key="collage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 2 }} className="absolute inset-0 flex items-center justify-center bg-[#1a1515]">
            <FloatingParticles active={true} count={15} />
            
            {/* Background Scattered Photos */}
            <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
              <motion.img initial={{ y: 100, rotate: -20 }} animate={{ y: '10%', x: '-20%', rotate: -15 }} src="/assets/photo2.jpg" className="absolute w-40 rounded shadow-lg border-2 border-white/20" />
              <motion.img initial={{ y: -100, rotate: 30 }} animate={{ y: '20%', x: '70%', rotate: 15 }} src="/assets/photo3.jpg" className="absolute w-48 rounded shadow-lg border-2 border-white/20" />
              <motion.img initial={{ x: -100, rotate: 10 }} animate={{ y: '60%', x: '10%', rotate: 25 }} src="/assets/photo4.jpg" className="absolute w-44 rounded shadow-lg border-2 border-white/20" />
              <motion.img initial={{ x: 100, rotate: -10 }} animate={{ y: '70%', x: '60%', rotate: -5 }} src="/assets/photo5.jpg" className="absolute w-36 rounded shadow-lg border-2 border-white/20" />
              <motion.img initial={{ y: 50, scale: 0.5 }} animate={{ y: '40%', x: '35%', scale: 1, rotate: -5 }} src="/assets/photo1.jpg" className="absolute w-52 rounded shadow-lg border-2 border-white/20 z-10" />
            </div>

            {/* Central Text */}
            <div className="z-20 bg-black/40 p-8 rounded-2xl backdrop-blur-md border border-white/10 text-center shadow-2xl flex flex-col items-center">
              <Typography variant="h1" className="text-white text-5xl md:text-6xl tracking-widest mb-4">ANJALI</Typography>
              <Typography variant="muted" className="text-pastel-peach text-sm tracking-[0.2em] uppercase font-bold">Six little memories.<br/>One very special day.</Typography>
              <PandaMascot pose="happy" className="scale-75 mt-4 opacity-90" />
            </div>
          </motion.div>
        )}

        {/* STEP 10: FINAL MESSAGE */}
        {step === 'final_message' && (
          <motion.div key="final_message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 flex flex-col items-center justify-center bg-[#111111] p-6 text-center z-30">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
              <Typography variant="body" className="text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-sm mb-8">
                Made this little corner of the internet just for you, Anjali.
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }}>
              <Typography variant="script" className="text-primary text-4xl mb-10">
                Happy Birthday, Butki. ✨
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }}>
              <Typography variant="body" className="text-white/40 text-sm tracking-widest uppercase">
                — Shivam
              </Typography>
            </motion.div>
          </motion.div>
        )}

        {/* STEP 11: BYE PAGE */}
        {step === 'bye' && (
          <motion.div key="bye" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="absolute inset-0 flex flex-col items-center justify-center bg-[#fdfcfb] p-6 text-center z-40 relative">
            
            <DecorativeContainer className="absolute inset-0 pointer-events-none opacity-40">
              <Sparkle className="absolute top-[20%] left-[20%] text-pastel-yellow w-6 h-6" delay={0.5} />
              <Sparkle className="absolute top-[30%] right-[25%] text-pastel-mint w-8 h-8" delay={1.5} />
              <Sparkle className="absolute bottom-[30%] left-[30%] text-pastel-lavender w-5 h-5" delay={2} />
            </DecorativeContainer>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="flex flex-col items-center">
              <Typography variant="body" className="text-black/60 text-lg font-medium mb-2">Okay...</Typography>
              <Typography variant="body" className="text-black/80 text-xl font-bold mb-8">NOW I'm actually stopping. 😂</Typography>
              
              <Typography variant="script" className="text-primary text-6xl mb-6">Bye, Anjali! 👋</Typography>
              
              <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-primary/10 mb-12">
                <Typography variant="muted" className="text-black/70 text-sm leading-relaxed">
                  Take care, Butki.<br/>And have the happiest birthday. ✨
                </Typography>
              </div>

              <PandaMascot pose="happy" className="scale-100 mb-12" />

              <Button 
                onClick={() => { audio.playPop(); onRestart(); }} 
                variant="outline" 
                className="rounded-full px-8 bg-white shadow-soft text-black/60 hover:text-primary hover:border-primary/30 pointer-events-auto"
              >
                Replay the whole thing ↻
              </Button>
            </motion.div>
            
          </motion.div>
        )}

      </AnimatePresence>
    </Section>
  );
}
