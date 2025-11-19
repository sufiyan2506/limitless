import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  MessageCircle,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { GradientText } from "@/components/ui/gradient-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import limitlessLogo from "@/assets/limitless-logo.png";

// Centralized menu
const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Contacts & Leads", url: "/admin/contacts", icon: Users },
  { title: "Hiring & Careers", url: "/admin/hiring", icon: BriefcaseBusiness },
  { title: "Content Management", url: "/admin/content", icon: FileText },
  { title: "Portfolio", url: "/admin/portfolio", icon: FolderOpen },
  { title: "Community", url: "/admin/community", icon: MessageCircle },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state, setOpen } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Active route check
  const isActive = (path: string) => location.pathname === path;

  // Navigation Styles (Upgraded)
  const getNavCls = (path: string) => {
    const base =
      "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 w-full text-left min-h-[44px] text-sm font-medium";

    const active =
      "bg-[rgba(255,255,255,0.06)] text-white shadow-sm border border-[rgba(255,255,255,0.1)] backdrop-blur-md";

    const hover =
      "hover:bg-[rgba(255,255,255,0.05)] hover:text-white/90 active:scale-[0.97]";

    return isActive(path) ? `${base} ${active}` : `${base} ${hover}`;
  };

  const handleNavClick = () => {
    if (isMobile) setOpen(false);
  };

  const showText = isMobile || state !== "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className={`transition-all duration-300 ${
        state === "collapsed" && !isMobile ? "w-16" : "w-64"
      }`}
    >
      <SidebarContent className="bg-[#0d0d0d]/95 backdrop-blur-xl border-r border-white/5 flex flex-col">

        {/* Logo / Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <img src={limitlessLogo} alt="Limitless Logo" className="w-7 h-7" />

            {showText && (
              <div className="flex flex-col leading-tight">
                <GradientText
                  colors={["#A855F7", "#6366F1"]}
                  className="text-lg font-semibold tracking-tight"
                >
                  ADMIN
                </GradientText>
                <span className="text-xs text-white/40">Management Panel</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="flex-1 overflow-y-auto">
          {showText && (
            <SidebarGroupLabel className="px-4 pt-4 pb-1 text-[11px] uppercase tracking-wider text-white/40">
              Navigation
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {menuItems.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={url}
                      onClick={handleNavClick}
                      className={getNavCls(url)}
                    >
                      <Icon className="w-5 h-5 opacity-80" />
                      {showText && <span className="truncate">{title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Section */}
        <div className="p-4 border-t border-white/5">
          <Button
            variant="ghost"
            size={showText ? "default" : "icon"}
            className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
            onClick={() => window.location.reload()}
          >
            <LogOut className="w-5 h-5" />
            {showText && <span className="ml-3 font-medium">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
