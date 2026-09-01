# Screen Flow

This document details the screen-by-screen breakdown, defining exactly what is on each screen and how it connects to the next.

---

### SCREEN 1: THE INVITATION
- **PURPOSE:** Establish the premium tone and build anticipation.
- **VISIBLE ELEMENTS:** 
  - Soft pastel background.
  - Centered digital envelope/card graphic.
  - Text: "I made something for you..."
- **PRIMARY INTERACTION:** Tap the envelope.
- **SECONDARY INTERACTION:** None.
- **ANIMATION:** Envelope hovers slightly (breathing effect). On tap, the envelope reacts (gentle squeeze/bounce), the flap opens, cute sparkles appear, the card slides out, and the camera zooms in.
- **TRANSITION TO NEXT SCREEN:** Zoom-through/fade into Screen 2.
- **CONTENT REQUIRED:** Opener text.
- **MOBILE CONSIDERATIONS:** Envelope must be a massive touch target centered in the viewport.

---

### SCREEN 2: THE GREETING
- **PURPOSE:** The official, celebratory welcome.
- **VISIBLE ELEMENTS:** 
  - Elegant typography: "Happy Birthday, [FRIEND_NAME]"
  - Subtle floating particles (stars/sparkles).
  - Scroll indicator or "Continue" arrow at the bottom.
- **PRIMARY INTERACTION:** Scroll down or tap arrow.
- **SECONDARY INTERACTION:** None.
- **ANIMATION:** Text fades in staggeringly. Particles drift continuously.
- **TRANSITION TO NEXT SCREEN:** Parallax vertical scroll.
- **CONTENT REQUIRED:** Friend's name, subtitle/greeting text.
- **MOBILE CONSIDERATIONS:** Text must be sized appropriately to fit without awkward wrapping.

---

### SCREEN 3: DIGITAL GIFTS
- **PURPOSE:** Inject playfulness and curiosity.
- **VISIBLE ELEMENTS:** 
  - Grid or stack of 3-4 wrapped gift icons/boxes.
  - Instruction text: "Tap to open your gifts"
- **PRIMARY INTERACTION:** Tap individual gifts.
- **SECONDARY INTERACTION:** Modal/card close button after reading a gift.
- **ANIMATION:** Gifts jiggle slightly. On tap, the gift wiggles/shakes, followed by a cute pop/burst animation (with tiny particles), revealing a card with the gift content.
- **TRANSITION TO NEXT SCREEN:** Once a certain number of gifts are opened (or via a "Next" button that appears), scroll down to memories.
- **CONTENT REQUIRED:** 3-4 short pieces of text/images (inside jokes, small notes).
- **MOBILE CONSIDERATIONS:** Gift icons must be large enough to easily tap without hitting adjacent ones. Modals must be easily dismissible via swipe down or a large close button.

---

### SCREEN 4: THE SCRAPBOOK (MEMORIES)
- **PURPOSE:** Evoke nostalgia through shared history.
- **VISIBLE ELEMENTS:** 
  - Section title: "Some of my favorite moments..."
  - A horizontal carousel or a vertical stack of memory cards.
  - Each card contains: [PHOTO], [DATE/LABEL], [CAPTION].
- **PRIMARY INTERACTION:** Swipe left/right (carousel) or scroll down (stack).
- **SECONDARY INTERACTION:** Tap photo to view full screen (optional).
- **ANIMATION:** Cards scale up slightly when in focus. Smooth snapping if carousel.
- **TRANSITION TO NEXT SCREEN:** Scroll down to the letter section.
- **CONTENT REQUIRED:** Array of objects { photo_url, label, caption }.
- **MOBILE CONSIDERATIONS:** Native-feeling swipe physics are crucial if using a carousel. Images must be heavily optimized for mobile loading.

---

### SCREEN 5: THE LETTER
- **PURPOSE:** Deliver the core emotional, personal message.
- **VISIBLE ELEMENTS:** 
  - Distinct background (e.g., subtle paper texture or contrasting soft color).
  - Handwritten-style header (e.g., "Dear [FRIEND_NAME],").
  - The body of the personal letter.
  - Sign-off.
- **PRIMARY INTERACTION:** Vertical scrolling to read.
- **SECONDARY INTERACTION:** None.
- **ANIMATION:** Paragraphs fade in slightly as they enter the viewport (scroll-triggered).
- **TRANSITION TO NEXT SCREEN:** Scroll to the bottom reveals a "Make a wish" button or seamlessly transitions into the candle area.
- **CONTENT REQUIRED:** The full text of the personal letter.
- **MOBILE CONSIDERATIONS:** Line height and font size must be optimized for long-form reading on a small screen. No center-aligned body text (use left-aligned for readability).

---

### SCREEN 6: THE WISH (CANDLE)
- **PURPOSE:** A magical, interactive pause before the finale.
- **VISIBLE ELEMENTS:** 
  - Darkened/dimmed background.
  - Centered glowing candle/flame graphic.
  - Text: "Make a wish... then tap the flame to blow it out."
- **PRIMARY INTERACTION:** Tap (or swipe) the flame.
- **SECONDARY INTERACTION:** None.
- **ANIMATION:** Flame flickers dynamically, casting a soft glow. On interaction, flame extinguishes, a cute smoke trail goes up, the screen pauses briefly (1-2 seconds), then magical sparkles/confetti appear as the screen goes dark.
- **TRANSITION TO NEXT SCREEN:** Automatic, cinematic delay, then slow fade into the Final Reveal.
- **CONTENT REQUIRED:** Instruction text.
- **MOBILE CONSIDERATIONS:** The interaction must be reliable—a simple, large touch target on the flame is safer than trying to implement microphone/blow detection.

---

### SCREEN 7: FINAL REVEAL
- **PURPOSE:** The emotional payoff and lasting impression.
- **VISIBLE ELEMENTS:** 
  - Beautiful, calm background (perhaps returning to the initial soft palette but brighter).
  - Large emotional typography.
  - Final personal message.
  - High-quality, slow-falling confetti or glowing particles.
- **PRIMARY INTERACTION:** None (absorption phase).
- **SECONDARY INTERACTION:** (Optional) "Replay experience" button tucked away at the bottom.
- **ANIMATION:** Text fades in slowly, sequentially. Particles loop infinitely.
- **TRANSITION TO NEXT SCREEN:** None.
- **CONTENT REQUIRED:** Final impact message (e.g., "I love you. Happy Birthday.").
- **MOBILE CONSIDERATIONS:** Ensure particle animations do not drain battery or cause frame drops.
