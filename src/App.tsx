
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import HireMePage from "./pages/HireMePage";
import ServicesPage from "./pages/ServicesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import About from "./pages/About";
import Projects from "./pages/Projects";
import { useCursorFollowAnimation } from "@/hooks/useGSAP";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Chatbot from "@/components/layout/Chatbot";

const queryClient = new QueryClient();
  
const App = () => {
  const cursorRef = useCursorFollowAnimation();
  const cursorTextRef = useRef<HTMLDivElement>(null);

  // Initial fade-in for cursor and text, and hover effects.
  // This is a minimal version of the previous Index.tsx logic,
  // now centralized in App.tsx to affect all pages.
  // The useCursorFollowAnimation hook handles the mousemove, so no need for explicit mousemove listener here.
  // Only need to manage initial opacity and text for the cursor and its text.
  // Hover effects are managed by useCursorFollowAnimation
  const hasAnimatedCursor = useRef(false);
  useEffect(() => {
    if (hasAnimatedCursor.current || !cursorRef.current || !cursorTextRef.current) return;
    
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;

    gsap.set([cursor, cursorText], { opacity: 0 });
    gsap.to(cursor, { opacity: 1, duration: 0.5, ease: "power2.out", delay: 1 });
    gsap.to(cursorText, { opacity: 0, duration: 0.5, ease: "power2.out", delay: 1 });
    hasAnimatedCursor.current = true;

    // The useCursorFollowAnimation hook already attaches mousemove, mousedown, mouseup listeners
    // and handles scaling and background color changes for interactive elements.
    // No need to duplicate that logic here.

  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" />
        
        {/* Cursor */}
        <div
          ref={cursorRef}
          className="cursor fixed w-8 h-8 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/30 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-0 md:opacity-100 mix-blend-difference"
        ></div>
        <div
          ref={cursorTextRef}
          className="fixed text-xs font-mono text-white pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-0 flex items-center justify-center w-24 h-24"
        >
          explore
        </div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/hire" element={<HireMePage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      <Chatbot />
    </QueryClientProvider>
  );
};

export default App;
