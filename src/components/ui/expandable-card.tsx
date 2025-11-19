"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  title: string;
  src: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  [key: string]: any;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  /* --------------------- CLOSE HANDLERS --------------------- */
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(false);
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* ---------------- BACKDROP ---------------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-40"
          />
        )}
      </AnimatePresence>

      {/* ---------------- EXPANDED CARD ---------------- */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl",
                "bg-background/30 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]",
                classNameExpanded
              )}
              {...props}
            >
              {/* IMAGE SECTION */}
              <motion.div layoutId={`image-${title}-${id}`}>
                <div className="relative">
                  <div className="w-full h-80 bg-gradient-to-br from-black/30 to-black/60 rounded-t-3xl flex items-center justify-center border-b border-white/10">
                    <span className="text-8xl">{src}</span>
                  </div>
                </div>
              </motion.div>

              {/* TEXT CONTENT */}
              <div className="relative flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="flex justify-between items-start p-8">
                  <div className="flex-1 min-w-0">
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="text-white/60 text-lg mb-2 leading-snug"
                    >
                      {description}
                    </motion.p>

                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="font-bold text-white text-3xl lg:text-4xl leading-tight"
                    >
                      {title}
                    </motion.h3>
                  </div>

                  {/* CLOSE BUTTON */}
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full 
                    bg-white/10 backdrop-blur-xl border border-white/10
                    text-white/70 hover:text-white hover:bg-white/20 transition-colors duration-300 ml-4"
                    onClick={() => setActive(false)}
                  >
                    <motion.div
                      animate={{ rotate: active ? 45 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>

                {/* CHILDREN CONTENT */}
                <div className="px-8 pb-8">
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/85 text-base leading-relaxed space-y-6"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---------------- COLLAPSED CARD ---------------- */}
      <motion.div
        role="dialog"
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "p-6 flex flex-col rounded-2xl cursor-pointer transition-all duration-300",
          "bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10",
          "shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
          className
        )}
      >
        <div className="flex gap-4 flex-col w-full relative z-10">
          <motion.div layoutId={`image-${title}-${id}`}>
            <div className="w-full h-56 rounded-xl flex items-center justify-center 
              bg-gradient-to-br from-white/10 to-white/5
              group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300 border border-white/10"
            >
              <span className="text-6xl">{src}</span>
            </div>
          </motion.div>

          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col flex-1 min-w-0">
              <motion.p
                layoutId={`description-${description}-${id}`}
                className="text-white/60 text-sm font-medium mb-1"
              >
                {description}
              </motion.p>

              <motion.h3
                layoutId={`title-${title}-${id}`}
                className="text-white font-bold text-lg leading-tight"
              >
                {title}
              </motion.h3>
            </div>

            <motion.button
              aria-label="Open card"
              layoutId={`button-${title}-${id}`}
              className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full 
              bg-white/10 backdrop-blur-xl border border-white/10 
              text-white/70 hover:text-white hover:bg-white/20 transition-colors duration-300 ml-3"
            >
              <motion.div
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
