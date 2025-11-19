import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface GradientTextProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of gradient colors
   */
  colors?: string[];

  /**
   * Speed of the animated gradient
   * @default 6
   */
  animationSpeed?: number;

  /**
   * Enable glass gradient border
   */
  showBorder?: boolean;

  /**
   * Enable glow behind the text
   */
  glow?: boolean;
}

export function GradientText({
  children,
  className,
  colors = [
    "hsl(160 100% 60%)",
    "hsl(280 100% 75%)",
    "hsl(210 100% 60%)",
    "hsl(160 100% 60%)",
  ],
  animationSpeed = 6,
  showBorder = false,
  glow = true,
  ...props
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center max-w-fit cursor-pointer",
        "group",
        className
      )}
      {...props}
    >
      {/* Outer Glow */}
      {glow && (
        <div
          className="absolute -inset-4 opacity-30 blur-2xl transition-all duration-700 group-hover:opacity-50"
          style={{
            background: `conic-gradient(${colors.join(",")})`,
          }}
        />
      )}

      {/* Optional Animated Border */}
      {showBorder && (
        <div
          className="absolute inset-0 rounded-2xl z-0 pointer-events-none animate-gradient border border-transparent"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 300%",
            mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />
      )}

      {/* Animated Gradient Text */}
      <span
        className="relative z-10 font-semibold text-transparent animate-gradient bg-clip-text bg-cover"
        style={{
          ...gradientStyle,
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
          willChange: "background-position, opacity",
        }}
      >
        {children}
      </span>
    </div>
  );
}
