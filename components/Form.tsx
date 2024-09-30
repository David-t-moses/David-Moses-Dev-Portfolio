"use client";
import React, { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Button from "./ui/Button";
import { FaPaperPlane } from "react-icons/fa6";

export function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      setMessage("");
      alert("Message sent successfully");
    } else {
      alert("Failed to send message");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:pl-8 md:pr-0 shadow-input bg-transparent">
      <p className="text-white text-lg max-w-sm mt-2 font-bold text-center">
        Leave your mail and I will get back to you within 24 hours
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="firstname">Name</Label>
          <Input
            id="firstname"
            placeholder="David Moses"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="davidtmoses5@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="I need a website.."
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </LabelInputContainer>
        <Button
          answer="Submit"
          icon={<FaPaperPlane />}
          className="rounded-xl h-12 w-full max-w-full flex flex-nowrap"
          spanClassName="rounded-xl bg-zinc-800 flex flex-nowrap"
          type="submit"
        />

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
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
