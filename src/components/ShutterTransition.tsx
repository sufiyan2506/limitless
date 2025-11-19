import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShutterTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [showShutter, setShowShutter] = useState(true);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      // Initial page loading shutter
      const timer = setTimeout(() => {
        setShowShutter(false);
        setIsInitialLoad(false);
      }, 1500);
      return () => clearTimeout(timer);
    } 
    
    // Page navigation shutter
    if (location.pathname !== displayLocation.pathname) {
      setShowShutter(true);
      setTimeout(() => {
        setDisplayLocation(location);
        setShowShutter(false);
      }, 800);
    }
  }, [location.pathname, displayLocation.pathname, isInitialLoad]);

  return (
    <div className="relative min-h-screen">
      {/* Main Content with smooth fade/slide transition */}
      <motion.div
        key={displayLocation.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Shutter Overlay */}
      <AnimatePresence>
        {showShutter && (
          <motion.div
            key="shutter"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ 
                duration: 1.2,
                ease: 'easeOut'
              }}
              className="flex items-center gap-4"
            >
              <motion.img
                src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png"
                alt="Limitless Logo"
                className="w-16 h-16 md:w-20 md:h-20"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
              />

              <motion.span
                className="text-3xl md:text-4xl font-black text-white tracking-wider"
                initial={{ letterSpacing: '0.1em' }}
                animate={{ letterSpacing: '0.2em' }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
              >
                LIMITLESS
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShutterTransition;
