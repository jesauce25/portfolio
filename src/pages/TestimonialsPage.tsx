import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingBackgroundBlobs from "@/components/shared/FloatingBackgroundBlobs";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { MessageCircle } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SeoHead from '@/components/seo/SeoHead';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsPage = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate heading
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate testimonial cards
    gsap.from(".testimonial-card-item", {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <FloatingBackgroundBlobs />
      <Navbar />
      <main className="flex-grow container-section py-16 relative z-10">
        <div className="text-center mb-16" ref={headingRef}>
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
            <MessageCircle size={16} className="text-primary" />
            <span className="text-sm font-medium">Client Love</span>
          </div>
          <h1 className="heading-lg mb-6 gradient-text inline-block">
            What Clients Say
          </h1>
          <p className="subheading max-w-2xl mx-auto">
            Hear directly from those who have experienced the impact of our work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card-item">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <SeoHead
        title="Testimonials | Paulo L. Abaquita - Client Success Stories"
        description="Read testimonials from satisfied clients of Paulo L. Abaquita, highlighting successful web development projects and positive business partnerships."
        path="/testimonials"
      />
    </div>
  );
};

export default TestimonialsPage;
