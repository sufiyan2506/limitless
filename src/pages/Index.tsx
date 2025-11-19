import React, { Suspense, lazy, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WebGLShader } from '@/components/ui/web-gl-shader' /* note: keep import path if your project uses 'web-gl-shader' - adjust if necessary */
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ValueProposition from '@/components/ValueProposition'
// ClientTestimonials is intentionally lazy-loaded below to improve initial bundle size
const ClientTestimonials = lazy(() => import('@/components/ClientTestimonials'))
import ServicesSnapshot from '@/components/ServicesSnapshot'
import CTAFooter from '@/components/CTAFooter'

// Small reveal variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Index = () => {
  const reduceMotion = useReducedMotion();

  // Respect reduced-motion preference
  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }, [reduceMotion])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background (shader runs independently) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <WebGLShader />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Navigation />

        {/* Hero - heavy visual, keep above-the-fold snappy */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          custom={0}
          className="pt-28 md:pt-32 pb-12"
        >
          <HeroSection />
        </motion.section>

        {/* Value proposition - lightweight and first interactive section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          custom={0.08}
          className="pb-16"
        >
          <ValueProposition />
        </motion.section>

        {/* Services snapshot - lazy visually but important for conversions */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          custom={0.16}
          className="pb-16"
        >
          <ServicesSnapshot />
        </motion.section>

        {/* Testimonials - lazy load to keep initial bundle small */}
        <Suspense fallback={<div className="max-w-7xl mx-auto py-12 text-center text-muted-foreground">Loading testimonials...</div>}>
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            custom={0.24}
            className="pb-16"
          >
            {/* Uncomment when ready or allow lazy to mount on scroll */}
            <ClientTestimonials />
          </motion.section>
        </Suspense>

        {/* CTA Footer - sticky micro-interaction on hover */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          custom={0.32}
          className="pb-24"
        >
          <CTAFooter />
        </motion.section>
      </div>

      {/* Minimal accessibility improvements */}
      <style jsx>{`
        :root {
          --index-hero-offset: 0px;
        }
        .reduce-motion * {
          transition: none !important;
          animation: none !important;
        }
      `}</style>
    </div>
  );
};

export default Index;
