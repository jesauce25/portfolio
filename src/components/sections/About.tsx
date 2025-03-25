
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { Code, Layout, Sparkles } from "lucide-react";

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const headingRef = useGSAP('.about-heading', {
    scrollTrigger: true,
    animateFrom: { y: 50, opacity: 0 },
    animateTo: { y: 0, opacity: 1 },
  });
  
  useEffect(() => {
    if (!aboutRef.current) return;
    
    const ctx = gsap.context(() => {
      // Animate the image reveal
      gsap.fromTo(
        '.about-image-container',
        { clipPath: 'inset(100% 0 0 0)' },
        { 
          clipPath: 'inset(0% 0 0 0)', 
          duration: 1.2, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: '.about-image-container',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Parallax effect on image
      gsap.fromTo(
        '.about-image',
        { y: 50 },
        { 
          y: -50, 
          ease: "none",
          scrollTrigger: {
            trigger: '.about-image-container',
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
      
      // Animate skill cards
      gsap.fromTo(
        '.skill-card',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.skills-container',
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, aboutRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="py-32 bg-secondary/50"
    >
      <div className="container-section">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 order-2 md:order-1" ref={headingRef}>
            <span className="inline-block mb-4 text-sm font-medium uppercase tracking-wider text-primary/70">About Me</span>
            <h2 className="about-heading heading-lg mb-6">
              Passionate about creating functional & beautiful experiences
            </h2>
            <p className="text-muted-foreground mb-6">
              I'm a front-end developer with a passion for creating intuitive, 
              user-friendly web experiences. With a strong foundation in modern 
              web technologies and a keen eye for design, I bridge the gap between 
              visual aesthetics and technical functionality.
            </p>
            <p className="text-muted-foreground mb-10">
              My approach combines clean code, creative problem-solving, and 
              attention to detail to create websites that not only look great 
              but perform exceptionally well. I'm constantly exploring new 
              technologies and techniques to enhance my skills and deliver
              the best possible results.
            </p>
            <a href="#contact" className="btn-primary">
              Let's Connect
            </a>
          </div>
          
          <div className="flex-1 order-1 md:order-2 perspective">
            <div className="about-image-container rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072" 
                alt="Developer working on code" 
                className="about-image w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-32">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-sm font-medium uppercase tracking-wider text-primary/70">Expertise</span>
            <h2 className="heading-md mb-6">What I Do</h2>
            <p className="subheading max-w-2xl mx-auto">
              I specialize in creating engaging digital experiences with modern web technologies.
            </p>
          </div>
          
          <div className="skills-container grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="skill-card glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Layout size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">UI/UX Development</h3>
              <p className="text-muted-foreground">
                Creating beautiful, intuitive interfaces that provide exceptional user experiences across all devices.
              </p>
            </div>
            
            <div className="skill-card glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Code size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Modern Web Development</h3>
              <p className="text-muted-foreground">
                Building responsive websites with React, TypeScript, and modern CSS frameworks like Tailwind.
              </p>
            </div>
            
            <div className="skill-card glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interactive Animations</h3>
              <p className="text-muted-foreground">
                Creating engaging motion and interactions using GSAP and CSS animations to enhance user engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
