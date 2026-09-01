import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Typography } from './primitives';
import { PandaMascot } from './PandaMascot';
import { audio } from '../../lib/audio';
import { Book } from 'lucide-react';

export function BirthdayPassport({ stamps, className }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePassport = () => {
    audio.playPop();
    setIsOpen(!isOpen);
  };

  const ACHIEVEMENTS = [
    { id: 'identity', label: 'Identity Verified', icon: '🕵️‍♀️' },
    { id: 'gifts', label: 'Gift Explorer', icon: '🎁' },
    { id: 'memories', label: 'Memory Collector', icon: '📸' },
    { id: 'letter', label: 'Letter Reader', icon: '💌' },
    { id: 'candle', label: 'Candle Wish', icon: '🕯️' },
    { id: 'reveal', label: 'Final Surprise', icon: '★' },
  ];

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Mini Passport Button */}
      <motion.button
        onClick={togglePassport}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-pastel-yellow rounded-full shadow-lg border-2 border-white flex flex-col items-center justify-center relative z-50 overflow-hidden group"
      >
        <Book className="w-6 h-6 text-primary mb-0.5" />
        <span className="text-[8px] font-bold uppercase tracking-widest text-primary/80">Passport</span>
        
        {/* Notification dot if they just unlocked something (simplified, just checking length) */}
        {stamps.length > 0 && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center text-[10px] text-white font-bold border border-white">
            {stamps.length}
          </div>
        )}
      </motion.button>

      {/* Passport Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={togglePassport}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            
            {/* Passport Book */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, rotate: 5 }}
              className="absolute bottom-20 right-0 origin-bottom-right w-72 h-96 bg-[#f4ebd0] rounded-lg shadow-2xl z-50 border-4 border-[#2b3a42] overflow-hidden flex"
            >
              {/* Spine */}
              <div className="w-8 h-full bg-[#1e2a30] border-r-2 border-black/20 shadow-inner flex flex-col items-center justify-center">
                <div className="w-1 h-3/4 bg-black/20 rounded-full" />
              </div>
              
              {/* Pages */}
              <div className="flex-1 bg-[#fffcf5] p-5 relative shadow-inner">
                <div className="text-center mb-6 border-b-2 border-primary/20 pb-2">
                  <Typography variant="script" className="text-2xl text-primary">Anjali's</Typography>
                  <Typography variant="muted" className="text-xs uppercase tracking-widest font-bold">Birthday Passport</Typography>
                </div>

                <div className="space-y-4">
                  {ACHIEVEMENTS.map((ach) => {
                    const isUnlocked = stamps.includes(ach.id);
                    return (
                      <div key={ach.id} className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center text-lg relative overflow-hidden",
                          isUnlocked ? "border-emerald-400 bg-emerald-50" : "border-gray-300 bg-gray-50"
                        )}>
                          {isUnlocked ? (
                            <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} className="text-emerald-500 font-bold">
                              {ach.id === 'reveal' ? '★' : '✓'}
                            </motion.div>
                          ) : (
                            <span className="opacity-30 grayscale">{ach.icon}</span>
                          )}
                        </div>
                        <div className={cn(
                          "text-sm font-medium",
                          isUnlocked ? "text-primary" : "text-gray-400"
                        )}>
                          {ach.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <PandaMascot pose={stamps.length === 6 ? 'celebrating' : 'idle'} className="absolute -bottom-6 -right-4 scale-75" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
