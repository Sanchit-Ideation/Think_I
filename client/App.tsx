import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { PlatformProvider } from "./contexts/PlatformContext";
import Dashboard from "./pages/Dashboard";
import Template from "./pages/Template";
import Schedule from "./pages/Schedule";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import CandidateDetail from "./pages/CandidateDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlatformProvider>
        <Toaster />
        <Sonner />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/template" element={<Template />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/candidate/:id" element={<CandidateDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </PlatformProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
