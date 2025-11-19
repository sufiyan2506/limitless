import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   PREMIUM ACCORDION (Dark + Glass + Motion)
   - Smooth open/close animations
   - Glassmorphic backgrounds
   - Cleaner spacing
   - Dark mode polished
   - Modern micro interactions
-------------------------------------------------------------------------- */

const Accordion = AccordionPrimitive.Root;

/* ────────────────────────────────────────────────────────────── */
/* ITEM */
/* ────────────────────────────────────────────────────────────── */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b border-white/10 last:border-none transition-all",
      "bg-black/20 backdrop-blur-xl rounded-xl px-2 py-1",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

/* ────────────────────────────────────────────────────────────── */
/* TRIGGER */
/* ────────────────────────────────────────────────────────────── */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-left font-medium",
        "text-white/90 hover:text-white transition-all",
        "group cursor-pointer select-none",
        "rounded-lg px-2",
        "hover:bg-white/5 active:scale-[0.98]",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      <span className="text-base leading-snug">{children}</span>
      <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 text-white/60 group-hover:text-white" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/* ────────────────────────────────────────────────────────────── */
/* CONTENT */
/* ────────────────────────────────────────────────────────────── */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-white/70 transition-all",
      "data-[state=closed]:animate-accordion-up",
      "data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-1 px-2 leading-relaxed">{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
