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
// Order: GraBoqs, TCG Telegraph, Valyx Peptides (featured row), then Pharma Medtech and the rest in their previous order.
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
    src: "/valyx.png", width: 1280, height: 861,
    alt: "Valyx Peptides online store on desktop and mobile, with a research peptide vial and shop by purpose categories",
    title: "Valyx Peptides",
    subtitle: "Online store",
    link: "https://getvalyxpeptides.com",
    desc: "An online store for research peptides. I built it on WooCommerce with custom development.",
    tags: ["WooCommerce", "Custom development"],
    surface: "rgba(99, 130, 230, 0.09)",
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
const shell =
  "pj-reveal pj-card group/card flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-white/20";

/**
 * One card for every project: details at the top, the screenshot anchored to the bottom right
 * (slanted, top left corner rounded). Clicking it opens the
 * enlarged preview.
 */
function ProjectCard({ project, onOpen, delay = 0 }: { project: Project; onOpen: OnOpen; delay?: number }) {
  return (
    <article className={`${shell} w-full`} style={{ ["--d" as string]: `${delay}s` } as React.CSSProperties}>
      <div className="flex flex-1 flex-col p-6 pb-0 md:p-7 md:pb-0">
        <h3 className="text-2xl leading-tight text-white md:text-[26px]">{project.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-300 md:text-[15px]">{project.desc}</p>
        {project.tags.length > 0 && <p className="mt-3 text-[13px] tracking-wide text-slate-400">{project.tags.join(" · ")}</p>}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-1.5 inline-flex min-h-[44px] items-center gap-1.5 self-start text-sm font-medium text-white underline decoration-indigo-300/40 underline-offset-8 transition-colors hover:decoration-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
        >
          Visit website<span className="sr-only">: {project.title}</span>
          <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      </div>

      {/* Screenshot: the full card width, anchored to the card's bottom right so that end is fully visible, with the
          left side receding in perspective. It straightens a little on hover or focus. */}
      <div className="relative mt-6 h-[210px] md:h-[236px]">
        {/* Soft brand glow behind the screenshot: indigo into violet. */}
        <span aria-hidden="true" className="pj-glow pointer-events-none absolute -top-28 bottom-0 left-0 right-0" />
        <div className="pj-tilt absolute bottom-0 right-0 top-4 w-[93%]">
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            aria-label={`Enlarge preview of ${project.title}`}
            className="pj-shot group/shot relative block h-full w-full cursor-zoom-in overflow-hidden rounded-tl-2xl border-l border-t border-white/25 bg-slate-950 shadow-[0_-18px_40px_-12px_rgba(0,0,0,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-indigo-300"
          >
            <Image
              src={project.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 384px, (min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
              quality={80}
              className="object-cover object-left-top"
            />
          </button>
        </div>
        {/* Decorative cue on the card itself, clear of the screenshot's own logo. */}
        <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/75 text-white/85 ring-1 ring-white/15">
          <Maximize2 size={14} />
        </span>
      </div>
    </article>
  );
}

export default function ProjectsCardsPlainShell() {
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
          <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project.link} project={project} onOpen={openPreview} delay={i * 0.1} />
            ))}
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
            <ul id="more-projects" aria-label="More projects" className="mt-6 grid list-none gap-5 p-0 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {others.map((project, i) => (
                <li key={project.link} className="pj-pop flex" style={{ animationDelay: `${Math.min(i, 5) * 0.04}s` }}>
                  <ProjectCard project={project} onOpen={openPreview} />
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
