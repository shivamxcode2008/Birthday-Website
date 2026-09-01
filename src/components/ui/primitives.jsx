import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface p-6 shadow-soft transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Button({ className, variant = 'primary', children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-8 py-4 font-sans font-medium transition-all duration-300",
        "active:scale-90 touch-manipulation",
        variant === 'primary' && "bg-primary text-white shadow-soft hover:shadow-float hover:-translate-y-1",
        variant === 'outline' && "border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
        variant === 'ghost' && "text-text/70 hover:bg-black/5 hover:text-text",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Section({ className, children, id }) {
  return (
    <section 
      id={id}
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center safe-padding py-20",
        className
      )}
    >
      {children}
    </section>
  );
}

export function Typography({ variant = 'body', className, children, as }) {
  const Component = as || (
    variant === 'h1' ? 'h1' : 
    variant === 'h2' ? 'h2' : 
    variant === 'h3' ? 'h3' : 
    variant === 'script' ? 'span' : 'p'
  );

  return (
    <Component
      className={cn(
        variant === 'h1' && "text-4xl md:text-5xl font-display font-medium text-text mb-4",
        variant === 'h2' && "text-3xl md:text-4xl font-display font-medium text-text mb-4",
        variant === 'h3' && "text-2xl md:text-3xl font-display font-medium text-text mb-3",
        variant === 'body' && "text-base md:text-lg text-text/90 leading-relaxed mb-4",
        variant === 'muted' && "text-sm text-muted leading-relaxed",
        variant === 'script' && "font-handwritten text-3xl md:text-4xl text-primary transform -rotate-2",
        className
      )}
    >
      {children}
    </Component>
  );
}
