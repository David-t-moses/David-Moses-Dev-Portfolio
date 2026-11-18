"use client";

// Earlier versions: components/archive/ContactBeforeBlend.tsx (form that only simulated sending),
// ContactChannelTiles.tsx (four boxed tiles).

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/lib/contact";

type Channel = { key: string; title: string; line: string; href: string; external: boolean; primary?: boolean };

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 group-hover/r:rotate-0 md:h-6 md:w-6" style={{ transform: "rotate(-45deg)" }} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Contact() {
  const reduce = useReducedMotion();

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent("Hi David,\n\nI would like to talk about a project.\n\n")}`;
  const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi David, I would like to talk about a project.")}` : "";

  const channels: Channel[] = [
    { key: "call", title: "Book a call", line: "Pick a time that suits you. Thirty minutes, no obligation.", href: contact.calendly, external: true, primary: true },
  ];
  if (wa) channels.push({ key: "whatsapp", title: "Message me on WhatsApp", line: "Send a message and I will reply personally.", href: wa, external: true });
  channels.push(
    { key: "email", title: "Send an email", line: contact.email, href: mailto, external: false },
    { key: "linkedin", title: "Connect on LinkedIn", line: "See my background and say hello.", href: contact.linkedin, external: true },
  );

  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28">
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[min(900px,100vw)] -translate-x-1/2 -translate-y-1/2" style={{ backgroundImage: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(99, 102, 241, 0.16), transparent 100%)" }} />

      <div className="relative z-10 mx-auto max-w-[980px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-14 md:text-5xl">
          Talk to me directly.
        </h2>

        <ul className="m-0 list-none border-t border-white/10 p-0">
          {channels.map((c, i) => (
            <motion.li
              key={c.key}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className="list-none border-b border-white/10"
            >
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group/r flex items-center justify-between gap-6 px-1 py-7 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-300 md:px-6 md:py-10 ${
                  c.primary ? "bg-gradient-to-r from-indigo-500/[0.14] via-indigo-500/[0.05] to-transparent hover:from-indigo-500/[0.22]" : "hover:bg-white/[0.03]"
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-balance text-[28px] leading-tight tracking-tight text-white transition-transform duration-300 group-hover/r:translate-x-1.5 md:text-[44px] md:leading-[1.1]">{c.title}</span>
                  <span className="mt-2 block break-words text-base text-slate-400 transition-colors duration-300 group-hover/r:text-slate-300 md:mt-3 md:text-lg">{c.line}</span>
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 group-hover/r:border-white group-hover/r:bg-white group-hover/r:text-slate-950 md:h-16 md:w-16">
                  <Arrow />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-5 text-center md:mt-16">
          <p className="flex items-center gap-2.5 text-sm text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Open to new projects
          </p>
          <p className="flex items-center gap-1 text-sm text-slate-400">
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="rounded-full px-3 py-2.5 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300">GitHub</a>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <a href={contact.x} target="_blank" rel="noopener noreferrer" className="rounded-full px-3 py-2.5 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300">X</a>
          </p>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} David Moses</p>
        </div>
      </div>
    </section>
  );
}
