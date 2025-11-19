import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";

import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import ContactManagement from "./ContactManagement";
import HiringManagement from "./HiringManagement";
import ContentManagement from "./ContentManagement";
import PortfolioManagement from "./PortfolioManagement";
import CommunityManagement from "./CommunityManagement";
import Analytics from "./Analytics";
import Settings from "./Settings";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // -----------------------------------------
  // 🔐 FIX: Persistent Admin Authentication
  // -----------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem("limitless_admin_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("limitless_admin_auth", "true");
    navigate("/admin/dashboard");
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // -----------------------------------------
  // 📌 Page Title + Description
  // -----------------------------------------
  const PAGE_CONFIG: Record<
    string,
    { title: string; desc: string }
  > = {
    "/admin/dashboard": {
      title: "Dashboard",
      desc: "System overview and key metrics",
    },
    "/admin/contacts": {
      title: "Contact & Lead Management",
      desc: "Manage leads and inquiries",
    },
    "/admin/hiring": {
      title: "Hiring & Careers",
      desc: "Track applications and recruitment",
    },
    "/admin/content": {
      title: "Content Management",
      desc: "Create and manage content",
    },
    "/admin/portfolio": {
      title: "Portfolio Management",
      desc: "Showcase your work",
    },
    "/admin/community": {
      title: "Community Management",
      desc: "Engage with your audience",
    },
    "/admin/analytics": {
      title: "Analytics & Reports",
      desc: "Monitor performance and growth",
    },
    "/admin/settings": {
      title: "Settings",
      desc: "Configure system preferences",
    },
  };

  const path = location.pathname;
  const config =
    PAGE_CONFIG[path] ??
    ({
      title: "Admin Dashboard",
      desc: "Administrative control panel",
    } as const);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-background overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* ---------------------------------- */}
          {/* HEADER */}
          {/* ---------------------------------- */}
          <header className="sticky top-0 z-40 h-14 sm:h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center px-4 sm:px-6">
            <SidebarTrigger className="mr-3 sm:mr-4" />

            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                {isMobile ? config.title.split(" ")[0] : config.title}
              </h1>

              {!isMobile && (
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {config.desc}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 ml-4">
              <div className="hidden sm:flex status-online">
                <div className="status-dot"></div>
                <span className="text-xs sm:text-sm">Online</span>
              </div>
              <div className="sm:hidden w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </header>

          {/* ---------------------------------- */}
          {/* PAGE CONTENT + SMOOTH TRANSITION */}
          {/* ---------------------------------- */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full h-full"
              >
                <Routes location={location}>
                  <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/contacts" element={<ContactManagement />} />
                  <Route path="/hiring" element={<HiringManagement />} />
                  <Route path="/content" element={<ContentManagement />} />
                  <Route path="/portfolio" element={<PortfolioManagement />} />
                  <Route path="/community" element={<CommunityManagement />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
