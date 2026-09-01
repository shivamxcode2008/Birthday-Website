import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
import { audio } from '../../lib/audio';

export function GiftBox({ opened, onClick, delay = 0, className, size = 'default', colorClass = 'bg-primary', animationType = 'default' }) {
  // size can be 'default' (for grid) or 'large' (for focused view)
  const isLarge = size === 'large';
  const width = isLarge ? 'w-48' : 'w-32';
  const height = isLarge ? 'h-48' : 'h-32';
  
  // Custom idle animations based on animationType
  const getIdleAnimation = () => {
    if (opened) return { y: 0, rotate: 0, scale: 1, filter: 'brightness(1)' };
    
    switch(animationType) {
      case 'opening':
        // Fast excited shake right before it pops
        return { 
          rotate: [0, -5, 5, -5, 5, 0], 
          scale: [1, 1.05, 1, 1.05, 1],
          transition: { duration: 0.4, repeat: Infinity } 
        };
      case 'shake':
        return { rotate: [0, -3, 3, -3, 3, 0], transition: { duration: 3, repeat: Infinity, delay } };
      case 'bounce':
        return { y: [0, -8, 0], transition: { duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" } };
      case 'pull':
        return { scale: [1, 1.05, 1, 0.95, 1], transition: { duration: 3.5, repeat: Infinity, delay } };
      case 'glow':
        return { filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'], y: [0, -3, 0], transition: { duration: 3, repeat: Infinity, delay } };
      default:
        return { y: [0, -4, 0], transition: { duration: 3, repeat: Infinity, delay, ease: "easeInOut" } };
    }
  };

  return (
    <motion.button 
      onClick={() => {
        if (!opened) {
          audio.playPop();
          onClick?.();
        }
      }}
      animate={getIdleAnimation()}
      whileHover={!opened ? { scale: 1.05 } : {}}
      whileTap={!opened ? { scale: 0.95 } : {}}
      className={cn(
        "relative flex-shrink-0 cursor-pointer touch-manipulation group", 
        width, height, 
        opened && "cursor-default",
        className
      )}
    >
      {/* Box Body */}
      <div className={cn(
        "absolute inset-x-2 bottom-0 rounded-b-md shadow-sm border transition-all duration-300",
        isLarge ? "top-10" : "top-6",
        opened 
          ? "bg-stone-100 border-stone-200" 
          : cn(colorClass, "border-black/5")
      )}>
        {/* Ribbons */}
        <motion.div 
          animate={opened ? { opacity: 0 } : { opacity: 1 }} 
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 bg-white/40 shadow-sm" 
        />
        <motion.div 
          animate={opened ? { opacity: 0 } : { opacity: 1 }} 
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 bg-white/40 shadow-sm" 
        />
        
        {/* Opened Checkmark */}
        {opened && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        )}
      </div>
      
      {/* Lid */}
      <motion.div 
        animate={opened 
          ? { y: isLarge ? -40 : -20, opacity: 0, rotate: 15, scale: 1.1 } 
          : { y: 0, opacity: 1, rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className={cn(
          "absolute inset-x-0 rounded shadow-md border-b border-black/10 z-10 flex justify-center",
          isLarge ? "top-4 h-10" : "top-2 h-7",
          colorClass
        )}
      >
        <div className="w-5 h-full bg-white/40 shadow-sm" />
      </motion.div>

      {/* Bow */}
      <motion.div 
        animate={opened ? { scale: 0, opacity: 0, y: -20 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "absolute z-20 left-1/2 -translate-x-1/2",
          isLarge ? "-top-4" : "-top-2"
        )}
      >
        <svg 
          width={isLarge ? "48" : "32"} 
          height={isLarge ? "24" : "16"} 
          viewBox="0 0 48 24" 
          className={cn("drop-shadow-sm", colorClass.replace('bg-', 'fill-'))}
        >
          <path d="M24 12C24 12 12 0 6 6C0 12 24 12 24 12Z" className="brightness-90" />
          <path d="M24 12C24 12 36 0 42 6C48 12 24 12 24 12Z" className="brightness-90" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
