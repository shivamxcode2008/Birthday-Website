import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { audio } from '../../lib/audio';

export function AudioToggle() {
  const [isMuted, setIsMuted] = useState(audio.isMuted);

  const handleToggle = () => {
    const newMutedState = audio.toggleMute();
    setIsMuted(newMutedState);
    if (!newMutedState) {
      audio.playPop(); // Little feedback when turning on
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-md border border-primary/20 rounded-full shadow-soft flex items-center justify-center text-primary hover:scale-105 active:scale-95 transition-all"
      aria-label={isMuted ? "Enable sound" : "Disable sound"}
    >
      {isMuted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      )}
    </motion.button>
  );
}
