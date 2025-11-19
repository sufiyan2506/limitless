// limitless-frontend-main/src/components/Navigation.tsx
import React, { useEffect, useMemo, useState } from "react";
import ShutterLink from "./ShutterLink";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Lightbulb,
  Mail,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { PopupButton } from "react-calendly";
import { cn } from "@/lib/utils";

/**
 * Circular icon-only Navigation (Limitless style)
 *
 * - Icon circles with glass + soft glow
 * - Hover reveals label (fade + slide)
 * - Active link shows stronger glow + scale
 * - Accessible (aria-labels, keyboard focus)
 */

type NavItem = {
  name: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  gradientFrom: string;
  gradientTo: string;
};

const NAV: NavItem[] = [
  { name: "Home", href: "/", Icon: Home, gradientFrom: "#a955ff", gradientTo: "#ea51ff" },
  { name: "About", href: "/about", Icon: User, gradientFrom: "#56CCF2", gradientTo: "#2F80ED" },
  { name: "Services", href: "/services", Icon: Briefcase, gradientFrom: "#FF9966", gradientTo: "#FF5E62" },
  { name: "Work", href: "/work", Icon: FolderOpen, gradientFrom: "#80FF72", gradientTo: "#7EE8FA" },
  { name: "Insights", href: "/insights", Icon: Lightbulb, gradientFrom: "#ffa9c6", gradientTo: "#f434e2" },
  { name: "Contact", href: "/contact", Icon: Mail, gradientFrom: "#FFD700", gradientTo: "#FF8C00" },
];

const usePath = () => {
  // Simple client-side pathname detection that works with most routers.
  const [path, setPath] = useState<string>(() => (typeof window !== "undefined" ? window.location.pathname : "/"));
  useEffect(() => {
    const onLocation = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onLocation);
    window.addEventListener("pushstate", onLocation as any); // in case you have a helper that emits pushstate
    return () => {
      window.removeEventListener("popstate", onLocation);
      window.removeEventListener("pushstate", onLocation as any);
    };
  }, []);
  return path;
};

const NavIconButton: React.FC<{
  item: NavItem;
  active?: boolean;
}> = ({ item, active }) => {
  const { Icon, name, href, gradientFrom, gradientTo } = item;

  return (
    <ShutterLink
      to={href}
      aria-label={name}
      className={cn(
        "relative group flex items-center justify-center",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/20 rounded-full"
      )}
      style={
        {
          // CSS vars for gradients used inside children
          "--g-from": gradientFrom,
          "--g-to": gradientTo,
        } as React.CSSProperties & { [key: string]: string }
      }
    >
      {/* Glow layer */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-400 transform-gpu",
          // The glow is more visible when active
          active ? "opacity-90 scale-105" : "opacity-0 group-hover:opacity-60 group-focus:opacity-70",
        )}
        style={{
          background: `radial-gradient(60% 60% at 30% 30%, var(--g-from) 0%, transparent 40%), linear-gradient(135deg, var(--g-from), var(--g-to))`,
          filter: "blur(18px)",
        }}
      />

      {/* Glass circle button */}
      <span
        className={cn(
          "relative z-10 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full glass border border-white/8 transition-transform duration-300",
          active ? "scale-105 ring-2 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]" : "group-hover:scale-105"
        )}
        // Add subtle backdrop so icons stay readable
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        }}
      >
        <Icon className={cn("w-5 h-5 md:w-6 md:h-6", active ? "text-white" : "text-white/85")} />
      </span>

      {/* Hover label — appears on hover / focus */}
      
      </span>
    </ShutterLink>
  );
};

const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const path = usePath();

  const items = useMemo(() => NAV, []);

  return (
    <>
      <nav
        role="navigation"
        className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <ShutterLink to="/" className="flex items-center gap-2 group glass rounded-full px-3 py-2 hover:glass-strong transition-all">
              <img src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png" alt="Limitless" className="w-7 h-7 md:w-8 md:h-8" />
              <GradientText colors={["#ffffff", "#a1a1aa"]} animationSpeed={6} className="font-black text-sm md:text-base">
                LIMITLESS
              </GradientText>
            </ShutterLink>
          </div>

          {/* Center: Circular Icon Nav */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-4 md:gap-6">
              {items.map((item) => {
                const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
                return (
                  <li key={item.name} className="list-none">
                    <NavIconButton item={item} active={active} />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <PopupButton
                url="https://calendly.com/hello-thinklimitless/30min"
                rootElement={typeof document !== "undefined" ? (document.getElementById("root") as HTMLElement) : undefined}
                text={
                  <Button
                    variant="outline"
                    className="glass rounded-full px-4 py-2 text-sm md:px-6 md:py-3 hover:glass-strong border-white/10 transition-all"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Free Consultation
                  </Button>
                }
              />
            </div>

            <button
              className="lg:hidden glass rounded-full p-2 hover:glass-strong transition-all border border-white/10"
              aria-label="Menu"
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay — simple, matches the same aesthetic */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setOpen(false)} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92%,420px)] p-6 glass rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png" alt="Limitless" className="w-8 h-8" />
                <GradientText colors={["#ffffff", "#a1a1aa"]} animationSpeed={6} className="font-black text-base">LIMITLESS</GradientText>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/5 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="grid gap-3">
              {items.map((it) => {
                const active = path === it.href || (it.href !== "/" && path.startsWith(it.href));
                return (
                  <ShutterLink
                    key={it.name}
                    to={it.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-lg transition-all",
                      active ? "bg-white/5 ring-1 ring-white/10" : "hover:bg-white/3"
                    )}
                  >
                    <it.Icon className="w-5 h-5 text-white/90" />
                    <span className="text-white/90 font-medium">{it.name}</span>
                  </ShutterLink>
                );
              })}
            </div>

            <div className="mt-5">
              <PopupButton
                url="https://calendly.com/hello-thinklimitless/30min"
                rootElement={typeof document !== "undefined" ? (document.getElementById("root") as HTMLElement) : undefined}
                text={
                  <Button className="w-full bg-primary text-black font-medium rounded-md py-2">
                    Schedule a Free Consultation
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
