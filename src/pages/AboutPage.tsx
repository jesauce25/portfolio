import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingBackgroundBlobs from "@/components/shared/FloatingBackgroundBlobs";
import { Calendar, Award, Code, Users, Briefcase, ExternalLink, X } from "lucide-react";
import SeoHead from '@/components/seo/SeoHead'; // Import SeoHead

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: 2021,
    title: "Started College & Bottled Drinking Water Business",
    description: "In the same year, I pursued my college degree while successfully launching a bottled drinking water business. This experience allowed me to earn income, manage responsibilities, and gain valuable life lessons in discipline and perseverance.",
    image: "image/paulo/tubig.jpg",
    type: "entrepreneurship",
    achievements: [
      "Balanced academics and entrepreneurship",
      "Gained financial independence",
      "Built leadership and time management skills",
      "Learned resilience through real-world challenges"
    ]
  },
  {
    year: 2022,
    title: "First Client Project",
    description: "Secured my first freelance client and built a website for a local business. This year taught me how to communicate directly with business owners, understand their needs, and provide solutions that truly solve their problems.",
    image: "image/paulo/international.png",
    type: "milestone",
    achievements: [
      "Learned client communication & expectation management",
      "Understood real business needs",
      "Delivered solutions that added value",
      "Strengthened web development and project management skills"
    ]
  },
  {
    year: 2023,
    title: "Hired as Web Developer Intern",
    description: "A company CEO discovered my portfolio online and personally reached out to hire me as their web developer intern. I felt valued knowing that my skills and potential stood out, and I contributed to projects aimed at helping the company grow.",
    image: "image/paulo/ceo.png",
    type: "experience",
    achievements: [
      "Recognized by CEO for skills & potential",
      "Hands-on experience as a web developer intern",
      "Contributed to company growth through web solutions",
      "Learned teamwork and professional development"
    ]
  },
  {
    year: 2024,
    title: "Graduation & Leadership Achievements",
    description: "In 2024, I graduated despite all the challenges I faced along the way. I led our capstone project as team leader, proving my ability to guide and deliver results. Beyond academics, I also served the campus as a Student Extensionist and earned recognition as a Student Training Specialist during PAG-ASA sa BJMP, where I had the privilege of teaching and guiding prisoners in gaining basic computer skills.",
    image: "image/paulo/graduate.png",
    type: "milestone",
    achievements: [
      "Graduated with resilience despite challenges",
      "Led capstone project team to success",
      "Certificate of Student Extensionist – Campus Service",
      "Certificate of Student Training Specialist – PAG-ASA sa BJMP",
      "Taught and guided prisoners in basic computer skills"
    ],
    projectImages: [
      {
        src: "image/paulo/ojt.png",
        title: "Capstone Leadership",
        description: "In just 730 hours, I contributed to driving the CEO’s business growth by delivering innovative online solutions that enhanced their digital presence and operations."
      },
      {
        src: "image/paulo/student-extensionist.png",
        title: "Student Extensionist",
        description: "Served the campus and contributed through community service programs"
      },
      {
        src: "image/paulo/bjmp.png",
        title: "Student Training Specialist at BJMP",
        description: "Taught prisoners essential computer skills during PAG-ASA sa BJMP program"
      }
    ]

  },
  {
    year: 2025,
    title: "Founder of Webquita",
    description: "With the confidence gained from years of experience, I finally established my own company — Webquita. My mission is to help business owners, artists, lawyers, and professionals from different careers build their online presence. Whether it’s growing a business, showcasing art, creating a portfolio, or building a personal brand, I ensure their needs are met through modern, impactful websites.",
    image: "image/paulo/webquita.jpg",
    type: "current",
    achievements: [
      "Founded Webquita – a web development company",
      "Helping businesses, artists, lawyers, and professionals grow online",
      "Specializing in portfolios, branding, and digital solutions",
      "Delivering modern websites that empower clients in the digital world"
    ]

  }
];

const FloatingBlob = ({ size, color, position, delay }) => (
  <div
    className={`absolute ${size} rounded-full ${color} ${position} animate-pulse opacity-20`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: '4s'
    }}
  />
);


