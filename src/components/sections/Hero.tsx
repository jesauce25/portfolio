import { useRef, useEffect, useState } from "react";
import { ArrowDown, ExternalLink, Sparkles } from "lucide-react";

// ASCII art for creative code representation
const codeArt = `
  const pauloAbaquita = {
    name: "Paulo L. Abaquita",
    role: "Creative Website Developer",
    mission: () => ({
      customers: "attracted ✨",
      growth: "accelerated 📈", 
      trust: "earned 🤝",
      partnership: "guaranteed 💪"
    })
  };
`;

// Custom hook for split text animation
const useSplitTextAnimation = () => {
  const animateText = (element: HTMLElement | null, delay = 0, stagger = 0.05) => {
    if (!element) return;

    const text = element.textContent || "";
    const chars = text.split("");

    element.innerHTML = "";
    chars.forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";
      span.style.display = "inline-block";
      span.style.transition = `opacity 0.5s ease ${delay + index * stagger}s, transform 0.5s ease ${delay + index * stagger}s`;
      element.appendChild(span);
    });

    setTimeout(() => {
      chars.forEach((_, index) => {
        const span = element.children[index] as HTMLElement;
        if (span) {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        }
      });
    }, 100);
  };

  return { animateText };
};

// Magnetic hover hook that works globally (not just inside the element)
const useMagneticElement = (ref: React.RefObject<HTMLElement>, strength = 20) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      if (animationId) cancelAnimationFrame(animationId);

      animationId = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${x / strength}px, ${y / strength}px, 0) scale(1.02)`;
        element.style.transition = "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      });
    };

    const reset = () => {
      if (animationId) cancelAnimationFrame(animationId);
      element.style.transform = "translate3d(0, 0, 0) scale(1)";
      element.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    };

    // 🔥 Listen globally, not just on the element
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", reset);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [ref, strength]);
};


const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const jobRef = useRef<HTMLHeadingElement>(null);
  const codePanelRef = useRef<HTMLDivElement>(null);

  // Magnetic buttons
  const workBtnRef = useRef<HTMLAnchorElement>(null);
  const contactBtnRef = useRef<HTMLAnchorElement>(null);

  const { animateText } = useSplitTextAnimation();

  // Apply magnetic effect to buttons and code panel
  useMagneticElement(workBtnRef, 25);
  useMagneticElement(contactBtnRef, 25);
  useMagneticElement(codePanelRef, 15); // Gentler movement for the larger code panel

  // Reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          setTimeout(() => animateText(greetingRef.current, 0.2, 0.03), 200);
          setTimeout(() => animateText(nameRef.current, 0.8, 0.03), 200);
          setTimeout(() => animateText(jobRef.current, 1.2, 0.02), 200);

          if (codePanelRef.current) {
            const codeText = codePanelRef.current.querySelector(".code-text");
            if (codeText) {
              const text = codeText.textContent || "";
              codeText.textContent = "";

              text.split("").forEach((char, index) => {
                setTimeout(() => {
                  codeText.textContent += char;
                }, 1500 + index * 30);
              });
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [isVisible, animateText]);

  // Parallax bg elements
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll<HTMLElement>(".bg-element");

      elements.forEach((element, index) => {
        const speed = index % 2 === 0 ? 0.5 : -0.3;
        const transform = `translateY(${scrollY * speed}px) rotate(${
          scrollY * 0.1
        }deg)`;
        element.style.transform = transform;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* bg blobs */}
        <div className="bg-element absolute h-64 w-64 rounded-full bg-blue-500/5 top-[10%] right-[5%] animate-pulse"></div>
        <div className="bg-element absolute h-48 w-48 rounded-full bg-purple-500/5 bottom-[15%] left-[10%] animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="bg-element absolute h-32 w-32 rounded-full bg-pink-500/5 top-[30%] left-[15%] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left text block */}
          <div
            className={`w-full lg:w-3/5 space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Availability badge */}
            <div
              className={`mb-6 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 inline-flex items-center transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-green-700">Available for work</span>
            </div>

            {/* Animated text */}
            <div className="space-y-4">
              <h2 ref={greetingRef} className="text-xl md:text-2xl font-medium text-gray-600">
                Hello, I'm Paulo L. Abaquita — your
              </h2>

              <h1
                ref={nameRef}
                className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                Creative
              </h1>

              <h2 ref={jobRef} className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800">
                Website Developer
              </h2>
            </div>

            <p
              className={`text-xl text-gray-600 max-w-2xl leading-relaxed transition-all duration-700 delay-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              I'm not just a developer who builds <span className="font-semibold text-blue-600">websites</span> — I'm your{" "}
              <span className="font-semibold text-purple-600">business partner</span>, creating solutions that solve challenges, attract customers, and fuel growth while making your brand stand out online.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-1200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <a
                ref={workBtnRef}
                href="#projects"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                </span>
              </a>
              <a
                ref={contactBtnRef}
                href="#contact"
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-purple-600 hover:text-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <span className="flex items-center gap-2">
                  Get In Touch
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
          </div>

          {/* Code preview panel with magnetic effect */}
          <div
            className={`w-full lg:w-2/5 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-95"
            }`}
          >
            <div
              ref={codePanelRef}
              className="p-6 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 cursor-pointer will-change-transform"
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs font-mono text-gray-400">Purpose</span>
                </div>
              </div>
              <pre className="code-text font-mono text-sm text-green-400 overflow-x-auto leading-relaxed">{codeArt}</pre>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
                <span className="text-xs font-mono text-gray-400">Your business partner</span>
                <span className="text-xs font-mono text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Running
                </span>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 transition-all duration-300 group ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "1.5s" }}
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;