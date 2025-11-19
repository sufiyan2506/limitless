import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/*
  A tiny wrapper for Radix's AspectRatio, kept intentionally minimal.
  This component has no UI and does not require styling upgrades.
*/

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ ...props }, ref) => <AspectRatioPrimitive.Root ref={ref} {...props} />);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
