import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { content } from '../../content/content';

export function Envelope({ isOpen, onClick, className }) {
  const [internalState, setInternalState] = useState('closed');

  // Multi-step sequence when isOpen becomes true
  useEffect(() => {
    if (isOpen && internalState === 'closed') {
      setInternalState('wiggling');
      
      setTimeout(() => setInternalState('popping'), 300);
      setTimeout(() => setInternalState('opening_flap'), 600);
      setTimeout(() => setInternalState('sliding_letter'), 1200);
      setTimeout(() => setInternalState('opened'), 1800);
    }
  }, [isOpen, internalState]);

  const isWiggling = internalState === 'wiggling' || internalState === 'popping';
  const isFlapOpen = internalState === 'opening_flap' || internalState === 'sliding_letter' || internalState === 'opened';
  const isLetterOut = internalState === 'sliding_letter' || internalState === 'opened';

  return (
    <motion.button
      animate={
        !isOpen
          ? { y: [0, -4, 0] }
          : isWiggling
          ? { rotate: [0, -5, 5, -3, 3, 0], scale: [1, 1.02, 1] }
          : { y: 0 }
      }
      transition={{
        duration: !isOpen ? 3 : 0.4,
        repeat: !isOpen ? Infinity : 0,
        ease: 'easeInOut',
      }}
      className={cn('relative w-72 h-52 cursor-pointer perspective-[1200px] select-none touch-manipulation', className)}
      onClick={onClick}
      whileTap={!isOpen ? { scale: 0.95 } : {}}
      role="button"
      aria-label="Open envelope"
    >
      {/* 1. Inside Back of Envelope */}
      <div className="absolute inset-0 bg-[#eede] rounded-xl shadow-inner border border-primary/10 overflow-hidden" />

      {/* 2. The Letter/Card (slides up) */}
      <motion.div
        className="absolute inset-x-3 bottom-1 h-[90%] bg-surface rounded-t-xl shadow-soft p-5 flex flex-col items-center border border-border/50"
        initial={false}
        animate={
          isLetterOut 
            ? { y: -90, rotate: -3, opacity: 1, zIndex: 10 } 
            : { y: 0, rotate: 0, opacity: 0.9, zIndex: 10 }
        }
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <span className="font-display font-medium text-text text-xl mt-2 text-center text-balance">
          Hey, {content.global.friendName} ✨
        </span>
        <div className="w-12 h-[1px] bg-primary/30 my-3" />
        <span className="font-sans text-muted text-sm text-center">
          There's something waiting for you...
        </span>
      </motion.div>

      {/* 3. Left Flap */}
      <div 
        className="absolute inset-0 bg-accent rounded-xl shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-20"
        style={{ clipPath: 'polygon(0 0, 52% 52%, 0 100%)' }} 
      />

      {/* 4. Right Flap */}
      <div 
        className="absolute inset-0 bg-accent rounded-xl shadow-[-2px_0_10px_rgba(0,0,0,0.02)] z-20"
        style={{ clipPath: 'polygon(100% 0, 48% 52%, 100% 100%)' }} 
      />

      {/* 5. Bottom Flap */}
      <div 
        className="absolute inset-0 bg-[#f9dbde] rounded-xl shadow-[0_-2px_15px_rgba(0,0,0,0.03)] z-30"
        style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }} 
      />

      {/* 6. Top Flap (Rotates open in 3D) */}
      <motion.div
        className="absolute top-0 inset-x-0 h-full origin-top z-40 rounded-t-xl"
        initial={false}
        animate={isFlapOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 40 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front side of the top flap */}
        <div 
          className="absolute inset-0 bg-primary rounded-t-xl"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)', backfaceVisibility: 'hidden' }}
        >
          <AnimatePresence>
            {!isFlapOpen && (
              <motion.div
                animate={
                  internalState === 'popping' 
                    ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } 
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.3 }}
                className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-primary/10"
              >
                <Heart className="w-5 h-5 text-primary fill-primary/20" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Back side of the top flap (visible when open) */}
        <div 
          className="absolute inset-0 bg-primary/80 rounded-t-xl"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)', backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
        />
      </motion.div>
    </motion.button>
  );
}
