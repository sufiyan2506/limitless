import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // Base
        "shrink-0 rounded-full transition-all duration-300",

        // Glass + subtle border
        "bg-white/10 backdrop-blur-lg",

        // Orientation styling
        orientation === "horizontal"
          ? "h-[1.5px] w-full"
          : "w-[1.5px] h-full",

        // Glow & gradient on hover
        "hover:bg-gradient-to-r hover:from-white/20 hover:to-white/5",
        "hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]",

        className
      )}
      {...props}
    />
  )
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
