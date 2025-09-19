import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SoilAnalysis from "./pages/SoilAnalysis";
import DiseaseDetection from "./pages/DiseaseDetection";
import FertilizerPlans from "./pages/FertilizerPlans";
import Weather from "./pages/Weather";
import MarketPrices from "./pages/MarketPrices";
import Projects from "./pages/Projects";
import ProjectPreview from "./pages/ProjectPreview";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/soil" element={<SoilAnalysis />} />
          <Route path="/disease" element={<DiseaseDetection />} />
          <Route path="/fertilizer" element={<FertilizerPlans />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/market" element={<MarketPrices />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-preview" element={<ProjectPreview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
