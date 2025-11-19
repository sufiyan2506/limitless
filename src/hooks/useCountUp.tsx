import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  enableScrollSpy?: boolean;
}

export const useCountUp = ({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = "",
  prefix = "",
  separator = "",
  enableScrollSpy = true,
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  const countRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  /** Format final number */
  const formatNumber = (num: number) => {
    let formatted = num.toFixed(decimals);

    if (separator && num >= 1000) {
      formatted = num.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }

    return `${prefix}${formatted}${suffix}`;
  };

  /** Main animation logic */
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;

    const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

    /** smoother “Limitless-style” easing */
    const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart

    const currentVal = start + (end - start) * ease;
    setCount(currentVal);

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  /** Start animation only once */
  const startAnimation = () => {
    if (!hasStarted) {
      setHasStarted(true);
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  /** ScrollSpy (IntersectionObserver) */
  useEffect(() => {
    if (!enableScrollSpy) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [enableScrollSpy]);

  /** Cleanup RAF on unmount */
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return {
    count: formatNumber(count),
    countRef,
    hasStarted,
  };
};
