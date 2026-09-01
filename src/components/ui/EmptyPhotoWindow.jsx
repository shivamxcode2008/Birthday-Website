import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

export function EmptyPhotoWindow({ 
  label = "PHOTO SPACE", 
  className,
  aspectRatio = 'portrait' // 'portrait', 'landscape', 'square'
}) {
  // Empty Photo Window rule: Must look beautiful, no fake photos.
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-surface border-4 border-white shadow-soft",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "portrait" && "aspect-[3/4]",
        aspectRatio === "landscape" && "aspect-[4/3]",
        className
      )}
    >
      {/* Decorative dashed inner border to imply placement */}
      <div className="absolute inset-2 border-2 border-dashed border-primary/30 rounded-lg flex flex-col items-center justify-center gap-3 bg-accent/30">
        <ImageIcon className="w-8 h-8 text-primary/50" />
        <span className="font-sans text-sm font-medium text-primary/70 tracking-widest uppercase">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
