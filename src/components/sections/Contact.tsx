
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import ContactForm from "@/components/shared/ContactForm";
import ContactInfo from "@/components/shared/ContactInfo";
import SocialLinks from "@/components/shared/SocialLinks";
import { Mail } from "lucide-react";

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const headingRef = useGSAP('.contact-heading', {
    scrollTrigger: {
      trigger: '.contact-heading',
      start: "top 80%",
      once: true
    },
    animation: "creative"
  });

  useEffect(() => {
    if (!contactRef.current) return;
    
    const ctx = gsap.context(() => {
      // Animate contact form and info - only trigger once per element
      gsap.fromTo(
        '.contact-item',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.contact-container',
            start: "top 80%",
            toggleActions: "play none none none", 
            once: true 
          }
        }
      );
      
      // Create floating animation for background elements - runs continuously
      const bgElements = contactRef.current.querySelectorAll('.bg-element');
      
      bgElements.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? 30 : -30,
          rotation: i % 2 === 0 ? 15 : -15,
          repeat: -1,
          yoyo: true,
          duration: 8 + i,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
      
      // Create hover effect for form inputs - handled within ContactForm now.
    }, contactRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={contactRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-element absolute h-96 w-96 rounded-full bg-primary/5 -bottom-48 -left-48 opacity-80"></div>
        <div className="bg-element absolute h-64 w-64 rounded-full bg-secondary/5 top-20 -right-32 opacity-60"></div>
        <div className="bg-element absolute h-80 w-80 rounded-full bg-accent/5 bottom-[5%] left-[20%] opacity-70"></div>
        <div className="bg-element absolute h-52 w-52 rounded-full bg-primary/5 top-[10%] left-[30%] opacity-50"></div>
      </div>
      
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none z-0"></div>
      
      <div className="container-section relative z-10">
        <div className="text-center mb-16" ref={headingRef}>
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
            <Mail size={16} className="text-primary" />
            <span className="text-sm font-medium">Get In Touch</span>
          </div>
          
          <h2 className="contact-heading heading-lg mb-6">
            Let's Create <span className="text-gradient">Something Amazing</span> Together
          </h2>
          
          <p className="subheading max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential collaboration? I'd love to hear from you.
          </p>
        </div>
        
        <div className="contact-container grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          <div className="lg:col-span-3 contact-item">
            <ContactForm />
          </div>
          
          <div className="lg:col-span-2 flex flex-col gap-8 contact-item">
            <ContactInfo />
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
