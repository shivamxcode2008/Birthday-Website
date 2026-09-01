# Technical Architecture

## 1. Recommended Stack
To balance developer experience, performance, and animation capabilities, the recommended stack is:
- **Framework:** React via Next.js (App Router) or Vite (React). Vite is strongly preferred if this is a purely client-side SPA with no SEO or server-rendering requirements, as it keeps the architecture incredibly simple and fast.
- **Styling:** TailwindCSS (configured carefully to enforce the design system's specific pastel colors and typography) OR Vanilla CSS Modules. *Decision pending based on developer preference, but Vanilla CSS is great for custom, precise animations.*
- **Animation Library:** Framer Motion (React). This is highly recommended over writing complex CSS keyframes manually for things like the scroll-triggered reveals, layout animations (gifts), and the cinematic sequencing of the final candle reveal.

## 2. Folder Structure
Assuming a Vite + React structure:
```text
/src
  /assets             # Images, fonts, SVGs
  /components         # Reusable UI (Button, Card)
    /sections         # Major page sections (Envelope, Gifts, Letter)
  /content            # content.js (The centralized data store)
  /hooks              # Custom hooks (e.g., useScroll, useWindowSize)
  /styles             # Global CSS, design tokens
  App.jsx             # Main orchestrator
  main.jsx            # Entry point
```

## 3. Component Architecture
Build sections as distinct, encapsulated components.
- `<EnvelopeIntro />`
- `<HeroGreeting />`
- `<GiftSection />`
  - `<GiftBox />`
- `<Scrapbook />`
  - `<MemoryCard />`
- `<PersonalLetter />`
- `<CandleFinale />`

The `App.jsx` component will import the global `content.js` and pass the specific pieces of data down to these sections as props.

## 4. State Management
Complex global state management (Redux, Zustand) is **NOT** needed. 
The application state is mostly linear and local:
- Has the envelope been opened? (Local state in `App` or `EnvelopeIntro`).
- Which gifts are opened? (Local state in `GiftSection`).
- Has the candle been blown out? (Local state in `CandleFinale`).

Standard React `useState` and `useEffect` are sufficient.

## 5. Animation Approach
- **CSS:** Use for simple micro-interactions (button hover, simple opacities, infinite looping particles if performance allows).
- **Framer Motion:** Use for section transitions, scroll-triggered reveals (`whileInView`), and orchestrated sequences (like the candle extinguishing -> delay -> final reveal).

## 6. Responsive Strategy
- **Mobile-First CSS:** Base styles apply to mobile. Use `min-width` media queries ONLY if needed to prevent the layout from looking broken on desktop.
- **Desktop Graceful Degradation:** On a desktop monitor, the content should likely be constrained to a max-width container (e.g., `max-w-md` or ~480px) centered on the screen, so it still feels like a cohesive, mobile-proportioned card/experience rather than stretching awkwardly across 1920px.

## 7. Performance Strategy
- **Image Optimization:** All photos in the Scrapbook must be compressed (WebP format preferred) and sized appropriately (~800px width max) before deployment.
- **Lazy Loading:** Given the sequential nature of the site, images in the Scrapbook and below should be lazy-loaded (`loading="lazy"`) so the initial Envelope screen loads instantly.
- **Font Loading:** Preload the primary display font to prevent layout shifts during the emotional greeting.

## 8. Deployment & Delivery Strategy
- **Host:** Vercel, Netlify, or GitHub Pages. All are free, fast, and support Vite/React apps perfectly.
- **URL:** Consider a cheap custom domain (e.g., `happybirthday-name.com`) for an extra premium touch, otherwise a clean Netlify/Vercel subdomain is fine.
- **Final Delivery (QR Code):** Once the production URL is live and verified, generate a high-quality QR code pointing directly to the final URL. This QR code will be the physical artifact given to the friend to scan and open the digital experience. Do **NOT** generate the QR code using local or temporary development URLs.
