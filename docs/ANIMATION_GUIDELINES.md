# Animation Guidelines

## Animation Philosophy
**Animation should feel like storytelling, not decoration.** 
Every movement must have a purpose, but the website must feel alive and interactive. 
- **Cute + Smooth + Delightful:** Animations should be soft and polished. Think gentle floating, little pop animations, and playful text entrances.
- **Action → Reaction → Reveal:** Every major interaction should have a visual reaction. When a user taps something, it should bounce, wiggle, or spark before revealing the next content.
- Avoid aggressive motion, extreme bouncing, or random GIF-like behavior.
- Favor smooth easing (e.g., cubic-bezier, subtle spring physics) over linear movements.
- The experience must remain premium; prioritize high-quality execution over childish cartoon effects.

## Timing Principles
- **Micro-interactions (Buttons, Hover):** Fast (150ms - 250ms). Needs to feel instantly responsive.
- **Transitions (Section to Section):** Moderate (400ms - 600ms). Fast enough not to feel sluggish, slow enough to feel intentional.
- **Cinematic Reveals (Final Screen, Envelope):** Slow (800ms - 1500ms). Give the user time to process the emotional weight.

## Specific Animations

### 1. The Envelope Opening
- **Idle:** Gentle floating/breathing (transform: translateY 3px up and down over 3 seconds).
- **Interaction:** On tap, envelope flap rotates open (3D transform), the inner card slides up along the Y-axis, and the entire container scales up and fades opacity to transition to the main view.

### 2. Gift Opening
- **Idle:** Random, very subtle jiggle every 5-10 seconds to indicate interactivity.
- **Interaction:** On tap, a quick scale down (anticipation), followed by a pop/burst (scale up, slight rotation, maybe a small SVG spark burst), revealing the text card.

### 3. Memory Cards (Scrapbook)
- **Entrance:** Staggered fade-up and slight slide-up (translateY: 20px -> 0) as they scroll into view.
- **Interaction:** If a carousel, cards subtly scale down (0.95) when they are not the active center card, and scale up (1.0) when centered. 

### 4. Text Reveal (The Letter)
- **Entrance:** Paragraphs should not just pop in. Use a scroll-triggered `fade-up` (opacity: 0 -> 1, translateY: 10px -> 0) with a slight stagger if multiple elements enter at once.

### 5. The Candle & Final Reveal
- **Candle Idle:** The flame requires a looping, randomized flicker animation (scaling X/Y slightly, changing opacity/glow radius) to feel alive.
- **The Extinguish:** On tap, the flame scales to 0 rapidly, replaced by a subtle gray smoke SVG path that drifts upward and fades. Screen background transitions to dark (`#111` or similar) over 800ms.
- **The Pause:** Hold the dark screen for exactly 1.5 seconds. Do nothing.
- **The Reveal:** The background slowly lightens, and the final text fades in (opacity only, very slow, 1200ms easing). 

## Micro-Interactions
- **Buttons:** On `touchstart` / `mousedown`, scale the button to 0.95. On release, spring back to 1.0. This provides satisfying tactile feedback without needing sound.

## Reduced-Motion Considerations
Always respect the user's OS-level accessibility settings.
```css
@media (prefers-reduced-motion: reduce) {
  /* Replace complex transforms with simple fades */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
If reduced motion is enabled, the candle interaction should just be a simple tap-to-fade, and the envelope should immediately crossfade to the greeting.
