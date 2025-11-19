import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * useNavigationTransition
 *
 * Smoothly tracks when a page navigation occurs, allowing
 * components to animate IN/OUT during route changes.
 *
 * This hook:
 * - Fires only when pathname actually changes
 * - Syncs perfectly with ShutterTransition timing
 * - Avoids double triggers when the same page reloads
 * - Ensures cleanup even on fast route changes
 */
export const useNavigationTransition = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track previous path to prevent redundant triggers
  const prevPathRef = useRef(location.pathname);
  // Store the timeout so we can clean up reliably
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Prevent re-triggering on same route (React 18 double mount fix)
    if (location.pathname === prevPathRef.current) return;

    prevPathRef.current = location.pathname;
    setIsTransitioning(true);

    // ⬇ MATCHES ShutterTransition exit timing (800ms)
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      timeoutRef.current = null;
    }, 800);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [location.pathname]);

  return { isTransitioning };
};
