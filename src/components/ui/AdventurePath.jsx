import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { DoodleArrow } from './Decorations';

const PATH_STAGES = [
  { id: 'opening', icon: '✉️', label: 'Invite' },
  { id: 'gifts', icon: '🎁', label: 'Gifts' },
  { id: 'memories', icon: '📸', label: 'Memories' },
  { id: 'letter', icon: '💌', label: 'Letter' },
  { id: 'candle', icon: '🕯️', label: 'Wish' },
  { id: 'reveal', icon: '✨', label: 'Magic' },
];

export function AdventurePath({ currentPhase, className }) {
  // Map App.jsx phases to path stages
  const getActiveStageIndex = () => {
    switch (currentPhase) {
      case 'checkpoint': return -1;
      case 'opening':
      case 'greeting': return 0;
      case 'gifts':
      case 'stats': return 1;
      case 'memories': return 2;
      case 'letter': return 3;
      case 'candle': return 4;
      case 'reveal': return 5;
      default: return -1;
    }
  };

  const activeIndex = getActiveStageIndex();

  if (activeIndex === -1) return null; // Don't show on checkpoint

  return (
    <div className={cn("fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2", className)}>
      <div className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-4 rotate-180" style={{ writingMode: 'vertical-rl' }}>
        The Journey
      </div>
      
      {PATH_STAGES.map((stage, i) => {
        const isPast = i < activeIndex;
        const isActive = i === activeIndex;
        const isFuture = i > activeIndex;

        return (
          <React.Fragment key={stage.id}>
            <motion.div 
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500",
                isActive ? "bg-white shadow-md border-2 border-primary scale-110" : 
                isPast ? "bg-primary/20 opacity-70" : 
                "bg-white/40 opacity-40 grayscale"
              )}
              initial={false}
              animate={{ 
                scale: isActive ? 1.1 : 1,
                y: isActive ? [0, -3, 0] : 0
              }}
              transition={isActive ? { duration: 2, repeat: Infinity } : {}}
            >
              <span className={cn("text-lg", isActive ? "opacity-100" : "opacity-80")}>
                {stage.icon}
              </span>

              {/* Tooltip */}
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-14 bg-white px-3 py-1 rounded shadow-sm text-xs font-bold text-primary whitespace-nowrap border border-primary/10"
                >
                  {stage.label}
                </motion.div>
              )}
              
              {/* Checkmark for past stages */}
              {isPast && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <span className="text-[8px] text-white">✓</span>
                </div>
              )}
            </motion.div>

            {/* Path connector line */}
            {i < PATH_STAGES.length - 1 && (
              <div className="h-6 w-px bg-primary/20 relative my-1">
                {isPast && (
                  <motion.div 
                    className="absolute top-0 left-0 w-full bg-primary"
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
