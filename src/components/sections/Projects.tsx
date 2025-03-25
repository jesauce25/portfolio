
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import ProjectCard, { ProjectType } from "@/components/ui/ProjectCard";
import { Code, Filter, Github, Layout, Layers } from "lucide-react";

const projects: ProjectType[] = [
  {
    id: 1,
    title: "Morphing E-Commerce",
    description: "An e-commerce platform with dynamic morphing transitions between product views and smooth checkout experience.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2070",
    tags: ["React", "GSAP", "Framer Motion", "Stripe"],
    link: "#",
    github: "https://github.com",
  },
  {
    id: 2,
    title: "Immersive Portfolio",
    description: "A WebGL-powered immersive portfolio with 3D elements, particle effects and interactive storytelling.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=2069",
    tags: ["React", "Three.js", "GSAP", "WebGL"],
    link: "#",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Real Estate Visualizer",
    description: "Interactive 3D visualization tool for real estate with AR features and advanced filtering capabilities.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2073",
    tags: ["React", "Three.js", "AR.js", "Firebase"],
    link: "#",
  },
  {
    id: 4,
    title: "Adventure Mapper",
    description: "Travel planning app with animated route visualization, 3D landmarks and immersive destination previews.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070",
    tags: ["React", "MapboxGL", "GSAP", "NodeJS"],
    link: "#",
    github: "https://github.com",
  },
  {
    id: 5,
    title: "Fitness Journey",
    description: "Gamified fitness app with motion tracking, progress visualization and interactive challenges.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2070",
    tags: ["React Native", "TensorFlow.js", "SVG Animations"],
    link: "#",
  },
  {
    id: 6,
    title: "Culinary Experience",
    description: "Interactive restaurant platform with 3D dish previews, ingredient animations and immersive storytelling.",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=2069",
    tags: ["React", "Three.js", "Framer Motion", "Strapi"],
    link: "#",
    github: "https://github.com",
  },
];

const filterOptions = ["All", "React", "Three.js", "GSAP", "WebGL", "Firebase"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  
  const projectsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const headingRef = useGSAP('.projects-heading', {
    scrollTrigger: true,
    animateFrom: { y: 50, opacity: 0 },
    animateTo: { y: 0, opacity: 1 },
  });
  
  // Filter projects when activeFilter changes
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.tags.includes(activeFilter)
      );
      setFilteredProjects(filtered);
    }
    
    // Animate the filtered results
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeFilter]);
  
  // Animate filter buttons
  useEffect(() => {
    if (!filtersRef.current) return;
    
    const buttons = filtersRef.current.querySelectorAll('button');
    
    gsap.fromTo(
      buttons,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: filtersRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);
  
  // Main animations
  useEffect(() => {
    if (!projectsRef.current) return;
    
    const ctx = gsap.context(() => {
      // Background elements animation
      const bgElements = projectsRef.current?.querySelectorAll('.bg-shape');
      
      if (bgElements) {
        gsap.fromTo(
          bgElements,
          { opacity: 0, scale: 0.8, rotation: -10 },
          { 
            opacity: 0.8, 
            scale: 1, 
            rotation: 0,
            duration: 1, 
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 80%",
            }
          }
        );
        
        // Subtle floating animation for background shapes
        bgElements.forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? "20px" : "-20px",
            rotation: i % 2 === 0 ? 5 : -5,
            repeat: -1,
            yoyo: true,
            duration: 3 + i,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }
    }, projectsRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      id="projects" 
      ref={projectsRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-shape absolute top-[10%] right-[5%] h-64 w-64 rounded-full bg-primary/5 opacity-0"></div>
        <div className="bg-shape absolute bottom-[15%] left-[8%] h-80 w-80 rounded-full bg-secondary/5 opacity-0"></div>
        <div className="bg-shape absolute top-[30%] left-[15%] h-40 w-40 rounded-full bg-accent/5 opacity-0"></div>
        <div className="bg-shape absolute bottom-[30%] right-[10%] h-56 w-56 rounded-full bg-primary/5 opacity-0"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="text-center mb-16" ref={headingRef}>
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
            <Code size={16} className="text-primary" />
            <span className="text-sm font-medium">Creative Showcase</span>
          </div>
          
          <h2 className="projects-heading heading-lg mb-6 gradient-text inline-block">
            My Creative Works
          </h2>
          
          <p className="subheading max-w-2xl mx-auto">
            Explore my portfolio of immersive, interactive projects that push the boundaries of web experiences.
          </p>
        </div>
        
        {/* Filter buttons */}
        <div 
          ref={filtersRef}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              onMouseEnter={() => setHoveredFilter(filter)}
              onMouseLeave={() => setHoveredFilter(null)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                activeFilter === filter 
                  ? 'text-white shadow-lg' 
                  : 'text-foreground/70 hover:text-foreground'
              } interactive`}
            >
              {/* Background that changes color based on active state */}
              <span 
                className={`absolute inset-0 transition-all duration-300 ${
                  activeFilter === filter
                    ? 'opacity-100'
                    : hoveredFilter === filter
                      ? 'opacity-20'
                      : 'opacity-0'
                }`}
                style={{
                  background: filter === "All" 
                    ? 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))' 
                    : `hsl(var(--${filter === "React" ? 'primary' : filter === "Three.js" ? 'secondary' : 'accent'}))`
                }}
              ></span>
              
              {/* Filter icon */}
              <span className="relative z-10 flex items-center gap-2">
                {filter === "All" && <Layers size={14} />}
                {filter === "React" && (
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                )}
                {filter === "Three.js" && <Layout size={14} />}
                {filter === "GSAP" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3L4 9v12h16V9l-8-6z"/></svg>}
                {filter === "WebGL" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>}
                {filter === "Firebase" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"></path><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"></path><path d="M15 2v5h5"></path></svg>}
                {filter}
              </span>
            </button>
          ))}
        </div>
        
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
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
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-primary to-primary/70 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group interactive"
          >
            <Github size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
