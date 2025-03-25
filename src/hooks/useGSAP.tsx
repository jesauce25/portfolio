
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type GSAPOptions = {
  animateFrom?: {
    y?: number;
    x?: number;
    opacity?: number;
    scale?: number;
    rotationX?: number;
    rotationY?: number;
  };
  animateTo?: {
    y?: number;
    x?: number;
    opacity?: number;
    scale?: number;
    rotationX?: number;
    rotationY?: number;
  };
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number | object;
  scrollTrigger?: boolean | object;
};

export function useGSAP(selector: string, options: GSAPOptions = {}) {
  const componentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!componentRef.current) return;
    
    const element = componentRef.current;
    const targets = element.querySelectorAll(selector);
    
    if (targets.length === 0) return;
    
    const {
      animateFrom = { y: 50, opacity: 0 },
      animateTo = { y: 0, opacity: 1 },
      delay = 0,
      duration = 0.8,
      ease = "power3.out",
      stagger = 0.1,
      scrollTrigger = {}
    } = options;
    
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: scrollTrigger === true 
          ? {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          : typeof scrollTrigger === 'object'
            ? scrollTrigger
            : undefined
      });
      
      tl.fromTo(
        targets,
        {
          ...animateFrom
        },
        {
          ...animateTo,
          duration,
          delay,
          ease,
          stagger,
          clearProps: "all"
        }
      );
    }, element);
    
    return () => ctx.revert();
  }, [selector, options]);
  
  return componentRef;
}

export function useSplitTextAnimation(selector: string, options: GSAPOptions = {}) {
  const componentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!componentRef.current) return;
    
    const element = componentRef.current;
    const targets = element.querySelectorAll(selector);
    
    if (targets.length === 0) return;
    
    const {
      delay = 0,
      duration = 0.8,
      ease = "power3.out",
      stagger = 0.03,
      scrollTrigger = {}
    } = options;
    
    let ctx = gsap.context(() => {
      targets.forEach(target => {
        // Split text into individual characters
        const text = target.textContent || "";
        target.textContent = "";
        
        const chars = text.split("");
        chars.forEach(char => {
          const charSpan = document.createElement("span");
          charSpan.textContent = char === " " ? "\u00A0" : char;
          charSpan.style.display = "inline-block";
          charSpan.style.opacity = "0";
          charSpan.style.transform = "translateY(20px)";
          target.appendChild(charSpan);
        });
        
        const charElements = target.querySelectorAll("span");
        
        gsap.to(charElements, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          stagger,
          scrollTrigger: scrollTrigger === true 
            ? {
                trigger: target,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            : typeof scrollTrigger === 'object'
              ? scrollTrigger
              : undefined
        });
      });
    }, element);
    
    return () => ctx.revert();
  }, [selector, options]);
  
  return componentRef;
}

export function useCursorFollowAnimation() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cursorRef.current) return;
    
    const cursor = cursorRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return cursorRef;
}
