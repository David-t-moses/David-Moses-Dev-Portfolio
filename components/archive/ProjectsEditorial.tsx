"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowUp, ArrowUpRight, Maximize2, Plus, X } from "lucide-react";

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

// All previews share one frame proportion so rows line up. Screenshots are shown from
// the top, so headers and first views stay visible; crops are only a few percent.
const PREVIEW_RATIO = 1.9;

function Row({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project, trigger: HTMLElement) => void }) {
  const flip = index % 2 === 1; // image on the left for alternate rows (desktop only)
  return (
    <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-x-12">
      {/* Introduction first in the DOM, so reading order stays text then image */}
      <div className={`lg:col-span-4 ${flip ? "lg:col-start-9 lg:row-start-1" : "lg:col-start-1"}`}>
        <p className="text-sm text-slate-400">{project.subtitle}</p>
        <h3 className="mt-2 text-3xl leading-tight text-white md:text-4xl">{project.title}</h3>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-slate-300">{project.desc}</p>
        {project.tags.length > 0 && (
          <p className="mt-3 text-[13px] tracking-wide text-slate-400">{project.tags.join(" · ")}</p>
        )}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-white underline decoration-indigo-300/40 underline-offset-8 transition-colors hover:decoration-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
        >
          Visit website<span className="sr-only">: {project.title}</span>
          <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      </div>

      <div className={`lg:col-span-8 ${flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-5"}`}>
        {/* The screenshot opens an enlarged preview; the site link stays in the text. */}
        <button
          type="button"
          onClick={(e) => onOpen(project, e.currentTarget)}
          aria-label={`Enlarge preview of ${project.title}`}
          className="group/shot relative block w-full cursor-zoom-in rounded-xl border border-white/[0.08] p-1.5 shadow-[0_18px_40px_-26px_rgba(0,0,0,0.75)] transition-colors duration-300 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300 md:p-2"
          style={{ backgroundColor: project.surface }}
        >
          <span className="relative block w-full overflow-hidden rounded-md ring-1 ring-black/25" style={{ aspectRatio: PREVIEW_RATIO }}>
            <Image
              src={project.src}
              alt=""
              width={project.width}
              height={project.height}
              sizes="(min-width: 1280px) 760px, (min-width: 1024px) 62vw, 100vw"
              quality={80}
              className="h-full w-full object-cover object-top"
            />
          </span>
          {/* Discreet affordance, decorative: the button already has its accessible name. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white/85 ring-1 ring-white/15 transition-colors group-hover/shot:bg-slate-950/85 group-hover/shot:text-white md:bottom-5 md:right-5"
          >
            <Maximize2 size={14} />
          </span>
        </button>
      </div>
    </div>
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

export default function ProjectsEditorial() {
  // States: 0 = initial (3 rows), 1 = up to 9, 2 = all
  const [displayState, setDisplayState] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const reduce = useReducedMotion();
  const [preview, setPreview] = useState<Project | null>(null);
  const openPreview = (p: Project) => setPreview(p);

  const displayedProjects =
    displayState === 0 ? projectsData.slice(0, 3) : displayState === 1 ? projectsData.slice(0, 9) : projectsData;

  const handleToggle = () => {
    setIsTransitioning(true);
    if (displayState === 2) {
      setDisplayState(0);
      setTimeout(() => {
        projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      setDisplayState((prev) => prev + 1);
    }
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // One brief entrance per row, played once. Reduced motion shows rows at once.
  const rowMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <section
      ref={projectsRef}
      id="projects"
      className="relative overflow-hidden px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16"
      // Deeper navy sampled from the hero's lower region (#090f21 to #171a3b), with a
      // broad, low intensity indigo wash at the top that fades into the base.
      style={{
        backgroundColor: "#090f21",
        backgroundImage:
          "radial-gradient(ellipse 85% 520px at 50% 0%, rgba(67, 56, 202, 0.2), transparent 72%), radial-gradient(ellipse 45% 420px at 88% 0%, rgba(99, 102, 241, 0.1), transparent 70%), linear-gradient(to bottom, rgba(9, 15, 33, 0) 55%, #080d1d 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-12 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-20 md:text-5xl">
          A few things I&apos;ve built.
        </h2>

        <LayoutGroup>
          <motion.div layout className="flex flex-col gap-16 md:gap-24">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, i) => (
                <motion.article
                  key={project.link}
                  layout
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  {...rowMotion}
                >
                  <Row project={project} index={i} onOpen={openPreview} />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <div className="mt-16 flex justify-center md:mt-20">
          <motion.button
            onClick={handleToggle}
            disabled={isTransitioning}
            className="btn-compact btn-compact-light gap-2 px-6"
          >
            {displayState === 0 && (<><span>Show More</span><Plus size={16} /></>)}
            {displayState === 1 && (<><span>View Everything</span><ArrowDown size={16} /></>)}
            {displayState === 2 && (<><span>Show Less</span><ArrowUp size={16} /></>)}
          </motion.button>
        </div>
      </div>
      <PreviewDialog project={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
