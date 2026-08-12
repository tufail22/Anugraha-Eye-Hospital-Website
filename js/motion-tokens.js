/**
 * Anugraha Eye Hospital — Motion Token System (Browser Runtime)
 * Location: /js/motion-tokens.js
 */

(function () {
  const easings = {
    easeOutPremium: [0.22, 1, 0.36, 1],
    easeOutPremiumCSS: "cubic-bezier(0.22, 1, 0.36, 1)",
    easeInOutSmooth: [0.65, 0, 0.35, 1],
    easeInOutSmoothCSS: "cubic-bezier(0.65, 0, 0.35, 1)",
    easeSpring: { type: "spring", stiffness: 120, damping: 14 },
  };

  const durations = {
    micro: 0.14,
    standard: 0.28,
    hero: 0.6,
    page: 0.5,
    reducedFallback: 0.15,
  };

  const staggers = {
    fast: 0.04,
    standard: 0.07,
    group: 0.1,
  };

  function useMotionSafe() {
    if (typeof window === "undefined") {
      return { isMotionSafe: true, prefersReducedMotion: false };
    }
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;
    return {
      isMotionSafe: !prefersReducedMotion,
      prefersReducedMotion: prefersReducedMotion,
    };
  }

  function getEasingCSS(key) {
    if (key === "easeInOutSmooth") return easings.easeInOutSmoothCSS;
    return easings.easeOutPremiumCSS;
  }

  // Export to window
  window.motionTokens = {
    easings: easings,
    durations: durations,
    staggers: staggers,
    getEasingCSS: getEasingCSS,
  };

  window.useMotionSafe = useMotionSafe;
})();
