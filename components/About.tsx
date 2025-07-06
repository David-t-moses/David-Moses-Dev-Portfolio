"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Head from "./Head";

const About: React.FC = () => {
  const aboutData = [
    {
      img: "/image-1.png",
      question: "WHY ME?",
      answer:
        "I deliver tailored web development solutions that drive growth, combining expertise in frontend and backend technologies. With a focus on results, clear communication, and fast turnaround, I ensure your website is optimized for success.",
    },
    {
      img: "/image-2.png",
      question: "HOW I WORK",
      answer:
        "I start by understanding your business needs, then design and develop a customized, responsive website. After thorough testing and gathering feedback, I launch your site and provide ongoing support.",
    },
    {
      img: "/image-3.png",
      question: "PROVEN RESULTS",
      answer:
        "I'm committed to delivering measurable results by focusing on your business growth. Every website I build prioritizes performance, user experience, and conversion optimization using data-driven approaches.",
    },
  ];

  const AboutCard = ({
    img,
    question,
    answer,
    className,
  }: {
    img: string;
    question: string;
    answer: string;
    className?: string;
  }) => {
    return (
      <motion.div
        className={cn(
          "relative inline-flex overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full h-full",
          className
        )}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="inline-flex flex-col h-full w-full cursor-pointer items-center justify-start rounded-2xl bg-slate-950 p-6 text-sm font-medium text-white backdrop-blur-3xl overflow-hidden">
          {/* Image and Title Section */}
          <motion.div
            className="w-full text-center mb-4 flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="w-14 h-14 mx-auto rounded-full overflow-hidden bg-blue_bg p-1 mb-3"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={img}
                alt={question}
                height={56}
                width={56}
                className="w-full h-full rounded-full object-cover"
              />
            </motion.div>

            <motion.h3
              className="text-base font-bold text-white leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {question}
            </motion.h3>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="flex-1 flex items-start justify-center w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <p className="text-slate-300 text-sm leading-relaxed text-center break-words hyphens-auto">
              {answer}
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
        staggerChildren: 0.2,
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
      className="w-full p-6 py-20 flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto"
      id="about"
    >
      <Head heading="About Me" />

      <motion.div
        className="max-w-6xl w-full px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Top Row - 2 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {aboutData.slice(0, 2).map((item, index) => (
            <motion.div
              key={`${item.question}-${index}`}
              className="w-full flex justify-center"
              variants={itemVariants}
            >
              <AboutCard
                img={item.img}
                question={item.question}
                answer={item.answer}
                className="w-full max-w-[450px] min-h-[280px]"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Row - 1 Card Centered */}
        <div className="flex justify-center">
          <motion.div
            className="w-full max-w-[450px] flex justify-center"
            variants={itemVariants}
          >
            <AboutCard
              img={aboutData[2].img}
              question={aboutData[2].question}
              answer={aboutData[2].answer}
              className="w-full min-h-[260px]"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
