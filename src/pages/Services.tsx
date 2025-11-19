// Updated Services.tsx without emojis, using Lucide icons for consistency

import Navigation from '@/components/Navigation';
import CTAFooter from '@/components/CTAFooter';
import ShutterLink from '@/components/ShutterLink';
import CountUp from '@/components/CountUp';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { PinContainer } from '@/components/ui/3d-pin';
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
  ArrowRight,
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
      expertise:
        "From wireframes to pixel-perfect interfaces, we craft experiences that users love and businesses profit from.",
      technologies: "Figma, Adobe Creative Suite, Principle, InVision"
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
      expertise:
        "Full-stack development with modern frameworks, ensuring security, speed, and long-term scalability.",
      technologies: "React, Node.js, Python, AWS, Docker, Kubernetes"
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
      expertise:
        "Cohesive brand systems that resonate emotionally and elevate your market presence.",
      technologies: "Adobe Creative Suite, Sketch, Brand Strategy Frameworks"
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
      expertise:
        "Data-driven strategies that increase efficiency, reduce cost, and accelerate growth.",
      technologies: "Analytics Platforms, Automation Tools, CRM Systems"
    }
  ];

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    if (isMobile) {
      if (hoveredIndex !== index) {
        e.preventDefault();
        e.stopPropagation();
        setHoveredIndex(index);
        return;
      }
    }
  };

  const enhancedProcess = [
    {
      step: "Discovery & Research",
      icon: Search,
      headline: "Deep Market Intelligence",
      description:
        "We uncover insights through market research, user journeys, and stakeholder interviews.",
      details: [
        "Stakeholder workshops",
        "Competitive analysis",
        "User journey mapping",
        "Technical feasibility audit"
      ],
      duration: "1-2 weeks",
      deliverable: "Discovery Report",
      colors: ['#0EA5E9', '#06B6D4', '#8B5CF6', '#A855F7']
    },
    {
      step: "Strategic Architecture",
      icon: Target,
      headline: "Blueprint for Success",
      description:
        "We architect scalable solutions aligned with your goals and market needs.",
      details: [
        "Information architecture",
        "Tech stack recommendation",
        "Scalability planning",
        "Risk mitigation"
      ],
      duration: "1-3 weeks",
      deliverable: "UX + Technical Blueprint",
      colors: ['#F59E0B', '#EAB308', '#84CC16', '#22C55E']
    },
    {
      step: "Experience Design",
      icon: Palette,
      headline: "Conversion-Driven Design",
      description:
        "Interfaces that convert and delight — tested, accessible, and brand-aligned.",
      details: [
        "UI design",
        "Interactive prototyping",
        "Design system creation",
        "Usability testing"
      ],
      duration: "2-4 weeks",
      deliverable: "Interactive Design System",
      colors: ['#EC4899', '#F472B6', '#FB7185', '#FBBF24']
    },
    {
      step: "Premium Development",
      icon: Code2,
      headline: "Enterprise-Grade Engineering",
      description:
        "Clean code, automated testing, and world-class performance standards.",
      details: [
        "Maintainable codebase",
        "Automated testing + CI/CD",
        "Performance optimization",
        "Security implementation"
      ],
      duration: "4-12 weeks",
      deliverable: "Production-Ready App",
      colors: ['#6366F1', '#8B5CF6', '#A855F7', '#C084FC']
    },
    {
      step: "Strategic Launch",
      icon: Rocket,
      headline: "Impactful Deployment",
      description:
        "Launch plans engineered for visibility, adoption and reliability.",
      details: [
        "Deployment automation",
        "Monitoring setup",
        "Launch strategy",
        "User onboarding"
      ],
      duration: "1-2 weeks",
      deliverable: "Live System",
      colors: ['#10B981', '#059669', '#047857', '#065F46']
    },
    {
      step: "Growth Optimization",
      icon: TrendingUp,
      headline: "Continuous Excellence",
      description:
        "Feature evolution, analytics insights and long-term scaling strategies.",
      details: [
        "Performance analytics",
        "Roadmapping",
        "Feedback integration",
        "Growth strategy"
      ],
      duration: "Ongoing",
      deliverable: "Growth Partnership",
      colors: ['#EF4444', '#F97316', '#F59E0B', '#EAB308']
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
      <div className="relative z-10">{/* content continues... */}</div>
    </div>
  );
};

export default Services;