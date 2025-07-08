"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { PinContainer } from "./ui/3d-pin";
import ThreeDCard from "./ThreeDCard";
import Head from "./Head";

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projectsData = [
    // 1. Lydia Esenam (New)
    {
      src: "/lydiaesenam.png",
      alt: "Lydia Esenam Personal Brand",
      title: "Lydia Esenam - Education Consultant",
      link: "https://lydiaesenam.ca/",
      desc: "A sophisticated personal branding platform for a leading Canadian education consultant specializing in international student placements. Features client testimonials, service breakdowns, and an integrated booking system, designed with elegant typography and trust-building elements to attract students seeking overseas education guidance.",
    },
    // 2. DTM Tech Solutions (Existing, moved to top)
    {
      src: "/DTM-Tech-Solutions.png",
      alt: "DTM Tech Solutions Preview",
      title: "DTM Tech Solutions",
      link: "https://dtmtechsolutions.vercel.app/",
      desc: "A cutting-edge IT consultancy website built with Next.js, featuring dynamic service pages, case studies, and interactive tech demos. Designed for B2B clients, it highlights cybersecurity, cloud solutions, and custom software development with a fast, responsive interface.",
    },
    // 3. CloudeSports Tokens (New)
    {
      src: "/cloudesports-tokens.png",
      alt: "CloudeSports Tokens Platform",
      title: "CloudeSports Fortnite Tokens",
      link: "https://cloudesports-tokens.vercel.app/",
      desc: "A competitive gaming-finance platform where Fortnite players wager tokens for real cash prizes. Includes secure payment gateways, live match tracking, and a leaderboard system—all wrapped in a bold, esports-themed UI that appeals to gamers and streamers.",
    },
    // 4. Horizon Banking (Existing)
    {
      src: "/horizon.jpg",
      alt: "horizon img",
      title: "Horizon - Banking System",
      link: "https://horizon-banking-system-jet.vercel.app/",
      desc: "A secure online banking platform with real-time transaction tracking, multi-account management, and fraud detection alerts. Built with a focus on UX, offering seamless navigation for both desktop and mobile users.",
    },
    // 5. Nokless (New)
    {
      src: "/nokless.png",
      alt: "Nokless Smart Security",
      title: "Nokless Security SaaS",
      link: "https://nokless.vercel.app/",
      desc: "A smart security SaaS landing page showcasing AI-powered visitor monitoring and remote access control. Features include facial recognition, real-time alerts, and smartphone integration—targeting modern homeowners and businesses.",
    },
    // 6. Elevate Media (Existing)
    {
      src: "/Elevate Media.png",
      alt: "Elevate Media img",
      title: "Elevate Media Website",
      link: "https://elevatemedia-marketing.com/",
      desc: "A high-performance marketing agency website with smooth animations, case studies, and a lead-generation focus. Designed to convert visitors into clients through persuasive copy and sleek visuals.",
    },
    // 7. Kbiz Web Design (Existing)
    {
      src: "/kbiz.png",
      alt: "Kbiz Web Design Img",
      title: "Kbiz Web Design",
      link: "https://kbiz.tech",
      desc: "A portfolio for a web design agency, showcasing services, client work, and testimonials. Built with a minimalist aesthetic to highlight their design expertise.",
    },
    // 8. Sudarshan Construction (Existing)
    {
      src: "/sudarshan-co.png",
      alt: "Sudarshan Construction Img",
      title: "Sudarshan Construction",
      link: "https://sudarshan-construction.vercel.app/",
      desc: "A construction company website featuring project galleries, service details, and contact forms. Designed to establish credibility and attract commercial clients.",
    },
    // 9. Dave's Portfolio (Existing)
    {
      src: "/dave-portfolio.png",
      alt: "Dave's Portfolio img",
      title: "Stunning Portfolio",
      link: "https://david-moses.vercel.app",
      desc: "A sleek developer portfolio with interactive project showcases, skill breakdowns, and a contact form. Built to impress potential employers and clients.",
    },
  ];

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 3);

  const handleToggle = async () => {
    setIsTransitioning(true);

    if (showAll) {
      // When collapsing, wait for animation to start then scroll
      setTimeout(() => {
        projectsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }

    setShowAll(!showAll);

    // Reset transition state after animation completes (increased time)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1800);
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      y: -60,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={projectsRef}
      className="relative w-full py-[100px] flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto overflow-x-hidden"
      id="projects"
    >
      <div className="absolute size-3/5 w-4/5 border bg-blue_bg -right-[60%] blur-[100px] rounded-full" />
      <div className="absolute size-3/5 w-4/5 border bg-blue_bg -left-[60%] blur-[100px] rounded-full" />

      <Head heading="Some Latest Projects" className="mx-auto" />

      <div className="max-w-7xl flex flex-col mx-auto justify-center w-full px-4 xl:px-14 pt-10">
        <LayoutGroup>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            layout
            transition={{
              layout: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            <AnimatePresence mode="sync">
              {displayedProjects.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="w-full max-w-[380px]"
                  variants={itemVariants}
                  layout
                  layoutId={`project-${item.title}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{
                    layout: {
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                >
                  <PinContainer
                    link={item.link}
                    containerClassName="w-full h-[450px]"
                  >
                    <ThreeDCard
                      src={item.src}
                      alt={item.alt}
                      title={item.title}
                      desc={item.desc}
                    />
                  </PinContainer>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Show More/Less Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <motion.button
            onClick={handleToggle}
            disabled={isTransitioning}
            className={`px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2 relative overflow-hidden ${
              isTransitioning ? "opacity-75 cursor-not-allowed" : ""
            }`}
            whileHover={
              !isTransitioning
                ? {
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                    transition: { duration: 0.3 },
                  }
                : {}
            }
            whileTap={
              !isTransitioning
                ? {
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  }
                : {}
            }
            layout
          >
            {/* Background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0"
              whileHover={!isTransitioning ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
            />

            <motion.span
              className="relative z-10"
              layout
              transition={{ duration: 0.4 }}
            >
              {showAll ? "Show Less" : "Show More Projects"}
            </motion.span>

            <motion.svg
              className="w-5 h-5 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                rotate: showAll ? 180 : 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
