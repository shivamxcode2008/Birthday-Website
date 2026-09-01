import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export function PandaMascot({ pose = 'idle', className }) {
  // Poses: 'idle', 'happy', 'curious', 'surprised', 'celebrating', 'sleepy', 'waving', 'excited', 'thinking', 'confused'

  const breatheAnimation = {
    y: [0, -2, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  const earTwitch = {
    rotate: [0, 10, -5, 0],
    transition: { duration: 4, repeat: Infinity, repeatDelay: Math.random() * 5 + 2 }
  };

  const waveAnimation = pose === 'waving' ? {
    rotate: [0, 45, 0, 45, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  } : pose === 'confused' ? {
    rotate: [0, -20, 0, -20, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  } : pose === 'thinking' ? {
    rotate: [-45],
    y: [-5],
    transition: { duration: 0.5 }
  } : {};

  return (
    <motion.div 
      className={cn("relative w-16 h-16 pointer-events-none drop-shadow-sm", className)}
      animate={pose === 'sleepy' ? { y: [0, 2, 0] } : pose === 'excited' ? { y: [0, -10, 0] } : breatheAnimation}
      transition={pose === 'excited' ? { duration: 0.4, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      {/* Shadow */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/10 rounded-full blur-[1px]" />

      {/* Body */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-10 bg-white rounded-[50%_50%_45%_45%] border-2 border-stone-800" />

      {/* Ears */}
      <motion.div 
        className="absolute top-1 left-1 w-5 h-5 bg-stone-800 rounded-full border-2 border-stone-800"
        animate={earTwitch}
        style={{ originX: 1, originY: 1 }}
      />
      <motion.div 
        className="absolute top-1 right-1 w-5 h-5 bg-stone-800 rounded-full border-2 border-stone-800"
        animate={earTwitch}
        style={{ originX: 0, originY: 1 }}
      />

      {/* Head */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-12 bg-white rounded-full border-2 border-stone-800 overflow-hidden flex justify-center">
        
        {/* Eyes/Patches */}
        <div className="absolute top-4 flex justify-between w-8">
          {/* Left Eye Patch */}
          <div className="relative w-4 h-5 bg-stone-800 rounded-[40%_60%_60%_40%] rotate-12 flex items-center justify-center overflow-hidden">
            {pose === 'happy' || pose === 'celebrating' || pose === 'excited' ? (
              <div className="w-2 h-1 border-t-2 border-white rounded-t-full -mt-1" />
            ) : pose === 'sleepy' ? (
              <div className="w-2 h-0.5 bg-white rounded-full" />
            ) : pose === 'surprised' || pose === 'confused' ? (
              <div className="w-2 h-2 bg-white rounded-full" />
            ) : pose === 'thinking' ? (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0.5px_0.5px_0_white]" />
            ) : (
              <div className="w-1.5 h-1.5 bg-white rounded-full translate-x-0.5 -translate-y-0.5 shadow-[0.5px_0.5px_0_white]" />
            )}
          </div>
          
          {/* Right Eye Patch */}
          <div className="relative w-4 h-5 bg-stone-800 rounded-[60%_40%_40%_60%] -rotate-12 flex items-center justify-center overflow-hidden">
            {pose === 'happy' || pose === 'celebrating' || pose === 'excited' ? (
              <div className="w-2 h-1 border-t-2 border-white rounded-t-full -mt-1" />
            ) : pose === 'sleepy' ? (
              <div className="w-2 h-0.5 bg-white rounded-full" />
            ) : pose === 'surprised' ? (
              <div className="w-2 h-2 bg-white rounded-full" />
            ) : pose === 'confused' ? (
              <div className="w-1.5 h-1.5 bg-white rounded-full -translate-x-1 -translate-y-1" />
            ) : pose === 'thinking' ? (
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0.5px_0.5px_0_white]" />
            ) : (
              <div className="w-1.5 h-1.5 bg-white rounded-full -translate-x-0.5 -translate-y-0.5 shadow-[-0.5px_0.5px_0_white]" />
            )}
          </div>
        </div>

        {/* Nose */}
        <div className="absolute top-7 w-1.5 h-1 bg-stone-800 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%]" />

        {/* Mouth */}
        {pose === 'surprised' || pose === 'excited' ? (
          <div className="absolute top-8.5 w-1.5 h-1.5 bg-stone-800 rounded-full" />
        ) : pose === 'happy' || pose === 'celebrating' ? (
          <div className="absolute top-8 w-2 h-2 border-b-2 border-stone-800 rounded-b-full" />
        ) : pose === 'sleepy' || pose === 'thinking' ? (
          <div className="absolute top-8 w-1 h-1 bg-stone-800 rounded-full" />
        ) : pose === 'confused' ? (
          <div className="absolute top-8 w-2 h-0.5 bg-stone-800 rounded-full rotate-[15deg]" />
        ) : (
          <div className="absolute top-8 w-1.5 h-0.5 bg-stone-800 rounded-full" />
        )}

        {/* Blush */}
        {(pose === 'happy' || pose === 'celebrating' || pose === 'idle') && (
          <>
            <div className="absolute top-6 left-1 w-2 h-1 bg-rose-300 rounded-full opacity-60" />
            <div className="absolute top-6 right-1 w-2 h-1 bg-rose-300 rounded-full opacity-60" />
          </>
        )}
      </div>

      {/* Arms */}
      <motion.div 
        className="absolute top-9 left-1 w-3 h-5 bg-stone-800 rounded-full rotate-45 border border-stone-900"
        animate={pose === 'celebrating' ? { rotate: [45, 135, 45], y: [-5, -10, -5] } : waveAnimation}
        transition={pose === 'celebrating' ? { duration: 0.6, repeat: Infinity } : waveAnimation.transition}
        style={{ originX: 1, originY: 0 }}
      />
      <motion.div 
        className="absolute top-9 right-1 w-3 h-5 bg-stone-800 rounded-full -rotate-45 border border-stone-900"
        animate={pose === 'celebrating' ? { rotate: [-45, -135, -45], y: [-5, -10, -5] } : {}}
        transition={pose === 'celebrating' ? { duration: 0.6, repeat: Infinity, delay: 0.1 } : {}}
      />
      
      {/* Props */}
      {pose === 'celebrating' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 border-b-8 border-b-transparent border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-pastel-mint rotate-180 z-20">
          <div className="absolute -top-[14px] -left-1 w-2 h-2 bg-pastel-yellow rounded-full" />
        </div>
      )}
      
      
      {pose === 'thinking' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: 1.2, y: -10 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 right-0 text-stone-600 font-bold text-lg"
        >
          ?
        </motion.div>
      )}

      {pose === 'confused' && (
        <div className="absolute -top-2 left-0 text-stone-600 font-bold text-sm rotate-[-20deg]">
          ?
        </div>
      )}
    </motion.div>
  );
}
