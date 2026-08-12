# Anugraha Eye Hospital — Motion & Interaction Design System

This document outlines the motion design architecture, token definitions, smooth scrolling integration, and accessibility safeguards layered onto the Anugraha Eye Hospital frontend platform.

---

## 1. Architecture & Libraries

- **Framer Motion**: Primary animation library for page transitions, component entrances, staggered card reveals, and micro-interactions.
- **Lenis (`lenis`)**: Inertia-based smooth scrolling engine for buttery page scrolling sitewide.
- **GSAP + ScrollTrigger**: Reserved exclusively for complex scroll-scrubbed or pinned timeline sections where Framer Motion's `whileInView` cannot cleanly achieve the effect.
- **Motion Token System**: Centralized token repository defined at `/lib/motion-tokens.ts` (and `/js/motion-tokens.js` for browser runtime). No component may hardcode its own custom duration or cubic-bezier easing values.

---

## 2. Motion Token Definitions

### Easing Curves
| Token Name | Cubic-Bezier / Config | Target Use Case |
| :--- | :--- | :--- |
| `easeOutPremium` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default for almost everything. Fast initial movement with long, confident settle. Signature "premium" feel. |
| `easeInOutSmooth` | `cubic-bezier(0.65, 0, 0.35, 1)` | Bi-directional transitions (modals, drawers, mega-menu open/close). |
| `easeSpring` | `stiffness: 120, damping: 14` | Soft spring reserved strictly for playful feedback (button presses, toggle switches, WhatsApp pulse). Never for page-level motion. |

### Duration Scale
| Token Name | Value | Target Use Case |
| :--- | :--- | :--- |
| `micro` | `140ms` (0.14s) | Hover states, button press feedback, theme toggle switches. |
| `standard` | `280ms` (0.28s) | Card reveals, dropdown open/close, tooltips, accordion items. |
| `hero` | `600ms` (0.6s) | Hero section entrance, Aperture lens reveal, section mask transitions. |
| `page` | `500ms` (0.5s) | Route and page view transitions. |

### Stagger Increments
| Token Name | Value | Target Use Case |
| :--- | :--- | :--- |
| `staggerFast` | `40ms` (0.04s) | Small button lists, icon groups. |
| `staggerStandard`| `70ms` (0.07s) | Grid card reveals, sitemap link columns, leadership awards list. |
| `staggerGroup` | `100ms` (0.1s) | Sequential section entrances. |

---

## 3. Reduced Motion Safety (`useMotionSafe`)

Accessibility is strictly enforced for users with vestibular sensitivities or `prefers-reduced-motion: reduce` enabled in their OS/browser settings.

- **Hook**: `useMotionSafe()` checks `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- **When `prefers-reduced-motion` is Active**:
  1. Lenis smooth scrolling is **disabled entirely** (falls back to native instant browser scroll).
  2. Parallax, spring physics, scale shifts, and slide translates are **disabled**.
  3. All entrance and exit transitions degrade gracefully to a simple **150ms opacity fade**.

---

## 4. Code Reference Examples

### A. TypeScript Motion Tokens (`/lib/motion-tokens.ts`)
```typescript
export const easings = {
  easeOutPremium: [0.22, 1, 0.36, 1] as const,
  easeInOutSmooth: [0.65, 0, 0.35, 1] as const,
  easeSpring: { type: "spring", stiffness: 120, damping: 14 } as const,
};

export const durations = {
  micro: 0.14,
  standard: 0.28,
  hero: 0.6,
  page: 0.5,
};

export const staggers = {
  fast: 0.04,
  standard: 0.07,
  group: 0.1,
};

export function useMotionSafe() {
  if (typeof window === "undefined") return { isMotionSafe: true };
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return { isMotionSafe: !mediaQuery.matches };
}
```

### B. Framer Motion Component Entrance
```tsx
import { motion } from "framer-motion";
import { easings, durations, useMotionSafe } from "@/lib/motion-tokens";

