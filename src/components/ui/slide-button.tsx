"use client";

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  type JSX,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Check, Loader2, SendHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

const DRAG_CONSTRAINTS = { left: 0, right: 155 };
const DRAG_THRESHOLD = 0.9;

const BUTTON_STATES = {
  initial: { width: "12rem" },
  completed: { width: "8rem" },
};

const ANIMATION_CONFIG = {
  spring: {
    type: "spring" as const,
    stiffness: 280,
    damping: 28,
    mass: 0.7,
  },
};

type StatusIconProps = { status: string };

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const iconMap: Record<string, JSX.Element> = useMemo(
    () => ({
      loading: <Loader2 className="animate-spin" size={20} />,
      success: <Check size={20} />,
      error: <X size={20} />,
    }),
    []
  );

  if (!iconMap[status]) return null;

  return (
    <motion.div
      key={crypto.randomUUID()}
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25 }}
      className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
    >
      {iconMap[status]}
    </motion.div>
  );
};

interface SlideButtonProps extends Omit<ButtonProps, "onClick"> {
  onComplete?: () => void;
  children?: React.ReactNode;
  reset?: boolean;
}

const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
  ({ className, children = "Join Limitless", onComplete, reset = false, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [status, setStatus] =
      useState<"idle" | "loading" | "success" | "error">("idle");

    const dragX = useMotionValue(0);
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring);

    const dragProgress = useTransform(
      springX,
      [0, DRAG_CONSTRAINTS.right],
      [0, 1]
    );

    const dragHandleRef = useRef<HTMLDivElement | null>(null);

    // RESET
    React.useEffect(() => {
      if (reset) {
        setCompleted(false);
        setStatus("idle");
        dragX.set(0);
      }
    }, [reset, dragX]);

    const handleSubmit = useCallback(() => {
      setStatus("loading");
      setTimeout(() => {
        setStatus("success");
        onComplete?.();
      }, 900);
    }, [onComplete]);

    const handleDragStart = useCallback(() => {
      if (!completed) setIsDragging(true);
    }, [completed]);

    const handleDrag = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (!completed) {
        const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right));
        dragX.set(newX);
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);

      if (completed) return;

      const progress = dragProgress.get();
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true);
        handleSubmit();
      } else {
        dragX.set(0);
      }
    };

    const adjustedWidth = useTransform(springX, (x) => x + 50);

    return (
      <div className="flex flex-col items-center">
        {/* BUTTON CONTAINER */}
        <motion.div
          animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
          transition={ANIMATION_CONFIG.spring}
          className={cn(
            "relative flex h-14 items-center rounded-full",
            "bg-white/10 border border-white/20 backdrop-blur-md",
            "shadow-[0_0_30px_rgba(255,255,255,0.07)]",
            "overflow-hidden min-w-[220px]"
          )}
        >
          {/* SLIDING BG PROGRESS HIGHLIGHT */}
          {!completed && (
            <>
              <motion.div
                style={{ width: adjustedWidth }}
                className="absolute inset-y-0 left-0 z-0 rounded-full
                           bg-gradient-to-r from-white/20 to-white/5"
              />
              
              {/* BUTTON TEXT */}
              <div className="relative z-10 flex items-center justify-center w-full pl-16 pr-4">
                <span className="text-white font-semibold text-lg drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
                  {children}
                </span>
              </div>
            </>
          )}

          {/* SLIDE HANDLE */}
          <AnimatePresence>
            {!completed && (
              <motion.div
                ref={dragHandleRef}
                drag="x"
                dragConstraints={DRAG_CONSTRAINTS}
                dragElastic={0.07}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                style={{ x: springX }}
                className="absolute left-1 z-20 flex cursor-grab active:cursor-grabbing"
              >
                <Button
                  ref={ref}
                  disabled={status === "loading"}
                  {...props}
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full bg-primary text-white",
                    "shadow-[0_0_12px_rgba(0,128,255,0.6),0_0_25px_rgba(0,128,255,0.3)]",
                    "hover:bg-primary/90 transition-transform duration-150",
                    isDragging && "scale-110",
                    className
                  )}
                >
                  <SendHorizontal className="size-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* COMPLETED STATE */}
          <AnimatePresence>
            {completed && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  className={cn(
                    "w-full h-full rounded-full bg-primary text-white",
                    "shadow-[0_0_20px_rgba(0,200,255,0.6)]",
                    "hover:bg-primary/90",
                    className
                  )}
                >
                  <AnimatePresence mode="wait">
                    <StatusIcon status={status} />
                  </AnimatePresence>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* HELPER TEXT */}
        {!completed && (
          <motion.span
            className="text-white/60 text-sm mt-2"
            animate={{
              x: [0, 10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Slide →
          </motion.span>
        )}
      </div>
    );
  }
);

SlideButton.displayName = "SlideButton";

export { SlideButton };
