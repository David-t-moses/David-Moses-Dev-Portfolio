"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Head from "./Head";

export function TechStack() {
  const techStackData = [
    {
      title: "TypeScript",
      description: "Well experienced in TypeScript for type-safe development",
      header: "/Typescript.png",
      alt: "typescript",
      className: "md:col-span-2",
    },
    {
      title: "Git & GitHub",
      description: "Proficient with version control and collaboration",
      header: "/git-github.jpg",
      alt: "git-github",
      className: "md:col-span-1",
    },
    {
      title: "TailwindCSS",
      description: "Expert in utility-first CSS framework",
      header: "/tailwind.jpeg",
      alt: "tailwind",
      className: "md:col-span-1",
    },
    {
      title: "React.JS",
      description: "Great proficiency in building dynamic user interfaces",
      header: "/react.webp",
      alt: "react",
      className: "md:col-span-2",
    },
    {
      title: "Next.JS",
      description: "Expert in building fullstack web applications with Next.js",
      header: "/nextjs.webp",
      alt: "next",
      className: "md:col-span-3",
    },
  ];

  const TechCard = ({
    title,
    description,
    header,
    alt,
    className,
  }: {
    title: string;
    description: string;
    header: string;
    alt: string;
    className?: string;
  }) => {
    return (
      <motion.div
        id="tech-stack"
        className={cn(
          "relative group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 rounded-xl overflow-hidden",
          className
        )}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated Border Effect */}
        <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300">
          <div className="w-full h-full bg-slate-950 rounded-xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 bg-slate-950 rounded-xl h-full flex flex-col">
          {/* Image Section */}
          <motion.div
            className="flex-1 w-full mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center min-h-[140px] relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-md">
              <Image
                src={header}
                alt={alt}
                fill
                className="object-cover transition-all duration-500 group-hover/bento:scale-110 group-hover/bento:brightness-110"
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Zoom overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20 rounded-md opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300" />

              {/* Tech icon overlay for better visual hierarchy */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-400 rounded-sm opacity-80" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="flex-shrink-0 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="font-bold text-white text-lg leading-tight tracking-wide group-hover/bento:text-blue-300 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed break-words hyphens-auto group-hover/bento:text-slate-200 transition-colors duration-300">
              {description}
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  };

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
    <div className="relative w-full py-[100px] flex flex-col justify-center items-center max-md:text-center bg-slate-950">
      {/* Background Effects */}
      <motion.div
        className="absolute size-3/5 w-4/5 border bg-blue_bg -right-[60%] blur-[100px] rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl w-full px-4 xl:px-14">
        <Head heading="My Tech Stack" className="mx-auto" />

        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {techStackData.map((item, i) => (
              <motion.div
                key={i}
                className={cn("", item.className)}
                variants={itemVariants}
              >
                <TechCard
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  alt={item.alt}
                  className="h-full min-h-[260px]"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
