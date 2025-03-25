
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useSplitTextAnimation, useCursorFollowAnimation } from "@/hooks/useGSAP";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useSplitTextAnimation('.hero-heading', {
    scrollTrigger: false,
    delay: 0.5
  });
  const cursorRef = useCursorFollowAnimation();
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.5 }
      );
      
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.8 }
      );
      
      gsap.fromTo(
        '.hero-scroll',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 2.2,
          onComplete: () => {
            gsap.to('.hero-scroll', {
              y: '10px',
              repeat: -1,
              yoyo: true,
              duration: 1.5,
              ease: "power1.inOut"
            });
          }
        }
      );
    }, heroRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={heroRef} 
      className="min-h-screen flex items-center pt-32 pb-16 overflow-hidden relative"
    >
      <div 
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-56 h-56 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"
      ></div>
      
      <div className="container-section relative z-10">
        <div 
          ref={headingRef}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <div className="mb-6 px-4 py-2 rounded-full bg-secondary inline-flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm font-medium">Available for work</span>
          </div>
          
          <h1 className="hero-heading heading-xl mb-6">
            Creating beautiful & interactive web experiences
          </h1>
          
          <p className="hero-subtitle subheading mb-8 max-w-2xl">
            I'm a front-end developer specializing in crafting modern, 
            user-friendly interfaces with clean code and smooth animations.
          </p>
          
          <div className="hero-cta flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>
          
          <a 
            href="#about" 
            className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <ArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
