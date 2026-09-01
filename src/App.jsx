import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OpeningExperience } from './components/sections/OpeningExperience';
import { BirthdayGreeting } from './components/sections/BirthdayGreeting';
import { DigitalGifts } from './components/sections/DigitalGifts';
import { FriendshipStats } from './components/sections/FriendshipStats';
import { MemoryExperience } from './components/sections/MemoryExperience';
import { LetterExperience } from './components/sections/LetterExperience';
import { CandleExperience } from './components/sections/CandleExperience';
import { FinalReveal } from './components/sections/FinalReveal';
import { CinematicEnding } from './components/sections/CinematicEnding';
import { FriendCheckpoint } from './components/sections/FriendCheckpoint';
import { AudioToggle } from './components/ui/AudioToggle';
import { GlobalEnvironment } from './components/ui/GlobalEnvironment';
import { AdventurePath } from './components/ui/AdventurePath';
import { BirthdayPassport } from './components/ui/BirthdayPassport';

function App() {
  const [currentPhase, setCurrentPhase] = useState('checkpoint'); // checkpoint -> opening -> greeting -> gifts -> stats -> memories -> letter -> candle -> reveal -> epilogue -> epilogue
  const [stamps, setStamps] = useState([]);

  const addStamp = (stampId) => {
    if (!stamps.includes(stampId)) setStamps(prev => [...prev, stampId]);
  };

  const handleCheckpointComplete = () => { addStamp('identity'); setCurrentPhase('opening'); };
  const handleOpeningComplete = () => setCurrentPhase('greeting');
  const handleGreetingComplete = () => setCurrentPhase('gifts');
  const handleGiftsComplete = () => { addStamp('gifts'); setCurrentPhase('stats'); };
  const handleStatsComplete = () => setCurrentPhase('memories');
  const handleMemoriesComplete = () => { addStamp('memories'); setCurrentPhase('letter'); };
  const handleLetterComplete = () => { addStamp('letter'); setCurrentPhase('candle'); };
  const handleCandleComplete = () => { addStamp('candle'); setCurrentPhase('reveal'); };
  const handleRevealComplete = () => setCurrentPhase('epilogue');
  
  const handleRestart = () => {
    addStamp('reveal');
    // Keep stamps on restart, just go back to start
    setCurrentPhase('checkpoint');
  };

  return (
    <div className="w-full min-h-[100dvh] relative overflow-hidden bg-background">
      
      {/* Global Background Layer that fills the entire viewport */}
      <GlobalEnvironment currentPhase={currentPhase} />

      {/* Global Overlays */}
      <AdventurePath currentPhase={currentPhase} />
      <BirthdayPassport stamps={stamps} />
      <AudioToggle />
      
      {/* Central Story Column */}
      <div className="relative z-10 w-full max-w-md mx-auto min-h-[100dvh] shadow-2xl bg-white/40 backdrop-blur-3xl overflow-hidden border-x border-white/20">
        <AnimatePresence mode="wait">
          {currentPhase === 'checkpoint' && (
            <motion.div key="checkpoint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <FriendCheckpoint onComplete={handleCheckpointComplete} />
            </motion.div>
          )}

          {currentPhase === 'opening' && (
            <motion.div key="opening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <OpeningExperience onComplete={handleOpeningComplete} />
            </motion.div>
          )}

          {currentPhase === 'greeting' && (
            <motion.div key="greeting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <BirthdayGreeting onComplete={handleGreetingComplete} />
            </motion.div>
          )}

          {currentPhase === 'gifts' && (
            <motion.div key="gifts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <DigitalGifts onComplete={handleGiftsComplete} />
            </motion.div>
          )}

          {currentPhase === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <FriendshipStats onComplete={handleStatsComplete} />
            </motion.div>
          )}

          {currentPhase === 'memories' && (
            <motion.div key="memories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <MemoryExperience onComplete={handleMemoriesComplete} />
            </motion.div>
          )}

          {currentPhase === 'letter' && (
            <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <LetterExperience onComplete={handleLetterComplete} />
            </motion.div>
          )}

          {currentPhase === 'candle' && (
            <motion.div key="candle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <CandleExperience onComplete={handleCandleComplete} />
            </motion.div>
          )}

          {currentPhase === 'reveal' && (
            <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <FinalReveal onComplete={handleRevealComplete} />
            </motion.div>
          )}

          {currentPhase === 'epilogue' && (
            <motion.div key="epilogue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex flex-col">
              <CinematicEnding onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default App;
