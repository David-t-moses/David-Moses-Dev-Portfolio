"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Maximize2, X } from "lucide-react";

type Project = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  subtitle: string; // quiet type label
  link: string;
  desc: string;
  tags: string[]; // up to three verified technologies, shown as one quiet line; empty when not verified
  surface: string; // low alpha tint behind the screenshot
};

// Contribution wording comes only from this portfolio's existing records. Where the records name no
// technologies (GraBoqs, TCG Telegraph) no technology line is shown.
// Order: GraBoqs, TCG Telegraph, Pharma Medtech, then the rest in their previous order.
const projectsData: Project[] = [
  {
    src: "/graboqs.png", width: 3000, height: 1780,
    alt: "GraBoqs waitlist website with the headline Sales are coming in and a dashboard preview",
    title: "GraBoqs",
    subtitle: "Waitlist website",
    link: "https://graboqs.com",
    desc: "The waitlist website for GraBoqs, inviting store owners to join. I built the site.",
    tags: [],
    surface: "rgba(129, 120, 230, 0.09)",
  },
  {
    src: "/tcgtelegraph.png", width: 3000, height: 1780,
    alt: "TCG Telegraph homepage with latest news, an editor's pick and trending stories",
    title: "TCG Telegraph",
    subtitle: "News and community site",
    link: "https://tcgtelegraph-frontend.vercel.app/",
    desc: "A news and guides site for trading card game fans. I built the website.",
    tags: [],
    surface: "rgba(59, 100, 190, 0.09)",
  },
  {
    src: "/pharma.png", width: 3162, height: 1612,
    alt: "Pharma Medtech dashboard showing appointments, a financial summary, patient insights and stock",
    title: "Pharma Medtech",
    subtitle: "Healthcare platform",
    link: "https://pharma-medtech.onrender.com/",
    desc: "A healthcare platform for appointments, patients and stock. I built it with live collaboration powered by Socket.io.",
    tags: ["Next.js", "Socket.io", "PostgreSQL"],
    surface: "rgba(70, 105, 210, 0.09)",
  },
  {
    src: "/attune.png", width: 3274, height: 2414,
    alt: "Attune AI Assistant landing page",
    title: "Attune AI",
    subtitle: "AI SaaS landing page",
    link: "https://attune-zeta.vercel.app",
    desc: "A landing and waitlist page for an AI email and meeting assistant. I built the site.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    surface: "rgba(99, 102, 241, 0.09)",
  },
  {
    src: "/usapeptides.png", width: 3082, height: 1864,
    alt: "USA Peptides online store",
    title: "USA Peptides",
    subtitle: "Online store",
    link: "https://usapeptides.shop",
    desc: "An online store for a peptide supplier in the United States. I built it with a focus on conversion and secure browsing.",
    tags: ["WooCommerce", "Elementor", "WordPress"],
    surface: "rgba(99, 102, 241, 0.09)",
  },
  {
    src: "/lydiaesenam.png", width: 2800, height: 1735,
    alt: "Lydia Esenam personal brand website",
    title: "Lydia Esenam",
    subtitle: "Personal brand",
    link: "https://lydiaesenam.ca/",
    desc: "A personal branding website for a Canadian education consultant. I built the site.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    surface: "rgba(99, 102, 241, 0.09)",
  },
  {
    src: "/housing.png", width: 2774, height: 1648,
    alt: "Eastern Housing Agency homepage",
    title: "Eastern Housing",
    subtitle: "Real estate platform",
    link: "https://easternhousingagency.com",
    desc: "A housing platform for property listings. I built it with an admin dashboard for listings, users and traffic analytics.",
    tags: ["Next.js", "Prisma", "Neon Postgres"],
    surface: "rgba(99, 102, 241, 0.09)",
  },
  {
    src: "/peacenwankpa.png", width: 3082, height: 1864,
    alt: "Peace Nwankpa writer portfolio",
    title: "Peace Nwankpa",
    subtitle: "Writer portfolio",
    link: "https://www.peacenwankpa.info",
    desc: "A portfolio for a writer. I built it with a custom admin panel to manage services, reviews and projects.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    surface: "rgba(99, 102, 241, 0.09)",
  },
  {
    src: "/kingdom.png", width: 3082, height: 1864,
    alt: "Kingdom Pet Care homepage",
    title: "Kingdom Pet",
    subtitle: "Webflow site",
    link: "https://kingdom-pet-supplements.webflow.io",
    desc: "A responsive homepage for a premium pet supplement brand. I built it in Webflow around brand storytelling and product trust.",
    tags: ["Webflow"],
    surface: "rgba(99, 102, 241, 0.09)",
  },
  {
    src: "/cloudesports-tokens.png", width: 2800, height: 1735,
    alt: "CloudeSports Tokens platform",
    title: "CloudeSports Tokens",
    subtitle: "Gaming platform",
    link: "https://cloudesports-tokens.vercel.app/",
    desc: "A gaming platform where Fortnite players wager tokens for prizes. I built the site.",
    tags: ["React", "Next.js", "Framer Motion"],
    surface: "rgba(99, 102, 241, 0.09)",
  },
  {
    src: "/horizon.jpg", width: 2880, height: 2096,
    alt: "Horizon online banking dashboard",
    title: "Horizon Banking",
    subtitle: "Banking system",
    link: "https://horizon-banking-system-jet.vercel.app/",
    desc: "An online banking platform with live transaction tracking. I built it with the Plaid API.",
    tags: ["React", "Plaid API", "Node.js"],
    surface: "rgba(99, 102, 241, 0.09)",
  },
  {
    src: "/nokless.png", width: 2800, height: 1630,
    alt: "Nokless smart security landing page",
    title: "Nokless Security",
    subtitle: "SaaS landing page",
    link: "https://nokless.vercel.app/",
    desc: "A landing page for a smart security product with AI monitoring. I built the site.",
    tags: ["React", "Next.js", "Framer Motion"],
    surface: "rgba(99, 102, 241, 0.09)",
  },
];

