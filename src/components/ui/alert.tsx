import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -----------------------------------------------------------------------------
   PREMIUM ALERT (Dark / Glass / Motion)
----------------------------------------------------------------------------- */

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 backdrop-blur-xl shadow-md transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-black/40 border-white/10 text-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.35)]",
        destructive:
          "bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_4px_20px_rgba(0,0,0,0.35)] [&>svg]:text-red-400",
        success:
          "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 [&>svg]:text-emerald-400",
        warning:
          "bg-yellow-500/10 border-yellow-500/20 text-yellow-400 [&>svg]:text-yellow-400",
        info:
          "bg-blue-500/10 border-blue-500/20 text-blue-400 [&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      alertVariants({ variant }),
      "animate-alert-in relative overflow-hidden", // smooth motion
      "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:h-5 [&>svg]:w-5 opacity-90",
      "[&>svg~*]:pl-10", // push text for icons
      className
    )}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 font-semibold text-base tracking-tight text-white",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm text-white/70 leading-relaxed",
      "[&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
