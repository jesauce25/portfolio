
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@/hooks/useGSAP";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const animatedRef = useRef(false);
  
  const navRef = useGSAP('.nav-item', {
    animateFrom: { y: -20, opacity: 0 },
    animateTo: { y: 0, opacity: 1 },
    duration: 0.5,
    stagger: 0.1
  });
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container-section flex items-center justify-between">
        <Link 
          to="/" 
          className="nav-item text-2xl font-display font-bold tracking-tight"
        >
          Portfolio
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="nav-item text-base font-medium hover:text-primary/70 transition-colors">
            About
          </a>
          <a href="#projects" className="nav-item text-base font-medium hover:text-primary/70 transition-colors">
            Projects
          </a>
          <a href="#contact" className="nav-item text-base font-medium hover:text-primary/70 transition-colors">
            Contact
          </a>
          <a 
            href="#contact" 
            className="nav-item btn-primary py-2 px-5 h-auto"
          >
            Hire Me
          </a>
        </div>
        
        <button 
          className="md:hidden nav-item" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-section h-full flex flex-col">
          <div className="flex justify-between items-center py-6">
            <Link 
              to="/" 
              className="text-2xl font-display font-bold tracking-tight"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
            <button 
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col gap-8 mt-16 items-center">
            <a 
              href="#about" 
              className="text-2xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a 
              href="#projects" 
              className="text-2xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-2xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <a 
              href="#contact" 
              className="btn-primary mt-8"
              onClick={() => setIsOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
