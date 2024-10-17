"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import Button from "./ui/Button";
import { FaXmark } from "react-icons/fa6";

const Notification: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Wait 1 second before showing the notification

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 500); // Wait for the animation to finish before hiding
  };

  if (!isVisible) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Subscription successful!");
        setEmail("");
        setName("");
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex top-[5%] lg:top-[7%] w-[95%] max-w-xl rounded-3xl bg-blue_bg z-50 max-sm:p-5 max-sm:top-[3.7%] subscription-notification ${
        isClosing ? "closing" : ""
      }`}
    >
      <div className="relative">
        <FaXmark
          className="absolute text-white top-3 right-3 text-2xl cursor-pointer"
          onClick={handleClose}
        />
        <div className="flex flex-col justify-between items-center text-white p-20 max-sm:p-5">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Hey👋 You're Welcome!</h1>
            <p className="">
              Subscribe to our newsletter now to get E-books, Resources and
              other contents helpful for your websites, businesses and career
              Weekly for FREE.
            </p>
          </div>
          <div className="flex flex-col w-full p-4 rounded-3xl border mt-5">
            <form onSubmit={handleSubmit}>
              <LabelInputContainer className="my-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="your full name"
                  type="text"
                  className="h-12 max-sm:h-8 bg-white text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer className="my-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="your email address"
                  type="email"
                  className="h-12 max-sm:h-8 bg-white text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </LabelInputContainer>
              <Button
                answer="Subscribe"
                className="rounded-xl h-12  max-sm:h-8 w-full max-w-full flex flex-nowrap"
                spanClassName="rounded-xl bg-zinc-800 flex flex-nowrap"
                type="submit"
              />

              <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 max-sm:my-4 h-[1px] w-full" />
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default Notification;
