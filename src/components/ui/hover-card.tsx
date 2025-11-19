import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(
  (
    {
      className,
      align = "center",
      sideOffset = 8,
      ...props
    },
    ref
  ) => (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        // Base container
        "z-50 w-64 rounded-xl border border-white/10",
        "bg-black/70 backdrop-blur-xl shadow-2xl",
        "text-white/90 relative overflow-hidden",

        // Smooth motion
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",

        // Inner padding
        "p-4",

        className
      )}
      {...props}
    >
      {/* Glow Background */}
      <div
        className="absolute inset-0 opacity-20 blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.25), transparent 70%)",
        }}
      />

      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative z-10">{props.children}</div>
    </HoverCardPrimitive.Content>
  )
);

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
