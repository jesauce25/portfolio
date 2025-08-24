"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ChevronLeft, ChevronRight } from "lucide-react";

const carouselItems = [
  {
    title: "Credibility & First Impressions ",
    emoji: "👀",

    noWebsite: {
      text: "Tourist finds your competitor's polished site. You only have a FB page → skipped ❌",
      img: "/image/websites/no-web-cafe.png",
    },
    withWebsite: {
      text: "Your site shows menu 🍽️, reviews ⭐, ordering 🛒 → they visit, share, bring friends 🎉",
      img: "/image/websites/with-web-cafe.png",
    },
    result: "No site = unprofessional 😬. With site = trustworthy + higher-value customers 💎",
  },
  {
    title: "Control Over Your Brand",
    emoji: "🎨",

    noWebsite: {
      text: "Only on TikTok/FB 📱. Algo changes or account banned → invisible overnight 🚫",
      img: "/image/websites/noweb-2.png",
    },
    withWebsite: {
      text: "Your site = permanent HQ 🏠. You own your brand, list 📧, and content 📂",
      img: "/image/websites/withweb-2.png",
    },
    result: "Without: no control 🔒. With: ownership + independence 🗝️",
  },
  {
    title: "Customer Convenience ",
    emoji: "🤝",
    noWebsite: {
      text: "Customer can't find your hours ⏰ → goes elsewhere 🏃‍♂️",
      img: "/image/websites/noweb-3.png",
    },
    withWebsite: {
      text: "Site has hours, FAQs ❓, booking 📅, orders 🛍️ → instant answers ⚡",
      img: "/image/websites/withweb-3.png",
    },
    result: "Without: friction 🪨. With: smooth journey 🚀",
  },
  {
    title: "Competitive Edge ",
    emoji: "⚔️",

    noWebsite: {
      text: "Competitor shows up polished with testimonials 📝. You? Invisible 👻",
      img: "/image/websites/noweb-4.png",
    },
    withWebsite: {
      text: "Your site showcases portfolio 💼 + request a quote form ✍️ → you win projects 🏆",
      img: "/image/websites/withweb-4.png",
    },
    result: "No site = invisible ❌. With site = equal (or better) footing ✅",
  },
  {
    title: "Revenue Opportunities ",
    emoji: "💰",

    noWebsite: {
      text: "Manually DM'ing products on FB 📩. Slow 🐌 + customers leave 🏃‍♀️",
      img: "/image/websites/noweb-5.png",
    },
    withWebsite: {
      text: "Online catalog 🛒. Customers browse + buy 24/7 🕒 → money while you sleep 😴💵",
      img: "/image/websites/withweb-5.png",
    },
    result: "No site = missed sales 🛑. With site = scalable income 📈",
  },
  {
    title: "Perception of Size & Reach ",
    emoji: "🌍",

    noWebsite: {
      text: "Without a site, big clients think you're small 🐜 + won't consider you ❌",
      img: "/image/websites/noweb-6.png",
    },
    withWebsite: {
      text: "Your site makes you look bigger 🌟 + more professional 🤝 → partnerships + contracts 📑",
      img: "/image/websites/withweb-6.png",
    },
    result: "No site = underestimated 🤷. With site = doors open 🚪✨",
  },
];

const Projects = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Swipe support
  const handleTouchStart = (e: React.TouchEvent) =>
    (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prevSlide();
    if (deltaX < -50) nextSlide();
  };

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % carouselItems.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Parent Background with Gradient Split */}
      <div className="absolute inset-0">
        <div className="hidden md:block h-full w-full bg-gradient-to-r from-red-100 via-white to-green-100 opacity-70" />
        <div className="block md:hidden h-full w-full bg-gradient-to-b from-red-100 via-white to-green-100 opacity-70" />
      </div>

      <div className="container-section relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
            <Code size={16} className="text-primary" />
            <span className="text-sm font-medium">
              Websites That Work for You 🚀
            </span>
          </div>
          <h2 className="heading-lg mb-6 gradient-text inline-block">
            Why Every Business Needs a Website 🌐
          </h2>
          <p className="subheading max-w-3xl mx-auto leading-relaxed">
            A strong online presence is no longer optional — it's{" "}
            <span className="font-semibold text-primary">essential ✅</span>. Your
            website is your{" "}
            <span className="font-semibold">24/7 storefront 🏪</span>, your digital
            sales rep 🤖, and your trust-builder 🤝.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden mb-28 max-w-2xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-8 rounded-3xl bg-white/50 backdrop-blur-2xl border border-white/30 shadow-lg"
            >
              <h3 className="font-bold text-2xl mb-6 text-center gradient-text">
                {carouselItems[current].title}
                <span className="text-primary">{carouselItems[current].emoji}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* No Website */}
                <div className="relative p-4 rounded-2xl overflow-hidden border border-red-300 bg-gradient-to-t from-red-600/60 to-red-200/40 backdrop-blur-sm shadow-md">
                  {/* Fixed image container with portrait aspect ratio, no margins */}
                  <div className="relative w-full aspect-[3/5] rounded-lg overflow-hidden mb-3">
                    <img
                      src={carouselItems[current].noWebsite.img}
                      alt="No Website"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 bg-red-900/70 text-white rounded-lg p-3 mt-2">
                    <p className="text-xs font-bold uppercase mb-1">
                      ❌ No Website
                    </p>
                    <p className="text-sm">
                      {carouselItems[current].noWebsite.text}
                    </p>
                  </div>
                </div>

                {/* With Website */}
                <div className="relative p-4 rounded-2xl overflow-hidden border border-green-300 bg-gradient-to-t from-green-600/60 to-green-200/40 backdrop-blur-sm shadow-md">
                  {/* Fixed image container with portrait aspect ratio, no margins */}
                  <div className="relative w-full aspect-[3/5] rounded-lg overflow-hidden mb-3">
                    <img
                      src={carouselItems[current].withWebsite.img}
                      alt="With Website"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 bg-green-900/70 text-white rounded-lg p-3 mt-2">
                    <p className="text-xs font-bold uppercase mb-1">
                      ✅ With Website
                    </p>
                    <p className="text-sm">
                      {carouselItems[current].withWebsite.text}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-primary text-center">
                {carouselItems[current].result}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {carouselItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-3.5 w-3.5 rounded-full transition ${
                  i === current ? "bg-primary scale-110" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Closing Argument */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            I don't just build websites — I craft{" "}
            <span className="font-semibold text-primary">
              digital growth engines 🚀
            </span>{" "}
            that get businesses noticed 👀, trusted 🤝, and paid 💵. Let's
            transform your ideas into an online presence that{" "}
            <span className="font-semibold text-secondary">works for you 🌟</span>.
          </p>
        </motion.div>
      </div>

      {/* Nav Arrows */}
      <button
        onClick={prevSlide}
        className="fixed top-1/2 left-6 -translate-y-1/2 z-[9999] bg-primary text-white p-4 rounded-full hover:bg-primary/80 transition"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={nextSlide}
        className="fixed top-1/2 right-6 -translate-y-1/2 z-[9999] bg-primary text-white p-4 rounded-full hover:bg-primary/80 transition"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
};

export default Projects;