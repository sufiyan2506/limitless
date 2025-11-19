"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md text-sm font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // ★ Primary (brand button)
        default: [
          "bg-white text-black",
          "hover:bg-white/90",
          "active:scale-[0.97]",
          "shadow-[0_0_12px_rgba(255,255,255,0.25)]",
          "hover:shadow-[0_0_18px_rgba(255,255,255,0.35)]",
        ].join(" "),

        // ★ Destructive (red)
        destructive: [
          "bg-red-600 text-white",
          "hover:bg-red-700",
          "active:scale-[0.97]",
          "shadow-[0_0_10px_rgba(255,0,0,0.3)]",
        ].join(" "),

        // ★ Outline (glass border)
        outline: [
          "border border-white/20 text-white",
          "bg-white/5 backdrop-blur-sm",
          "hover:bg-white/10 hover:border-white/30",
        ].join(" "),

        // ★ Secondary (subtle dark)
        secondary: [
          "bg-white/10 text-white",
          "hover:bg-white/20",
        ].join(" "),

        // ★ Ghost (no bg, only light hover)
        ghost: [
          "text-white/70",
          "hover:bg-white/10 hover:text-white",
        ].join(" "),

        // ★ Link
        link: [
          "text-white underline-offset-4",
          "hover:underline",
        ].join(" "),
      },

      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
