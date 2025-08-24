import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import SeoHead from '@/components/seo/SeoHead'; // Import SeoHead
import FloatingBackgroundBlobs from '@/components/shared/FloatingBackgroundBlobs'; // Import FloatingBackgroundBlobs
import gsap from 'gsap'; // Import gsap

const NotFound = () => {
  const location = useLocation();
  const buttonRef = useRef<HTMLAnchorElement>(null); // Ref for the button

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);
      
      gsap.to(button, {
        x: x * 0.6,
        y: y * 0.6,
        ease: "power2.out",
        duration: 0.2
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        ease: "power2.out",
        duration: 0.3
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 text-center">
      <SeoHead
        title="404 Not Found | Paulo L. Abaquita - Page Not Found"
        description={`The page you are looking for at ${location.pathname} could not be found. Please check the URL or return to the homepage.`}
        path={location.pathname}
      />
      <h1 className="text-7xl md:text-9xl font-extrabold mb-4 gradient-text drop-shadow-lg leading-tight">
        404
      </h1>
      <p className="text-xl md:text-3xl text-muted-foreground mb-8 max-w-lg">
        Oops! It seems you've ventured off the beaten path.
        The page you're looking for can't be found.
      </p>
      <a 
        ref={buttonRef} // Attach ref to the button
        href="/" 
        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Return to Home
      </a>
      <FloatingBackgroundBlobs />
    </div>
  );
};

export default NotFound;
