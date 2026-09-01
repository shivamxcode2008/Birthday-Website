# Personalization Guidelines

This document strictly defines how personal content, specifically photos and text, must be handled during the implementation of this project.

## 1. Strict Photo Handling Policy
**REAL PHOTOS OF THE FRIEND MUST BE USED.** 
Under no circumstances should the developer or AI generate fake people, use random stock photos of people, or scrape images from the web.

### The Empty Photo Window Rule (Development Phase)
During all UI development and testing (Phases 3-13), **DO NOT** use actual photos of the friend, generate fake people, or use stock images of people. 
Instead, create properly designed **EMPTY PHOTO WINDOWS / PLACEHOLDERS**.
These placeholders must have the correct: dimensions, aspect ratio, border radius, shadow, frame style, and animation behavior.
Example concept: `[ BEAUTIFUL EMPTY PHOTO FRAME ]`
The website must be completely testable using these beautiful empty frames.

### The Photo Request Workflow (Phase 14)
Do not ask for photos until the final personalization phase. When it is time:
1. **STOP IMPLEMENTATION.**
2. Explicitly ask the user for the photo:
   > "Memory 01 is ready. Please send the photo you want to use here."
4. Wait for the user to provide the actual image file.
5. Integrate the real image, optimize it, and proceed to the next component.

### Photo Treatment
Once the real photo is provided, treat it with care. Do not unnecessarily alter the friend's appearance.
**Acceptable treatments:**
- Rounded/Scrapbook/Polaroid frames.
- Soft drop shadows.
- Paper layered effects.
- Decorative stickers overlapping the frame.
- Subtle parallax or slight zoom on scroll.

## 2. The Friendship Tone
The relationship context is **platonic friendship**.
- **The Vibe:** Warm, playful, genuine, cute, and wholesome.
- **The Emotional Range:** A mix of funny moments, inside jokes, sweet nostalgic memories, and one meaningful final message.
- **Absolutely Prohibited:** Romantic undertones, love confessions, Valentine's Day aesthetics, kissing/couple imagery, or boyfriend/girlfriend terminology. 

## 3. Placeholder Strategy for Text
Do not invent or hallucinate the friend's personal details, inside jokes, or heartfelt letters. Use clear placeholder brackets in the codebase and `content.js` until the user provides the final copy:
- `[FRIEND_NAME]`
- `[INSIDE_JOKE]`
- `[MEMORY_01]`
- `[PERSONAL_MESSAGE]`
- `[FINAL_MESSAGE]`

If a section of text is required to test layout spacing, use generic Lorem Ipsum or a clear indicator like: `"Hey [FRIEND_NAME], this is a placeholder for a funny memory."`

By strictly adhering to this workflow, the final product will remain a deeply personal, customized gift rather than a generic template.
