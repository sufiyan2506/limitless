import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // Base layout
          "flex w-full h-11 px-4 rounded-xl",
          
          // Background + glass effect
          "bg-white/5 border border-white/10 backdrop-blur-xl",
          
          // Text + placeholder
          "text-white/90 placeholder:text-white/40",
          
          // Focus ring + glow
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-0",
          "focus-visible:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
          
          // Disabled
          "disabled:opacity-50 disabled:cursor-not-allowed",
          
          // File input support (unchanged)
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white",
          
          // Smooth transitions
          "transition-all duration-300",
          
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
