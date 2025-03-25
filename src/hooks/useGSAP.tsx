
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Custom eases
CustomEase.create("elastic", "M0,0 C0.4,0 0.2,1 0.67,1 0.88,1 0.82,0 1,0");
CustomEase.create("bounce", "M0,0 C0.2,0 0.1,1 0.5,1 0.9,1 0.8,0 1,0");
CustomEase.create("flow", "M0,0 C0.25,0.1 0.33,0.77 0.54,0.92 0.75,1.07 0.85,1 1,1");

// Types for animation options
type GSAPOptions = {
  animateFrom?: {
    y?: number;
    x?: number;
    opacity?: number;
    scale?: number;
    rotationX?: number;
    rotationY?: number;
    rotation?: number;
    stagger?: number | object;
  };
  animateTo?: {
    y?: number;
    x?: number;
    opacity?: number;
    scale?: number;
    rotationX?: number;
    rotationY?: number;
    rotation?: number;
    stagger?: number | object;
    onStart?: (elements: Element[]) => void;
  };
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number | object;
  scrollTrigger?: boolean | object;
  animation?: "fade" | "slide" | "zoom" | "flip" | "glitch" | "staggered" | "creative" | string;
};

/**
 * Custom GSAP animation hook for elements
 */
export function useGSAP(selector: string, options: GSAPOptions = {}) {
  const componentRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  
  useEffect(() => {
    if (!componentRef.current) return;
    
    // Skip if already animated - prevent repeated animations
    if (hasAnimatedRef.current) return;
    
    const element = componentRef.current;
    const targets = element.querySelectorAll(selector);
    
    if (targets.length === 0) return;
    
    const {
      animation = "fade",
      delay = 0,
      duration = 0.8,
      ease = "power3.out",
      stagger = 0.1,
      scrollTrigger = {}
    } = options;
    
    // Create animation based on type
    const createAnimationConfig = () => {
      switch (animation) {
        case "fade":
          return {
            from: { opacity: 0, y: 30 },
            to: { opacity: 1, y: 0 }
          };
        case "slide":
          return {
            from: { opacity: 0, x: -50 },
            to: { opacity: 1, x: 0 }
          };
        case "zoom":
          return {
            from: { opacity: 0, scale: 0.5 },
            to: { opacity: 1, scale: 1 }
          };
        case "flip":
          return {
            from: { opacity: 0, rotationY: 90, transformPerspective: 600 },
            to: { opacity: 1, rotationY: 0, transformPerspective: 600 }
          };
        case "glitch":
          return {
            from: { opacity: 0, x: -2, y: -2, skewX: 10, skewY: 5 },
            to: { 
              opacity: 1, 
              x: 0, 
              y: 0, 
              skewX: 0, 
              skewY: 0,
              onStart: function(this: any) {
                // Add temporary glitch effect
                const elements = this.targets();
                elements.forEach((el: Element) => {
                  let count = 0;
                  const glitchEffect = setInterval(() => {
                    if (count > 5) {
                      clearInterval(glitchEffect);
                      gsap.set(el, { x: 0, y: 0, opacity: 1 });
                      return;
                    }
                    
                    gsap.set(el, {
                      x: Math.random() * 6 - 3,
                      y: Math.random() * 6 - 3,
                      opacity: Math.random() * 0.5 + 0.5,
                    });
                    
                    count++;
                  }, 100);
                });
              }
            }
          };
        case "staggered":
          return {
            from: { opacity: 0, y: 20, rotationX: 10 },
            to: { 
              opacity: 1, 
              y: 0, 
              rotationX: 0, 
              stagger: {
                each: 0.1,
                from: "random"
              } 
            }
          };
        case "creative":
          return {
            from: { 
              opacity: 0, 
              scale: 0.9, 
              rotation: Math.random() * 10 - 5,
              y: 20,
              transformOrigin: "center center" 
            },
            to: { 
              opacity: 1, 
              scale: 1, 
              rotation: 0,
              y: 0,
              ease: "elastic", 
              duration: 1.2,
              transformOrigin: "center center",
              clearProps: "all" 
            }
          };
        default:
          // Use custom animations from options if provided
          return {
            from: options.animateFrom || { opacity: 0, y: 50 },
            to: options.animateTo || { opacity: 1, y: 0 }
          };
      }
    };
    
    const animConfig = createAnimationConfig();
    
    let ctx = gsap.context(() => {
      // Create a single timeline for all animations
      const tl = gsap.timeline({
        scrollTrigger: scrollTrigger === true 
          ? {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none", // Only play once
              once: true // Critical: ensures the animation only runs ONCE
            }
          : typeof scrollTrigger === 'object'
            ? { ...scrollTrigger, once: true } // Add once: true to ensure it only plays once
            : undefined,
        onComplete: () => {
          // Mark as animated after completion
          hasAnimatedRef.current = true;
        }
      });
      
      tl.fromTo(
        targets,
        {
          ...animConfig.from
        },
        {
          ...animConfig.to,
          duration: duration,
          delay: delay,
          ease: ease,
          stagger: stagger,
          clearProps: "transform,opacity", // Clear props after animation to prevent conflicts
          onStart: animConfig.to.onStart
        }
      );
    }, element);
    
    return () => ctx.revert();
  }, [selector, options]);
  
  return componentRef;
}

