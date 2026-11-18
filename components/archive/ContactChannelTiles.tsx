"use client";

// Earlier version (contact form that only simulated sending): components/archive/ContactBeforeBlend.tsx

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { type LucideIcon, ArrowUpRight, CalendarCheck, Github, Linkedin, Mail, MessageCircle, Twitter } from "lucide-react";
import { contact } from "@/lib/contact";

type Channel = {
  key: string;
  title: string;
  line: string;
  href: string;
  external: boolean;
  Icon: LucideIcon;
  tone: string; // icon tile colours
  primary?: boolean;
};

export default function Contact() {
  const reduce = useReducedMotion();

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent("Hi David,\n\nI would like to talk about a project.\n\n")}`;
  const wa = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi David, I would like to talk about a project.")}`
    : "";

  const channels: Channel[] = [];
  if (wa) {
    channels.push({ key: "whatsapp", title: "Message me on WhatsApp", line: "Send a message and I will reply personally.", href: wa, external: true, Icon: MessageCircle, tone: "border-emerald-300/30 bg-emerald-400/15 text-emerald-200" });
  }
  channels.push(
    { key: "call", title: "Book a call", line: "Pick a time that suits you. Thirty minutes, no obligation.", href: contact.calendly, external: true, Icon: CalendarCheck, tone: "border-indigo-300/40 bg-indigo-400/20 text-indigo-100", primary: true },
    { key: "email", title: "Send an email", line: contact.email, href: mailto, external: false, Icon: Mail, tone: "border-white/15 bg-white/[0.06] text-slate-100" },
    { key: "linkedin", title: "Connect on LinkedIn", line: "See my background and say hello.", href: contact.linkedin, external: true, Icon: Linkedin, tone: "border-sky-300/30 bg-sky-400/15 text-sky-200" },
  );

  // With four channels it is a clean 2 by 2. With three, the call tile spans the top row.
  const spanFirst = channels.length === 3;

  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          Talk to me directly.
        </h2>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-5">
          {channels.map((c, i) => (
            <motion.li
              key={c.key}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className={`list-none ${spanFirst && i === 0 ? "md:col-span-2" : ""}`}
            >
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group/c relative flex min-h-[148px] items-center gap-5 overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300 md:min-h-[168px] md:gap-6 md:p-8 ${
                  c.primary
                    ? "border-indigo-300/30 bg-gradient-to-br from-indigo-500/25 via-violet-500/10 to-slate-900/60 hover:border-indigo-300/60"
                    : "border-white/10 bg-slate-900/60 hover:border-white/25"
                }`}
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover/c:scale-105 md:h-16 md:w-16 ${c.tone}`}>
                  <c.Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl text-white md:text-2xl">{c.title}</span>
                  <span className="mt-1.5 block break-words text-[15px] leading-relaxed text-slate-300">{c.line}</span>
                </span>
                <ArrowUpRight size={20} aria-hidden="true" className="shrink-0 text-slate-400 transition-all duration-300 group-hover/c:-translate-y-0.5 group-hover/c:translate-x-0.5 group-hover/c:text-white" />
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4 text-center md:mt-12">
          <p className="flex items-center gap-2.5 text-sm text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Open to new projects
          </p>
          <div className="flex items-center gap-5 text-slate-400">
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300">
              <Github size={20} aria-hidden="true" />
            </a>
            <a href={contact.x} target="_blank" rel="noopener noreferrer" aria-label="X" className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300">
              <Twitter size={20} aria-hidden="true" />
            </a>
          </div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} David Moses</p>
        </div>
      </div>
    </section>
  );
}
