export type ProjectType = {
  id: number;
  title: string;
  description: string;
  mediaType: "image" | "video"; // NEW
  image: string; // can be image (jpg/png) or video (mp4)
  images: string[];
  tags: string[];
  link: string;
  github?: string;
};

export type ServiceType = {
  id: string;
  name: string;
  description: string;
  mediaType?: "image" | "video"; // Add mediaType to ServiceType
  image: string;
  tags: string[];
};

export const projects: ProjectType[] = [
  {
    id: 1,
    title: "Kinabuhi",
    description:
      "Kinabuhi is a mobile-responsive website that helps you track time, emotions, finances, experiences, and notes—all in one place. With AI-powered insights, it goes beyond tracking to guide and motivate you, making it a true partner for self-growth and productivity.",
    mediaType: "image",
    image: "projects/kinabuhi/kinabuhiMockup.png",
    images: [
      "projects/kinabuhi/kinabuhi-1.jpg",
      "projects/kinabuhi/kinabuhi-2.jpg",
      "projects/kinabuhi/kinabuhi-3.jpg",
      "projects/kinabuhi/kinabuhi-4.jpg",
      "projects/kinabuhi/kinabuhi-5.jpg",
      "projects/kinabuhi/kinabuhi-6.jpg",
      "projects/kinabuhi/kinabuhi-7.jpg",
      "projects/kinabuhi/kinabuhi-8.jpg",
      "projects/kinabuhi/kinabuhi-9.jpg",
    ],
    tags: ["React", "GSAP", "Framer Motion", "Supabase", "Tailwind", "Typescript", "Personal Projects"],
    link: "https://kinabuhi.vercel.app",
    github: "https://github.com",
  },
  {
    id: 2,
    title: "Birthday Website",
    description:
      "This website is a heartfelt gift for a special someone’s birthday. It captures their journey—from childhood memories to who they are today—reminding them of every milestone, every moment, and why their life is worth celebrating and living.",
    mediaType: "image",
    image: "projects/birthday/bdayMockup.png",
    images: [
      "projects/birthday/bday-1.jpg",
      "projects/birthday/bday-2.jpg",
      "projects/birthday/bday-3.jpg",
      "projects/birthday/bday-4.jpg",
      "projects/birthday/bday-5.jpg",
      "projects/birthday/bday-6.jpg",
      "projects/birthday/bday-7.jpg",
    ],
    tags: ["React", "Framer Motion", "GSAP","Tailwind", "Typescript","Events & Invitations"],
    link: "https://alyssa-ikaw-akong-kusog-haha.vercel.app/",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Poruchi",
    description:
      "Poruchi is a mobile-responsive website that showcases an artist’s digital portfolio and creative services, specializing in anime-inspired art. It’s designed to highlight their talent, connect with clients, and make their artistry accessible to anyone who appreciates unique digital creations.",
    mediaType: "video", // NEW
    image: "videos/poruchi.mp4",
    images: [
      "videos/poruchi.mp4",
    ],
    tags: ["Css", "Html", "Javascript", "Firebase", "GSAP","SEO","Portfolio"],
    link: "https://poruchi.web.app/",
  },
  {
    id: 4,
    title: "Top handsome in CTU-Naga",
    description:
      "A fun little mobile-responsive website I built in college that features my friends and their funniest faces. Just a lighthearted project made to capture laughs and good memories.",
    mediaType: "video",
    image: "videos/CTU NAGA handsome.mp4",
    images: [
      "videos/CTU NAGA handsome.mp4",
    ],
    tags: ["Javascript", "CSS", "GSAP", "Firebase","Personal Projects"],
    link: "https://top-handsome-in-ctu-naga.web.app/",
    github: "https://github.com",
  },
  {
    id: 5,
    title: "O&C Embroidery",
    description:
      "A professional mobile-responsive website for an embroidery business, built to showcase their services, highlight their craftsmanship, and create a trustworthy online presence. It helps the business connect with more customers, build credibility, and stand out in today’s digital market.",
    mediaType: "image",
    image:
      "projects/embroidery/embroidery.png",
    images: [
      "projects/embroidery/homehero.png",
      "projects/embroidery/homegallery.png",
      "projects/embroidery/hometestimonial.png",
      "projects/embroidery/aboutus.png",
      "projects/embroidery/gallery.png",
      "projects/embroidery/Designtool.png",
      "projects/embroidery/services.png",
      "projects/embroidery/contact.png",

    ],
    tags: ["React", "Tailwind", "Typescript", "Vercel", "GSAP", "SEO","Business"],
    link: "https://oandcembroidery.vercel.app/",
  },
  {
    id: 6,
    title: "Cemetery Mapping",
    description:
      "A mobile-responsive website designed to modernize cemetery services. It allows users to locate deceased loved ones with ease and even purchase slots online, making it a unique and convenient platform that blends tradition with technology.",
    mediaType: "video",
    image:
      "videos/cemetery.mp4",
    images: [
      "videos/cemetery.mp4",
    ],
    tags: ["PHP", "Javascript", "E-Commerce", "Business"],
    link: "/not-found",
    github: "https://github.com",
  },
  
  {
    id: 10,
    title: "Lawyer's Portfolio",
    description:
      "A professional portfolio website for a lawyer, showcasing his expertise, services, and areas of specialization. Designed to build trust and credibility, it helps potential clients clearly understand his practice and feel confident in reaching out for legal assistance.",
    mediaType: "image",
    image:
      "projects/law/lawhome-1.png",
    images: [
      "projects/law/lawhome-2.png",
      "projects/law/lawabout-1.png",
      "projects/law/lawblog-1.png",
      "projects/law/lawcaseresult-1.png",
      "projects/law/lawpracticearea-1.png",
      "projects/law/lawcontact-1.png",
    ],
    tags: ["React", "Tailwind","Typescript", "Framer Motion","SEO", "Portfolio"],
    link: "/not-found",
    github: "https://github.com",
  },
  {
    id: 11,
    title: "Suki",
    description:
      "A mobile-responsive website that directly connects fishermen with buyers, enabling door-to-door delivery of fresh catch. Like an e-commerce platform for seafood, it empowers fishermen to sell directly and gives customers fresh, trusted products without the middleman.",
    mediaType: "image",
    image:
      "projects/suki/suki-1.png",
    images: [
      "projects/suki/suki2.png",
      "projects/suki/suki-3.png",
      "projects/suki/suki-4.png",
    
    ],
    tags: ["React", "Tailwind", "Framer Motion", "Supabase", "E-Commerce","Business"],
    link: "/not-found",
    github: "https://github.com",
  },
  {
    id: 12,
    title: "Mentor's Portfolio",
    description:
      "A mobile-responsive portfolio website for a mentor, showcasing his skills, experience, and dedication to guiding children. Designed to build credibility and gain parents’ trust, it highlights his mentoring approach and proven impact.",
    mediaType: "image",
    image:
      "projects/mentor/mentor1.png",
    images: [
      "projects/mentor/mentor2.png",
      "projects/mentor/mentor3.png",
      "projects/mentor/mentor4.png",
      "projects/mentor/mentor5.png",
      "projects/mentor/mentor6.png",

    
    ],
    tags: ["React", "Tailwind", "Framer Motion", "Supabase", "SEO", "Portfolio"],
    link: "/not-found",
    github: "https://github.com",
  },
  {
    id: 13,
    title: "Sarah & John Wedding",
    description:
      "A mobile-responsive wedding invitation website designed to make the special day unforgettable. It includes location maps with QR codes, personalized themes, entourage list, dress code, RSVP form, FAQs, countdown timer, payment options, and even a prenup video showcase—everything guests need in one beautiful digital invitation.",
    mediaType: "image",
    image:
      "projects/wedding/wedding.png",
    images: [
      "projects/wedding/wedding-1.png",
      "projects/wedding/wedding-2.png",
      "projects/wedding/wedding-3.png",
      "projects/wedding/wedding-4.png",
      "projects/wedding/wedding-5.png",
      "projects/wedding/wedding-6.png",


    
    ],
    tags: ["React", "Tailwind","GSAP", "Supabase","Typescript", "Events & Invitations"],
    link: "/not-found",
    github: "https://github.com",
  },
  {
    id: 7,
    title: "Capstone/Thesis Document record managment system",
    description:
      "A mobile-responsive website for tracking capstone and thesis projects within the campus. It allows students to store, browse, and access past and current works, creating a centralized hub of knowledge and inspiration for future researchers.",
    mediaType: "video",
    image:
      "videos/capstone.mp4",
    images: [
      "videos/capstone.mp4",
    ],
    tags: ["PHP", "Javascript","Business"],
    link: "/not-found", 
    github: "https://github.com",
  },
  {
    id: 8,
    title: "CTU-Naga Professors",
    description:
      "A mobile-responsive website that showcases all professors’ portfolios and backgrounds in one place. It provides students with easy access to their professors’ expertise while building transparency and credibility within the campus.",
    mediaType: "video",
    image:
      "videos/pogi.mp4",
    images: [
      "videos/pogi.mp4",
    ],
    tags: ["PHP", "Javascript", "Portfolio"],
    link: "/not-found",
    github: "https://github.com",
  },
  {
    id: 9,
    title: "Demo Campus Website",
    description:
      "A front-end website for CTU, built to showcase the campus services and offerings. Designed with a clean, responsive interface, it highlights what the university provides while ensuring accessibility and professionalism.",
    mediaType: "video",
    image:
      "videos/eduford.mp4",
    images: [
      "videos/eduford.mp4",
    ],
    tags: [ "PHP", "Javascript", "Personal Projects"],
    link: "/not-found",
    github: "https://github.com",
  },
];

export const filterOptions = [
  "All",
  "Portfolio",
  "Business",
  "E-Commerce",
  "Events & Invitations",
  "Personal Projects",
];
