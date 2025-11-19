import { motion } from "framer-motion";
import ShutterLink from "./ShutterLink";
import { useState } from "react";
import {
  Brush,
  Code,
  Sparkles,
  Rocket,
} from "lucide-react";

const ServicesSnapshot = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const services = [
    {
      title: "Design",
      icon: Brush,
      gradient: "from-[#ffb300] to-[#ff0066]",
      short:
        "World-class UI/UX, brand identity and visual experiences crafted for conversion.",
      features: [
        "User Experience Design",
        "Brand Identity & Systems",
        "Design Systems",
        "Prototyping",
        "Accessibility",
        "Conversion Optimization",
      ],
    },
    {
      title: "Development",
      icon: Code,
      gradient: "from-[#00c6ff] to-[#0072ff]",
      short:
        "High-performance development for SaaS, websites, and enterprise digital products.",
      features: [
        "Full-Stack Engineering",
        "SaaS Platform Builds",
        "Mobile App Development",
        "API Integrations",
        "DevOps & Cloud",
        "Database Architecture",
      ],
    },
    {
      title: "Brand Strategy",
      icon: Sparkles,
      gradient: "from-[#2af598] to-[#009efd]",
      short:
        "Brand direction, identity systems and emotional storytelling through design.",
      features: [
        "Brand Strategy",
        "Logo & Visual Identity",
        "Messaging Frameworks",
        "Brand Guidelines",
        "Market Positioning",
        "Creative Direction",
      ],
    },
    {
      title: "Automation & Scaling",
      icon: Rocket,
      gradient: "from-[#ffcf00] to-[#ff0058]",
      short:
        "Automation, business workflow optimization and scaling solutions for growth.",
      features: [
        "Workflow Automation",
        "Digital Transformation",
        "CRM & Pipeline Setup",
        "Growth Hacking",
        "Analytics & Attribution",
        "AI Integrations",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-32 px-6 relative bg-gradient-to-b from-transparent to-black/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-display gradient-text mb-4">Services</h2>
          <p className="text-white/70 text-body-large max-w-2xl mx-auto">
            From design to development to automation — we build products and
            brands without limits.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isActive = hovered === i;

            return (
              <motion.div
                key={service.title}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                {/* Glow Layer */}
                <div
                  className={`absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-300`}
                  style={{
                    background: `linear-gradient(135deg, var(--svc-${i}-from), var(--svc-${i}-to))`,
                  }}
                />

                <ShutterLink to="/services">
                  <div
                    style={
                      {
                        "--svc-0-from": "#ffb300",
                        "--svc-0-to": "#ff0066",
                        "--svc-1-from": "#00c6ff",
                        "--svc-1-to": "#0072ff",
                        "--svc-2-from": "#2af598",
                        "--svc-2-to": "#009efd",
                        "--svc-3-from": "#ffcf00",
                        "--svc-3-to": "#ff0058",
                      } as React.CSSProperties
                    }
                    className={`
                      relative p-8 rounded-3xl glass border border-white/10
                      backdrop-blur-xl shadow-xl
                      transition-all duration-300
                      group-hover:glass-strong group-hover:border-primary/40
                    `}
                  >
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, var(--svc-${i}-from), var(--svc-${i}-to))`,
                      }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 gradient-text">
                      {service.title}
                    </h3>

                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      {service.short}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((f, idx) => (
                        <li
                          key={idx}
                          className="text-white/60 text-sm flex items-start gap-3"
                        >
                          <span
                            className="block w-1.5 h-1.5 rounded-full mt-2"
                            style={{
                              background: `linear-gradient(135deg, var(--svc-${i}-from), var(--svc-${i}-to))`,
                            }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Hover CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 10,
                      }}
                      className="mt-8 text-sm text-primary font-medium"
                    >
                      Explore →
                    </motion.div>
                  </div>
                </ShutterLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSnapshot;
