import { useRef, useState, useEffect, FormEvent } from "react";
import gsap from "gsap";
import { useGSAP, useMagneticElement } from "@/hooks/useGSAP";
import { Mail, MapPin, Phone, Send, ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useMagneticElement({ strength: 0.2, ease: 0.3 });
  
  const headingRef = useGSAP('.contact-heading', {
    scrollTrigger: true,
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
            toggleActions: "play none none none" // only plays once
          }
        }
      );
      
      // Create floating animation for background elements
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
      
      // Create hover effect for form inputs without repeated animations
      const formElements = contactRef.current.querySelectorAll('.form-element');
      
      formElements.forEach((el) => {
        let isAnimating = false;
        
        el.addEventListener('mouseenter', () => {
          if (isAnimating) return;
          isAnimating = true;
          
          gsap.to(el, {
            y: -5,
            scale: 1.02,
            boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              isAnimating = false;
            }
          });
        });
        
        el.addEventListener('mouseleave', () => {
          if (isAnimating) return;
          isAnimating = true;
          
          gsap.to(el, {
            y: 0,
            scale: 1,
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              isAnimating = false;
            }
          });
        });
      });
    }, contactRef);
    
    return () => ctx.revert();
  }, []);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully!", {
        description: "I'll get back to you as soon as possible.",
        position: "top-center"
      });
      
      // Animate form submission success
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 0 },
          {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
              setName("");
              setEmail("");
              setMessage("");
              setIsSubmitting(false);
              
              // Reset and show form again
              gsap.fromTo(
                formRef.current!,
                { y: 20, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power3.out",
                  delay: 0.2
                }
              );
            }
          }
        );
      }
    }, 1500);
  };
  
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
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="glass-card p-8 relative overflow-hidden"
            >
              {/* Decorative circles */}
              <div className="absolute w-32 h-32 rounded-full bg-primary/5 -top-16 -left-16"></div>
              <div className="absolute w-24 h-24 rounded-full bg-secondary/5 -bottom-12 -right-12"></div>
              
              <div className="mb-6 relative form-element">
                <label 
                  htmlFor="name" 
                  className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                    focusedInput === 'name' ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  Your Name
                </label>
                <div className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  focusedInput === 'name' ? 'ring-2 ring-primary/20' : ''
                }`}>
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="John Doe"
                  />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-300 ${
                    focusedInput === 'name' ? 'scale-x-100' : 'scale-x-0'
                  }`}></span>
                </div>
              </div>
              
              <div className="mb-6 relative form-element">
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                    focusedInput === 'email' ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  Email Address
                </label>
                <div className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  focusedInput === 'email' ? 'ring-2 ring-primary/20' : ''
                }`}>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="john@example.com"
                  />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-300 ${
                    focusedInput === 'email' ? 'scale-x-100' : 'scale-x-0'
                  }`}></span>
                </div>
              </div>
              
              <div className="mb-8 relative form-element">
                <label 
                  htmlFor="message" 
                  className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                    focusedInput === 'message' ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  Your Message
                </label>
                <div className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  focusedInput === 'message' ? 'ring-2 ring-primary/20' : ''
                }`}>
                  <textarea 
                    id="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusedInput('message')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all resize-none bg-white/50 backdrop-blur-sm"
                    placeholder="Tell me about your project or inquiry..."
                  ></textarea>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-300 ${
                    focusedInput === 'message' ? 'scale-x-100' : 'scale-x-0'
                  }`}></span>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full relative overflow-hidden group h-14 rounded-full bg-gradient-to-r from-primary via-purple-500 to-secondary text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 interactive"
                disabled={isSubmitting}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Message <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </button>
            </form>
          </div>
          
          <div className="lg:col-span-2 flex flex-col gap-8 contact-item">
            <div className="glass-card p-8 relative overflow-hidden">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="inline-block w-1.5 h-6 bg-primary rounded-full"></span>
                Contact Details
              </h3>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Email</h4>
                    <a 
                      href="mailto:hello@example.com" 
                      className="text-muted-foreground hover:text-primary transition-colors group flex items-center gap-1"
                    >
                      hello@example.com
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Phone</h4>
                    <a 
                      href="tel:+1234567890" 
                      className="text-muted-foreground hover:text-secondary transition-colors group flex items-center gap-1"
                    >
                      +1 (234) 567-890
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Location</h4>
                    <p className="text-muted-foreground">
                      San Francisco, California
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 relative overflow-hidden">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="inline-block w-1.5 h-6 bg-primary rounded-full"></span>
                Connect With Me
              </h3>
              
              <p className="text-muted-foreground mb-8">
                Follow me on social media to see more of my work and get in touch.
              </p>
              
              <div ref={socialRef} className="flex flex-wrap justify-center gap-6">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300 interactive"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/80))' }}
                >
                  <Github size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300 interactive"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--secondary)/80))' }}
                >
                  <Linkedin size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                </a>
                
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300 interactive"
                  style={{ background: 'linear-gradient(135deg, #1DA1F2, #19608F)' }}
                >
                  <Twitter size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                </a>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300 interactive"
                  style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
                >
                  <Instagram size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

