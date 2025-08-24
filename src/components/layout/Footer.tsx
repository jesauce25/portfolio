
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-20 bg-secondary">
      <div className="container-section flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <Link to="/" className="text-2xl font-display font-bold tracking-tight">
              PAULO
            </Link>
            <p className="mt-4 text-muted-foreground">
            We transform your ideas into websites that fix problems, build trust, and generate results for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-lg">Navigate</h3>
              <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="/projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
              <a href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <a href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</a>
              <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-lg">Connect</h3>
              <a href="https://www.facebook.com/profile.php?id=61577726206553" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a>
              <a href="https://www.linkedin.com/in/paulo-abaquita-05a012214/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/paulo_abaquita21/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a>
            </div>
            
            <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
              <h3 className="font-semibold text-lg">Contact</h3>
              <a href="mailto:pauloabaquita098956@gmail.com"  className="text-muted-foreground hover:text-primary transition-colors">pauloabaquita098956@gmail.com</a>
              <p className="text-muted-foreground">0994 032 9454</p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Paulo. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a href="https://www.facebook.com/profile.php?id=61577726206553" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://www.linkedin.com/in/paulo-abaquita-05a012214/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://www.instagram.com/paulo_abaquita21/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Instagram size={18} />
            </a>
            <a href="mailto:pauloabaquita098956@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
