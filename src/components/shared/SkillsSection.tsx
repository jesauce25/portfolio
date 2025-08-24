import { skills } from "@/data/skills";
import { Code, Sparkles, Monitor } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";

const SkillsSection = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  useGSAP('.skill-card', {
    scrollTrigger: {
      trigger: skillsRef.current,
      start: "top 80%",
      once: true,
    },
    animateFrom: { opacity: 0, y: 50, scale: 0.9 },
    animateTo: { opacity: 1, y: 0, scale: 1 },
    stagger: 0.1,
  });

  useEffect(() => {
    if (!skillsRef.current) return;

    const skillCards = skillsRef.current.querySelectorAll('.skill-card');
    skillCards.forEach((card) => {
      gsap.to(card, {
        y: -5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        paused: true,
        onReverseComplete: () => gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" })
      });

      card.addEventListener('mouseenter', () => gsap.to(card, { y: -5, scale: 1.02, duration: 0.3, ease: "power2.out", overwrite: true }));
      card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out", overwrite: true }));
    });

  }, []);

  return (
    <div className="py-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Technical Skillset</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A glimpse into my technical toolbox, constantly expanding and evolving.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={skillsRef}>
        {skills.map((skillGroup, groupIndex) => (
          <div key={groupIndex} className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
  );
};

export default SkillsSection; 