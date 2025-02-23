"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Button from "./ui/Button";
import { FaPaperPlane } from "react-icons/fa6";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactEmail } from "@/lib/actions/contact";

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
  
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setShowModal(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(result.error || "Failed to send message");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
    setLoading(false);
  };
  

  return (
    <>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:pl-8 md:pr-0 shadow-input bg-transparent">
        <p className="text-white text-lg max-w-sm mt-2 font-bold text-center">
          Leave your mail and I will get back to you within 24 hours
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="David Moses"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="davidtmoses5@gmail.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="I need a website.."
              type="text"
              value={formData.subject}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="message">Message</Label>
            <textarea
              name="message"
              id="message"
              placeholder="Looking for a proficient Software Developer skilled in React and NextJs for a specific project."
              className="flex h-24 w-full border-none bg-zinc-800 text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </LabelInputContainer>
          <Button
            answer="Submit"
            icon={<FaPaperPlane />}
            className={cn(
              "rounded-xl h-12 w-full max-w-full flex flex-nowrap",
              !isFormValid() && "opacity-50 cursor-not-allowed"
            )}
            spanClassName="rounded-xl bg-zinc-800 flex flex-nowrap"
            type="submit"
            disabled={!isFormValid() || loading}
          />
        </form>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-950 p-8 rounded-2xl max-w-md mx-4 shadow-xl border border-[#03186B]/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#03186B]/10 background-pattern opacity-20" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-[#03186B]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#03186B]/30">
                  <FaPaperPlane className="text-white text-2xl transform -rotate-45" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 text-center">
                  Message Sent!
                </h3>
                <p className="text-gray-300 mb-8 text-center leading-relaxed">
                  Thank you for reaching out. I'll review your message and get
                  back to you within 24 hours during business days.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-[#03186B] text-white px-8 py-3 rounded-xl hover:bg-[#03186B]/80 transition-colors duration-300 font-medium"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
