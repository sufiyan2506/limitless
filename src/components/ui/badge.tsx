"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default:
          "glass-weak border border-white/10 text-white/90 hover:border-white/20",
        neon:
          "glass-strong border border-white/10 text-white/90 shadow-[0_0_10px_rgba(168,85,247,0.4)] bg-gradient-to-r from-primary/20 to-accent/20 hover:shadow-[0_0_14px_rgba(168,85,247,0.6)]",
        outline:
          "border border-white/20 text-white/80 hover:bg-white/5",
        success:
          "glass-weak border border-emerald-400/30 text-emerald-300",
        warning:
          "glass-weak border border-amber-400/30 text-amber-300",
        destructive:
          "glass-weak border border-red-500/30 text-red-400",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
