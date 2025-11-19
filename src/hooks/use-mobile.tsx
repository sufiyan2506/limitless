import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768; // px

/**
 * useIsMobile()
 * - Fast
 * - SSR-safe
 * - No layout flicker
 * - Uses matchMedia properly
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const update = () => setIsMobile(media.matches);

    // Initial check
    update();

    // Listener
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}
