# Design Decisions Log

This document tracks major design and technical decisions made during the project to prevent drift and ensure consistency.

### DECISION 1: Mobile-First, Desktop-Constrained Layout
**Decision:** The layout will be designed strictly for mobile dimensions. On desktop, it will appear as a centered, mobile-proportioned container rather than stretching full-width.
**Reason:** The experience is meant to feel like personal digital stationery. Stretching text across a 27" monitor ruins the intimate, letter-like reading experience. The recipient is 95% likely to view a birthday link on their phone.
**Alternative Considered:** Fully responsive design adapting to grid layouts on desktop.
**Why Rejected:** Wastes development time on a viewport that isn't the primary target, and dilutes the intended narrative flow.

### DECISION 2: Decoupled Content Structure (`content.js`)
**Decision:** All personal data (text, image paths) will live in a single JSON/JS file rather than hardcoded in components.
**Reason:** Allows the developer to focus on UI and animation first with placeholder data. Ensures the final, highly personal content can be dropped in flawlessly at the last minute without risking breaking the code.
**Alternative Considered:** Hardcoding text into React components.
**Why Rejected:** Makes iteration difficult and increases the risk of accidentally deleting a closing tag when changing a paragraph of text.

### DECISION 3: Tap interaction for the Candle (Instead of Microphone/Blow)
**Decision:** The user will tap or swipe the flame to extinguish it, rather than blowing into the microphone.
**Reason:** Microphone API requires explicit browser permissions, which ruins the seamless flow. It is also technically flaky on different mobile browsers and environments (e.g., loud rooms).
**Alternative Considered:** Web Audio API to detect loud noise (blowing).
**Why Rejected:** High risk of failure, which would ruin the emotional climax of the experience. A reliable touch interaction is safer and still magical.

### DECISION 4: Scroll-Based Progression (Mostly)
**Decision:** After the initial envelope opening, navigation will primarily be vertical scrolling, rather than strict "Next Page" buttons.
**Reason:** Scrolling is the most natural mobile gesture. It allows the user to control the pace of the story and scroll back up to re-read the letter or look at memories.
**Alternative Considered:** Strict pagination (Screen 1 -> Screen 2 -> Screen 3) using buttons.
**Why Rejected:** Can feel restrictive and too much like a PowerPoint presentation or a corporate survey.

### DECISION 5: Exclude Autoplay Music
**Decision:** The baseline experience will not include autoplaying background music.
**Reason:** Browsers strictly block autoplay audio without interaction. Audio can also be jarring if the user opens the link in public. The experience must carry its emotional weight visually.
**Alternative Considered:** A background music track.
**Why Rejected:** Technical hurdles and UX risks. If music is added later, it will require an explicit, obvious "Unmute" button upon opening the envelope.

### DECISION 6: Phase 3 Visual Identity (Colors & Typography)
**Decision:** Selected a soft pastel palette (Warm Cream `#fcf9f5` background, Soft Blush Pink `#f4b4be` primary) and elegant fonts (Lora for headings, Outfit for UI/Body, Caveat for handwritten accents).
**Reason:** Perfect balance of 70% premium (Lora/Outfit and soft cream) and 30% cute/playful (Blush pink, Caveat).
**Alternative Considered:** Bold neo-brutalism or generic Tailwind defaults.
**Why Rejected:** Too harsh, lacks the personalized, stationery-like warmth required for the "friendship" tone.

### DECISION 7: Phase 3 Technical Stack
**Decision:** Standard Vite + React (JavaScript) + TailwindCSS + Framer Motion.
**Reason:** Extremely lightweight, fast hot-reloading for development, and Framer Motion handles the complex `whileInView` and spring animations effortlessly.
**Alternative Considered:** Next.js (App Router).
**Why Rejected:** The project is a pure client-side SPA with no SEO requirements. Next.js adds unnecessary server overhead and complexity.

### DECISION 8: Phase 4 Envelope Implementation
**Decision:** The envelope is built entirely with CSS `clip-path` and Framer Motion 3D rotation (`rotateX`), overlaid with absolute positioning, rather than a raw SVG file.
**Reason:** Allows perfect integration with the Tailwind color tokens, dynamic resizing, and easy injection of the React `Card` component inside the envelope so it can slide out dynamically.
**Alternative Considered:** SVG animation.
**Why Rejected:** Harder to position complex React DOM elements (like the letter with typography) *inside* the SVG layers cleanly.

### DECISION 9: Envelope Interaction Feedback
**Decision:** The envelope breathes slowly. On tap, it scales down to 0.95 instantly, then the flap opens over 0.6s, followed by the card sliding up with a spring-like delay.
**Reason:** Follows the strict *Action → Reaction → Reveal* rule. The tactile scale-down proves the app registered the tap immediately, masking the animation delay of the flap.

