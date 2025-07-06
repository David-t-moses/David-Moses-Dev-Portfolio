"use client";

import React, { useState } from "react";
import Head from "./Head";
import Image from "next/image";
import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Modal Component
  const SuccessModal = () => (
    <AnimatePresence>
      {showSuccessModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSuccessModal(false)}
        >
          <motion.div
            className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full mx-4 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-300 mb-6">
                Thank you for reaching out! I'll get back to you within 24
                hours.
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Custom Submit Button Component with border effects
  const SubmitButton = ({
    children,
    className,
    type = "submit",
    disabled = false,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    [key: string]: any;
  }) => {
    return (
      <motion.button
        className={cn(
          "relative inline-flex overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full",
          disabled && "opacity-70 cursor-not-allowed",
          className
        )}
        type={type}
        disabled={disabled}
        whileHover={
          !disabled
            ? {
                scale: 1.02,
                transition: { duration: 0.2 },
              }
            : {}
        }
        whileTap={!disabled ? { scale: 0.98 } : {}}
        {...props}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-medium text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors duration-200">
          {children}
        </span>
      </motion.button>
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
      className="w-full pt-[100px] pb-5 lg:px-10 flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto overflow-hidden"
      id="contact"
    >
      <Head heading="Let's Have a Chat" className="mx-auto" />

      <motion.div
        className="max-w-7xl flex flex-col mx-auto justify-center w-full px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex justify-between items-center w-full max-md:flex-col-reverse mx-auto gap-8">
          {/* Left Side - Image and Info */}
          <motion.div
            className="relative flex lg:w-1/2 w-full h-[20rem] md:h-[35rem] max-h-full min-h-full"
            variants={itemVariants}
          >
            <Image
              src="/contact-img.jpg"
              alt="contact"
              height={1000}
              width={1000}
              className="opacity-80 rounded-2xl object-cover"
            />
            <div className="absolute left-5 bottom-5 flex max-md:flex-col text-white">
              <div className="flex max-md:flex-col justify-between items-start gap-5 text-left flex-wrap">
                <h2 className="font-bold text-lg w-full">
                  BELIEVE IN <span className="text-blue-400">DAVID</span>{" "}
                </h2>

                <div className="md:w-4/5">
                  <h3 className="font-bold">EMAIL</h3>
                  <a
                    href="mailto:davidtmoses5@gmail.com"
                    className="text-white hover:underline hover:text-blue-400 transition-colors duration-200"
                  >
                    davidtmoses5@gmail.com
                  </a>
                </div>

                <div className="md:w-4/5">
                  <h3 className="font-bold">WORKING HOURS</h3>
                  <p>9:00AM - 5:00PM</p>
                </div>

                <div className="flex gap-3 text-xl">
                  <Link
                    href="https://github.com/david-t-moses/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
                  >
                    <FaGithub />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/dtm-tech-solutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
                  >
                    <FaLinkedin />
                  </Link>
                  <Link
                    href="https://x.com/david-t-moses"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
                  >
                    <FaXTwitter />
                  </Link>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61572584128806"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
                  >
                    <FaFacebook />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            className="w-full lg:w-1/2 text-left flex justify-center items-center"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Custom Submit Button with Border Effects */}
              <SubmitButton className="mt-6" disabled={isSubmitting}>
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </span>
              </SubmitButton>

              <p className="text-sm text-gray-400 text-center mt-4">
                I'll get back to you within 24 hours!
              </p>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <SuccessModal />
    </section>
  );
};

export default Contact;
