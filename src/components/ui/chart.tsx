"use client";

import * as React from "react";
import * as Recharts from "recharts";

import { cn } from "@/lib/utils";

/**
 * Premium Chart wrapper for Recharts
 * - Dark + glass UI
 * - Neon cyan / emerald accents (chosen modern default)
 * - Per-chart CSS variables injected via <style>
 *
 * Exports:
 * - ChartContainer
 * - ChartStyle
 * - ChartTooltip (Recharts.Tooltip alias)
 * - ChartTooltipContent (polished)
 * - ChartLegend (Recharts.Legend alias)
 * - ChartLegendContent (polished)
 *
 * Usage: wrap any Recharts chart (LineChart/BarChart) inside ChartContainer and pass config.
 */

/* ---------------------------
   Theme choices (neon cyan/emerald defaults)
   --------------------------- */
const DEFAULT_COLORS = {
  primary: "#00F0FF", // bright cyan
  accent: "#00FFA6", // emerald accent
  muted: "#9CA3AF",
  surface: "rgba(10,10,10,0.6)",
  border: "rgba(255,255,255,0.06)",
} as const;

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType<any>;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within a <ChartContainer />");
  return ctx;
}

/* ---------------------------
   ChartStyle: injects CSS variables used by charts
   --------------------------- */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  // collect keys that define color or theme
  const entries = Object.entries(config).filter(
    ([, c]) => (c as any).color || (c as any).theme
  );

  if (!entries.length) return null;

  // Build CSS text with theme prefixes
  const css = Object.entries(THEMES)
    .map(([themeKey, themeSelector]) => {
      const lines = entries
        .map(([key, itemConfig]) => {
          const color =
            (itemConfig as any).theme?.[themeKey as keyof typeof itemConfig.theme] ||
            (itemConfig as any).color;
          if (!color) return null;
          return `  --chart-${key}: ${color};`;
        })
        .filter(Boolean)
        .join("\n");

      // also add defaults for primary / accent if missing (no-op)
      return `${themeSelector} [data-chart="${id}"] {\n${lines}\n}`;
    })
    .join("\n\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

/* ---------------------------
   ChartContainer: wrapper and provider
   --------------------------- */
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof Recharts.ResponsiveContainer>["children"];
    id?: string;
  }
>(({ id, className, config, children, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${(id || uniqueId).replace(/[:]/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          // glass container tuned to your global tokens
          "relative w-full rounded-2xl bg-black/45 backdrop-blur-md border border-white/6",
          "shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden",
          "text-xs text-white/90",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

/* ---------------------------
   ChartTooltipContent: polished tooltip
   --------------------------- */
type TooltipProps = React.ComponentProps<typeof Recharts.Tooltip> & {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "dot" | "line" | "dashed";
  nameKey?: string;
  labelKey?: string;
};

const ChartTooltipContent = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      active,
      payload,
      label,
      labelFormatter,
      formatter,
      hideLabel = false,
      hideIndicator = false,
      indicator = "dot",
      nameKey,
      labelKey,
      className,
      ...rest
    },
    ref
  ) => {
    const { config } = useChart();

    if (!active || !payload || !payload.length) return null;

    const primaryLabel = React.useMemo(() => {
      if (hideLabel) return null;
      const item = payload[0];
      const key = `${labelKey || (item.dataKey || item.name || "value")}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        (!labelKey && typeof label === "string")
          ? (config[label as keyof typeof config]?.label || label)
          : itemConfig?.label || label;
      if (!value) return null;
      if (labelFormatter) return <div className="font-medium">{labelFormatter(value, payload)}</div>;
      return <div className="font-medium">{value}</div>;
    }, [hideLabel, payload, label, labelFormatter, labelKey, config]);

    return (
      <div
        ref={ref}
        role="tooltip"
        className={cn(
          "min-w-[10rem] max-w-sm rounded-lg border border-white/6 bg-black/70 backdrop-blur-md px-3 py-2 shadow-xl",
          "text-white/90",
          className
        )}
        {...rest}
      >
        {primaryLabel}
        <div className="mt-1 flex flex-col gap-2">
          {payload.map((p: any, idx: number) => {
            const key = `${nameKey || p.name || p.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, p, key);
            const indicatorColor =
              (p.payload && (p.payload.fill || p.payload.color)) || p.color || "var(--color-primary, #00F0FF)";

            return (
              <div key={idx} className="flex items-center gap-3">
                {/* indicator */}
                {!hideIndicator && (
                  <div
                    className={cn("shrink-0 rounded-sm")}
                    style={{
                      width: indicator === "dot" ? 10 : indicator === "line" ? 24 : 12,
                      height: indicator === "dot" ? 10 : 2,
                      background:
                        `linear-gradient(90deg, ${indicatorColor} 0%, ${DEFAULT_COLORS.primary} 100%)`,
                      boxShadow: `0 4px 12px ${indicatorColor}66`,
                    }}
                  />
                )}

                {/* label & value */}
                <div className="flex-1 text-left">
                  <div className="text-[0.78rem] text-white/70">
                    {itemConfig?.label ?? p.name ?? key}
                  </div>
                </div>

                <div className="font-mono text-sm tabular-nums text-white/90">
                  {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

/* ---------------------------
   ChartLegendContent: polished legend
   --------------------------- */
const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: any[];
    hideIcon?: boolean;
    nameKey?: string;
    verticalAlign?: "top" | "bottom";
  }
>(({ className, payload, hideIcon = false, nameKey, verticalAlign = "bottom", ...rest }, ref) => {
  const { config } = useChart();

  if (!payload || !payload.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-4 text-sm",
        verticalAlign === "top" ? "mb-3" : "mt-3",
        className
      )}
      {...rest}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        // color resolution: prefer CSS var (from ChartStyle), fallback to item.color
        const cssVar = `var(--chart-${key})`;
        const color = cssVar || item.color;

        return (
          <div key={String(item.value ?? item.dataKey)} className="flex items-center gap-2">
            {!hideIcon ? (
              itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                <span
                  className="inline-block rounded-sm"
                  style={{
                    width: 12,
                    height: 12,
                    background: `linear-gradient(90deg, ${cssVar}, ${DEFAULT_COLORS.primary})`,
                    boxShadow: `0 6px 18px ${DEFAULT_COLORS.primary}33`,
                  }}
                />
              )
            ) : null}
            <div className="text-white/80">{itemConfig?.label ?? item.value}</div>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

/* ---------------------------
   Helpers
   --------------------------- */

/**
 * Extracts item config for a given payload entry using provided ChartConfig.
 * This is mostly unchanged logic from your original implementation but streamlined.
 */
function getPayloadConfigFromPayload(config: ChartConfig, payload: any, key: string) {
  if (!payload || typeof payload !== "object") return undefined;

  const p = payload.payload ?? payload;

  // determine possible label key if provided inside payload
  let chosenKey = key;

  if (key in payload && typeof payload[key] === "string") {
    chosenKey = payload[key];
  } else if (p && key in p && typeof p[key] === "string") {
    chosenKey = p[key];
  }

  return (chosenKey in config ? config[chosenKey] : config[key]) ?? undefined;
}

/* ---------------------------
   Exports
   --------------------------- */

export {
  ChartContainer,
  ChartStyle,
  ChartTooltipContent,
  ChartLegendContent,
  // re-export small Recharts primitives for convenience
  Recharts as RechartsPrimitive,
  Recharts.Tooltip as ChartTooltip,
  Recharts.Legend as ChartLegend,
};
