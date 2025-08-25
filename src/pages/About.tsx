import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Award, Code, Users, Briefcase, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: 2021,
    title: "Started Web Development Journey",
    description: "Began learning HTML, CSS, and JavaScript. Built first portfolio website.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500",
    type: "learning",
    achievements: ["First HTML/CSS project", "Basic JavaScript skills", "Git fundamentals"]
  },
  {
    year: 2022,
    title: "First Client Project",
    description: "Completed first freelance project - a local business website with modern design.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500",
    type: "milestone",
    achievements: ["React.js mastery", "Client communication", "Project management"]
  },
  {
    year: 2023,
    title: "Advanced Animations & Interactions",
    description: "Specialized in GSAP animations and interactive web experiences.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=500",
    type: "skill",
    achievements: ["GSAP Expert", "Three.js Projects", "WebGL Animations"]
  },
  {
    year: 2024,
    title: "Capstone Project Lead",
    description: "Led a team of 5 developers in creating an innovative web application.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=500",
    type: "leadership",
    achievements: ["Team Leadership", "Full-stack Development", "Project Architecture"]
  },
  {
    year: 2025,
    title: "Professional Web Developer",
    description: "Now creating immersive digital experiences with cutting-edge technologies.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=500",
    type: "current",
    achievements: ["Advanced React", "Supabase Integration", "Modern Design Systems"]
  }
];

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!timelineRef.current || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      // Animate timeline nodes
      gsap.fromTo(
        '.timeline-node',
        { 
          scale: 0,
          opacity: 0,
          y: 50
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.timeline-container',
            start: "top 80%",
            once: true
          }
        }
      );

      // Animate timeline line
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.timeline-container',
            start: "top 70%",
            once: true
          }
        }
      );

      // Animate achievement cards
      gsap.fromTo(
        '.achievement-card',
        {
          opacity: 0,
          x: 100,
          rotationY: -15
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.achievements-grid',
            start: "top 80%",
            once: true
          }
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'learning': return <Code size={20} className="text-primary" />;
      case 'milestone': return <Award size={20} className="text-accent" />;
      case 'skill': return <Briefcase size={20} className="text-secondary" />;
      case 'leadership': return <Users size={20} className="text-primary" />;
      case 'current': return <Calendar size={20} className="text-accent" />;
      default: return <Code size={20} className="text-primary" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'learning': return 'from-primary to-primary/70';
      case 'milestone': return 'from-accent to-accent/70';
      case 'skill': return 'from-secondary to-secondary/70';
      case 'leadership': return 'from-primary to-purple-500';
      case 'current': return 'from-accent to-orange-400';
      default: return 'from-primary to-primary/70';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-section">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
              <Users size={16} className="text-primary" />
              <span className="text-sm font-medium">My Story</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              About Paulo
            </h1>
            
            <p className="subheading max-w-3xl mx-auto">
              My journey from curious beginner to passionate web developer. Explore the milestones, 
              achievements, and growth that shaped my career in web development.
            </p>
          </div>

          {/* Timeline Section */}
          <div ref={timelineRef} className="timeline-container relative max-w-6xl mx-auto">
            {/* Timeline line */}
            <div 
              className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-secondary to-accent origin-top"
              style={{ height: `${(timelineData.length - 1) * 300 + 100}px` }}
            ></div>

            {/* Timeline nodes */}
            <div className="space-y-32">
              {timelineData.map((item, index) => (
                <div 
                  key={item.year}
                  className={`timeline-node relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActiveNode(index)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}>
                    <div className={`glass-card p-8 transition-all duration-300 ${
                      activeNode === index ? 'shadow-2xl scale-105' : ''
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        {getTypeIcon(item.type)}
                        <span className="text-2xl font-bold text-primary">{item.year}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                      <p className="text-muted-foreground mb-6">{item.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Achievements:</h4>
                        {item.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Central node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getTypeColor(item.type)} 
                      flex items-center justify-center shadow-lg border-4 border-white transition-all duration-300 ${
                      activeNode === index ? 'scale-125 shadow-2xl' : ''
                    }`}>
                      {getTypeIcon(item.type)}
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pl-16' : 'pr-16'}`}>
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-white font-medium">{item.title}</div>
                        <div className="text-white/80 text-sm">{item.year}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Achievements Grid */}
          <div className="achievements-grid mt-32">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-6">Skills & Expertise</h2>
              <p className="subheading max-w-2xl mx-auto">
                Technologies and skills I've mastered throughout my journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend Development",
                  skills: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
                  icon: <Code size={24} className="text-primary" />,
                  color: "from-primary to-purple-500"
                },
                {
                  title: "Interactive Animations",
                  skills: ["GSAP", "Framer Motion", "Three.js", "WebGL"],
                  icon: <Briefcase size={24} className="text-secondary" />,
                  color: "from-secondary to-green-400"
                },
                {
                  title: "Backend & Tools",
                  skills: ["Supabase", "Node.js", "Git", "Figma"],
                  icon: <Award size={24} className="text-accent" />,
                  color: "from-accent to-orange-400"
                }
              ].map((category, index) => (
                <div key={index} className="achievement-card glass-card p-8 text-center group hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} 
                    flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  
                  <div className="space-y-2">
                    {category.skills.map((skill, i) => (
                      <div key={i} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Touch */}
          <div className="mt-32 text-center">
            <div className="glass-card p-12 max-w-4xl mx-auto">
              <h2 className="heading-md mb-6">Let's Build Something Amazing</h2>
              <p className="subheading mb-8">
                I'm passionate about creating digital experiences that make a difference. 
                Whether it's a stunning portfolio, an interactive web app, or a complex animation, 
                I bring creativity and technical expertise to every project.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/contact" 
                  className="btn-primary flex items-center gap-2 group"
                >
                  Get In Touch
                  <ExternalLink size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                </a>
                <a 
                  href="/projects" 
                  className="btn-secondary flex items-center gap-2"
                >
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;