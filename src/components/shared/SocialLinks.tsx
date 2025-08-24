import { useMagneticElement } from "@/hooks/useGSAP";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const SocialLinks = () => {
  const socialRef = useMagneticElement({ strength: 0.2, ease: 0.3 });

  return (
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
          href="https://www.facebook.com/profile.php?id=61577726206553" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300 interactive"
          style={{ background: 'linear-gradient(135deg, #1877F2, #0D47A1)' }}
        >
          <Facebook size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
        </a>
        
        <a 
          href="https://www.linkedin.com/in/paulo-abaquita-05a012214/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300 interactive"
          style={{ background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--secondary)/80))' }}
        >
          <Linkedin size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
        </a>
        
        <a 
          href="https://www.instagram.com/paulo_abaquita21/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300 interactive"
          style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
        >
          <Instagram size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks; 