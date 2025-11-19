"use client";

import type { ReactNode } from "react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";

import confetti from "canvas-confetti";
import { Button, ButtonProps } from "@/components/ui/button";

type Api = {
  fire: (options?: ConfettiOptions) => void;
};

type Props = React.ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  children?: ReactNode;
};

export type ConfettiRef = Api | null;

const ConfettiContext = createContext<Api>({ fire: () => {} });

const Confetti = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options = {
      spread: 70,
      particleCount: 100,
      startVelocity: 25,
      colors: ["#6EE7FF", "#A855F7", "#22D3EE", "#EC4899"], // neon set for dark theme
    },
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    className,
    ...rest
  } = props;

  const instanceRef = useRef<ConfettiInstance | null>(null);

  /** Mount + unmount the canvas → confetti instance */
  const canvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (node) {
        if (!instanceRef.current) {
          instanceRef.current = confetti.create(node, {
            ...globalOptions,
            resize: true,
          });
        }
      } else {
        if (instanceRef.current) {
          instanceRef.current.reset();
          instanceRef.current = null;
        }
      }
    },
    [globalOptions]
  );

  /** Fire confetti with merged options */
  const fire = useCallback(
    (opts: ConfettiOptions = {}) => {
      instanceRef.current?.({ ...options, ...opts });
    },
    [options]
  );

  const api = useMemo(() => ({ fire }), [fire]);

  useImperativeHandle(ref, () => api, [api]);

  /** Auto-start if not manual */
  useEffect(() => {
    if (!manualstart) {
      requestAnimationFrame(() => fire());
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none fixed inset-0 z-[9999] !m-0 !p-0",
          className
        )}
        {...rest}
      />
      {children}
    </ConfettiContext.Provider>
  );
});

/* BUTTON → fires from the button center */
interface ConfettiButtonProps extends ButtonProps {
  options?: ConfettiOptions & ConfettiGlobalOptions & { canvas?: HTMLCanvasElement };
}

function ConfettiButton({ options, children, ...props }: ConfettiButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    confetti({
      ...options,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}

Confetti.displayName = "Confetti";

export { Confetti, ConfettiButton, ConfettiContext };
