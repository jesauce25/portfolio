
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import ProjectCard, { ProjectType } from "@/components/ui/ProjectCard";

const projects: ProjectType[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A responsive e-commerce platform with modern UI, animations, and a seamless checkout process.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2070",
    tags: ["React", "Tailwind CSS", "GSAP", "Commerce.js"],
    link: "#",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A creative portfolio website with smooth scrolling, interactive elements, and dynamic content.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=2069",
    tags: ["React", "GSAP", "Three.js", "Tailwind CSS"],
    link: "#",
  },
  {
    id: 3,
    title: "Real Estate Dashboard",
    description: "An intuitive dashboard for real estate agents to manage listings and client interactions.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2073",
    tags: ["React", "TypeScript", "Chart.js", "Firebase"],
    link: "#",
  },
  {
    id: 4,
    title: "Travel & Booking App",
    description: "A feature-rich travel application allowing users to search, book, and review travel destinations.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070",
    tags: ["React", "Node.js", "MongoDB", "Mapbox"],
    link: "#",
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    description: "A comprehensive fitness tracking application with progress visualization and workout planning.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2070",
    tags: ["React Native", "Redux", "Firebase", "SVG Charts"],
    link: "#",
  },
  {
    id: 6,
    title: "Restaurant Website",
    description: "An elegant restaurant website with menu showcase, reservation system, and location mapping.",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=2069",
    tags: ["React", "Framer Motion", "Styled Components", "Firebase"],
    link: "#",
  },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const projectsRef = useRef<HTMLDivElement>(null);
  const headingRef = useGSAP('.projects-heading', {
    scrollTrigger: true,
    animateFrom: { y: 50, opacity: 0 },
    animateTo: { y: 0, opacity: 1 },
  });
  
  useEffect(() => {
    if (!projectsRef.current) return;
    
    const ctx = gsap.context(() => {
      // Animate project cards
      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, projectsRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      id="projects" 
      ref={projectsRef}
      className="py-32"
    >
      <div className="container-section">
        <div className="text-center mb-16" ref={headingRef}>
          <span className="inline-block mb-4 text-sm font-medium uppercase tracking-wider text-primary/70">Portfolio</span>
          <h2 className="projects-heading heading-lg mb-6">Featured Projects</h2>
          <p className="subheading max-w-2xl mx-auto">
            Explore my recent work across various industries and technologies.
          </p>
        </div>
        
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
