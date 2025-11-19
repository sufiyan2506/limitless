import React from "react";

interface CardData {
  title: string;
  desc: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

interface GradientCardShowcaseProps {
  cards: CardData[];
}

export default function GradientCardShowcase({ cards }: GradientCardShowcaseProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {cards.map(({ title, desc, icon, gradientFrom, gradientTo }, idx) => (
        <div
          key={idx}
          className={`
            group relative overflow-hidden rounded-2xl 
            bg-black/40 backdrop-blur-xl 
            border border-white/10 
            p-8
            transition-all duration-500
        
            hover:scale-[1.025]
            hover:border-white/20 
            hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.15)]
          `}
        >
          {/* **Animated Gradient Glow Behind** */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 -z-10"
            style={{
              background: `linear-gradient(140deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />

          {/* **Top Accent Beam Line** */}
          <div
            className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left"
            style={{
              background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />

          {/* **Left glowing beam** */}
          <div
            className="absolute left-0 top-0 h-full w-[1px] opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"
            style={{
              background: `linear-gradient(180deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />

          {/* CONTENT */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>

            {/* Title */}
            <h3
              className={`
                text-xl font-semibold text-white
                mb-3 leading-tight
                transition-all duration-300 
                group-hover:text-transparent 
                group-hover:bg-clip-text 
                group-hover:bg-gradient-to-r 
                group-hover:from-white 
                group-hover:to-white/70
              `}
            >
              {title}
            </h3>

            {/* Description */}
            <p
              className="
                text-white/60 text-sm leading-relaxed
                group-hover:text-white/90
                transition-colors duration-300
              "
            >
              {desc}
            </p>
          </div>

          {/* **Subtle Ambient Glow Outside** */}
          <div
            className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-40 blur-3xl transition-all duration-700 -z-20"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${gradientFrom}20, ${gradientTo}10, transparent 70%)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
