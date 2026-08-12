/**
 * Anugraha Eye Hospital — Motion Token System
 * Authoritative motion tokens, easings, durations, stagger scales, and accessibility hooks.
 * Location: /lib/motion-tokens.ts
 */

// Easing Curves
export const easings = {
  /** The signature premium easing curve. Fast start, long confident settle. */
  easeOutPremium: [0.22, 1, 0.36, 1] as const,
  easeOutPremiumCSS: "cubic-bezier(0.22, 1, 0.36, 1)",

  /** Bi-directional easing curve for modals, drawers, and mega-menus. */
  easeInOutSmooth: [0.65, 0, 0.35, 1] as const,
  easeInOutSmoothCSS: "cubic-bezier(0.65, 0, 0.35, 1)",

  /** Soft Framer Motion spring config reserved for playful feedback (buttons, toggles, pulses). */
  easeSpring: { type: "spring", stiffness: 120, damping: 14 } as const,
} as const;

// Duration Scale (seconds)
export const durations = {
  /** 120-150ms: Hover states, button press feedback, theme toggles */
  micro: 0.14,
  /** 250-300ms: Card reveals, dropdown open/close, tooltips */
  standard: 0.28,
  /** 500-700ms: Hero entrance, Aperture reveal, section mask transitions */
  hero: 0.6,
  /** 400-600ms: Route/page view transitions */
  page: 0.5,
  /** 150ms: Reduced-motion opacity fallback fade */
  reducedFallback: 0.15,
} as const;

// Stagger Increments (seconds)
export const staggers = {
  fast: 0.04,
  standard: 0.07,
  group: 0.1,
} as const;

// Types
export type EasingKey = keyof typeof easings;
export type DurationKey = keyof typeof durations;
export type StaggerKey = keyof typeof staggers;

/**
 * Single accessibility hook wrapping prefers-reduced-motion check.
 * When true, swap spring/slide/parallax for a simple 150ms opacity fade and disable Lenis smooth scroll.
 */
export function useMotionSafe() {
  if (typeof window === "undefined") {
    return { isMotionSafe: true, prefersReducedMotion: false };
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const prefersReducedMotion = mediaQuery.matches;

  return {
    isMotionSafe: !prefersReducedMotion,
    prefersReducedMotion,
  };
}

/**
 * Standard Framer Motion variant builder respecting motion safety.
 */
export function createFadeInVariant(
  direction: "up" | "down" | "left" | "right" | "none" = "up",
  distance: number = 24,
  durationKey: DurationKey = "standard",
  delay: number = 0
) {
  const { isMotionSafe } = useMotionSafe();

  if (!isMotionSafe) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: durations.reducedFallback, delay },
      },
    };
  }

  let offset = { x: 0, y: 0 };
  if (direction === "up") offset.y = distance;
  if (direction === "down") offset.y = -distance;
  if (direction === "left") offset.x = distance;
  if (direction === "right") offset.x = -distance;

  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: durations[durationKey],
        ease: easings.easeOutPremium,
        delay,
      },
    },
  };
}
