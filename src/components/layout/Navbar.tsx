
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navbarRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !navbarRef.current) return;
    
    const navItems = navbarRef.current.querySelectorAll('.nav-item');
    if (navItems.length === 0) return;

    gsap.fromTo(
      navItems,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", onComplete: () => {
        hasAnimated.current = true;
      } }
    );
  }, []);

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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Me", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Hire Me", path: "/hire" },
  ];

  return (
    <header 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container-section flex items-center justify-between">
        <Link 
          to="/" 
          className="nav-item text-2xl font-display font-bold tracking-tight"
        >
          PAULO
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
        <Link to="/home" className="nav-item text-base font-medium hover:text-primary/70 transition-colors">
            Home
          </Link>
          <Link to="/about" className="nav-item text-base font-medium hover:text-primary/70 transition-colors">
            About
          </Link>
          <Link to="/projects" className="nav-item text-base font-medium hover:text-primary/70 transition-colors">
            Projects
          </Link>
        
          <Link to="/services" className="nav-item text-base font-medium hover:text-primary/70 transition-colors">
            Services
          </Link>
          <Link to="/testimonials" className="nav-item text-base font-medium hover:text-primary/70 transition-colors">
            Testimonials
          </Link>
          <Link to="/hire" className="nav-item text-base font-medium btn-primary py-2 px-5 h-auto !text-white">
            Hire Me
          </Link>
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
              PAULO
            </Link>
            <button 
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col gap-8 mt-16 items-center">
            <Link 
              to="/about" 
              className="text-2xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/projects" 
              className="text-2xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link 
              to="/contact" 
              className="text-2xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/services" 
              className="text-2xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/testimonials" 
              className="text-2xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="/hire" 
              className="text-2xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Hire Me
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
