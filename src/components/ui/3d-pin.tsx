"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------------------------
   Pin Container (Clean, Modern, Premium 3D Hover Component)
------------------------------------------------------------------------------------ */

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
  titleClassName,
  onMouseEnter: externalOnMouseEnter,
  onMouseLeave: externalOnMouseLeave,
  onClick,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%, -50%) rotateX(0deg) scale(1)"
  );

  // Smooth entry + exit animations
  const onMouseEnter = () => {
    setTransform("translate(-50%, -50%) rotateX(35deg) scale(0.92)");
    externalOnMouseEnter?.();
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%, -50%) rotateX(0deg) scale(1)");
    externalOnMouseLeave?.();
  };

  const handleClick = (e: React.MouseEvent) => onClick?.(e);

  const Wrapper = href ? Link : "div";

  return (
    <Wrapper
      to={href || ""}
      className={cn(
        "relative group/pin cursor-pointer select-none",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      {/* 3D Card */}
      <div
        style={{ perspective: "1200px" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{ transform }}
          className="absolute p-4 rounded-2xl shadow-[0_8px_20px_rgb(0_0_0/0.45)]
                     bg-black/80 backdrop-blur-xl border border-white/10 
                     group-hover/pin:border-white/20 transition-all duration-700"
        >
          <div className={cn("relative z-20", className)}>{children}</div>
        </div>
      </div>

      <PinPerspective title={title} titleClassName={titleClassName} />
    </Wrapper>
  );
};

/* ------------------------------------------------------------------------------------
   Neon Perspective Glow + Floating Title
------------------------------------------------------------------------------------ */

export const PinPerspective = ({
  title,
  titleClassName,
}: {
  title?: string;
  titleClassName?: string;
}) => {
  return (
    <motion.div
      className="pointer-events-none w-[26rem] h-[21rem] flex items-center justify-center 
                 opacity-0 group-hover/pin:opacity-100 transition duration-500 z-20"
    >
      <div className="relative w-full h-full -mt-6">

        {/* Floating Title */}
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <div className="relative rounded-full bg-zinc-900/90 py-1 px-5 backdrop-blur-xl 
                          border border-white/10 shadow-lg">
            <span
              className={cn(
                "text-xs font-bold text-white tracking-wide",
                titleClassName
              )}
            >
              {title}
            </span>
          </div>
        </div>

        {/* 3D Neon Rings */}
        <FloatingNeonRings />

        {/* Vertical laser line */}
        <motion.div
          className="absolute left-1/2 bottom-1/2 bg-gradient-to-b 
                     from-transparent to-cyan-500/70 w-px h-24 group-hover/pin:h-44
                     translate-y-4 blur-sm"
          transition={{ duration: 0.6 }}
        />

        {/* Laser Core */}
        <motion.div
          className="absolute left-1/2 bottom-1/2 w-[6px] h-[6px] rounded-full 
                     bg-cyan-400 shadow-[0_0_15px_#0ff] translate-y-4"
        />
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------------------------
   Reusable Neon Ring Animation
------------------------------------------------------------------------------------ */

const FloatingNeonRings = () => {
  const ringProps = (delay: number) => ({
    initial: { opacity: 0, scale: 0, x: "-50%", y: "-50%" },
    animate: {
      opacity: [0, 0.6, 0.3, 0],
      scale: 1,
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      delay,
    },
    className:
      "absolute left-1/2 top-1/2 h-44 w-44 rounded-full bg-cyan-500/[0.07] shadow-[0_8px_15px_rgb(0_0_0/0.45)]",
  });

  return (
    <>
      <motion.div {...ringProps(0)} />
      <motion.div {...ringProps(1.7)} />
      <motion.div {...ringProps(3.4)} />
    </>
  );
};
