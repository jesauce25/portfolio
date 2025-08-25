import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceType } from "@/data/projects";
import gsap from "gsap";

interface ServiceCardProps {
  service: ServiceType;
  index: number; 
}

const ServiceCard: React.FC<ServiceCardProps> = React.memo(({
  service,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const hasInitializedRef = useRef(false);
  
  // Advanced hover effects with GSAP
  useEffect(() => {
    if (!cardRef.current || !contentRef.current) return;
    
    // Skip setup if already initialized to prevent animation repetition
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    const card = cardRef.current;
    const content = contentRef.current;
    
    // Track card state to prevent animation stacking
    let isHovering = false;
    
    // Create hover animation
    const handleMouseMove = (e: MouseEvent) => {
      if (!card || isAnimatingRef.current) return;
      
      if (!isHovering) {
        isHovering = true;
        setIsHovered(true);
      }
      
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const xPercent = x / width - 0.5;
      const yPercent = y / height - 0.5;
      
      // Tilt effect
      gsap.to(card, {
        rotationY: xPercent * 10,
        rotationX: yPercent * -10,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Counter-move content slightly
      gsap.to(content, {
        x: xPercent * -5,
        y: yPercent * -5,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Highlight effect - follow cursor
      const highlight = card.querySelector('.card-highlight');
      if (highlight) {
        gsap.to(highlight, {
          x: x,
          y: y,
          opacity: 0.15,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    };
    
    const handleMouseLeave = () => {
      isAnimatingRef.current = true;
      isHovering = false;
      
      // Reset all animations with only one tween per element
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsHovered(false);
        }
      });
      
      tl.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.out"
      }, 0);
      
      tl.to(content, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, 0);
      
      const highlight = card.querySelector('.card-highlight');
      if (highlight) {
        tl.to(highlight, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        }, 0);
      }
    };
    
    const handleTouchStart = () => {
      if (isAnimatingRef.current) return;
      setIsHovered(true);
    };
    
    const handleTouchEnd = () => {
      if (isAnimatingRef.current) return;
      setIsHovered(false);
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('touchstart', handleTouchStart, { passive: true });
    card.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  // Entrance animation - only run once
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Create a single animation for entrance - using a unique timeline to prevent conflicts
    const cardEntrance = gsap.timeline({ paused: true });
    
    cardEntrance.fromTo(
      cardRef.current,
      { 
        opacity: 0, 
        y: 50, 
        rotationY: 5,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0, 
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          // Clear animation when complete to prevent retriggering
          cardEntrance.kill();
        }
      }
    );
    
    // Start the entrance animation with a delay based on index
    setTimeout(() => {
      cardEntrance.play();
    }, index * 100 + 200);
    
    return () => {
      cardEntrance.kill();
    };
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className="group glass-card overflow-hidden will-change-transform transition-all duration-300 h-full flex flex-col interactive cursor-pointer" 
    >
      {/* Highlight effect div */}
      <div className="card-highlight absolute w-[150px] h-[150px] rounded-full bg-white blur-3xl opacity-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="relative overflow-hidden h-64">
        <div 
          // No imageRef here as ServiceCard doesn't have parallax image
          className="absolute inset-0 will-change-transform"
        >
          {service.mediaType === "video" ? (
            <video
              src={service.image}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              preload="metadata"
              loading="lazy"
            ></video>
          ) : (
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        {/* Animated service tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {service.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-xs py-1 px-3 rounded-full bg-white/90 text-foreground backdrop-blur-sm font-medium shadow-sm transform transition-transform duration-300"
              style={{
                transform: isHovered ? `translateY(${i * 5}px) scale(1.05)` : 'translateY(0) scale(1)',
                transition: `transform 0.3s ease ${i * 0.05}s`
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div 
        ref={contentRef} 
        className="p-6 flex-1 flex flex-col"
      >
        <h3 className="text-xl font-bold mb-2 gradient-text inline-block">
          {service.name}
        </h3>
        
        <p className="text-muted-foreground mb-6 flex-1">
          {service.description}
        </p>
        
        {/* No links or github for service cards */}
        <div className="ml-auto">
          <span 
            className={`w-3 h-3 rounded-full inline-block ${index % 3 === 0 ? 'bg-primary' : index % 3 === 1 ? 'bg-secondary' : 'bg-accent'}`}
          ></span>
        </div>
      </div>
      
      {/* Glowing border effect on hover */}
      <div className={`absolute inset-0 border-2 border-transparent rounded-[20px] transition-all duration-500 ${isHovered ? 'border-primary/30 shadow-[0_0_15px_rgba(142,53,239,0.3)]' : ''}`}></div>
    </div>
  );
});

export default ServiceCard;
