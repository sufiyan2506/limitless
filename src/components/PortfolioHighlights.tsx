import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const PortfolioHighlights = () => {
  const [active, setActive] = useState(0);

  const projects = [
    {
      title: "TechFlow SaaS Platform",
      category: "Web Application",
      description:
        "A next-generation workflow automation system with real-time analytics and a modular UI.",
      gradient: "from-[#4A00E0] to-[#8E2DE2]",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2000",
    },
    {
      title: "Minimal Studio Identity",
      category: "Brand Identity",
      description:
        "A refined luxury identity built for a high-end interior design studio.",
      gradient: "from-[#FF5F6D] to-[#FFC371]",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000",
    },
    {
      title: "EcoTech Mobile App",
      category: "Mobile App",
      description:
        "A sustainable lifestyle app built with gamification and modern UX patterns.",
      gradient: "from-[#11998E] to-[#38EF7D]",
      image:
        "https://images.unsplash.com/photo-1547658719-08e06e3fbb89?auto=format&fit=crop&q=80&w=2000",
    },
    {
      title: "FinanceAI Dashboard",
      category: "Data Visualization",
      description:
        "An AI-powered investment dashboard with predictive modeling and clean data UI.",
      gradient: "from-[#FCE043] to-[#FB7BA2]",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    },
  ];

  const activeProject = projects[active];

  return (
    <section id="work" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-display gradient-text mb-6">Featured Work</h2>
          <p className="text-body-large text-white/70 max-w-2xl mx-auto">
            A look at the digital experiences we've crafted with precision,
            performance, and creativity.
          </p>
        </div>

        {/* MAIN FEATURED PREVIEW */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-16"
        >
          <div
            className="w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden relative shadow-2xl"
            style={{
              backgroundImage: `url(${activeProject.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="absolute bottom-10 left-10">
              <span className="text-primary font-semibold text-sm tracking-wide">
                {activeProject.category}
              </span>
              <h3 className="text-4xl font-bold text-white mt-2 mb-3">
                {activeProject.title}
              </h3>
              <p className="text-white/70 max-w-md leading-relaxed">
                {activeProject.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* SCROLL CARDS BELOW */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pt-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setActive(index)}
              className={`flex-shrink-0 w-64 rounded-2xl cursor-pointer 
                relative overflow-hidden 
                border border-white/10 glass 
                transition-all duration-300
                ${
                  active === index
                    ? "ring-2 ring-primary shadow-[0_0_40px_rgba(255,255,255,0.25)]"
                    : "hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                }
              `}
            >
              <div
                className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-90"
                />
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-primary font-medium">
                  {project.category}
                </p>
                <h4 className="text-lg font-semibold text-white">
                  {project.title}
                </h4>
                <p className="text-xs text-white/60">{project.description}</p>
              </div>

              {/* ACTIVE HIGHLIGHT GLOW */}
              {active === index && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 rounded-2xl opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, white 0%, transparent 60%)",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="glass px-8 py-3 rounded-full text-white/80 hover:text-white hover:glass-strong transition-all flex items-center gap-2 mx-auto">
            View Full Portfolio <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHighlights;
