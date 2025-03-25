
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ExternalLink, Sparkles } from "lucide-react";
import { useCursorFollowAnimation } from "@/hooks/useGSAP";

// ASCII art for creative code representation
const codeArt = `
  const createExperience = () => {
    return {
      design: "intuitive",
      animations: "smooth",
      code: "clean",
      experience: "✨ magical ✨"
    };
  };
`;

const Hero = () => {
  const [letterClass, setLetterClass] = useState('text-animate-hover');
  const heroRef = useRef<HTMLDivElement>(null);
  const nameArray = "Hello, I'm".split("");
  const jobArray = "Frontend Developer".split("");
  const codePanelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const ctx = gsap.context(() => {
      // Initial load animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.fromTo(
        '.hero-heading-1',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(
        '.hero-heading-2',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05 },
        "-=0.5"
      )
      .fromTo(
        '.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.3"
      )
      .fromTo(
        '.code-panel',
        { opacity: 0, scale: 0.95, rotationY: 10 },
        { opacity: 1, scale: 1, rotationY: 0, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
        "-=0.5"
      )
      .fromTo(
        '.hero-scroll',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          onComplete: () => {
            gsap.to('.hero-scroll', {
              y: '10px',
              repeat: -1,
              yoyo: true,
              duration: 1.5,
              ease: "power1.inOut"
            });
          }
        },
        "-=0.3"
      );
      
      // Typing effect for code panel
      if (codePanelRef.current) {
        const codeText = codePanelRef.current.querySelector('.code-text');
        if (codeText) {
          const characters = codeText.textContent?.split('') || [];
          codeText.textContent = '';
          
          characters.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            codeText.appendChild(span);
            
            gsap.to(span, {
              opacity: 1,
              duration: 0.02,
              delay: 1.2 + index * 0.02,
              ease: 'none'
            });
          });
        }
      }
      
      // Background elements animation
      gsap.fromTo(
        '.bg-element',
        { 
          y: (index: number) => index % 2 === 0 ? -100 : 100, 
          opacity: 0, 
          rotation: (index: number) => (index % 2 === 0 ? -20 : 20)
        },
        { 
          y: 0, 
          opacity: 0.7, 
          rotation: 0,
          duration: 1.5, 
          stagger: 0.2, 
          ease: "elastic.out(1, 0.3)" 
        }
      );
      
      // Setup scroll animation for floating elements
      gsap.to('.float-elements', {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      // Animate name letters once - not on every render or hover
      setTimeout(() => {
        setLetterClass('text-animate');
        
        // Only after initial animation, set to hover state
        setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 4000);
      }, 1000);
      
    }, heroRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={heroRef} 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden float-elements">
        <div className="bg-element absolute h-64 w-64 rounded-full bg-primary/5 top-[10%] right-[5%]"></div>
        <div className="bg-element absolute h-48 w-48 rounded-full bg-secondary/5 bottom-[15%] left-[10%]"></div>
        <div className="bg-element absolute h-32 w-32 rounded-full bg-accent/5 top-[30%] left-[15%]"></div>
        <div className="bg-element absolute h-24 w-24 rounded-full bg-primary/5 bottom-[25%] right-[20%]"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-3/5 space-y-8">
            {/* Availability badge */}
            <div className="mb-6 px-4 py-2 rounded-full bg-primary/10 inline-flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm font-medium">Available for work</span>
            </div>
            
            {/* Animated name with character animation */}
            <div className="space-y-4">
              <div className="flex flex-wrap">
                {nameArray.map((char, idx) => (
                  <span 
                    key={idx} 
                    className={`${letterClass} _${idx + 1} inline-block`}
                    style={{ 
                      animationDelay: `${0.1 * idx}s`,
                      marginRight: char === ' ' ? '0.5rem' : '0.1rem'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
              
              <h1 className="hero-heading-1 text-7xl md:text-8xl font-bold gradient-text">
                Creative
              </h1>
              <h2 className="flex flex-wrap hero-heading-2 text-6xl md:text-7xl font-bold relative">
                {jobArray.map((char, idx) => (
                  <span 
                    key={idx} 
                    className={`${letterClass} _${idx + 10} inline-block`}
                    style={{ 
                      animationDelay: `${0.5 + 0.1 * idx}s`,
                      marginRight: char === ' ' ? '0.5rem' : '0.05rem'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </h2>
            </div>
            
            <p className="hero-subtitle text-xl text-muted-foreground max-w-2xl">
              I craft <span className="font-semibold text-primary">modern</span> &amp; <span className="font-semibold text-secondary">interactive</span> web experiences with clean code and smooth animations.
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <a 
                href="#projects" 
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              <a 
                href="#contact" 
                className="btn-secondary group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get In Touch
                  <ExternalLink className="w-4 h-4" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </div>
          </div>
          
          {/* Code preview panel */}
          <div 
            ref={codePanelRef}
            className="code-panel w-full md:w-2/5 p-6 bg-foreground/5 rounded-2xl border border-foreground/10 shadow-lg transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 perspective"
          >
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-foreground/60">magical-experience.js</span>
              </div>
            </div>
            <pre className="code-text font-mono text-xs md:text-sm text-foreground/80 overflow-x-auto">
              {codeArt}
            </pre>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs font-mono text-foreground/60">Creative Frontend Development</span>
              <span className="text-xs font-mono text-primary">✓ Running</span>
            </div>
          </div>
        </div>
        
        <a 
          href="#about" 
          className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown size={20} />
        </a>
      </div>
      
      {/* CSS animations */}
      <style>
        {`
        .text-animate {
          display: inline-block;
          opacity: 0;
          animation: bounceIn 1s forwards;
          animation-delay: 1s;
        }
        
        .text-animate-hover {
          display: inline-block;
          animation-fill-mode: both;
        }
        
        .text-animate-hover:hover {
          animation: rubberBand 1s;
          color: hsl(var(--primary));
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px);
          }
          80% {
            transform: translateY(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes rubberBand {
          0% {
            transform: scale3d(1, 1, 1);
          }
          30% {
            transform: scale3d(1.25, 0.75, 1);
          }
          40% {
            transform: scale3d(0.75, 1.25, 1);
          }
          50% {
            transform: scale3d(1.15, 0.85, 1);
          }
          65% {
            transform: scale3d(0.95, 1.05, 1);
          }
          75% {
            transform: scale3d(1.05, 0.95, 1);
          }
          100% {
            transform: scale3d(1, 1, 1);
          }
        }
        `}
      </style>
    </section>
  );
};

export default Hero;
