import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      "transition-all duration-300",
      className
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      // Base line style
      "relative group flex w-[3px] bg-border/40 hover:bg-border transition-colors",
      "data-[panel-group-direction=vertical]:h-[3px] data-[panel-group-direction=vertical]:w-full",

      // Glow on hover
      "hover:shadow-[0px_0px_10px_rgba(255,255,255,0.15)]",

      // Inner subtle highlight
      "after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/10 after:to-transparent",
      "data-[panel-group-direction=vertical]:after:bg-gradient-to-r",

      // Focus styles
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",

      className
    )}
    {...props}
  >
    {withHandle && (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}
      >
        <div className="z-10 flex h-6 w-4 items-center justify-center rounded-md border border-white/10 bg-black/40 backdrop-blur-sm shadow-md">
          <GripVertical className="h-3.5 w-3.5 text-white/70" />
        </div>
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
