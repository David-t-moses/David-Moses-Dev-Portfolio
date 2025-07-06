"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { BackgroundBeamsWithCollision } from "./ui/Background";
import { useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Expanded typewriter effect with more phrases
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "I Build Modern Web Applications",
    "I Create Stunning User Experiences",
    "I Develop Scalable Solutions",
    "I Transform Ideas Into Reality",
    "I Craft Interactive Digital Experiences",
    "I Design Responsive Web Interfaces",
    "I Build Full-Stack Applications",
    "I Create High-Performance Websites",
    "I Develop Custom Software Solutions",
    "I Turn Concepts Into Code",
    "I Build SEO-Optimized Platforms",
    "I Create Mobile-First Designs",
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentPhrase.length) {
            setDisplayText(currentPhrase.slice(0, displayText.length + 1));
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 2500);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 30 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, phrases]);

  return (
    <header
      ref={ref}
      className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden"
      id="home"
    >
      <BackgroundBeamsWithCollision>
        {/* Subtle Background Effects */}
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 -top-20 -left-20 blur-[80px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/20 -bottom-20 -right-20 blur-[80px] rounded-full"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Strategic Floating Code Tags - Closer to Center */}
        <motion.div
          className="absolute top-32 left-1/4 bg-gray-900/80 backdrop-blur-sm border border-blue-400/20 rounded-lg px-3 py-2 text-xs text-green-400 font-mono"
          animate={{
            y: [-5, 5, -5],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {"<html>"}
        </motion.div>

        <motion.div
          className="absolute top-28 right-1/4 bg-gray-900/80 backdrop-blur-sm border border-purple-400/20 rounded-lg px-3 py-2 text-xs text-purple-400 font-mono"
          animate={{
            y: [5, -5, 5],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          {"className='flex'"}
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-16 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm border border-cyan-400/20 rounded-lg px-3 py-2 text-xs text-cyan-400 font-mono"
          animate={{
            y: [-3, 3, -3],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          {"const dev = () => {}"}
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-16 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm border border-yellow-400/20 rounded-lg px-3 py-2 text-xs text-yellow-400 font-mono"
          animate={{
            y: [4, -4, 4],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          {"npm install"}
        </motion.div>

        <motion.div
          className="absolute bottom-24 left-1/4 bg-gray-900/80 backdrop-blur-sm border border-pink-400/20 rounded-lg px-3 py-2 text-xs text-pink-400 font-mono"
          animate={{
            y: [-4, 4, -4],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          {"bg-gradient-to-r"}
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-1/4 bg-gray-900/80 backdrop-blur-sm border border-orange-400/20 rounded-lg px-3 py-2 text-xs text-orange-400 font-mono"
          animate={{
            y: [3, -3, 3],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        >
          {"</developer>"}
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="flex flex-col items-center justify-center w-full max-w-4xl px-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full mr-2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              Available for Projects
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                David Moses
              </span>
            </h1>
          </motion.div>

          {/* Typewriter Effect */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="h-16 md:h-20 flex items-center justify-center">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-300">
                {displayText}
                <motion.span
                  className="inline-block w-0.5 h-6 md:h-8 bg-blue-400 ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </h2>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-10">
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
              Full Stack Developer specializing in modern web technologies. I
              help businesses and individuals bring their digital visions to
              life with clean, efficient, and scalable solutions.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>

            <Link
              href="https://calendly.com/davidtmoses5/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="px-6 py-3 border border-blue-400 text-blue-400 font-semibold rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a call
              </motion.button>
            </Link>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-3"
          >
            <span className="text-gray-500 text-sm mr-4 flex items-center">
              Tech Stack:
            </span>
            {["React", "Next.js", "TypeScript", "Node.js", "Python"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-gray-800/30 border border-gray-700/30 rounded-md text-gray-400 text-xs hover:text-blue-400 hover:border-blue-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                >
                  {tech}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>
      </BackgroundBeamsWithCollision>
    </header>
  );
}