// ---------------------------------------------------------------------------
// Curated Projects: three featured projects (GraBoqs wide, TCG Telegraph and Pharma Medtech
// below it) and the other nine behind one quiet disclosure. Older work never enters the
// featured area automatically: FEATURED is the first three records, by design.
// The previous carousel is archived in components/archive/ProjectsCarouselTimeline.tsx.
// ---------------------------------------------------------------------------

type OnOpen = (p: Project, trigger: HTMLElement) => void;

const FEATURED_COUNT = 3;
const featured = projectsData.slice(0, FEATURED_COUNT);
const others = projectsData.slice(FEATURED_COUNT);
// One frame proportion for screenshots. Shown whole (contain) on a quiet matte, never stretched.
const SHOT_RATIO = 1.75;

function Shot({ project, onOpen, sizes }: { project: Project; onOpen: OnOpen; sizes: string }) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(project, e.currentTarget)}
      aria-label={`Enlarge preview of ${project.title}`}
      className="group/shot relative block w-full cursor-zoom-in overflow-hidden rounded-lg bg-white/[0.04] ring-1 ring-white/10 transition-shadow duration-300 hover:ring-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
      style={{ aspectRatio: SHOT_RATIO }}
    >
      <Image
        src={project.src}
        alt=""
        fill
        sizes={sizes}
        quality={80}
        className="object-contain p-1.5 transition-[filter] duration-300 group-hover/shot:brightness-110 md:p-2"
      />
      {/* Decorative affordance: the button already carries the accessible name. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white/85 ring-1 ring-white/15 transition-colors group-hover/shot:bg-slate-950/90 group-hover/shot:text-white"
      >
        <Maximize2 size={14} />
      </span>
    </button>
  );
}

function Details({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <h3 className={`leading-tight text-white ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>{project.title}</h3>
      <p className={`mt-2.5 leading-relaxed text-slate-300 ${large ? "max-w-sm text-base" : "text-sm md:text-[15px]"}`}>{project.desc}</p>
      {project.tags.length > 0 && <p className="mt-3 text-[13px] tracking-wide text-slate-400">{project.tags.join(" · ")}</p>}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link mt-auto inline-flex min-h-[44px] items-center gap-1.5 self-start pt-2 text-sm font-medium text-white underline decoration-indigo-300/40 underline-offset-8 transition-colors hover:decoration-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
      >
        Visit website<span className="sr-only">: {project.title}</span>
        <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </a>
    </div>
  );
}

const shell =
  "pj-reveal rounded-2xl border border-white/10 bg-slate-900/60 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-white/20";

/** Wide card: large screenshot with the details beside it on desktop; image first everywhere. */
function FeaturedCard({ project, onOpen, delay }: { project: Project; onOpen: OnOpen; delay: number }) {
  return (
    <article className={`${shell} grid gap-5 p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:items-center lg:gap-10 lg:p-7`} style={{ ["--d" as string]: `${delay}s` } as React.CSSProperties}>
      <Shot project={project} onOpen={onOpen} sizes="(min-width: 1280px) 760px, (min-width: 1024px) 62vw, 100vw" />
      <Details project={project} large />
    </article>
  );
}

/** Half width card: screenshot first, details beneath. */
function PairedCard({ project, onOpen, delay, sizes }: { project: Project; onOpen: OnOpen; delay: number; sizes: string }) {
  return (
    <article className={`${shell} flex flex-col gap-5 p-4 md:p-5`} style={{ ["--d" as string]: `${delay}s` } as React.CSSProperties}>
      <Shot project={project} onOpen={onOpen} sizes={sizes} />
      <Details project={project} />
    </article>
  );
}

export default function ProjectsCuratedFeaturedRows() {
  const [preview, setPreview] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const openPreview = useCallback<OnOpen>((p) => setPreview(p), []);

  // One brief entrance per load. Reduced motion never arms it, so everything is simply there.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const collapse = () => {
    setOpen(false);
    requestAnimationFrame(() => {
      toggleRef.current?.focus({ preventScroll: true });
      toggleRef.current?.scrollIntoView({ behavior: "auto", block: "center" });
    });
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 pb-20 pt-12 md:px-10 md:pb-24 md:pt-16"
      // Deeper navy sampled from the hero's lower region (#090f21 to #171a3b), with a
      // broad, low intensity indigo wash at the top that fades into the base.
      style={{
        backgroundColor: "#090f21",
        backgroundImage:
          "radial-gradient(ellipse 85% 520px at 50% 0%, rgba(67, 56, 202, 0.2), transparent 72%), radial-gradient(ellipse 45% 420px at 88% 0%, rgba(99, 102, 241, 0.1), transparent 70%), linear-gradient(to bottom, rgba(9, 15, 33, 0) 55%, #080d1d 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          A few things I&apos;ve built.
        </h2>

        <div ref={stageRef} className={`${armed ? "pj-armed" : ""} ${shown ? "pj-in" : ""}`}>
          <div className="flex flex-col gap-5 md:gap-7">
            <FeaturedCard project={featured[0]} onOpen={openPreview} delay={0} />
            <div className="grid gap-5 md:grid-cols-2 md:gap-7">
              <PairedCard project={featured[1]} onOpen={openPreview} delay={0.12} sizes="(min-width: 1280px) 560px, (min-width: 768px) 46vw, 100vw" />
              <PairedCard project={featured[2]} onOpen={openPreview} delay={0.2} sizes="(min-width: 1280px) 560px, (min-width: 768px) 46vw, 100vw" />
            </div>
          </div>
        </div>

        {/* Other work is optional: collapsed until asked for, never promoted to the featured area. */}
        <div className="mt-10 flex justify-center">
          <button
            ref={toggleRef}
            type="button"
            onClick={() => (open ? collapse() : setOpen(true))}
            aria-expanded={open}
            aria-controls="more-projects"
            className="btn-compact btn-compact-ghost gap-2 px-5"
          >
            {open ? "Show fewer" : "More projects"}
            <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        {open && (
          <>
            <ul id="more-projects" aria-label="More projects" className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-2 md:gap-7 lg:grid-cols-3">
              {others.map((project, i) => (
                <li key={project.link} className="pj-pop" style={{ animationDelay: `${Math.min(i, 5) * 0.04}s` }}>
                  <article className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition-colors duration-300 hover:border-white/20 md:p-5">
                    <Shot project={project} onOpen={openPreview} sizes="(min-width: 1280px) 360px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw" />
                    <Details project={project} />
                  </article>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <button type="button" onClick={collapse} className="btn-compact btn-compact-ghost gap-2 px-5">
                Show fewer
                <ChevronDown size={16} aria-hidden="true" className="rotate-180" />
              </button>
            </div>
          </>
        )}
      </div>
      <PreviewDialog project={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
/** Native modal dialog: Escape, focus containment and focus return come from the platform. */
function PreviewDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (project && !dlg.open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden"; // lock page scroll while open
      dlg.dataset.prevOverflow = prev;
      dlg.showModal();
    }
  }, [project]);

  const handleClose = () => {
    const dlg = ref.current;
    document.body.style.overflow = dlg?.dataset.prevOverflow ?? "";
    onClose();
  };

  return (
    <dialog
      ref={ref}
      aria-label={project ? `${project.title} preview` : "Preview"}
      onClose={handleClose}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
      // Close is the only control inside, so Tab keeps focus on it.
      onKeyDown={(e) => { if (e.key === "Tab") { e.preventDefault(); closeRef.current?.focus(); } }}
      className="m-auto w-[min(96vw,1400px)] max-w-none overflow-visible rounded-2xl border border-white/10 bg-slate-950 p-3 text-white backdrop:bg-slate-950/85 md:p-4"
    >
      {project && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-lg text-white">{project.title}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => ref.current?.close()}
              className="btn-compact btn-compact-ghost gap-2 px-4"
            >
              Close <X size={16} aria-hidden="true" />
            </button>
          </div>
          {/* Mounted only while open, so the large image loads on request. */}
          <Image
            src={project.src}
            alt={project.alt}
            width={project.width}
            height={project.height}
            sizes="96vw"
            quality={85}
            className="mx-auto h-auto w-auto max-w-full rounded-lg"
            style={{ maxHeight: "calc(100dvh - 9rem)", objectFit: "contain" }}
          />
        </div>
      )}
    </dialog>
  );
}
