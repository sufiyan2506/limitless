import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-xl px-2 py-1",
      "bg-white/5 backdrop-blur-sm border border-white/10 shadow-inner",
      "text-white/60",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg",
      "px-4 py-2 text-sm font-medium transition-all duration-300",
      "text-white/60 hover:text-white",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",

      // active state
      "data-[state=active]:text-white",
      "data-[state=active]:bg-white/10",
      "data-[state=active]:shadow-[0_0_12px_rgba(255,255,255,0.15)]",
      "data-[state=active]:backdrop-blur-sm",

      // disabled
      "disabled:pointer-events-none disabled:opacity-40",

      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 rounded-xl p-4",
      "bg-white/5 backdrop-blur-sm border border-white/10",
      "text-white/90 shadow-lg",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
