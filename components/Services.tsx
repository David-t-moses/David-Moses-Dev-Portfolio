"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Website Development",
      description: "Custom websites built with modern frameworks, optimized for performance and user experience.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver seamless experiences on any device.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
          <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
          <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      id: 3,
      title: "Ecommerce Development",
      description: "Full-featured online stores with secure payments, inventory management, and conversion optimization.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
          <circle cx="9" cy="21" r="1" fill="currentColor"/>
          <circle cx="20" cy="21" r="1" fill="currentColor"/>
          <path d="M1 1H5L7.68 14.39C7.77 14.82 8.16 15.13 8.6 15.13H19.4C19.84 15.13 20.23 14.82 20.32 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Content Management System",
      description: "Easy-to-use CMS solutions that empower you to manage your content without technical knowledge.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
          <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: 5,
      title: "SEO Optimization",
      description: "Strategic SEO implementation to boost your visibility, drive organic traffic, and improve rankings.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
          <path d="M22 12L18 8L13 13L9 9L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 8H22V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="8" r="6" fill="currentColor" fillOpacity="0.2"/>
        </svg>
      ),
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 6,
      title: "Website Maintenance",
      description: "Ongoing support, updates, and monitoring to keep your site secure, fast, and running smoothly.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
          <path d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9L13.1 3.3C12.7 2.9 12.1 2.9 11.7 3.3L10.3 4.7L13.3 7.7L14.7 6.3Z" fill="currentColor" fillOpacity="0.3"/>
          <path d="M9 6L3 12V16L7 20H11L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.3 4.7L2.5 12.5C2.2 12.8 2 13.2 2 13.6V16.4C2 16.8 2.2 17.2 2.5 17.5L6.5 21.5C6.8 21.8 7.2 22 7.6 22H10.4C10.8 22 11.2 21.8 11.5 21.5L19.3 13.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" id="services">
      {/* Decorative background elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
            <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
              Services
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            What I{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Comprehensive development solutions tailored to your needs — from concept to launch and beyond.
          </p>
        </div>

        {/* Services Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-2xl transition-all duration-500 text-white`}
                style={{
                  boxShadow: `0 20px 60px -15px rgba(99, 102, 241, 0.3)`,
                }}
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed px-4 group-hover:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div className={`w-16 h-1 mx-auto mt-6 bg-gradient-to-r ${service.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-gray-400 mb-6">
            Need something specific? Let's discuss your project requirements.
          </p>
          <Link href="/#contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/40 transition-all text-base"
          >
            Get a Free Consultation →
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}