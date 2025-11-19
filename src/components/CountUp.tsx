
import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  enableScrollSpy?: boolean;
  className?: string;
  // Allow function-as-children to customize rendering if needed
  children?: React.ReactNode | ((formattedValue: string) => React.ReactNode);
}

// Update parameter type to accept the same union as CountUpProps['children']
const inferFromChildren = (children: CountUpProps['children']) => {
  if (typeof children === 'string' || typeof children === 'number') {
    const str = String(children).trim();
    // Capture optional non-numeric prefix, a numeric body, and optional non-numeric suffix
    const match = str.match(/^([^0-9.\-]*)(-?\d+(?:[.,]\d+)?)([^0-9.\-]*)$/);
    if (match) {
      const numPart = match[2] ?? '';
      const decimals =
        numPart.includes('.') || numPart.includes(',')
          ? (numPart.split(/[.,]/)[1] || '').length
          : 0;
      return {
        prefix: match[1] || '',
        suffix: match[3] || '',
        decimals,
      };
    }
  }
  return { prefix: '', suffix: '', decimals: undefined as number | undefined };
};

const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 2000,
  decimals,
  suffix,
  prefix,
  separator = '',
  enableScrollSpy = true,
  className,
  children,
  ...props
}) => {
  // Infer prefix/suffix/decimals from children if not provided
  const inferred = inferFromChildren(children);
  const effectivePrefix = prefix ?? inferred.prefix ?? '';
  const effectiveSuffix = suffix ?? inferred.suffix ?? '';
  const effectiveDecimals =
    typeof decimals === 'number' ? decimals : inferred.decimals ?? 0;

  const { count, countRef } = useCountUp({
    end,
    start,
    duration,
    decimals: effectiveDecimals,
    suffix: effectiveSuffix,
    prefix: effectivePrefix,
    separator,
    enableScrollSpy,
  });

  const content =
    typeof children === 'function'
      ? (children as (val: string) => React.ReactNode)(count)
      : count;

  return (
    <span ref={countRef} className={cn(className)} {...props}>
      {content}
    </span>
  );
};

export default CountUp;
