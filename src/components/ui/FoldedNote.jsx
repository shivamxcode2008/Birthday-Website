import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Heart } from 'lucide-react';

export function FoldedNote({ onClick, className }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "relative w-64 h-40 bg-[#fdfdfc] rounded-md shadow-md border border-border/60 flex items-center justify-center cursor-pointer group outline-none",
        className
      )}
      aria-label="Open personal letter"
    >
      {/* Horizontal fold lines to simulate a tri-fold letter */}
      <div className="absolute inset-x-0 top-[33%] h-[1px] bg-black/[0.03] shadow-[0_1px_0_rgba(255,255,255,0.5)]" />
      <div className="absolute inset-x-0 bottom-[33%] h-[1px] bg-black/[0.03] shadow-[0_1px_0_rgba(255,255,255,0.5)]" />
      
      {/* Wax Seal / Sticker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#f4b4be]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 group-hover:scale-105 group-active:scale-95 transition-transform duration-300 shadow-sm">
        <Heart className="w-5 h-5 text-primary fill-primary/30" />
      </div>

      <span className="absolute bottom-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted opacity-60">
        Open this
      </span>
    </motion.button>
  );
}
