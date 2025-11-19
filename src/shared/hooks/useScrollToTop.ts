import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that automatically scrolls to the top of the page
 * when the route changes. Useful for maintaining consistent UX
 * across page transitions.
 * 
 * @example
 * ```tsx
 * // Use in your main App component or layout
 * function App() {
 *   useScrollToTop();
 *   return <Router>...</Router>;
 * }
 * ```
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};