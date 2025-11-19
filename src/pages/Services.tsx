// Services.tsx — Fully Rebuilt & Working Version

import Navigation from '@/components/Navigation';
import CTAFooter from '@/components/CTAFooter';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { GlowEffect } from '@/components/ui/glow-effect';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Search,
  Target,
  Palette,
  Code2,
  Rocket,
  TrendingUp,
  CheckCircle2,
  Zap,
  Shield,
  Award,
  Layout,
  MonitorSmartphone,
  PenTool,
  BarChart3
} from 'lucide-react';

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const services = [
    {
      title: "Design",
      description:
        "Complete digital design solutions that captivate audiences and drive conversions through strategic UX and powerful visual identity.",
      icon: PenTool,
      features: [
        "User Experience Design & Research",
        "Visual Identity & Brand Development",
        "Interactive Prototyping & Testing",
        "Design System Creation",
        "Conversion Rate Optimization",
        "Accessibility & Inclusive Design"
      ],
      gradientFrom: "#ffbc00",
      gradientTo: "#ff0058",
    },
    {
      title: "Development",
      description:
        "Enterprise-grade engineering for scalable web apps, SaaS platforms, and modern digital products.",
      icon: MonitorSmartphone,
      features: [
        "Custom Web Application Development",
        "SaaS Platform Architecture & Build",
        "Mobile App Development (iOS/Android)",
        "API Development & Integration",
        "Database Design & Optimization",
        "Cloud Infrastructure & DevOps"
      ],
      gradientFrom: "#03a9f4",
      gradientTo: "#ff0058",
    },
    {
      title: "Brand Strategy",
      description:
        "Strategic brand building that creates memorable identities and drives long-term market impact.",
      icon: Layout,
      features: [
        "Brand Strategy & Positioning",
        "Logo Design & Visual Systems",
        "Brand Guidelines & Style Guides",
        "Marketing Collateral Design",
        "Brand Voice & Messaging",
        "Competitive Brand Research"
      ],
      gradientFrom: "#4dff03",
      gradientTo: "#00d0ff",
    },
    {
      title: "Automation & Scaling",
      description:
        "Automation frameworks and growth systems engineered to scale operations efficiently.",
      icon: BarChart3,
      features: [
        "Digital Transformation Strategy",
        "Business Process Automation",
        "Growth Hacking & Scaling Solutions",
        "Market & Competitive Analysis",
        "Tech Stack Advisory",
        "Performance & Analytics Setup"
      ],
      gradientFrom: "#ffbc00",
      gradientTo: "#ff0058",
    }
  ];

  const steps = [
    {
      title: "Discovery & Research",
      icon: Search,
      description:
        "Market insights, user journey mapping, and stakeholder interviews to define the opportunity.",
    },
    {
      title: "Strategic Architecture",
      icon: Target,
      description:
        "We architect scalable, high-performance solutions that match your business goals.",
    },
    {
      title: "Experience Design",
      icon: Palette,
      description:
        "Conversion-driven design, prototyping, testing, and polished visual systems.",
    },
    {
      title: "Premium Development",
      icon: Code2,
      description:
        "Clean engineering, automated testing, and security-first development.",
    },
    {
      title: "Strategic Launch",
      icon: Rocket,
      description:
        "Stable deployment, monitoring setup, and launch strategy for impact.",
    },
    {
      title: "Growth Optimization",
      icon: TrendingUp,
      description:
        "Long-term scaling, analytics, feature evolution, and strategic growth.",
    }
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "Lightning-Fast Delivery",
      description: "Agile cycles with rapid high-quality output."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Security-first engineering across every layer."
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Award-winning design + engineering workflows."
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WebGLShader />

      <div className="relative z-10">
        <Navigation />

        {/* HERO */}
        <section className="pt-32 px-6 pb-16 text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight gradient-text mb-6">
            Premium Digital Services
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            We build world-class digital products — designed with precision, engineered for scale.
          </p>
        </section>

        {/* SERVICES GRID */}
        <section className="px-6 pb-28 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => !isMobile && setHoveredIndex(idx)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                className="relative glass rounded-3xl p-8 border border-white/10 shadow-xl hover:border-white/20 transition-all cursor-pointer"
              >
                <GlowEffect
                  className="absolute inset-0 rounded-3xl"
                  colors={[service.gradientFrom, service.gradientTo]}
                  isActive={hoveredIndex === idx}
                />

                <div className="flex items-center gap-4 mb-6">
                  <Icon className="w-10 h-10 text-white" />
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>

                <p className="text-white/70 mb-6">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        {/* PROCESS STEPS */}
        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Process</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="glass rounded-2xl p-8 border border-white/10 shadow-xl text-center"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="px-6 pb-28 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose Us</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="glass rounded-2xl p-8 border border-white/10 shadow-xl text-center"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <CTAFooter />
      </div>
    </div>
  );
};

export default Services;
