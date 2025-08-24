"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useAnimation, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Handshake,
  Globe,
  Target,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useMagneticElement } from "@/hooks/useGSAP"; // custom hook for magnet effect

gsap.registerPlugin(ScrollTrigger);

/** -----------------------------------------------
 * Traits Config (now with emojis + pastel bg colors)
 * ----------------------------------------------- */
type Trait = {
  label: string;
  emoji: string;
  bg: string;
};

const TRAITS: Trait[] = [
  {
    label: "Websites that bring in more sales and inquiries — not just clicks",
    emoji: "💰",
    bg: "bg-green-100 text-green-800",
  },
  {
    label: "Designs that instantly build trust so customers choose you over competitors",
    emoji: "🤝",
    bg: "bg-blue-100 text-blue-800",
  },
  {
    label: "Lightning-fast load speed — because every second lost costs customers",
    emoji: "⚡",
    bg: "bg-yellow-100 text-yellow-800",
  },
  {
    label: "Mobile-first experience that captures buyers wherever they are",
    emoji: "📱",
    bg: "bg-purple-100 text-purple-800",
  },
  {
    label: "Optimized to appear on Google — so customers find your business first",
    emoji: "🔍",
    bg: "bg-pink-100 text-pink-800",
  },
  {
    label: "Tailored solutions focused on growth, not cookie-cutter templates",
    emoji: "📈",
    bg: "bg-indigo-100 text-indigo-800",
  },
];


/** -----------------------------------------------
 * Framer Motion Variants
 * ----------------------------------------------- */
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

/** -----------------------------------------------
 * About Section
 * ----------------------------------------------- */
const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      gsap.fromTo(
        ".about-eyebrow",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-heading",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-sub",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, aboutRef);

    controls.start("show");

    return () => ctx.revert();
  }, [controls]);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-60 w-60 rounded-full bg-pink-500/10 blur-2xl" />
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="container-section relative z-10"
      >
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-14">
          <motion.div
            variants={fadeUp}
            className="about-eyebrow inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm text-muted-foreground"
          >
            <TrendingUp className="h-4 w-4" />
            About Paulo
          </motion.div>

          <h2 className="about-heading heading-lg mt-5">
            <span className="text-gradient">Not just a developer—</span>
            <br className="hidden sm:block" />
            <span className="text-foreground">your business partner.</span>
          </h2>

          <p className="about-sub subheading mt-4 text-muted-foreground">
            I align technology with business goals—solving real problems,
            earning trust, and helping owners grow through reliable,
            conversion-focused web experiences.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT: Identity Card */}
          <motion.div variants={popIn} className="lg:col-span-2 space-y-8">
            <Card className="glass-card rounded-2xl shadow-lg border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold">
                  Paulo L. Abaquita
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary">Creative</Badge>
                  <Badge className="bg-green-500/15 text-green-700 border-green-500/20">
                    Ready to Help You Grow
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    Philippines
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                  <Target className="w-5 h-5 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Imagine a website that doesn’t just look good—it works hard for you.
                    I help turn your visitors into customers and your traffic into
                    real business growth.
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <p className="font-medium mb-1">What clients love</p>
                  <p className="text-sm text-muted-foreground">
                    Stress-free collaboration, clear communication, and results that
                    make the investment worth it. You’ll always know where things stand.
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <p className="font-medium mb-1">The process that works</p>
                  <p className="text-sm text-muted-foreground">
                    Discovery → Strategy → Build → Refine. Every step is designed to
                    save you time, reduce headaches, and deliver measurable outcomes
                    you can actually use to grow.
                  </p>
                </div>
              </CardContent>
            </Card>


            {/* NEW: Secondary Container below */}
            <Card className="rounded-2xl shadow-lg border-border/60 bg-gradient-to-br from-muted/30 to-background">
              <CardContent className="p-6">
                <p className="text-lg font-semibold mb-2">
                  More Than Just a Website
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A website shouldn’t be an expense—it should be an <span className="font-semibold">investment that pays you back</span>.
                  I build sites that attract the right visitors, earn their trust, and turn them into paying customers.
                  The result? <span className="font-semibold">More leads, more sales, and more time to focus on growing your business</span> instead of chasing customers.
                </p>
              </CardContent>

            </Card>
          </motion.div>

          {/* RIGHT: Narrative + Traits */}
          <motion.div variants={fadeUp} className="lg:col-span-3 space-y-6">
            <Card className="rounded-2xl shadow-lg border-border/60">
              <CardContent className="p-6 lg:p-8">
                <motion.p
                  variants={fadeUp}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  Every day, businesses lose customers to competitors—not because they’re
                  better, but because their <span className="font-semibold">website does
                    the selling for them</span>. I build websites that work as your{" "}
                  <span className="font-semibold">24/7 business partner</span>: attracting
                  the right audience, building trust instantly, and converting visitors
                  into sales. Whether it’s a professional business site, a powerful
                  e-commerce store, or a stunning portfolio, I focus on creating{" "}
                  <span className="font-semibold">clear, effective solutions</span> that
                  drive measurable growth and help your business thrive.
                </motion.p>


                {/* Traits with Magnetic Effect + Rectangle Pastel BG */}
                <div className="relative mt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TRAITS.map((t, i) => {
                      const traitRef = useMagneticElement({ strength: 0.12 }); // reduced sensitivity
                      return (
                        <div
                          key={i}
                          ref={traitRef as React.RefObject<HTMLDivElement>}
                          className={`trait-chip relative flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-sm hover:shadow-md transition-shadow ${t.bg}`}
                        >
                          <span className="text-lg">{t.emoji}</span>
                          <span className="whitespace-normal">{t.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust & Impact Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={popIn}>
                <Card className="rounded-2xl border-border/60">
                  <CardContent className="p-5 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Trusted</p>
                      <p className="text-sm text-muted-foreground">
                        No surprises—clear pricing, on-time delivery.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={popIn}>
                <Card className="rounded-2xl border-border/60">
                  <CardContent className="p-5 flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Results</p>
                      <p className="text-sm text-muted-foreground">
                        SEO, speed, UX—all built to grow your business.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={popIn}>
                <Card className="rounded-2xl border-border/60">
                  <CardContent className="p-5 flex items-start gap-3">
                    <Handshake className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-medium">Smooth Process</p>
                      <p className="text-sm text-muted-foreground">
                        Fast, friendly, and hassle-free collaboration.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;