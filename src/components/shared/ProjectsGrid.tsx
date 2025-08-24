import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import ProjectCard from "@/components/ui/ProjectCard";
import { ProjectType, ServiceType, filterOptions } from "@/data/projects";
import { Code, Filter, Github, Layout, Layers } from "lucide-react";
import ProjectModal from "@/components/shared/ProjectModal";

type ItemType = ProjectType | ServiceType;

type ProjectsGridProps = {
  data: ItemType[];
  showViewMore?: boolean;
  headingComponent?: React.ReactNode;
  CardComponent: React.ComponentType<any>; // Use any to simplify for now
  filterOptions?: string[];
  viewMoreLink?: string; // New prop for custom link
  viewMoreText?: string; // New prop for custom text
};

const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  data,
  showViewMore = true,
  headingComponent,
  CardComponent,
  filterOptions: propFilterOptions, // Renamed to avoid conflict with local const
  viewMoreLink = "https://github.com", // Default to GitHub
  viewMoreText = "View More on GitHub", // Default text
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredData, setFilteredData] = useState<ItemType[]>(data || []);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const projectsGridRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Handle project card click to open modal
  const handleProjectCardClick = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Filter data when activeFilter changes or data changes
  useEffect(() => {
    if (!data) {
      setFilteredData([]);
      return;
    }

    if (activeFilter === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => 
        item.tags.includes(activeFilter)
      );
      setFilteredData(filtered);
    }
    
    // Animate the filtered results
    if (projectsGridRef.current) {
      const cards = projectsGridRef.current.querySelectorAll('.project-card');
      
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
  }, [activeFilter, data]);

  // Animate filter buttons
  useEffect(() => {
    if (!filtersRef.current || !propFilterOptions) return;
    
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
          once: true,
        }
      }
    );
  }, [propFilterOptions]);

  const currentFilterOptions = propFilterOptions || [];

  return (
    <>
      {headingComponent}

      {currentFilterOptions.length > 0 && (
        <div 
          ref={filtersRef}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {currentFilterOptions.map((filter) => (
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
      )}
      
      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={projectsGridRef}>
        {filteredData.map((item, index) => (
          <div key={item.id} className="project-card">
            {CardComponent === ProjectCard ? (
              <CardComponent 
                project={item as ProjectType} 
                index={index} 
                onClick={handleProjectCardClick} 
              />
            ) : (
              <CardComponent 
                service={item as ServiceType} 
                index={index} 
              />
            )}
          </div>
        ))}
      </div>
      
      {showViewMore && (
        <div className="mt-16 text-center">
          <a 
            href={viewMoreLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-primary to-primary/70 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group interactive"
          >
            
            {viewMoreText}
          </a>
        </div>
      )}

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsGrid; 