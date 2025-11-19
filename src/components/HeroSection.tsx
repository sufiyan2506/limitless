
import { RainbowButton } from "@/components/ui/rainbow-button";
import ShutterLink from "./ShutterLink";
import { Logos3 } from "@/components/ui/logos3";

/**
 * Hero Section – Limitless v2.0 (Redesigned)
 */

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >

  
      {/* ======= GRADIENT OVERLAY FOR READABILITY ======= */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 backdrop-blur-[1px] pointer-events-none -z-5"></div>

      {/* ======= CONTENT ======= */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 text-center">

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <img
            src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png"
            className="w-28 h-28 md:w-36 md:h-36 animate-float drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight gradient-text animate-fade-up drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          Design & Development
          <br />
          Without Limits
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-white/70 mt-6 mb-10 animate-fade-up max-w-2xl mx-auto">
          Premium websites, immersive experiences, and breakthrough digital products — crafted without compromise.
        </p>

        {/* Status Indicator */}
        <div className="status-online mb-10 animate-fade-up justify-center">
          <div className="status-dot"></div>
          <span>Available for New Projects</span>
        </div>

        {/* CTA */}
        <div className="animate-fade-up mb-20">
          <ShutterLink to="/contact">
            <RainbowButton className="text-lg px-10 md:px-14 h-14">
              Start a Project
            </RainbowButton>
          </ShutterLink>
        </div>

        {/* ======= TECH LOGO STRIP (fixed black strip bug) ======= */}
        <div className="relative animate-fade-up">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-transparent backdrop-blur-sm rounded-xl pointer-events-none"></div>

          <div className="relative z-10">
            <Logos3 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
