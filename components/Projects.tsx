"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PinContainer } from "./ui/3d-pin";
import ThreeDCard from "./ThreeDCard";
import Head from "./Head";

export function Projects() {
  const [showAll, setShowAll] = useState(false);

  const projectsData = [
    {
      src: "/horizon.jpg",
      alt: "horizon img",
      title: "Horizon - Banking System",
      link: "https://horizon-banking-system-jet.vercel.app/",
      desc: "A secure, user-friendly web platform providing seamless navigation, real-time transaction tracking, and account management.",
    },
    {
      src: "/DTM-Tech-Solutions.png",
      alt: "DTM Tech Solutions Preview",
      title: "DTM Tech Solutions",
      link: "https://dtmtechsolutions.vercel.app/",
      desc: "A cutting-edge tech consultancy website built with modern frameworks, featuring dynamic content loading for IT services.",
    },
    {
      src: "/Elevate Media.png",
      alt: "Elevate Media img",
      title: "Elevate Media Website",
      link: "https://elevatemedia-marketing.com/",
      desc: "A visually striking, high-performance marketing agency website with seamless animations and engaging UI/UX.",
    },
    {
      src: "/kbiz.png",
      alt: "Kbiz Web Design Img",
      title: "Kbiz Web Design",
      link: "https://kbiz.tech",
      desc: "A professional web design agency platform showcasing services, portfolio, and client testimonials with modern design.",
    },
    {
      src: "/sudarshan-co.png",
      alt: "Sudarshan Construction Img",
      title: "Sudarshan Construction",
      link: "https://sudarshan-construction.vercel.app/",
      desc: "A comprehensive construction company website featuring project showcases, services, and contact information.",
    },
    {
      src: "/dave-portfolio.png",
      alt: "Dave's Portfolio img",
      title: "Stunning Portfolio",
      link: "https://david-moses.vercel.app",
      desc: "A sleek, modern portfolio showcasing expertise in crafting dynamic, conversion-driven web experiences.",
    },
    {
      src: "/Furtniture Website.png",
      alt: "Furniture Website img",
      title: "Furniture Landing Page",
      link: "https://furniture-landing-page.onrender.com/",
      desc: "A sleek, responsive landing page template for furniture brands with high-quality visuals and minimalist design.",
    },
    {
      src: "/ecommerce-demo.png",
      alt: "E-commerce Demo img",
      title: "E-commerce Platform",
      link: "https://ecommerce-demo.vercel.app/",
      desc: "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.",
    },
    {
      src: "/restaurant-app.png",
      alt: "Restaurant App img",
      title: "Restaurant Management",
      link: "https://restaurant-management.vercel.app/",
      desc: "A comprehensive restaurant management system with online ordering, table reservations, and inventory tracking.",
    },
  ];

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      className="relative w-full py-[100px] flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto overflow-x-hidden"
      id="projects"
    >
      <div className="absolute size-3/5 w-4/5 border bg-blue_bg -right-[60%] blur-[100px] rounded-full" />
      <div className="absolute size-3/5 w-4/5 border bg-blue_bg -left-[60%] blur-[100px] rounded-full" />

      <Head heading="Some Latest Projects" className="mx-auto" />

      <div className="max-w-7xl flex flex-col mx-auto justify-center w-full px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {displayedProjects.map((item, index) => (
              <motion.div
                key={item.title}
                className="w-full max-w-[380px]"
                variants={itemVariants}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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

        {/* Show More/Less Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? (
              <>
                Show Less
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </>
            ) : (
              <>
                Show More Projects
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
