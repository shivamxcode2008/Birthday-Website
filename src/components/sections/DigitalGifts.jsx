import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography, Button, Card } from '../ui/primitives';
import { EmptyPhotoWindow } from '../ui/EmptyPhotoWindow';
import { GiftBox } from '../ui/GiftBox';
import { Sparkle, DecorativeContainer, FloatingParticles } from '../ui/Decorations';
import { PandaMascot } from '../ui/PandaMascot';
import { content } from '../../content/content';
import { audio } from '../../lib/audio';

export function DigitalGifts({ onComplete }) {
  // State: 'grid', 'opening', 'opened'
  const [viewState, setViewState] = useState('grid');
  const [selectedGift, setSelectedGift] = useState(null);
  
  // Track which gifts have been opened
  const [openedGifts, setOpenedGifts] = useState([]);

  const handleGiftSelect = (gift) => {
    if (openedGifts.includes(gift.id)) return; // Already opened
    
    setSelectedGift(gift);
    setViewState('opening');
    
    // Automatic transition to 'opened' state after box animation finishes
    setTimeout(() => {
      audio.playGift();
      setViewState('opened');
      setOpenedGifts(prev => prev.includes(gift.id) ? prev : [...prev, gift.id]);
    }, 1200);
  };

  const handleCloseGift = () => {
    setViewState('grid');
    setTimeout(() => {
      setSelectedGift(null);
    }, 500); // Wait for transition before clearing selected gift
  };

  const allOpened = openedGifts.length === content.gifts.length;

  return (
    <Section className="relative overflow-hidden min-h-[100dvh]">
      
      <AnimatePresence mode="wait">
        {/* VIEW 1: THE GRID OF GIFTS */}
        {viewState === 'grid' && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full max-w-sm mx-auto min-h-full"
          >
            <div className="text-center mb-10">
              <Typography variant="body" className="mb-2">
                Since you're here...
              </Typography>
              <Typography variant="h2" className="text-primary">
                A few small surprises
              </Typography>
              <Typography variant="muted" className="text-sm font-medium mt-2">
                {openedGifts.length} / {content.gifts.length} discovered ✨
              </Typography>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {content.gifts.map((gift, index) => {
                const isOpened = openedGifts.includes(gift.id);
                return (
                  <div key={gift.id} className="flex flex-col items-center">
                    <GiftBox 
                      opened={isOpened} 
                      onClick={() => handleGiftSelect(gift)} 
                      delay={index * 0.2}
                      animationType={
                        index === 0 ? 'shake' :
                        index === 1 ? 'bounce' :
                        index === 2 ? 'pull' :
                        'glow'
                      }
                      colorClass={
                        index === 0 ? "bg-pastel-blush" :
                        index === 1 ? "bg-pastel-yellow" :
                        index === 2 ? "bg-pastel-lavender" :
                        "bg-pastel-mint"
                      }
                    />
                    <span className="mt-4 text-xs font-sans font-medium text-muted tracking-widest uppercase">
                      Surprise 0{index + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Completion State UI */}
            <div className="mt-12 h-32 flex items-center justify-center relative">
              <AnimatePresence>
                {allOpened && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center gap-4 z-10"
                  >
                    <Typography variant="body" className="mb-0 font-bold text-primary text-lg">
                      Okayyy... you found them all 👀
                    </Typography>
                    <Button onClick={onComplete} variant="primary" className="px-12 py-4 shadow-float text-lg">
                      Continue &rarr;
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {allOpened ? (
              <PandaMascot pose="excited" className="absolute bottom-8 right-8 scale-150 z-0" />
            ) : (
              <PandaMascot pose="curious" className="absolute bottom-4 left-4 scale-90 opacity-80" />
            )}
          </motion.div>
        )}

        {/* VIEW 2: SINGLE GIFT OPENING/OPENED */}
        {viewState !== 'grid' && selectedGift && (
          <motion.div
            key="active-gift"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm z-50 p-6"
          >
            {/* Background Particles when opened */}
            <FloatingParticles active={viewState === 'opened'} count={10} />

            <div className="relative w-full max-w-sm flex flex-col items-center mt-10">
              
              {/* The large gift box (animates open) */}
              <div className="relative z-10 -mb-20">
                <GiftBox 
                  size="large" 
                  opened={viewState === 'opened'} 
                  onClick={() => {}} 
                  animationType={viewState === 'opening' ? 'opening' : 'default'}
                  colorClass={
                    content.gifts.findIndex(g => g.id === selectedGift.id) === 0 ? "bg-pastel-blush" :
                    content.gifts.findIndex(g => g.id === selectedGift.id) === 1 ? "bg-pastel-yellow" :
                    content.gifts.findIndex(g => g.id === selectedGift.id) === 2 ? "bg-pastel-lavender" :
                    "bg-pastel-mint"
                  }
                />
                
                {/* Sparkle burst exactly when it opens */}
                <AnimatePresence>
                  {viewState === 'opened' && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <Sparkle className="absolute -top-10 -left-10 text-primary w-8 h-8" delay={0.1} />
                      <Sparkle className="absolute top-10 -right-12 text-accent w-10 h-10" delay={0.2} />
                      <Sparkle className="absolute -top-4 right-0 text-primary w-6 h-6" delay={0.3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* The Content Card (slides up out of the box) */}
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={viewState === 'opened' ? { y: 0, opacity: 1, scale: 1 } : { y: 50, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-full z-20 pt-10"
              >
                <Card className="w-full min-h-[200px] flex flex-col items-center justify-center p-8 text-center shadow-[0_10px_40px_-10px_rgba(243,168,177,0.3)] border border-primary/20 bg-white/90 backdrop-blur">
                  
                  {/* Dynamic Content Based on Gift Type */}
                  {selectedGift.type === 'message' && (
                    <>
                      <Typography variant="h3" className="mb-3 text-primary">{selectedGift.title}</Typography>
                      <Typography variant="body" className="mb-0">{selectedGift.content}</Typography>
                    </>
                  )}
                  
                  {selectedGift.type === 'photo' && (
                    <>
                      <Typography variant="h3" className="mb-4 text-primary">{selectedGift.title}</Typography>
                      <div className="w-full max-w-[200px] bg-white p-2 pb-6 shadow-md border border-black/5 rounded-sm relative -rotate-2">
                        <img 
                          src="/assets/photo2.jpg" 
                          alt="Surprise" 
                          className="w-full aspect-square object-cover rounded-sm grayscale-[20%]" 
                          onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full aspect-square bg-gray-100 flex items-center justify-center text-xs text-gray-400">Photo missing</div>'; }}
                        />
                      </div>
                      <Typography variant="muted" className="mt-6 text-sm italic">{selectedGift.caption}</Typography>
                    </>
                  )}

                  {selectedGift.type === 'inside_joke' && (
                    <>
                      <Typography variant="muted" className="mb-4 text-sm italic">{selectedGift.title}</Typography>
                      <Typography variant="script" className="text-primary text-4xl leading-tight">
                        {selectedGift.content}
                      </Typography>
                    </>
                  )}

                  {selectedGift.type === 'sweet_message' && (
                    <>
                      <Typography variant="h3" className="mb-4 text-text">{selectedGift.title}</Typography>
                      <Typography variant="body" className="mb-0 text-text/90 leading-relaxed font-medium">
                        {selectedGift.content}
                      </Typography>
                    </>
                  )}

                </Card>
              </motion.div>

              {/* Close Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={viewState === 'opened' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 1 }}
                className="mt-8 z-20"
              >
                <Button onClick={handleCloseGift} variant="ghost" className="text-text/70 bg-white/50 hover:bg-white px-8">
                  Open another ✨
                </Button>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
