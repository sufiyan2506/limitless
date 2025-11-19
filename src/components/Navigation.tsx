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

/* ----------------------------------------
   Navigation Items
---------------------------------------- */
const NAV = [
  { name: "Home", href: "/", Icon: Home, gradientFrom: "#a955ff", gradientTo: "#ea51ff" },
  { name: "About", href: "/about", Icon: User, gradientFrom: "#56CCF2", gradientTo: "#2F80ED" },
  { name: "Services", href: "/services", Icon: Briefcase, gradientFrom: "#FF9966", gradientTo: "#FF5E62" },
  { name: "Work", href: "/work", Icon: FolderOpen, gradientFrom: "#80FF72", gradientTo: "#7EE8FA" },
  { name: "Insights", href: "/insights", Icon: Lightbulb, gradientFrom: "#ffa9c6", gradientTo: "#f434e2" },
  { name: "Contact", href: "/contact", Icon: Mail, gradientFrom: "#FFD700", gradientTo: "#FF8C00" },
];

/* ----------------------------------------
   Detect Path
---------------------------------------- */
const usePath = () => {
  const [path, setPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return path;
};

/* ----------------------------------------
   Nav Icon Button
---------------------------------------- */
const NavIconButton = ({ item, active }) => {
  const { Icon, name, href, gradientFrom, gradientTo } = item;

  return (
    <ShutterLink
      to={href}
      aria-label={name}
      className="relative group flex items-center justify-center"
      style={{ "--g-from": gradientFrom, "--g-to": gradientTo }}
    >
      {/* Glow */}
      <span
        className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-300",
          active ? "opacity-90 scale-105" : "opacity-0 group-hover:opacity-60"
        )}
        style={{
          background: `radial-gradient(60% 60% at 30% 30%, var(--g-from) 0%, transparent 40%), linear-gradient(135deg, var(--g-from), var(--g-to))`,
          filter: "blur(18px)",
        }}
      />

      {/* Glass Button */}
      <span
        className={cn(
          "relative z-10 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center",
          "rounded-full glass border border-white/10 transition-transform",
          active ? "scale-105 ring-2 ring-white/10" : "group-hover:scale-105"
        )}
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </span>

      {/* Hover Label */}
      <span
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full mt-2",
          "px-3 py-1 rounded-md text-xs font-medium",
          "bg-black/60 border border-white/10 backdrop-blur-md",
          "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
          "transition-all duration-300 pointer-events-none whitespace-nowrap"
        )}
      >
        {name}
      </span>
    </ShutterLink>
  );
};

/* ----------------------------------------
   Main Navigation
---------------------------------------- */
const Navigation = () => {
  const [open, setOpen] = useState(false);
  const path = usePath();
  const items = useMemo(() => NAV, []);

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <ShutterLink
            to="/"
            className="flex items-center gap-2 group glass rounded-full px-3 py-2 hover:glass-strong"
          >
            <img
              src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png"
              className="w-7 h-7 md:w-8 md:h-8"
            />
            <GradientText
              colors={["#fff", "#a1a1aa"]}
              animationSpeed={6}
              className="font-black text-sm md:text-base"
            >
              LIMITLESS
            </GradientText>
          </ShutterLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-6">
              {items.map((item) => {
                const active =
                  path === item.href ||
                  (item.href !== "/" && path.startsWith(item.href));
                return (
                  <li key={item.name}>
                    <NavIconButton item={item} active={active} />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right area */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <PopupButton
                url="https://calendly.com/hello-thinklimitless/30min"
                rootElement={document.getElementById("root") ?? undefined}
                text={
                  <Button className="glass rounded-full px-5 py-2 border-white/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    Free Consultation
                  </Button>
                }
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden glass rounded-full p-2 border border-white/10"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-1/2 top-1/2 w-[90%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png"
                  className="w-8 h-8"
                />
                <GradientText
                  colors={["#fff", "#aaa"]}
                  animationSpeed={6}
                  className="font-black text-lg"
                >
                  LIMITLESS
                </GradientText>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="grid gap-4">
              {items.map((item) => {
                const active =
                  path === item.href ||
                  (item.href !== "/" && path.startsWith(item.href));
                return (
                  <ShutterLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-lg",
                      active ? "bg-white/10" : "hover:bg-white/5"
                    )}
                  >
                    <item.Icon className="w-5 h-5 text-white" />
                    <span className="text-white">{item.name}</span>
                  </ShutterLink>
                );
              })}
            </div>

            <div className="mt-6">
              <PopupButton
                url="https://calendly.com/hello-thinklimitless/30min"
                rootElement={document.getElementById("root") ?? undefined}
                text={
                  <Button className="w-full bg-primary text-black py-2 rounded-md">
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
