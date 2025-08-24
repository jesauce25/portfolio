import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsGrid from "@/components/shared/ProjectsGrid";
import FloatingBackgroundBlobs from "@/components/shared/FloatingBackgroundBlobs";
import { projects, filterOptions } from "@/data/projects";
import { Code } from "lucide-react";
import { useRef, useEffect } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import ProjectCard from "@/components/ui/ProjectCard";
import SeoHead from '@/components/seo/SeoHead'; // Import SeoHead

const ProjectsPage = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsPageRef = useRef<HTMLDivElement>(null);
  useGSAP('.projects-heading-page', {
    scrollTrigger: {
      trigger: headingRef.current,
      start: "top 80%",
      toggleActions: "play none none none", 
      once: true,
    },
    animation: "creative"
  });

  // Floating blobs for Projects page - REMOVED, now using generic FloatingBackgroundBlobs
  useEffect(() => {
    if (!projectsPageRef.current) return;

    const ctx = gsap.context(() => {
      // Any specific animations for Projects Page can go here.
      // General blobs are now handled by FloatingBackgroundBlobs.
    }, projectsPageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" ref={projectsPageRef}>
      {/* Background decorative elements with blobs - NOW USING GENERIC COMPONENT */}
      <FloatingBackgroundBlobs />

      <Navbar />
      <main className="flex-grow container-section py-16 relative z-10">
        <div className="text-center mb-16" ref={headingRef}>
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
            <Code size={16} className="text-primary" />
            <span className="text-sm font-medium">Creative Showcase</span>
          </div>
          <h1 className="projects-heading-page heading-lg mb-6 gradient-text inline-block">
            My Creative Works
          </h1>
          <p className="subheading max-w-2xl mx-auto">
            Explore my portfolio of immersive, interactive projects that push the boundaries of web experiences.
          </p>
        </div>
        <ProjectsGrid
          data={projects}
          showViewMore={true}
          headingComponent={null}
          CardComponent={ProjectCard}
          filterOptions={filterOptions}
          viewMoreText="My projects speak for my skills—now let’s build yours."
          viewMoreLink="/hire"
        />
      </main>
      <Footer />
      <SeoHead
        title="Projects | Paulo L. Abaquita - Web Development Portfolio"
        description="View the diverse web development projects by Paulo L. Abaquita, showcasing expertise in modern design, interactive animations, and robust functionality."
        path="/projects"
      />
    </div>
  );
};

export default ProjectsPage; 