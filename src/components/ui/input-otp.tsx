import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-3",
      "has-[:disabled]:opacity-50",
      "select-none",
      containerClassName
    )}
    className={cn(
      "disabled:cursor-not-allowed",
      "text-white tracking-widest",
      className
    )}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-3", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        // Base
        "relative h-12 w-12 flex items-center justify-center rounded-xl",
        "font-semibold text-lg text-white/90",
        "border border-white/10 bg-white/5 backdrop-blur-xl",

        // Glow on active
        isActive &&
          "ring-2 ring-primary ring-offset-0 shadow-[0_0_15px_rgb(255_255_255/0.25)] bg-white/10",

        // Smooth transitions
        "transition-all duration-300",

        className
      )}
      {...props}
    >
      {/* Character entered */}
      {char && <span className="animate-in fade-in text-white">{char}</span>}

      {/* Fake caret */}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-[2px] bg-white animate-caret-blink opacity-90 rounded-sm"></div>
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" className="px-1 text-white/40" {...props}>
    <Dot className="w-5 h-5" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
