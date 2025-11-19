import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full",
      "transition-all duration-300",
      "bg-white/10 backdrop-blur-sm border border-white/20",
      "data-[state=checked]:bg-primary/30 data-[state=checked]:border-primary/40",
      "data-[state=unchecked]:bg-white/5 data-[state=unchecked]:border-white/10",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "block h-5 w-5 rounded-full transition-transform duration-300",
        "bg-white shadow-md",
        "data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-1",
        "group-active:scale-95"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