/**
 * Hook for split text animations with advanced effects
 */
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
      scrollTrigger = {},
      animation = "fade"
    } = options;
    
    // Configure animation based on type
    const getCharAnimation = () => {
      switch (animation) {
        case "fade":
          return {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
          };
        case "slide":
          return {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 }
          };
        case "zoom":
          return {
            initial: { opacity: 0, scale: 0.5 },
            animate: { opacity: 1, scale: 1 }
          };
        case "flip":
          return {
            initial: { opacity: 0, rotationY: 90 },
            animate: { opacity: 1, rotationY: 0 }
          };
        case "glitch":
          return {
            initial: { opacity: 0, x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
            animate: { opacity: 1, x: 0, y: 0 }
          };
        case "creative":
          return {
            initial: { 
              opacity: 0, 
              y: Math.floor(Math.random() * 50) - 25, 
              rotation: Math.floor(Math.random() * 40) - 20 
            },
            animate: { 
              opacity: 1, 
              y: 0, 
              rotation: 0,
              ease: "elastic" 
            }
          };
        default:
          return {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
          };
      }
    };
    
    const charAnimation = getCharAnimation();
    
    let ctx = gsap.context(() => {
      targets.forEach(target => {
        // Split text into individual characters
        const text = target.textContent || "";
        target.textContent = "";
        target.setAttribute('style', 'display: inline-block');
        
        // Create wrapper for words
        const words = text.split(" ").map(word => {
          const wordSpan = document.createElement("span");
          wordSpan.setAttribute('style', 'display: inline-block; position: relative; white-space: nowrap;');
          
          // Create individual character spans
          const chars = word.split("");
          chars.forEach(char => {
            const charSpan = document.createElement("span");
            charSpan.textContent = char;
            charSpan.setAttribute('style', 'display: inline-block; position: relative;');
            
            // Apply initial animation state
            gsap.set(charSpan, charAnimation.initial);
            
            wordSpan.appendChild(charSpan);
          });
          
          return wordSpan;
        });
        
        // Add spaces between words
        words.forEach((word, i) => {
          target.appendChild(word);
          if (i < words.length - 1) {
            const space = document.createElement("span");
            space.innerHTML = "&nbsp;";
            space.setAttribute('style', 'display: inline-block;');
            target.appendChild(space);
          }
        });
        
        // Animate all character spans
        const charElements = target.querySelectorAll("span > span");
        
        gsap.to(charElements, {
          ...charAnimation.animate,
          duration,
          delay,
          stagger,
          ease: charAnimation.animate.ease || ease,
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

/**
 * Advanced cursor following animation with effects
 */
export function useCursorFollowAnimation(options = {}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cursorRef.current) return;
    
    const cursor = cursorRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      // Main cursor movement
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
      
      // Handle hover states for interactive elements
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = 
        hoveredElement?.tagName === 'A' || 
        hoveredElement?.tagName === 'BUTTON' ||
        hoveredElement?.closest('a') || 
        hoveredElement?.closest('button') ||
        hoveredElement?.classList.contains('interactive') ||
        hoveredElement?.closest('.interactive');
      
      if (isInteractive) {
        gsap.to(cursor, {
          scale: 1.5,
          backgroundColor: "rgba(142, 53, 239, 0.2)",
          border: "1px solid rgba(142, 53, 239, 0.6)",
          duration: 0.3
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "rgba(142, 53, 239, 0.1)",
          border: "1px solid rgba(142, 53, 239, 0.3)",
          duration: 0.3
        });
      }
    };
    
    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.9,
        duration: 0.2
      });
    };
    
    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  
  return cursorRef;
}

/**
 * Hook for creating magnetic elements that attract to cursor
 */
export function useMagneticElement(options: { strength: number; ease?: number } = { strength: 0.3, ease: 0.2 }) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    const { strength = 0.3, ease = 0.2 } = options;
    
    // Track mouse position
    const mousePosition = { x: 0, y: 0 };
    const elementPosition = { x: 0, y: 0 };
    const initialPosition = { x: 0, y: 0 };
    
    // Calculate initial position
    const updateInitialPosition = () => {
      const { left, top, width, height } = element.getBoundingClientRect();
      initialPosition.x = left + width / 2;
      initialPosition.y = top + height / 2;
    };
    
    // Update on scroll to fix position issues
    window.addEventListener('scroll', updateInitialPosition);
    window.addEventListener('resize', updateInitialPosition);
    updateInitialPosition();
    
    // Animation frame for smooth movement
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mousePosition.x = clientX;
      mousePosition.y = clientY;
      
      // Update element position with easing
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };
    
    const updatePosition = () => {
      animationFrameId = undefined;
      
      // Calculate distance from mouse to element's initial position
      const { left, top, width, height } = element.getBoundingClientRect();
      initialPosition.x = left + width / 2;
      initialPosition.y = top + height / 2;
      
      // Calculate distance between mouse and element
      const distanceX = mousePosition.x - initialPosition.x;
      const distanceY = mousePosition.y - initialPosition.y;
      
      // Apply easing to element position
      elementPosition.x += (distanceX * strength - elementPosition.x) * ease;
      elementPosition.y += (distanceY * strength - elementPosition.y) * ease;
      
      // Apply transform
      element.style.transform = `translate(${elementPosition.x}px, ${elementPosition.y}px)`;
      
      // Continue animation loop if there's movement
      if (
        Math.abs(distanceX * strength - elementPosition.x) > 0.01 ||
        Math.abs(distanceY * strength - elementPosition.y) > 0.01
      ) {
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };
    
    const handleMouseLeave = () => {
      // Return to original position
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        onComplete: () => {
          elementPosition.x = 0;
          elementPosition.y = 0;
          element.style.transform = '';
        }
      });
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', updateInitialPosition);
      window.removeEventListener('resize', updateInitialPosition);
      element.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [options]);
  
  return elementRef;
}
