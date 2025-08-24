import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/shared/ContactForm";
import ContactInfo from "@/components/shared/ContactInfo";
import SocialLinks from "@/components/shared/SocialLinks";
import FloatingBackgroundBlobs from "@/components/shared/FloatingBackgroundBlobs";
import { Mail } from "lucide-react";
import { useRef, useEffect } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import SeoHead from '@/components/seo/SeoHead'; // Import SeoHead

const HireMePage = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const hireMePageRef = useRef<HTMLDivElement>(null);
  useGSAP('.hire-me-heading', {
    scrollTrigger: {
      trigger: headingRef.current,
      start: "top 80%",
      once: true,
    },
    animation: "creative"
  });

  // Floating blobs for Hire Me page - REMOVED, now using generic FloatingBackgroundBlobs
  useEffect(() => {
    if (!hireMePageRef.current) return;

    const ctx = gsap.context(() => {
      // Any specific animations for Hire Me Page can go here.
      // General blobs are now handled by FloatingBackgroundBlobs.
    }, hireMePageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" ref={hireMePageRef}>
      {/* Background decorative elements with blobs - NOW USING GENERIC COMPONENT */}
      <FloatingBackgroundBlobs />

      <Navbar />
      <main className="flex-grow container-section py-16 relative z-10">
        <div className="text-center mb-16" ref={headingRef}>
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
            <Mail size={16} className="text-primary" />
            <span className="text-sm font-medium">Get In Touch</span>
          </div>
          
          <h1 className="hire-me-heading heading-lg mb-6">
            Let's Create <span className="text-gradient">Something Amazing</span> Together
          </h1>
          
          <p className="subheading max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential collaboration? I'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ContactInfo />
            <SocialLinks />
          </div>
        </div>
      </main>
      <Footer />
      <SeoHead
        title="Hire Me | Paulo L. Abaquita - Collaborate on Your Next Project"
        description="Ready to start a project? Contact Paulo L. Abaquita for expert frontend development and a collaborative partnership to bring your digital vision to life."
        path="/hire"
      />
    </div>
  );
};

export default HireMePage; 