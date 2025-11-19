// src/app/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop";
import FAQChatbot from "../components/FAQChatbot";
import ShutterTransition from "../components/ShutterTransition";

import Index from "../pages/Index";
import About from "../pages/About";
import Services from "../pages/Services";
import Work from "../pages/Work";
import Insights from "../pages/Insights";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import AdminLayout from "../pages/admin/AdminLayout";

// React Query Client
const queryClient = new QueryClient();

// Hide chatbot on admin routes
const ChatbotWrapper = () => {
  const location = useLocation();
  return location.pathname.startsWith("/admin") ? null : <FAQChatbot />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />

          {/* GLOBAL DARK MODE WRAPPER */}
          <div className="app-dark">
            <Routes>
              {/* ADMIN PANEL */}
              <Route path="/admin/*" element={<AdminLayout />} />

              {/* MAIN PUBLIC WEBSITE */}
              <Route
                path="*"
                element={
                  <ShutterTransition>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/work" element={<Work />} />
                      <Route path="/insights" element={<Insights />} />
                      <Route path="/contact" element={<Contact />} />

                      {/* 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ShutterTransition>
                }
              />
            </Routes>

            {/* CHATBOT (except admin) */}
            <ChatbotWrapper />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
