import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

/* -----------------------------------------------------------------------------
   PREMIUM AVATAR (Dark / Glass / Glow / Motion)
----------------------------------------------------------------------------- */

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-11 w-11 shrink-0 overflow-hidden rounded-xl",
      "bg-black/40 backdrop-blur-xl border border-white/10",
      "shadow-[0_4px_20px_rgba(0,0,0,0.45)]",
      "transition-all duration-300",
      "hover:border-white/20",
      "group/avatar",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/* -----------------------------------------------------------------------------
   IMAGE (Smooth Fade-In)
----------------------------------------------------------------------------- */

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      "h-full w-full object-cover",
      "opacity-0 group-avatar:data-[loaded=true]:opacity-100",
      "transition-opacity duration-300 ease-out",
      className
    )}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/* -----------------------------------------------------------------------------
   FALLBACK (Glassy Placeholder)
----------------------------------------------------------------------------- */

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    delayMs={300}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-xl",
      "bg-white/5 text-white/60 font-medium",
      "backdrop-blur-xl border border-white/10",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
