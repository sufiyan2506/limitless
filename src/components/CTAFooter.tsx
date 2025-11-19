import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { SocialLinks } from "@/components/ui/social-links";
import { TextArcEffect } from "@/components/ui/text-arc-effect";
import ShutterLink from "./ShutterLink";

const CTAFooter = () => {
  const socials = [
    {
      name: "Instagram",
      image: "https://link-hover-lndev.vercel.app/instagram.png",
    },
    {
      name: "X",
      image: "/lovable-uploads/0a3682ae-58a9-40d1-a89b-57b3923bb3b0.png",
    },
    {
      name: "LinkedIn",
      image: "https://link-hover-lndev.vercel.app/linkedin.png",
    },
    {
      name: "GitHub",
      image: "/lovable-uploads/2958095d-b261-4301-984a-eed4867fb48c.png",
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative">
      {/* Floating Glow Behind Section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Heading */}
        <h2 className="text-display mb-6 gradient-text animate-fade-up">
          Ready to build something limitless?
        </h2>
        <p className="text-body-large text-white/70 mb-14 animate-fade-up max-w-2xl mx-auto">
          Let’s turn your vision into reality with cutting-edge design, development, and AI-powered innovation.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center animate-fade-up mb-24">
          <ShutterLink to="/contact">
            <LiquidButton
              variant="hero"
              size="xxl"
              className="text-lg px-14 py-6 tracking-wide"
            >
              Start Your Project
            </LiquidButton>
          </ShutterLink>
        </div>

        {/* Socials */}
        <div className="flex justify-center animate-fade-up mb-20">
          <SocialLinks socials={socials} className="opacity-90 hover:opacity-100 transition" />
        </div>

        {/* Contact Info Glass Grid */}
        <div className="pt-16 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-10 text-sm text-white/70">
            <div className="glass p-6 rounded-xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
              <h4 className="font-semibold text-white mb-1">Email</h4>
              <p>hello@limitless.studio</p>
            </div>

            <div className="glass p-6 rounded-xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
              <h4 className="font-semibold text-white mb-1">Location</h4>
              <p>Worldwide Remote</p>
            </div>

            <div className="glass p-6 rounded-xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
              <h4 className="font-semibold text-white mb-1">Response Time</h4>
              <p>Within 24 hours</p>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="mt-12 pt-12 border-t border-white/10 flex flex-col items-center gap-6">
            <TextArcEffect />

            <p className="text-white/40 text-xs tracking-wide">
              © 2024 Limitless Studio — Crafting digital experiences without limits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;