const AboutPage = () => {
  const timelineRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle modal close with escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && modalImage) {
        setModalImage(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [modalImage]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalImage]);

  const openImageModal = (image) => {
    setModalImage(image);
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'learning': return <Code size={20} className="text-purple-600" />;
      case 'milestone': return <Award size={20} className="text-orange-500" />;
      case 'skill': return <Briefcase size={20} className="text-green-600" />;
      case 'leadership': return <Users size={20} className="text-purple-600" />;
      case 'current': return <Calendar size={20} className="text-orange-500" />;
      default: return <Code size={20} className="text-purple-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'learning': return 'from-purple-600 to-purple-400';
      case 'milestone': return 'from-orange-500 to-orange-300';
      case 'skill': return 'from-green-600 to-green-400';
      case 'leadership': return 'from-purple-600 to-purple-500';
      case 'current': return 'from-orange-500 to-orange-400';
      default: return 'from-purple-600 to-purple-400';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingBlob
          size="w-64 h-64"
          color="bg-purple-200"
          position="top-[5%] left-[10%]"
          delay={0}
        />
        <FloatingBlob
          size="w-80 h-80"
          color="bg-green-200"
          position="bottom-[15%] right-[5%]"
          delay={2}
        />
        <FloatingBlob
          size="w-52 h-52"
          color="bg-orange-200"
          position="top-[40%] right-[30%]"
          delay={1}
        />
      </div>

      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-purple-100">
            <Users size={16} className="text-purple-600" />
            <span className="text-sm font-medium">My Story</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            About Paulo
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My journey from curious beginner to passionate web developer. Explore the milestones,
            achievements, and growth that shaped my career in web development.
          </p>
        </div>

        {/* Timeline Section */}
        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* 1. Main gradient line (runs behind every node) */}
          <div className="absolute w-1 bg-gradient-to-b from-purple-600 via-green-600 to-orange-500
                          left-8 md:left-1/2 md:-translate-x-1/2 top-0 h-full"></div>

          {/* 2. Timeline nodes */}
          <div className="space-y-16 md:space-y-32">
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                id={`timeline-${index}`}
                className={`animate-on-scroll relative flex flex-col pl-20 md:pl-0 md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } transition-all duration-700 ${isVisible[`timeline-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
                onMouseEnter={() => setActiveNode(index)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Mobile node */}
                <div className="absolute left-6 top-8 z-10 md:hidden">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${getTypeColor(
                      item.type
                    )} flex items-center justify-center shadow-lg border-2 border-white transition-all duration-300 ${activeNode === index ? "scale-125 shadow-2xl" : ""
                      }`}
                  >
                    {getTypeIcon(item.type)}
                  </div>
                </div>

                {/* Desktop node */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${getTypeColor(
                      item.type
                    )} flex items-center justify-center shadow-lg border-4 border-white transition-all duration-300 ${activeNode === index ? "scale-125 shadow-2xl" : ""
                      }`}
                  >
                    {getTypeIcon(item.type)}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`w-full mb-6 md:w-5/12 md:mb-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                    }`}
                >
                  <div
                    className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 transition-all duration-300 ${activeNode === index ? "shadow-2xl scale-105" : ""
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="hidden md:inline">
                        {getTypeIcon(item.type)}
                      </span>
                      <span className="text-2xl font-bold text-purple-600">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{item.description}</p>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-sm text-gray-900">
                        Key Achievements:
                      </h4>
                      {item.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                          <span className="text-sm text-gray-600">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Project images for 2024 */}
                    {item.year === 2024 && item.projectImages && (
                      <div className="project-images-grid">
                        <h4 className="font-semibold text-sm mb-3 text-gray-900">
                          Project Highlights:
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {item.projectImages.map((projectImage, i) => (
                            <div
                              key={i}
                              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                              onClick={() => openImageModal(projectImage)}
                            >
                              <img
                                src={projectImage.src}
                                alt={projectImage.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                  <ExternalLink size={16} className="text-white" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div
                  className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16"
                    }`}
                >
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

            {/* 3. Extra line segment + future circle */}
            <div className="relative h-32">
              {/* extended vertical line */}
              <div className="absolute w-1 bg-gradient-to-b from-orange-500 to-gray-400
                              left-8 md:left-1/2 md:-translate-x-1/2 top-0 h-full"></div>

              {/* Mobile */}
              <div className="absolute left-6 top-8 z-10 md:hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-300
                                flex items-center justify-center shadow-lg border-2 border-white">
                  <Calendar size={16} className="text-white" />
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-300
                                flex items-center justify-center shadow-lg border-4 border-white">
                  <Calendar size={24} className="text-white" />
                </div>
              </div>

              {/* Optional text card */}
              <div className="md:w-5/12 md:pl-16 mt-12 md:mt-0">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">The Future</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    This is just the beginning — greater opportunities, bigger projects, and new chapters are waiting to be built.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Value & Impact Section */}
        <div className="mt-32 relative">
          {/* Floating background shapes for effect */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>

          <div className="text-center mb-20 relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Why Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">Choose Me</span> 🚀
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I don’t just build websites — I create <span className="font-semibold text-gray-900">digital experiences</span> that help businesses, professionals, and creatives
              grow their brand, reach the right audience, and turn opportunities into results. 🌍
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
            {[
              {
                title: "Business Growth 📈",
                details: [
                  "Turn visitors into paying customers",
                  "Showcase services with clarity & impact",
                  "Build trust with a modern, professional presence"
                ],
                icon: <Briefcase size={34} className="text-purple-600" />,
                color: "from-purple-600 to-purple-400",
                glow: "shadow-purple-200"
              },
              {
                title: "Personal Branding 🌟",
                details: [
                  "Showcase your portfolio & achievements",
                  "Perfect for lawyers, artists & professionals",
                  "Stand out and build authority online"
                ],
                icon: <Award size={34} className="text-green-600" />,
                color: "from-green-600 to-green-400",
                glow: "shadow-green-200"
              },
              {
                title: "Client Partnership 🤝",
                details: [
                  "Clear, friendly & professional communication",
                  "I listen first — then create solutions",
                  "Your goals become the blueprint for success"
                ],
                icon: <Users size={34} className="text-orange-500" />,
                color: "from-orange-500 to-orange-400",
                glow: "shadow-orange-200"
              }
            ].map((category, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-10 text-center group shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-3 hover:rotate-1 overflow-hidden"
              >
                {/* Subtle floating gradient glow behind card */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br ${category.color} blur-2xl`} />

                {/* Icon in Gradient Circle */}
                <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${category.color} 
        flex items-center justify-center mx-auto mb-6 group-hover:scale-125 transition-transform duration-500 shadow-xl ${category.glow}`}>
                  {category.icon}
                </div>

                <h3 className="relative text-2xl font-semibold mb-5 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-orange-500 transition duration-500">
                  {category.title}
                </h3>

                <ul className="relative space-y-3 text-gray-700 text-base leading-relaxed">
                  {category.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 justify-center group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-purple-500">✨</span> {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>


        {/* Personal Touch */}
<div className="mt-32 text-center relative">
  {/* Decorative Background Gradient Blur */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
  </div>

  <div className="bg-gradient-to-br from-white/95 via-gray-50/90 to-white/80 
                  backdrop-blur-2xl rounded-3xl p-12 md:p-16 max-w-4xl mx-auto 
                  shadow-xl border border-gray-200/70 hover:shadow-2xl 
                  transition-all duration-500 hover:scale-[1.02]">
    
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">
      Let’s Build Your Digital Edge 🚀
    </h2>
    
    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
      I don’t just design websites—I create 
      <span className="font-semibold text-purple-600"> platforms that grow businesses, careers, and personal brands.</span>  
      From entrepreneurs and lawyers to artists and professionals, I help people stand out online with websites that 
      <span className="font-semibold text-orange-500"> look sharp, load fast, and convert visitors into clients.</span>  
      <br className="hidden md:block" />
      This isn’t just about today’s project—it’s about <span className="font-semibold text-purple-700">building your future presence, starting now.</span>
    </p>

    {/* Call-to-Action Buttons */}
    <div className="flex flex-wrap justify-center gap-4">
      <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 
                         text-white px-10 py-4 rounded-full font-semibold flex items-center gap-2 
                         group transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1">
        Get In Touch
        <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
      </button>
      
      <button className="bg-white hover:bg-gray-100 text-gray-900 px-10 py-4 rounded-full font-semibold 
                         flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200">
        View My Work
      </button>
    </div>
  </div>
</div>

      </main>

      <Footer />

      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Modal content */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl animate-pulse">
              <div className="relative aspect-[16/10]">
                <img
                  src={modalImage.src}
                  alt={modalImage.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{modalImage.title}</h3>
                <p className="text-gray-600">{modalImage.description}</p>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeImageModal}
          />
        </div>
      )}
    </div>
  );
};

export default AboutPage;