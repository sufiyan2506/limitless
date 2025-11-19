"use client";

import { cn } from "@/lib/utils";
import { motion, Transition } from "framer-motion";
import React from "react";

export type GlowEffectProps = {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?:
    | "rotate"
    | "pulse"
    | "breathe"
    | "colorShift"
    | "flowHorizontal"
    | "static";
  blur?:
    | number
    | "softest"
    | "soft"
    | "medium"
    | "strong"
    | "stronger"
    | "strongest"
    | "none";
  transition?: Transition;
  scale?: number;
  duration?: number;
};

export function GlowEffect({
  className,
  style,
  colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"],
  mode = "rotate",
  blur = "medium",
  transition,
  scale = 1,
  duration = 5,
}: GlowEffectProps) {
  const BASE_TRANSITION: Transition = {
    repeat: Infinity,
    duration,
    ease: "linear",
  };

  /* ------------------ ANIMATIONS ------------------ */

  const animation = React.useMemo(() => {
    switch (mode) {
      case "rotate":
        return {
          background: [
            `conic-gradient(from 0deg at 50% 50%, ${colors.join(", ")})`,
            `conic-gradient(from 360deg at 50% 50%, ${colors.join(", ")})`,
          ],
        };

      case "pulse":
        return {
          background: colors.map(
            (c) => `radial-gradient(circle at 50% 50%, ${c} 0%, transparent 100%)`
          ),
          scale: [scale, scale * 1.1, scale],
          opacity: [0.5, 0.9, 0.5],
        };

      case "breathe":
        return {
          background: colors.map(
            (c) => `radial-gradient(circle at 50% 50%, ${c} 0%, transparent 100%)`
          ),
          scale: [scale, scale * 1.04, scale],
        };

      case "colorShift":
        return {
          background: colors.map((c, idx) => {
            const next = colors[(idx + 1) % colors.length];
            return `conic-gradient(from 0deg at 50% 50%, ${c} 0%, ${next} 50%, ${c} 100%)`;
          }),
        };

      case "flowHorizontal":
        return {
          background: colors.map((c, i) => {
            const next = colors[(i + 1) % colors.length];
            return `linear-gradient(to right, ${c}, ${next})`;
          }),
        };

      case "static":
        return {
          background: `linear-gradient(to right, ${colors.join(", ")})`,
        };

      default:
        return {};
    }
  }, [mode, colors, scale]);

  /* ------------------ TRANSITION RULES ------------------ */

  const transitionConfig: Transition | undefined = React.useMemo(() => {
    if (mode === "static") return undefined;
    if (transition) return transition;

    // Pulse, breathe, shift = mirror for smooth looping
    if (["pulse", "breathe", "colorShift", "flowHorizontal"].includes(mode)) {
      return { ...BASE_TRANSITION, repeatType: "mirror" };
    }

    return BASE_TRANSITION;
  }, [mode, transition]);

  /* ------------------ BLUR HANDLING ------------------ */

  const blurClass = React.useMemo(() => {
    if (typeof blur === "number") return `blur-[${blur}px]`;

    const presets = {
      softest: "blur-sm",
      soft: "blur",
      medium: "blur-md",
      strong: "blur-lg",
      stronger: "blur-xl",
      strongest: "blur-2xl",
      none: "blur-none",
    } as const;

    return presets[blur] || "blur-md";
  }, [blur]);

  /* ------------------ RENDER ------------------ */

  return (
    <motion.div
      animate={animation}
      transition={transitionConfig}
      style={{
        ...style,
        "--scale": scale,
        willChange: "transform, opacity, background",
        backfaceVisibility: "hidden",
      }}
      className={cn(
        "pointer-events-none absolute inset-0 w-full h-full",
        "scale-[var(--scale)] transform-gpu",
        "mix-blend-screen opacity-60",
        blurClass,
        className
      )}
    />
  );
}
