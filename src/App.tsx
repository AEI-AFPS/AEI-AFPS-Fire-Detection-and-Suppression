import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Advancements from "./pages/Advancements";
import Applications from "./pages/Applications";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { DataPrefetcher } from "./components/shared/DataPrefetcher";
import { WhatsAppButton } from "./components/shared/WhatsAppButton";

// Admin
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import { AdminRoute } from "./components/admin/AdminRoute";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep data fresh for 5 minutes — prevents re-fetching on every page navigation
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DataPrefetcher />
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/advancements" element={<Advancements />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/projects" element={<Projects />} /> */}
          <Route path="/projects/:id" element={<ProjectDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
      </HashRouter>
    </TooltipProvider>
    <Analytics />
  </QueryClientProvider>
);

export default App;
