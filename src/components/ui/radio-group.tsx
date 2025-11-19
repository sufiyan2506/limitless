import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "relative aspect-square h-5 w-5 rounded-full",
        "border border-white/20 bg-black/40 backdrop-blur-md",
        "transition-all duration-300 ease-out",
        "hover:border-primary/60 hover:shadow-[0_0_8px_rgba(255,255,255,0.35)]",
        "ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    >
      {/* glowing indicator */}
      <RadioGroupPrimitive.Indicator
        className="flex items-center justify-center animate-in fade-in zoom-in-90"
      >
        <Circle className="h-3 w-3 text-primary fill-primary drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
      </RadioGroupPrimitive.Indicator>

      {/* soft glow behind when selected */}
      <div className="absolute inset-0 opacity-0 data-[state=checked]:opacity-40 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full" />
      </div>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
