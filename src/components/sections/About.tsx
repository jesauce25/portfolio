
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP, useMagneticElement } from "@/hooks/useGSAP";
import { Code, Layout, Sparkles, Terminal, Zap, Monitor, Smile } from "lucide-react";

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useMagneticElement({ strength: 0.15 });
  const headingRef = useGSAP('.about-heading', {
    scrollTrigger: true,
    animation: "creative"
  });
  
  const [activeTab, setActiveTab] = useState(0);
  const tabContentRef = useRef<HTMLDivElement>(null);
  
  const skills = [
    {
      category: "Frontend",
      items: ["React", "Vue", "Next.js", "JavaScript", "TypeScript", "CSS/SCSS", "Tailwind CSS"]
    },
    {
      category: "Design & Animation",
      items: ["GSAP", "Framer Motion", "Three.js", "Figma", "CSS Animations", "SVG Animation"]
    },
    {
      category: "Backend & Tools",
      items: ["Node.js", "Express", "Firebase", "Git", "Jest", "Webpack/Vite", "CI/CD"]
    }
  ];
  
  useEffect(() => {
    if (!aboutRef.current) return;
    
    const ctx = gsap.context(() => {
      // Register ScrollTrigger
      ScrollTrigger.refresh();
      
      // Animate the image reveal with mask effect
      const imageReveal = aboutRef.current.querySelector('.image-reveal');
      const image = aboutRef.current.querySelector('.about-image');
      
      if (imageReveal && image) {
        gsap.fromTo(
          imageReveal,
          { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
          { 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 
            duration: 1.2, 
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: imageReveal,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none"
            }
          }
        );
        
        // Parallax effect on image
        gsap.fromTo(
          image,
          { scale: 1.2, rotation: -5 },
          { 
            scale: 1, 
            rotation: 0,
            ease: "power2.out",
            duration: 1.4,
            scrollTrigger: {
              trigger: imageReveal,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none"
            }
          }
        );
      }
      
      // Animate skill cards
      const skillCards = aboutRef.current.querySelectorAll('.skill-card');
      
      gsap.fromTo(
        skillCards,
        { y: 60, opacity: 0, rotationY: 15, transformPerspective: 600 },
        { 
          y: 0, 
          opacity: 1, 
          rotationY: 0,
          stagger: 0.15,
          duration: 0.8, 
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: '.skills-container',
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Code snippets typing effect
      const codeLines = aboutRef.current.querySelectorAll('.code-line');
      
      codeLines.forEach((line, index) => {
        gsap.fromTo(
          line,
          { width: 0, opacity: 0 },
          {
            width: "100%",
            opacity: 1,
            duration: 0.6,
            delay: 0.5 + index * 0.2,
            ease: "steps(30)",
            scrollTrigger: {
              trigger: '.about-code',
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });
      
      // Floating particles effect
      const particles = aboutRef.current.querySelectorAll('.particle');
      
      particles.forEach((particle, index) => {
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = (Math.random() - 0.5) * 40;
        const randomDuration = 10 + Math.random() * 20;
        const randomDelay = Math.random() * 2;
        
        gsap.set(particle, {
          x: randomX,
          y: randomY,
          opacity: 0.2 + Math.random() * 0.5,
          scale: 0.5 + Math.random() * 0.5
        });
        
        gsap.to(particle, {
          x: randomX * -1,
          y: randomY * -1,
          repeat: -1,
          yoyo: true,
          duration: randomDuration,
          delay: randomDelay,
          ease: "sine.inOut"
        });
      });
    }, aboutRef);
    
    return () => ctx.revert();
  }, []);
  
  // Handle tab switching animation
  useEffect(() => {
    if (!tabContentRef.current) return;
    
    const tabPanels = tabContentRef.current.querySelectorAll('.tab-panel');
    
    gsap.fromTo(
      tabPanels[activeTab],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeTab]);
  
  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 z-0">
        <div className="col-span-2 row-span-1 bg-primary/[0.02] backdrop-blur-3xl"></div>
        <div className="col-span-3 row-span-2 col-start-10 row-start-2 bg-secondary/[0.02] backdrop-blur-3xl"></div>
        <div className="col-span-2 row-span-1 col-start-2 row-start-5 bg-accent/[0.02] backdrop-blur-3xl"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, index) => (
          <div 
            key={index}
            className="particle absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="container-section relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 order-2 lg:order-1" ref={headingRef}>
            <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
              <Terminal size={16} className="text-primary" />
              <span className="text-sm font-medium">About Me</span>
            </div>
            
            <h2 className="about-heading heading-lg mb-6">
              Crafting <span className="text-gradient">digital experiences</span> with code & creativity
            </h2>
            
            <p className="text-muted-foreground mb-6 text-lg">
              I'm a creative frontend developer with a passion for building immersive digital experiences. Combining technical expertise with an eye for design, I transform ideas into interactive realities.
            </p>
            
            <div className="mb-10 space-y-6">
              {/* Tabs navigation */}
              <div className="flex flex-wrap gap-4 mb-6">
                {["My Journey", "My Approach", "My Toolkit"].map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      activeTab === index 
                        ? 'bg-primary text-white' 
                        : 'bg-primary/10 hover:bg-primary/20'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Tab content */}
              <div ref={tabContentRef} className="relative min-h-[120px]">
                <div className={`tab-panel absolute inset-0 ${activeTab === 0 ? 'block' : 'hidden'}`}>
                  <p className="text-muted-foreground">
                    My journey began with curiosity about how websites work. After studying web development, I've worked on numerous projects across various industries, continuously refining my craft and exploring new technologies to create better user experiences.
                  </p>
                </div>
                
                <div className={`tab-panel absolute inset-0 ${activeTab === 1 ? 'block' : 'hidden'}`}>
                  <p className="text-muted-foreground">
                    I believe in a holistic approach to frontend development - one that balances aesthetics, performance, and accessibility. My process involves deep collaboration, iterative refinement, and attention to the smallest details that make experiences feel magical.
                  </p>
                </div>
                
                <div className={`tab-panel absolute inset-0 ${activeTab === 2 ? 'block' : 'hidden'}`}>
                  <p className="text-muted-foreground">
                    My toolkit constantly evolves, but currently includes React, TypeScript, GSAP, Framer Motion, and Three.js. I'm proficient with modern CSS approaches like Tailwind, and always exploring new tools that can elevate my work.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary">
                Let's Connect
              </a>
              
              <a href="#projects" className="btn-secondary">
                See My Work
              </a>
            </div>
          </div>
          
          <div className="flex-1 order-1 lg:order-2" ref={imageBoxRef}>
            <div className="image-reveal rounded-2xl overflow-hidden">
              <div className="about-image relative w-full overflow-hidden rounded-2xl transform transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072" 
                  alt="Developer working on code" 
                  className="w-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 mix-blend-overlay"></div>
                
                {/* Code overlay */}
                <div className="about-code absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center p-8 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="code-panel font-mono text-xs md:text-sm text-white/90 overflow-hidden">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <div className="flex-1 text-center">
                        <span className="text-xs text-white/60">developer.js</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="code-line overflow-hidden whitespace-nowrap">
                        <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {"{"}
                      </div>
                      <div className="code-line overflow-hidden whitespace-nowrap pl-4">
                        <span className="text-green-400">passion:</span> <span className="text-yellow-400">'Creating engaging experiences'</span>,
                      </div>
                      <div className="code-line overflow-hidden whitespace-nowrap pl-4">
                        <span className="text-green-400">skills:</span> [<span className="text-yellow-400">'React'</span>, <span className="text-yellow-400">'GSAP'</span>, <span className="text-yellow-400">'Three.js'</span>],
                      </div>
                      <div className="code-line overflow-hidden whitespace-nowrap pl-4">
                        <span className="text-green-400">approach:</span> <span className="text-yellow-400">'Creative problem-solving'</span>,
                      </div>
                      <div className="code-line overflow-hidden whitespace-nowrap pl-4">
                        <span className="text-purple-400">createMagic:</span> () {"=>"} {"{"}
                      </div>
                      <div className="code-line overflow-hidden whitespace-nowrap pl-8">
                        <span className="text-purple-400">return</span> <span className="text-yellow-400">'✨ Exceptional experiences ✨'</span>;
                      </div>
                      <div className="code-line overflow-hidden whitespace-nowrap pl-4">
                        {"}"}
                      </div>
                      <div className="code-line overflow-hidden whitespace-nowrap">
                        {"}"};
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-secondary/10">
              <Zap size={16} className="text-secondary" />
              <span className="text-sm font-medium">My Expertise</span>
            </div>
            <h2 className="heading-md mb-6">What I <span className="text-gradient">Do</span></h2>
            <p className="subheading max-w-2xl mx-auto">
              I specialize in creating engaging web experiences with attention to detail and cutting-edge technologies.
            </p>
          </div>
          
          <div className="skills-container grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="skill-card glass-card p-8 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Layout size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">UI/UX Development</h3>
              <p className="text-muted-foreground">
                Creating beautiful, intuitive interfaces that provide exceptional user experiences across all devices.
              </p>
            </div>
            
            <div className="skill-card glass-card p-8 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code size={28} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">Modern Web Development</h3>
              <p className="text-muted-foreground">
                Building responsive websites with React, TypeScript, and modern CSS frameworks like Tailwind.
              </p>
            </div>
            
            <div className="skill-card glass-card p-8 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles size={28} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">Interactive Animations</h3>
              <p className="text-muted-foreground">
                Creating engaging motion and interactions using GSAP and 3D animations to enhance user engagement.
              </p>
            </div>
          </div>
          
          <div className="mt-16 pt-16 border-t border-border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Technical Skillset</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A glimpse into my technical toolbox, constantly expanding and evolving.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((skillGroup, groupIndex) => (
                <div key={groupIndex} className="glass-card overflow-hidden">
                  <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                    <h4 className="font-semibold flex items-center gap-2">
                      {groupIndex === 0 && <Monitor size={16} />}
                      {groupIndex === 1 && <Sparkles size={16} />}
                      {groupIndex === 2 && <Code size={16} />}
                      {skillGroup.category}
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, index) => (
                        <span 
                          key={index}
                          className="text-xs py-1 px-3 rounded-full bg-primary/5 border border-primary/10 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
