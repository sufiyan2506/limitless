import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full",
        "bg-secondary/40 backdrop-blur-sm border border-white/10",
        "shadow-inner shadow-black/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 rounded-full",
          "bg-primary",
          "transition-all duration-500 ease-out",
          "shadow-[0_0_12px_rgba(255,255,255,0.5)]"
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}
      >
        {/* Soft highlight shimmer */}
        <div
          className="absolute inset-0 bg-white/20 rounded-full blur-md pointer-events-none"
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
