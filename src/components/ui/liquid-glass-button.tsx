import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidButtonVariants = cva(
  `
  group relative inline-flex cursor-pointer items-center justify-center
  rounded-xl font-medium transition-all duration-300
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20
  disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: [
          "text-white bg-black hover:bg-black/85",
          "before:absolute before:inset-0 before:rounded-xl before:p-[2px]",
          "before:bg-[conic-gradient(var(--tw-gradient-stops))] before:from-red-500 before:via-yellow-400 before:via-green-400 before:via-blue-500 before:via-purple-500 before:to-red-500",
          "before:bg-[length:300%_300%] before:animate-rainbow-slow",
          "after:absolute after:inset-[2px] after:rounded-[10px] after:bg-black after:content-['']"
        ],

        hero: [
          "text-white bg-black hover:bg-black/85",
          "before:absolute before:inset-0 before:rounded-xl before:p-[2px]",
          "before:bg-[conic-gradient(var(--tw-gradient-stops))] before:from-purple-500 before:via-blue-500 before:via-cyan-400 before:via-green-400 before:to-purple-500",
          "before:bg-[length:300%_300%] before:animate-rainbow-medium",
          "after:absolute after:inset-[2px] after:rounded-[10px] after:bg-black after:content-['']"
        ],

        secondary: [
          "text-white bg-black/40 hover:bg-black/60 backdrop-blur-md",
          "before:absolute before:inset-0 before:rounded-xl before:p-[2px]",
          "before:bg-[conic-gradient(var(--tw-gradient-stops))] before:from-pink-500 before:via-purple-400 before:via-indigo-400 before:to-pink-500",
          "before:bg-[length:300%_300%] before:animate-rainbow-fast opacity-40",
          "after:absolute after:inset-[2px] after:rounded-[10px] after:bg-black/40 after:backdrop-blur-md after:content-['']"
        ],
      },

      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4 py-2 text-base",
        lg: "h-11 px-8 text-lg",
        xl: "h-12 px-10 text-xl",
        xxl: "h-14 px-12 text-2xl",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(liquidButtonVariants({ variant, size }), className)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </Comp>
    )
  }
)

LiquidButton.displayName = "LiquidButton"

export { LiquidButton, liquidButtonVariants }
