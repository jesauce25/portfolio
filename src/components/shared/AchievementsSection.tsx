import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

type AchievementItem = {
  year: string;
  title: string;
  description: string;
  image: string;
};

const achievementsData: AchievementItem[] = [
  {
    year: "2023",
    title: "Led E-commerce Platform Development",
    description: "Successfully led a team of 3 to deliver a complex e-commerce platform ahead of schedule, incorporating advanced payment gateways and inventory management.",
    image: "https://www.pexels.com/photo/monks-in-red-robes-gathered-outdoors-in-mountains-33432439/"
  },
  {
    year: "2022",
    title: "Performance Optimization Award",
    description: "Optimized web application performance, reducing load times by 40% through aggressive code splitting, lazy loading, and image optimization techniques.",
    image: "https://via.placeholder.com/400x250/11a577/FFFFFF?text=Optimization+Award"
  },
  {
    year: "2024",
    title: "Custom Animation Library Development",
    description: "Implemented a custom animation library from scratch using GSAP, significantly enhancing user engagement and brand recall by 25% across key product flows.",
    image: "https://via.placeholder.com/400x250/f2994a/FFFFFF?text=Animation+Library"
  },
  {
    year: "2021",
    title: "Junior Developer Mentorship",
    description: "Mentored junior developers, providing guidance on best practices, code reviews, and fostering a collaborative environment that improved team productivity by 15%.",
    image: "https://via.placeholder.com/400x250/8e35ef/FFFFFF?text=Mentorship"
  },
  {
    year: "2024",
    title: "Open-Source Contributions",
    description: "Actively contributed to several open-source projects, gaining recognition for innovative solutions in web animation and interactive UI development.",
    image: "https://via.placeholder.com/400x250/11a577/FFFFFF?text=Open-Source"
  }
];

const AchievementsSection = () => {
  const achievementsRef = useRef<HTMLDivElement>(null);
  useGSAP('.achievement-card', {
    scrollTrigger: {
      trigger: achievementsRef.current,
      start: "top 80%",
      once: true,
    },
    animateFrom: { opacity: 0, y: 50, scale: 0.95 },
    animateTo: { opacity: 1, y: 0, scale: 1 },
    stagger: 0.1,
  });

  return (
    <div className="py-16">
      <h2 className="heading-md text-center mb-12">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={achievementsRef}>
        {achievementsData.map((achievement, index) => (
          <div key={index} className="achievement-card glass-card p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
              <img src={achievement.image} alt={achievement.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className="text-sm font-semibold text-primary mb-2">{achievement.year}</span>
            <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
            <p className="text-muted-foreground text-sm">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection; 