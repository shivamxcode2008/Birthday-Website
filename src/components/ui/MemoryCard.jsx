import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from './primitives';
import { EmptyPhotoWindow } from './EmptyPhotoWindow';
import { WashiTape } from './Decorations';
import { cn } from '../../lib/utils';

export function MemoryCard({ memory, index, className }) {
  // Give each memory card a slight organic rotation for a scrapbook feel
  const rotations = [-2, 1.5, -1.5, 2];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
      exit={{ opacity: 0, scale: 1.05, y: -20 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      className={cn(
        "relative w-full max-w-sm bg-[#faf9f7] rounded-sm p-6 pb-14 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-[#eaeaea]",
        className
      )}
    >
      <WashiTape className="-top-4 left-1/2 -translate-x-1/2" />
      
      {/* The empty photo placeholder - looks like a polaroid window */}
      <div className="bg-surface rounded-lg p-1 shadow-inner border border-primary/10 mb-6">
        <EmptyPhotoWindow 
          label="PHOTO COMING LATER" 
          aspectRatio="square" 
          className="w-full" 
        />
      </div>
      
      {/* Scrapbook handwritten / typed text */}
      <div className="px-2">
        <Typography variant="script" className="text-2xl font-bold text-text mb-1 leading-tight">
          {memory.title}
        </Typography>
        <Typography variant="muted" className="text-sm font-medium leading-snug">
          {memory.caption}
        </Typography>
      </div>
    </motion.div>
  );
}