### DECISION 10: Phase 5 Crossfade Handoff
**Decision:** Transitioned from `OpeningExperience` to `BirthdayGreeting` using a full-component crossfade via Framer Motion's `<AnimatePresence mode="wait">`.
**Reason:** It keeps the file size and logic of the individual components small while achieving a cinematic, seamless transition that feels like a continuous journey.

### DECISION 11: Action/Reaction Pop Animation
**Decision:** Tapping "Show me!" triggers a dedicated reaction state (a large sparkle cluster with a spring animation) for 1 second before revealing the actual continuation UI.
**Reason:** Solidifies the "cute + playful" friendship tone. It makes the button press feel deeply rewarding and engaging, strictly following the Action -> Reaction -> Reveal instruction.

### DECISION 12: Phase 6 CSS GiftBox Implementation
**Decision:** Built the `GiftBox` component entirely with styled divs and SVG ribbons instead of using emoji or imported images. The lid rotates and translates upwards in 3D using Framer Motion.
**Reason:** Makes it responsive, allows dynamic coloring (e.g. graying out opened gifts), guarantees pixel-perfect crispness on mobile screens, and avoids asset loading times.
**Alternative Considered:** Lottie animations or flat emojis.
**Why Rejected:** Emojis are too generic; Lottie files are harder to synchronize precisely with the Card slide-up reveal mechanics.

### DECISION 13: Phase 7 Memory Navigation
**Decision:** Used explicit "Prev" and "Next" buttons coupled with horizontal Framer Motion sliding transitions (`x: 20` to `0`), rather than touch-swipe mechanics (`drag="x"`).
**Reason:** Touch-swipe on mobile web can easily conflict with the browser's native back/forward gestures or scroll behavior. Explicit buttons guarantee 100% accessibility and foolproof UX.
**Alternative Considered:** Framer Motion swipeable deck.
**Why Rejected:** Increased complexity with lower reliability on some mobile browser viewports. The explicit buttons remain fast and satisfying.

### DECISION 14: Scrapbook Aesthetic Execution
**Decision:** Implemented a single `MemoryCard` that combines a CSS "tape" element, the `EmptyPhotoWindow`, and handwritten (`Caveat` font) titles. The cards are organically rotated based on their array index (`-2deg`, `1.5deg`, etc).
**Reason:** Gives a genuine scrapbook feel without cluttering the screen or relying on heavy background textures. It frames the eventual photo beautifully as the absolute focal point.

### DECISION 15: Phase 8 Letter Animation & Rhythm
**Decision:** The letter content staggers in slowly paragraph by paragraph (`staggerChildren: 0.8`) using a soft blur and upward fade. A pure SVG noise filter creates subtle paper texture.
**Reason:** Forces the user to slow down and read the letter piece by piece, matching the requested "calm, personal" emotional tone without resorting to aggressive typing animations.

### DECISION 16: Phase 9 Make a Wish / CSS Cake
**Decision:** Built the cake and candle entirely out of pure styled `div` elements, gradients, and Framer Motion for the flame and smoke animations. The user interaction is a simple touch rather than requesting microphone access.
**Reason:** Ensures the asset remains incredibly lightweight, infinitely crisp on mobile, and guarantees 100% accessibility/reliability (microphone APIs on mobile web can often prompt scary browser warnings or fail silently). The pure CSS execution maintains the premium aesthetic.

### DECISION 17: Phase 10 Cinematic Final Reveal & Confetti
**Decision:** The final reveal uses a multi-stage `useEffect` state machine to sequence a 7.5-second cinematic fade-in from darkness. Confetti is implemented using a finite burst of 50 `motion.div` elements rather than importing a heavy canvas particle library like `react-confetti`.
**Reason:** Forces anticipation and makes the final payoff feel immense without breaking performance on lower-end mobile devices. The finite burst ensures the screen returns to an elegant, calm state shortly after the celebration, allowing the final message to be read peacefully.

### DECISION 18: Phase 11 Full Experience QA & Architecture Polish
**Decision:** Validated the state lifecycle for Replay functionality. Because `App.jsx` mounts/unmounts major phase components using `currentPhase`, React naturally garbage-collects and resets all internal states (`useState`, `useEffect`) automatically without requiring a heavy global state manager like Redux or Zustand.
**Reason:** Keeps the architecture lightweight. Unused imports were stripped, and the global container (`overflow-hidden`) was validated to guarantee absolutely zero horizontal scrolling on mobile across all phases.
