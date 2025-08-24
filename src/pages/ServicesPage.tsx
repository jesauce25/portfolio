import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsGrid from "@/components/shared/ProjectsGrid";
import FloatingBackgroundBlobs from "@/components/shared/FloatingBackgroundBlobs";
import { services } from "@/data/services";
import ServiceCard from "@/components/ui/ServiceCard";
import { Rocket } from "lucide-react";
import { useRef, useEffect } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import SeoHead from '@/components/seo/SeoHead'; // Import SeoHead
import ProjectCard from "@/components/ui/ProjectCard";

const ServicesPage = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesPageRef = useRef<HTMLDivElement>(null);
  useGSAP('.services-heading-page', {
    scrollTrigger: {
      trigger: headingRef.current,
      start: "top 80%",
      toggleActions: "play none none none", 
      once: true,
    },
    animation: "creative"
  });

  useEffect(() => {
    if (!servicesPageRef.current) return;

    const ctx = gsap.context(() => {
      // Any specific animations for Services Page can go here.
    }, servicesPageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" ref={servicesPageRef}>
      <FloatingBackgroundBlobs />

      <Navbar />
      <main className="flex-grow container-section py-16 relative z-10">
        <div className="text-center mb-16" ref={headingRef}>
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
            <Rocket size={16} className="text-primary" />
            <span className="text-sm font-medium">My Offerings</span>
          </div>
          <h1 className="services-heading-page heading-lg mb-6 gradient-text inline-block">
            Services I Provide
          </h1>
          <p className="subheading max-w-2xl mx-auto">
          Here are our services designed to solve every challenge your business faces and elevate your online presence.
          </p>
        </div>
        <ProjectsGrid
          data={services}
          showViewMore={false} 
          headingComponent={null}
          CardComponent={ProjectCard}
          filterOptions={["All", "Website", "E-Commerce", "Portfolio", "Business" ,"SEO", "Security","Hosting & Domain", "Maintenance", "Video Editing", "Ads", "Branding", "Image Enhancement","Illustration","Logo","Poster","Product Design","Storyboard"]}
        />
      </main>
      <Footer />
      <SeoHead
        title="Services | Paulo L. Abaquita - Web Development & Digital Solutions"
        description="Explore the comprehensive web development and digital solutions offered by Paulo L. Abaquita, including custom web design, e-commerce, and interactive experiences."
        path="/services"
      />
    </div>
  );
};

export default ServicesPage;