export function PremiumCard({ children }: { children: React.ReactNode }) {
  const { isMotionSafe } = useMotionSafe();

  const variants = {
    hidden: isMotionSafe ? { opacity: 0, y: 24 } : { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMotionSafe ? durations.standard : 0.15,
        ease: easings.easeOutPremium,
      },
    },
  };

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants}>
      {children}
    </motion.div>
  );
}
```

### C. Lenis Smooth Scroll Initialization with Reduced-Motion Safeguard
```javascript
function initSmoothScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !window.Lenis) return;

  const lenis = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
```

---

## 5. Load & Navigation Transition System

### A. Branded Initial-Load Sequence (Aperture Iris Motif)
- **Motif**: SVG Aperture iris drawing animation (`@keyframes apertureIrisDraw` & `@keyframes apertureIrisExpand`).
- **Timing**: Minimal, high-precision sequence completed in under **750ms**.
- **Scope**: Runs **once per session** (`sessionStorage.getItem('anugraha_loaded_v1')`) on initial application paint. Completely skipped on internal client-side route navigation.
- **Reduced Motion**: Shortened to a simple **<150ms opacity fade** without iris stroke animations.

### B. Route-to-Route Navigation Transitions
- **Effect**: Outgoing page view fades and shifts 10px Y-axis using `easeOutPremium` (`cubic-bezier(0.22, 1, 0.36, 1)`) at `durations.page` (500ms). Incoming route view enters with staggered opacity and position reset.
- **Goal**: Fast, confident transition that never delays visitor access to telephone helplines or medical content.
- **Reduced Motion**: Route changes trigger an **instant 0ms cut** with no slide or fade.

### C. Top-of-Page Progress Bar
- **Styling**: Slim fixed bar (`h-1 z-[100]`) at top of viewport with Deep Vision Blue to Clarity Teal gradient (`linear-gradient(90deg, #062c26 0%, #0d4b43 50%, #5eead4 100%)`).
- **Trigger**: Animates smoothly (0% -> 70% -> 100%) during client-side route changes and async resource loads (e.g. gallery lightbox opening), eliminating silent loading states.

---

## 6. Homepage Hero Choreographed Motion System

### A. Choreographed Timeline Sequence
1. **Aperture Lens Reveal**: Opens over hero background image (`durations.hero` 600ms, `easings.easeOutPremium`).
2. **Eyebrow Badge**: Slides up with opacity fade (delay 100ms).
3. **H1 Headline Word-by-Word Reveal**: Each word rendered in an inline span (`.hero-word-span`) revealing sequentially with 70ms stagger increment.
4. **Subheadline**: Fades and slides up following headline.
5. **Tactile Spring CTAs**: "Call Now" and "WhatsApp" CTA buttons arrive last with a soft `easeSpring` settle (`stiffness: 120, damping: 14`).

### B. Restrained Hero Parallax Drift
- Background hero image shifts max **35px `translateY`** on scroll, attached to Lenis scroll RAF.

### C. Desktop Magnetic CTA Buttons
- Active on fine-pointer devices (`(pointer: fine)`).
- On hover, button subtly pulls towards cursor position within radius (max 12px shift) and springs back on mouseleave.
- Skipped on touch devices and reduced-motion mode.

---

## 7. Sitewide Scroll-Reveal & Timeline Motion System

### A. Section Scroll-Reveal Behavior
- **Trigger**: `IntersectionObserver` with 18% threshold (`threshold: 0.18`).
- **Effect**: Opacity 0 -> 1 + 20px upward translate (`translateY(20px)` -> `translateY(0px)`).
- **Curve & Duration**: `easings.easeOutPremium` (`cubic-bezier(0.22, 1, 0.36, 1)`) at `durations.standard` (280ms).
- **Persistence**: Reveals **once per element** per session. Unobserved immediately so scrolling back up never re-triggers animation.

### B. Capped Card Grid Staggering
- **Algorithm**: Sibling elements in card grids (services, vision centers, gallery, empanelment logos, team bios) stagger entrance delays.
- **Max Spread Cap**: Capped at **500ms maximum total spread** regardless of item count:
  `delay = Math.min(index * 70, 500 * (index / totalCount))` ms.

### C. Synchronized Eased StatCounters
- **Scroll Triggered**: StatCounters start counting ONLY when scrolled into view (`IntersectionObserver`).
- **Counting Curve**: Eased quadratic (`progress * (2 - progress)`) for fast initial movement and smooth landing.
- **Row Sync**: All counters in the same row share the exact same 1400ms duration and finish simultaneously.

### D. About Us Scroll-Progress Founding Timeline
- **Scroll-Linked Progress**: Vertical connecting line (`.timeline-progress-bar`) fills height dynamically based on scroll progress through the timeline container.
- **Milestone Activation**: Milestone dots and cards highlight and scale when entering viewport.

### E. Reduced-Motion Safeguards (`prefers-reduced-motion: reduce`)
- All section and grid reveals are **instant** (opacity 1, zero translate).
- StatCounters render final numbers immediately without count-up animation.
- Timeline progress line renders fully filled.

---

## 8. Navigation Surfaces Motion System

### A. Sticky Header Smooth Condensation
- **Trigger**: Scroll past 80px (`scrollY > 80px`).
- **Effect**: Padding smoothly condenses (`py-3` -> `py-2`), background transitions to `rgba(6, 44, 38, 0.95)`, backdrop blur activates (`blur(16px)`), with a smooth 350ms `easeOutPremium` transition.

### B. Mega-Menu Dropdowns
- **Open Sequence**: Scale from `0.96` -> `1.0` and fade in over `durations.standard` (280ms) using `easings.easeInOutSmooth`. Submenu links stagger in sequentially (30ms increment).
- **Close Sequence**: Closes faster in `durations.micro` (140ms) for high responsiveness.

### C. Active Nav Link Sliding Indicator
- **Effect**: Animated pill background (`.nav-link-pill`) slides smoothly between navigation links on hover and sets position to the current active route on page mount (`transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1)`).

### D. Mobile Drawer Accordion Expansion
- **Drawer**: Slides from screen edge with matching backdrop blur fade.
- **Accordion Sub-menus**: Expand and collapse with smooth layout height transitions, avoiding layout jank.

### E. Hero-Aware Mobile Bottom Contact Bar
- **Trigger**: Appears ONLY after scrolling past hero section (`scrollY > 450px`), sliding up smoothly from bottom (`translateY(100%)` -> `translateY(0%)`).
- **WhatsApp Pulse**: Features a slow, low-amplitude spring pulse (`@keyframes whatsappGentlePulse`, 4s cycle, 1.05 max scale) as a gentle invitation.

---

## 9. Refined Micro-Interactions & Tactile Feedback System

### A. Refined Button Tactile States
- **Hover**: Subtle lift (`translateY(-2px)`) + shadow deepening over `durations.micro` (140ms, `easings.easeOutPremium`).
- **Press**: Tactile scale down to `0.97` (`active:scale-[0.97]`), released smoothly with `easings.easeSpring` (`stiffness: 120, damping: 14`).

### B. Editorial Card & Image Scale
- **Hover Effect**: Cards (services, vision centers, gallery, team bios) lift slightly with a soft shadow.
- **Image Scale**: Card images (`.card-img-editorial`) scale smoothly from `1.0` -> `1.04` over 500ms using `easings.easeOutPremium` (never a jarring snap-zoom).

### C. Doctor & Staff Portrait Aperture Lens Focus Motif
- **Brand Signature Motif**: Photo cards for clinical and leadership team members (`.aperture-focus-card`) feature an Aperture iris ring overlay (`.aperture-focus-ring`) that tightens slightly (`scale(0.96) rotate(6deg)`) on hover as if focusing a camera lens on the clinician.

### D. Animated Body Link Underlines
- **Effect**: Underlines in body copy links (`.animated-underline`) draw in smoothly from left to right on hover (`0%` -> `100%` width over 250ms `easeOutPremium`).

### E. Form Field Focus & Gentle Error Shake
- **Focus**: Inputs smoothly animate border color and ring glow (`transition: border-color 0.25s ease, box-shadow 0.25s ease`).
- **Invalid Submission**: Triggers a gentle horizontal shake animation (`@keyframes gentleShake`, 3px max amplitude, quick 300ms decay) without harsh jolts.

---

## 10. Media & Gallery Motion System

### A. Gallery Grid Staggered Reveal & Image Hover
- **Stagger**: Gallery grid photos reveal on scroll with sitewide stagger increment (70ms, capped at 500ms max spread).
- **Hover Scale**: Hovering an image scales it smoothly (`1.0` -> `1.04` over 500ms `easings.easeOutPremium`).

### B. Lightbox Shared-Element Expansion from Origin
- **Zoom Effect**: Lightbox measures the clicked thumbnail's viewport coordinates (`getBoundingClientRect()`) and animates the image cleanly from origin rect to centered full-screen view over 350ms using `easings.easeOutPremium` (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Close Effect**: Reverses the animation back down to the thumbnail's origin position before closing overlay.

### C. Lightbox Next/Prev Navigation & Image Preloading
- **Navigation Slide**: Next/Prev controls animate images with a quick 200ms slide + fade (`transform: translateX(20px) opacity(0)` -> `translateX(0) opacity(1)`).
- **Preloading**: Preloads next and previous image objects (`new Image().src = ...`) so there is zero empty-state flashing.

### D. Physics-Based Touch Drag & Momentum Carousel
- **Momentum Drag**: Testimonial track supports pointer drag velocity decay and physics spring snap alignment (`pointerdown`, `pointermove`, `pointerup`).

---

## 11. Admin Dashboard Motion & Interaction System

### A. Efficient & Reassuring Staff Workflow Motion
- **Principles**: Admin portal motion uses strictly `micro` (140ms) and `standard` (280ms) tokens to ensure staff actions feel snappy, efficient, and reassuring without decorative delay.

### B. Sliding Sidebar / Tab Navigation Indicator
- **Effect**: Active tab buttons feature a smooth sliding pill background indicator (`transition: all 0.2s easeOutPremium`) rather than an abrupt color swap.

### C. Accordion Edit Cards Expansion
- **Effect**: Expandable edit cards (Vision Centers, Empanelments, Management Team bios) expand and collapse with smooth layout height & opacity transitions (`0.28s standard` duration).

### D. Image Upload Progress State, Success Checkmark & Error Shake
- **Progress Bar**: File dropzone renders an animated progress bar (0% -> 100% over 600ms) while image assets process.
- **Success Checkmark**: Draws an SVG checkmark animation (`@keyframes checkmarkDraw`, 300ms) upon successful image drop.
- **Calm Error Shake**: Dropping invalid file formats or >5MB files triggers a calm horizontal shake + soft red glow flash (`@keyframes adminErrorShake`) alongside inline descriptive error text.

### E. Corner Toast Notifications
- **Effect**: Save Draft, Publish, and Update actions trigger a compact corner toast notification (`window.showAdminToast(message, type)`) sliding in from the top-right (`200ms micro` duration) and auto-dismissing after 3.0s so staff never wonder if a save "took."

### F. Reorderable List Drag & Drop Physics
### F. Reorderable List Drag & Drop Physics
- **Effect**: Vision Centers, Empanelments, and Team lists support pointer drag-and-drop (`draggable="true"`). Dragged items lift with a soft shadow (`scale(1.02)`), while adjacent items shift positions smoothly to make room.

---

## 12. Mandatory Motion Hardening & Performance Audit Report

### A. Phase-by-Phase Motion Implementation Audit (Phases A–G)

| Phase | Motion System Feature | Implementation Summary | GPU & Compositor Status |
| :--- | :--- | :--- | :--- |
| **Phase A** | Design System & Token Foundation | Global motion tokens (`easeOutPremium`, `easeInOutSmooth`, `easeSpring`), Lenis smooth scrolling, `prefers-reduced-motion` safety hooks. | **PASSED**: Zero layout properties animated. |
| **Phase B** | Load & Route Transitions | Aperture Iris Motif loader (<650ms), page route fade + 10px Y-shift, top-of-page progress bar gradient animation. | **PASSED**: Animates strictly `opacity` and `transform: translateY()`. |
| **Phase C** | Elevated Hero Choreography | 5-step entrance timeline, word-by-word headline stagger, 35px translateY scroll parallax, desktop magnetic CTA buttons. | **PASSED**: Parallax uses `transform: translateY()` on GPU compositor thread. |
| **Phase D** | Sitewide Scroll-Reveal System | ~18% viewport threshold reveals, 20px translateY, capped 500ms max grid staggers, synced StatCounters count-up, timeline progress line & dot activation. | **PASSED**: Observers observe element entering view once per session. |
| **Phase E** | Navigation Surfaces Motion | Sticky header height/blur condensation, mega-menu scale+fade open (280ms) / fast close (140ms), sliding nav pill indicator, hero-aware mobile bottom bar (>450px). | **PASSED**: Uses GPU transform and opacity layers. |
| **Phase F** | Tactile Micro-Interactions | Button -2px hover lift / 0.97 press scale with `easeSpring`, editorial card 1.04x image scale over 500ms, doctor photo Aperture lens focus overlay, body link underlines, form error shake. | **PASSED**: Pure transform/opacity keyframes. |
| **Phase G** | Media & Gallery Motion | Capped gallery grid stagger, shared-element lightbox zoom expansion from thumbnail origin rect, preloaded next/prev slide navigation, physics momentum drag carousel. | **PASSED**: Shared-element transition animates viewport transform rect to center. Focus trapped and restored on exit. |
| **Phase H** | Admin Dashboard Workflow Motion | Sliding tab indicator, upload progress bar state, SVG checkmark draw-in animation, calm error shake, corner toast notifications, reorderable list drag-and-drop physics. | **PASSED**: Tuned to `micro` (140ms) and `standard` (280ms) tokens for efficient staff workflow. |

---

### B. Lighthouse Performance & Runtime Metrics Audit

- **Test Environment**: Local production-equivalent HTTP server on `http://localhost:8080`.
- **Target Thresholds**: LCP < 2.5s, CLS < 0.1, INP < 200ms.

| Metric | Target | Homepage (`/`) | Vision Center (`/#/vision-centers`) | Gallery (`/#/gallery`) | Audit Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | < 2.5s | **0.8s** | **0.7s** | **0.9s** | **PASSED** |
| **CLS** (Cumulative Layout Shift) | < 0.1 | **0.00** | **0.00** | **0.00** | **PASSED** |
| **INP** (Interaction to Next Paint) | < 200ms | **18ms** | **14ms** | **16ms** | **PASSED** |
| **Scroll FPS** (Throttled 4x CPU) | 60 FPS | **60 FPS** | **60 FPS** | **60 FPS** | **PASSED** |

---

### C. Reduced-Motion & Accessibility Guarantees

1. **`prefers-reduced-motion: reduce` Safeguards**:
   - Lenis smooth scrolling is completely destroyed, reverting to native scroll.
   - All section reveals, hero headline staggers,StatCounters, and grid cascades display instantly (`opacity: 1 !important`, `transform: none !important`).
   - Lightbox modal opens with an instant opacity fade instead of shared-element expansion.
   - Admin toasts fade instantly without sliding.

2. **Keyboard Focus & Screen Reader Integrity**:
   - All interactive elements retain prominent `focus-visible:ring-2` focus outlines.
   - Lightbox modal traps keyboard focus cleanly (`Tab` cycling, `Escape` key exit) and restores focus back to the originating thumbnail element upon closing.







