
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, ExternalLink, Github, MessageCircle } from "lucide-react";

export type ProjectType = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
};

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Advanced hover effects with GSAP
  useEffect(() => {
    if (!cardRef.current || !imageRef.current || !contentRef.current) return;
    
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    
    // Create hover animation
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      
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
      
      // Move image for parallax effect
      gsap.to(image, {
        x: xPercent * 20,
        y: yPercent * 20,
        scale: 1.1,
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
      
      setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
      // Reset all animations
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.out"
      });
      
      gsap.to(image, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });
      
      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      });
      
      const highlight = card.querySelector('.card-highlight');
      if (highlight) {
        gsap.to(highlight, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }
      
      setIsHovered(false);
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('touchstart', () => setIsHovered(true), { passive: true });
    card.addEventListener('touchend', () => setIsHovered(false), { passive: true });
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('touchstart', () => setIsHovered(true));
      card.removeEventListener('touchend', () => setIsHovered(false));
    };
  }, []);
  
  // Entrance animation
  useEffect(() => {
    if (!cardRef.current) return;
    
    gsap.fromTo(
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
        delay: index * 0.1 + 0.2,
        ease: "power3.out"
      }
    );
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className="group glass-card overflow-hidden will-change-transform transition-all duration-300 h-full flex flex-col interactive"
    >
      {/* Highlight effect div */}
      <div className="card-highlight absolute w-[150px] h-[150px] rounded-full bg-white blur-3xl opacity-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="relative overflow-hidden h-64">
        <div 
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        {/* Animated project tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {project.tags.map((tag, i) => (
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
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 flex-1">
          {project.description}
        </p>
        
        <div className="flex items-center gap-3">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View Live <ExternalLink size={16} />
          </a>
          
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 font-semibold text-foreground/70 hover:text-foreground transition-colors"
            >
              <Github size={16} />
            </a>
          )}
          
          <div className="ml-auto">
            <span 
              className={`w-3 h-3 rounded-full inline-block ${index % 3 === 0 ? 'bg-primary' : index % 3 === 1 ? 'bg-secondary' : 'bg-accent'}`}
            ></span>
          </div>
        </div>
      </div>
      
      {/* Glowing border effect on hover */}
      <div className={`absolute inset-0 border-2 border-transparent rounded-[20px] transition-all duration-500 ${isHovered ? 'border-primary/30 shadow-[0_0_15px_rgba(142,53,239,0.3)]' : ''}`}></div>
    </div>
  );
};

export default ProjectCard;
