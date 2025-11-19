import { motion } from "framer-motion";
import { Sparkles, Cpu, Bot, Brush } from "lucide-react";

const valueCards = [
  {
    icon: Sparkles,
    title: "Innovative Design",
    desc: "Cutting-edge visuals crafted with intention to convert, built on modern UX fundamentals.",
    colors: "from-[#7F4CFF] to-[#3ACBFF]"
  },
  {
    icon: Cpu,
    title: "Scalable Development",
    desc: "Future-proof engineering designed for growth, speed and enterprise-level performance.",
    colors: "from-[#00FFE0] to-[#0080FF]"
  },
  {
    icon: Bot,
    title: "Future-Ready Strategy",
    desc: "AI-powered insights guiding your roadmap with clarity, precision and competitive advantage.",
    colors: "from-[#FF4D8B] to-[#FFB86C]"
  },
  {
    icon: Brush,
    title: "Tailored Experiences",
    desc: "Custom-built solutions crafted around your users, your brand, and your business goals.",
    colors: "from-[#00FFA3] to-[#66FF00]"
  }
];

const ValueProposition = () => {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* soft radial bg glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_#6a00ff_0%,_transparent_70%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-display mb-6 gradient-text animate-fade-up">
            Why Choose Limitless
          </h2>
          <p className="text-body-large text-white/70 max-w-xl mx-auto animate-fade-up">
            Built for those who demand world-class design, engineering, and execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {valueCards.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.03, rotateX: 6, rotateY: -6 }}
                className="relative group p-[2px] rounded-3xl bg-gradient-to-br shadow-xl"
                style={{
                  backgroundImage: `linear-gradient(145deg, ${card.colors.split(" ")[0]}, ${card.colors.split(" ")[1]})`
                }}
              >
                {/* Inner card */}
                <div className="rounded-3xl bg-black/90 backdrop-blur-xl p-8 h-full flex flex-col">
                  
                  {/* Icon Glow */}
                  <div className="relative mb-7 flex items-center justify-center">
                    <div className="absolute inset-0 blur-xl opacity-40 bg-white/20"></div>
                    <Icon className="relative w-14 h-14 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 gradient-text">
                    {card.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed">
                    {card.desc}
                  </p>

                  {/* bottom subtle line */}
                  <div className="mt-8 w-full h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>

                {/* Outer ring on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border border-white/10"
                  animate={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.06,
                    boxShadow: "0 0 40px rgba(255,255,255,0.2)"
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
