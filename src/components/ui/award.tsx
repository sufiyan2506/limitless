"use client";

import React from "react";
import { Star, Award as AwardIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AwardVariant = "badge" | "medal" | "certificate" | "plaque" | "rank";

export interface AwardsProps {
  variant?: AwardVariant;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  recipient?: string;
  level?: "bronze" | "silver" | "gold" | "platinum";
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const levelMap: Record<
  Exclude<AwardsProps["level"], undefined>,
  { label: string; grad: string }
> = {
  bronze: { label: "Bronze", grad: "from-amber-600 to-amber-800" },
  silver: { label: "Silver", grad: "from-slate-300 to-slate-500" },
  gold: { label: "Gold", grad: "from-yellow-400 to-yellow-600" },
  platinum: { label: "Platinum", grad: "from-slate-100 to-slate-300" },
};

const floatAnim = {
  initial: { y: 2, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
};

/* ---------------------------
   Badge (round compact)
   --------------------------- */
function BadgeVariant({
  title,
  subtitle,
  size = "md",
  showIcon = true,
  className,
}: Pick<AwardsProps, "title" | "subtitle" | "size" | "showIcon" | "className">) {
  const sizes: Record<string, string> = {
    sm: "w-14 h-14 text-xs",
    md: "w-20 h-20 text-sm",
    lg: "w-28 h-28 text-base",
  };
  return (
    <motion.div
      {...floatAnim}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-full glass-strong border border-white/6",
        "shadow-md hover:scale-[1.02] transition-transform",
        sizes[size],
        className
      )}
    >
      {showIcon && (
        <div className="p-1 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 mb-1">
          <Star className="w-5 h-5 text-white/90" />
        </div>
      )}
      <div className="font-semibold text-white text-center leading-tight">{title}</div>
      {subtitle && <div className="text-xs text-white/60 mt-1">{subtitle}</div>}
    </motion.div>
  );
}

/* ---------------------------
   Medal (layered circle + ribbon)
   --------------------------- */
function MedalVariant({
  title,
  size = "md",
  level = "gold",
  className,
}: Pick<AwardsProps, "title" | "size" | "level" | "className">) {
  const sizes: Record<string, string> = {
    sm: "w-28 h-36",
    md: "w-36 h-44",
    lg: "w-44 h-52",
  };

  const grad = levelMap[level].grad;

  return (
    <motion.div
      {...floatAnim}
      className={cn(
        "flex flex-col items-center text-center",
        "transition-transform hover:-translate-y-1",
        sizes[size],
        className
      )}
    >
      <div
        className={cn(
          "relative rounded-full p-3 glass-strong border border-white/8 shadow-xl",
          "w-20 h-20 flex items-center justify-center"
        )}
      >
        <div
          className={cn(
            `absolute inset-0 rounded-full -z-10 bg-gradient-to-br ${grad} opacity-20 blur-[12px]`
          )}
        />
        <div className="rounded-full bg-black/70 w-full h-full flex items-center justify-center">
          <AwardIcon className="w-7 h-7 text-white/95" />
        </div>
      </div>

      {/* Ribbon */}
      <div className="mt-3">
        <div
          className={cn(
            "inline-block rounded-md px-3 py-1 text-xs font-semibold",
            `bg-gradient-to-r ${grad} bg-clip-text text-transparent`
          )}
        >
          {levelMap[level].label}
        </div>
      </div>

      <div className="mt-2 font-semibold text-white">{title}</div>
    </motion.div>
  );
}

/* ---------------------------
   Certificate (frame)
   --------------------------- */
function CertificateVariant({
  title,
  recipient,
  date,
  description,
  className,
}: Pick<AwardsProps, "title" | "recipient" | "date" | "description" | "className">) {
  return (
    <motion.div
      {...floatAnim}
      className={cn(
        "relative w-full max-w-xl rounded-2xl glass-strong border border-white/6 p-6",
        "shadow-lg",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-white/60 uppercase tracking-wider">Certificate</div>
          <h3 className="mt-2 text-2xl font-extrabold text-white leading-tight">{title}</h3>
          {description && <p className="text-sm text-white/60 mt-2">{description}</p>}
        </div>

        <div className="text-right">
          {recipient && <div className="text-sm text-white/80">Presented to</div>}
          {recipient && <div className="mt-1 font-semibold text-white">{recipient}</div>}
          {date && <div className="text-xs text-white/60 mt-3">{date}</div>}
        </div>
      </div>

      <div className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mt-3 text-xs text-white/60">Authorized by Think Limitless</div>
    </motion.div>
  );
}

/* ---------------------------
   Plaque (rectangular award card)
   --------------------------- */
function PlaqueVariant({
  title,
  subtitle,
  description,
  className,
}: Pick<AwardsProps, "title" | "subtitle" | "description" | "className">) {
  return (
    <motion.div
      {...floatAnim}
      className={cn(
        "relative w-full max-w-lg rounded-2xl border border-white/6 glass-strong p-5 shadow-xl",
        "hover:scale-[1.01] transition-transform",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10">
          <AwardIcon className="w-6 h-6 text-white/90" />
        </div>

        <div className="flex-1">
          <div className="text-sm text-white/60">{subtitle}</div>
          <h3 className="mt-1 text-lg font-bold text-white">{title}</h3>
          {description && <p className="text-sm text-white/60 mt-2">{description}</p>}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------
   Rank Tag (small strip for bronze/silver/gold/platinum)
   --------------------------- */
function RankTagVariant({
  level = "gold",
  className,
  title,
}: Pick<AwardsProps, "level" | "className" | "title">) {
  const grad = levelMap[level].grad;
  return (
    <motion.div
      {...floatAnim}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold",
        "border border-white/6 glass-weak",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex w-2 h-2 rounded-full",
          `bg-gradient-to-br ${grad} shadow-[0_6px_14px_rgba(0,0,0,0.45)]`
        )}
      />
      <span className="text-white/90">{title || levelMap[level].label}</span>
    </motion.div>
  );
}

/* ---------------------------
   Main Export component
   --------------------------- */

export default function Awards(props: AwardsProps) {
  const {
    variant = "badge",
    title,
    subtitle,
    description,
    date,
    recipient,
    level = "gold",
    className,
    showIcon = true,
    size = "md",
  } = props;

  switch (variant) {
    case "badge":
      return (
        <BadgeVariant
          title={title}
          subtitle={subtitle}
          size={size}
          showIcon={showIcon}
          className={className}
        />
      );

    case "medal":
      return (
        <MedalVariant
          title={title}
          size={size}
          level={level}
          className={className}
        />
      );

    case "certificate":
      return (
        <CertificateVariant
          title={title}
          recipient={recipient}
          date={date}
          description={description}
          className={className}
        />
      );

    case "plaque":
      return (
        <PlaqueVariant
          title={title}
          subtitle={subtitle}
          description={description}
          className={className}
        />
      );

    case "rank":
      return <RankTagVariant level={level} title={title} className={className} />;

    default:
      return null;
  }
}
