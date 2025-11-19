"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-inner",
        className
      )}
      classNames={{
        months:
          "flex flex-col sm:flex-row gap-6 text-white",
        month: "space-y-3",
        caption:
          "flex justify-center items-center relative pb-2 text-white font-semibold tracking-tight",
        caption_label:
          "text-sm font-medium text-white/90",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-7 w-7 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "w-9 text-center text-[0.75rem] text-white/40 font-medium",

        row: "flex w-full mt-1",
        cell: cn(
          "h-9 w-9 text-center text-sm relative p-0",
          "transition-all duration-150 rounded-md",
          "data-[outside=true]:opacity-20"
        ),

        day: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-9 w-9 p-0 font-normal rounded-md text-white/70",
          "hover:bg-white/10 hover:text-white"
        ),

        day_selected: cn(
          "bg-white text-black",
          "hover:bg-white hover:text-black",
          "shadow-[0_0_20px_rgba(255,255,255,0.35)]",
          "font-semibold"
        ),

        day_today: cn(
          "border border-white/20 bg-white/5 text-white",
          "shadow-[0_0_10px_rgba(255,255,255,0.15)]"
        ),

        day_outside:
          "text-white/20 opacity-30 pointer-events-none",

        day_disabled:
          "text-white/10 opacity-30 pointer-events-none",

        day_range_middle:
          "bg-white/10 text-white",

        day_range_end:
          "bg-white text-black font-semibold",

        day_hidden: "invisible",

        ...classNames
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
