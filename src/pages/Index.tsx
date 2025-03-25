
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { Code, Layers, Smile, Sparkles, Zap } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Custom ease for smoother animations
CustomEase.create("bounce", "M0,0 C0.2,0 0.1,1 0.5,1 0.9,1 0.8,0 1,0");
CustomEase.create("elastic", "M0,0 C0.4,0 0.2,1 0.67,1 0.88,1 0.82,0 1,0");

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  
  // Handle cursor and blobs movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Animate cursor
  useEffect(() => {
    if (!cursorRef.current || !cursorTextRef.current) return;
    
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    
    gsap.to(cursor, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.3,
      ease: "power3.out",
    });
    
    gsap.to(cursorText, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.6,
      ease: "power2.out",
    });
    
    // Only set up hover effects once to prevent animation restarts
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      
      // Add hover effect for interactive elements
      const handleMouseEnter = () => {
        gsap.to(cursor, {
          scale: 1.5,
          backgroundColor: "rgba(142, 53, 239, 0.3)",
          border: "1px solid rgba(142, 53, 239, 0.6)",
          duration: 0.3,
        });
        gsap.to(cursorText, { opacity: 1, duration: 0.3 });
      };
      
      const handleMouseLeave = () => {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "rgba(142, 53, 239, 0.1)",
          border: "1px solid rgba(142, 53, 239, 0.3)",
          duration: 0.3,
        });
        gsap.to(cursorText, { opacity: 0, duration: 0.3 });
      };
      
      const interactiveElements = document.querySelectorAll('a, button, .interactive');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      
      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }
  }, [mousePosition]);
  
  // Create floating blobs - only set up once
  useEffect(() => {
    if (!blobsRef.current || hasAnimatedRef.current) return;
    
    const blobs = blobsRef.current;
    const blobsCtx = gsap.context(() => {
      const blob1 = blobs.querySelector('.blob-1');
      const blob2 = blobs.querySelector('.blob-2');
      const blob3 = blobs.querySelector('.blob-3');
      
      if (blob1 && blob2 && blob3) {
        // First blob animation
        gsap.to(blob1, {
          x: "10vw",
          y: "5vh",
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        
        // Second blob animation
        gsap.to(blob2, {
          x: "-15vw",
          y: "10vh",
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });
        
        // Third blob animation
        gsap.to(blob3, {
          x: "5vw",
          y: "-8vh",
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }
    }, blobs);
    
    return () => blobsCtx.revert();
  }, []);
  
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
              once: true // Critical: only play once
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
      
      {/* Decorative blobs */}
      <div 
        ref={blobsRef}
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="blob-1 morphing-blob w-[600px] h-[600px] opacity-30 top-[-100px] left-[-100px]"></div>
        <div className="blob-2 morphing-blob w-[800px] h-[800px] opacity-20 bottom-[-200px] right-[-200px]"></div>
        <div className="blob-3 morphing-blob w-[500px] h-[500px] opacity-25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
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
    </div>
  );
};

export default Index;
