
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";

import Contact from "@/components/sections/Contact";
import FloatingBackgroundBlobs from "@/components/shared/FloatingBackgroundBlobs";
import { Code, Layers, Smile, Sparkles, Zap } from "lucide-react";

import SeoHead from '@/components/seo/SeoHead'; // Import SeoHead


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Custom ease for smoother animations
CustomEase.create("bounce", "M0,0 C0.2,0 0.1,1 0.5,1 0.9,1 0.8,0 1,0");
CustomEase.create("elastic", "M0,0 C0.4,0 0.2,1 0.67,1 0.88,1 0.82,0 1,0");

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  

  // Animate section transitions - using once flag to prevent re-animations
  useEffect(() => {
    if (!mainRef.current) return;
    
    const main = mainRef.current;
    const ctx = gsap.context(() => {
      // Create a pin for smooth scrolling effect
      ScrollTrigger.create({
        trigger: main,
        start: "top top",
        end: "bottom bottom",
        pin: false,
        pinSpacing: false,
        scrub: 1,
      });
      
      // Section parallax effects - with once flag
      gsap.utils.toArray<HTMLElement>('section').forEach((section, i) => {
        // Section entrance animation - only once
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          { 
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
              toggleActions: "play none none reverse",
              once: true 
            }
          }
        );
        
        // Background items parallax - continuous effect based on scroll
        const bgElements = section.querySelectorAll('.parallax-bg');
        if (bgElements.length) {
          bgElements.forEach((el, index) => {
            const speed = index % 2 === 0 ? 0.2 : -0.2;
            gsap.to(el, {
              y: `${speed * 100}%`,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            });
          });
        }
      });
    }, main);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div className="relative overflow-hidden" ref={mainRef}>
      {/* Decorative blobs */}
      <FloatingBackgroundBlobs />
      
      {/* Floating tech icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-10" aria-hidden="true">
        <div className="absolute top-[15%] left-[10%] animate-float">
          <Code size={40} className="text-primary" />
        </div>
        <div className="absolute top-[45%] left-[85%] animate-float" style={{ animationDelay: '1s' }}>
          <Layers size={32} className="text-secondary" />
        </div>
        <div className="absolute top-[75%] left-[15%] animate-float" style={{ animationDelay: '2s' }}>
          <Sparkles size={28} className="text-accent" />
        </div>
        <div className="absolute top-[25%] left-[75%] animate-float" style={{ animationDelay: '3s' }}>
          <Zap size={36} className="text-primary" />
        </div>
        <div className="absolute top-[60%] left-[50%] animate-float" style={{ animationDelay: '4s' }}>
          <Smile size={30} className="text-secondary" />
        </div>
        <div className="absolute top-[5%] left-[60%] animate-float" style={{ animationDelay: '5s' }}>
          <Code size={30} className="text-accent" />
        </div>
        <div className="absolute bottom-[5%] right-[20%] animate-float" style={{ animationDelay: '6s' }}>
          <Layers size={35} className="text-primary" />
        </div>
      </div>
      
      {/* Grid overlay */}
      <div className="fixed inset-0 grid-pattern opacity-[0.03] pointer-events-none" aria-hidden="true"></div>
      
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
      <SeoHead 
        title="Home | Paulo L. Abaquita - Frontend Developer & Business Partner"
        description="Explore the portfolio of Paulo L. Abaquita, a passionate frontend developer and business partner who builds modern, interactive web experiences."
        path="/"
      />
    </div>
  );
};

export default Index;
