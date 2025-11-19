// Upgraded Work.tsx — emoji removed, unified Limitless style, improved cards & filters

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import CTAFooter from '@/components/CTAFooter'
import CountUp from '@/components/CountUp'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import { motion } from 'framer-motion'
import { Monitor, PenTool, Smartphone, BarChart3, ShoppingBag, Hospital } from 'lucide-react'

const Work = () => {
  const [filter, setFilter] = useState('All')

  const projects = [
    {
      title: "TechFlow SaaS",
      category: "Development",
      type: "Web Application",
      description:
        "A productivity SaaS platform built with React, Node.js, and AI-driven automation.",
      Icon: Monitor,
      color: "from-blue-500 to-purple-600",
      tags: ["SaaS", "React", "AI", "Enterprise"],
      client: "TechFlow Inc.",
      year: "2024",
    },
    {
      title: "Minimal Studio",
      category: "Design",
      type: "Brand Identity",
      description:
        "A luxury brand identity redesign including logo, visual identity system, and digital presence.",
      Icon: PenTool,
      color: "from-pink-500 to-orange-500",
      tags: ["Branding", "Identity", "Luxury", "Interior"],
      client: "Minimal Studio",
      year: "2024",
    },
    {
      title: "EcoTech Mobile",
      category: "Development",
      type: "Mobile App",
      description:
        "A sustainability-focused mobile app featuring community tools, rewards, and lifestyle tracking.",
      Icon: Smartphone,
      color: "from-green-500 to-teal-600",
      tags: ["Mobile", "Sustainability", "Social", "React Native"],
      client: "EcoTech",
      year: "2023",
    },
    {
      title: "FinanceAI Dashboard",
      category: "Development",
      type: "Data Visualization",
      description:
        "An AI-powered analytics dashboard delivering real-time financial insights and predictions.",
      Icon: BarChart3,
      color: "from-yellow-500 to-red-500",
      tags: ["FinTech", "AI", "Analytics", "Dashboard"],
      client: "InvestCorp",
      year: "2023",
    },
    {
      title: "Artisan Collective",
      category: "Branding",
      type: "E-commerce Platform",
      description:
        "A curated marketplace with brand identity design, storefront layouts, and integrated payments.",
      Icon: ShoppingBag,
      color: "from-purple-500 to-indigo-600",
      tags: ["E-commerce", "Marketplace", "Branding", "Creators"],
      client: "Artisan Co.",
      year: "2024",
    },
    {
      title: "HealthTech Suite",
      category: "Development",
      type: "Healthcare Platform",
      description:
        "A HIPAA-compliant platform offering telemedicine, patient portals, and analytics dashboards.",
      Icon: Hospital,
      color: "from-cyan-500 to-blue-600",
      tags: ["Healthcare", "Telemedicine", "Analytics", "HIPAA"],
      client: "HealthFirst",
      year: "2023",
    },
  ]

  const categories = ["All", "Development", "Design", "Branding"]
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WebGLShader />

      <div className="relative z-10">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-16 px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display mb-6 gradient-text"
          >
            Our Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-body-large text-white/70 max-w-2xl mx-auto"
          >
            A selection of digital products, brand systems, and high-performance platforms we've delivered.
          </motion.p>
        </section>

        {/* Filters */}
        <section className="pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto flex justify-center gap-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  filter === cat ? "glass-strong text-white" : "glass text-white/70 hover:text-white hover:glass-strong"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Project Grid */}
        <section className="pb-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl overflow-hidden group hover:glass-strong hover:scale-[1.03] transition-all duration-500"
              >
                {/* Image/Icon */}
                <div
                  className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}
                >
                  <project.Icon className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary font-medium">{project.type}</span>
                    <span className="text-sm text-white/50">{project.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>

                  <p className="text-sm text-white/50 mb-1">{project.client}</p>

                  <p className="text-white/70 text-sm mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 px-4 md:px-6 bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
            {[{ num: 50, label: "Projects Delivered" }, { num: 25, label: "Happy Clients" }, { num: 4, label: "Years Experience" }, { num: 100, label: "Client Satisfaction", suffix: "%" }].map(
              (stat, i) => (
                <div key={i} className="glass rounded-2xl p-8">
                  <div className="text-3xl font-black text-primary mb-2">
                    <CountUp end={stat.num} suffix={stat.suffix || "+"} duration={2500 + i * 500} />
                  </div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              )
            )}
          </div>
        </section>

        <CTAFooter />
      </div>
    </div>
  )
}

export default Work;
