import React from 'react';
import { motion } from 'framer-motion';

// A cute floating star or sparkle
export function Sparkle({ className, delay = 0 }) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1.2, 0],
        rotate: [-45, 0, 45, 90]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="currentColor" />
    </motion.svg>
  );
}

// A reusable container for placing decorations absolute relative to a parent
export function DecorativeContainer({ children, className }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      {children}
    </div>
  );
}

// Emits subtle, soft particles that float upwards
export function FloatingParticles({ active, count = 10 }) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const left = `${Math.random() * 100}%`;
        const delay = Math.random() * 2;
        const duration = 4 + Math.random() * 4;
        const size = 4 + Math.random() * 6;
        
        return (
          <motion.div
            key={i}
            className="absolute bottom-[-10%] bg-primary/40 rounded-full blur-[1px]"
            style={{ left, width: size, height: size }}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{ 
              y: '-120vh', 
              x: (Math.random() - 0.5) * 100,
              opacity: [0, 0.8, 0] 
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
}

// Reusable doodle arrow
export function DoodleArrow({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 32C12 32 25 15 48 20M48 20C48 20 42 27 41 33M48 20C48 20 40 13 36 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Reusable Washi Tape
export function WashiTape({ className, color = "bg-pastel-peach/70" }) {
  return (
    <div className={`absolute h-8 w-32 -rotate-2 backdrop-blur-sm shadow-sm ${color} ${className}`} 
         style={{ clipPath: 'polygon(2% 0, 98% 0, 100% 10%, 99% 90%, 97% 100%, 3% 100%, 0 90%, 1% 10%)' }} />
  );
}
