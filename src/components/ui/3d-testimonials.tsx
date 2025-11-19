import React, { ComponentPropsWithoutRef, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------------------------
   Premium Marquee Component
   - Smooth 3D scroll
   - Horizontal or vertical
   - Pause on hover
   - Reversible
   - GPU accelerated
   - Clean + modern + optimized
------------------------------------------------------------------------------------ */

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  autoFill?: boolean;
  ariaLabel?: string;
  ariaLive?: "off" | "polite" | "assertive";
  ariaRole?: string;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 3,
  autoFill = false,
  ariaLabel,
  ariaLive = "off",
  ariaRole = "marquee",
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------------------------------------
     Automatically fill content until container is full (optional)
  ------------------------------------------------------------------------------------ */
  const computedRepeat = useMemo(() => {
    if (!autoFill || !marqueeRef.current) return repeat;

    const container = marqueeRef.current;
    const child = container.firstElementChild as HTMLElement | null;

    if (!child) return repeat;

    const containerSize = vertical
      ? container.getBoundingClientRect().height
      : container.getBoundingClientRect().width;

    const childSize = vertical
      ? child.getBoundingClientRect().height
      : child.getBoundingClientRect().width;

    return Math.max(repeat, Math.ceil(containerSize / childSize) + 2);
  }, [autoFill, repeat, vertical]);

  return (
    <div
      {...props}
      ref={marqueeRef}
      className={cn(
        "group flex overflow-hidden relative select-none pointer-events-auto",
        "[--duration:28s] [--gap:1.5rem] gap-[var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
      tabIndex={0}
    >
      {/* Render repeated groups */}
      {Array.from({ length: computedRepeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0",
            vertical ? "flex-col gap-[var(--gap)]" : "flex-row gap-[var(--gap)]",
            "will-change-transform",
            "animate-marquee",
            vertical && "animate-marquee-vertical",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
