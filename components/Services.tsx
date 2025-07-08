"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Head from "./Head";

const Services = () => {
  const servicesData = [
    {
      img: "/image-6.png",
      answer: "Website Development",
    },
    {
      img: "/image-5.png",
      answer: "Mobile App Development",
    },
    {
      img: "/image-7.png",
      answer: "Ecommerce Development",
    },
    {
      img: "/image-8.png",
      answer: "Content Management System",
    },
    {
      img: "/image-9.png",
      answer: "SEO Optimization",
    },
    {
      img: "/image-10.png",
      answer: "Website Maintenance",
    },
  ];

  const ServiceCard = ({
    img,
    answer,
    className,
  }: {
    img: string;
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
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="inline-flex flex-col h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 p-6 text-sm font-medium text-white backdrop-blur-3xl overflow-hidden">
          {/* Image Section */}
          <motion.div
            className="w-full text-center mb-4 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-blue_bg p-2 mb-3"
              whileHover={{
                scale: 1.1,
                rotate: 10,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={img}
                alt={answer}
                height={60}
                width={60}
                className="w-full h-full rounded-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Service Title */}
          <motion.div
            className="flex-1 flex items-center justify-center w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="text-white text-base font-semibold text-center leading-tight">
              {answer}
            </h3>
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
    <section
      className="w-full py-[100px] flex flex-col justify-center items-center max-md:text-center bg-slate-950"
      id="services"
    >
      <div className="max-w-7xl w-full px-4">
        <Head heading="Services" className="mx-auto" />

        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto justify-center w-full">
            {servicesData.map((item, index) => (
              <motion.div
                key={`${item.answer}-${index}`}
                className="w-full flex justify-center"
                variants={itemVariants}
              >
                <ServiceCard
                  img={item.img}
                  answer={item.answer}
                  className="w-full max-w-[320px] min-h-[200px]"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
