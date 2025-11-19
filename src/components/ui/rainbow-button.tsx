import React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center px-8 py-2",
        "font-medium text-white rounded-xl transition-all duration-300",
        "bg-black/70 backdrop-blur-md shadow-[0px_0px_20px_rgba(255,255,255,0.06)]",
        "hover:bg-black/80 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        "disabled:pointer-events-none disabled:opacity-50",

        // Animated rainbow border
        "before:absolute before:inset-0 before:rounded-xl before:p-[2px]",
        "before:bg-gradient-to-r before:from-red-500 before:via-yellow-500 before:via-green-500 before:via-blue-500 before:via-purple-500 before:to-red-500",
        "before:bg-[length:400%_400%] before:animate-rainbow before:opacity-90",

        // Inner fill
        "after:absolute after:inset-[2px] after:rounded-[10px] after:bg-black/80 after:backdrop-blur-xl after:content-['']",

        // Subtle hover glow
        "hover:shadow-[0px_0px_25px_rgba(255,255,255,0.12)] hover:before:opacity-100",

        className
      )}
    >
      {/* Text / Icon */}
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-[1.03]">
        {children}
      </span>

      {/* Ambient glow halo */}
      <span
        className="
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40
          transition-opacity duration-500 pointer-events-none
          bg-[radial-gradient(circle_at_center,var(--tw-gradient-from),transparent_70%)]
        "
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.3), transparent 70%)",
        }}
      />
    </button>
  );
}
