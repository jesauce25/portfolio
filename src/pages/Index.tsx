
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Smooth scrolling setup
    const lenis = {
      lerp: 0.1,
      smoothTouch: true,
      syncTouch: true
    };
    
    // Initialize custom cursor
    if (cursorRef.current) {
      const cursor = cursorRef.current;
      
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
        });
      };
      
      window.addEventListener("mousemove", onMouseMove);
      
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, []);
  
  return (
    <div className="overflow-x-hidden">
      <div
        ref={cursorRef}
        className="cursor fixed w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/20 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-0 md:opacity-100"
      ></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
