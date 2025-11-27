import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import Optimize from "./pages/Optimize";
import Analytics from "./pages/Analytics";
import Strategy from "./pages/Strategy";
import Members from "./pages/Members";
import Billing from "./pages/Billing";
import Branding from "./pages/Branding";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/strategy" element={<Strategy />} />
                    <Route path="/generate" element={<Generate />} />
                    <Route path="/optimize" element={<Optimize />} />
                    <Route path="/branding" element={<Branding />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
