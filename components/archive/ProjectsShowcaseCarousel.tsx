"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, Pause, Play, X } from "lucide-react";

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

// All previews share one frame proportion. Screenshots are shown from the top, so
// headers and first views stay visible; crops are only a few percent.
const PREVIEW_RATIO = 1.9;
const HOLD_MS = 5000; // each project holds about five seconds
const MOVE_MS = 900; // and glides for about 900ms (see .showcase-card in globals.css)

type OnOpen = (p: Project, trigger: HTMLElement) => void;

// Signed distance on a ring of n items, in [-n/2, n/2). The last project sits directly
// before the first, so wraparound is a single step and never sweeps the others across.
const ringOffset = (i: number, active: number, n: number) => {
  const half = n / 2;
  return ((((i - active + half) % n) + n) % n) - half;
};

function useMediaFlag(query: string) {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setFlag(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return flag;
}

function Caption({ project, active }: { project: Project; active: boolean }) {
  return (
    <div
      // All captions share one grid cell, so the tallest sets the height: no page jump.
      className={`showcase-caption col-start-1 row-start-1 text-center ${active ? "is-active" : ""}`}
      aria-hidden={!active}
      {...(!active ? ({ inert: "" } as Record<string, string>) : {})}
    >
      <p className="text-sm text-slate-400">{project.subtitle}</p>
      <h3 className="mt-1.5 text-2xl leading-tight text-white md:text-3xl">{project.title}</h3>
      <p className="mx-auto mt-2.5 max-w-2xl text-balance text-base leading-relaxed text-slate-300">{project.desc}</p>
      {/* Reserve the line even when no technologies are verified. */}
      <p className="mt-2.5 min-h-[20px] text-[13px] tracking-wide text-slate-400">{project.tags.join(" · ")}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-white underline decoration-indigo-300/40 underline-offset-8 transition-colors hover:decoration-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
      >
        Visit website<span className="sr-only">: {project.title}</span>
        <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </a>
    </div>
  );
}

function Frame({ project, children }: { project: Project; children: React.ReactNode }) {
  return (
    <span
      className="block rounded-xl border border-white/[0.09] p-1.5 shadow-[0_18px_40px_-26px_rgba(0,0,0,0.8)] md:p-2"
      style={{ backgroundColor: project.surface }}
    >
      <span className="relative block w-full overflow-hidden rounded-md ring-1 ring-black/25" style={{ aspectRatio: PREVIEW_RATIO }}>
        {children}
      </span>
    </span>
  );
}

function Showcase({
  onOpen,
  suspended,
  announce,
  setAnnounce,
}: {
  onOpen: OnOpen;
  suspended: boolean; // enlarged preview or full gallery open
  announce: string;
  setAnnounce: (s: string) => void;
}) {
  const n = projectsData.length;
  const reduced = useMediaFlag("(prefers-reduced-motion: reduce)");
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true); // intent: false after manual use or keyboard focus
  const [hover, setHover] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  // Images are prepared two steps ahead and kept, so nothing flashes in.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1, 2, n - 1, n - 2]));

  const stageRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number; t: number } | null>(null);
  const swiped = useRef(false);

  // Observe the stage itself, and require most of it to be visible before it moves.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.intersectionRatio >= 0.6), { threshold: [0, 0.6, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    setSeen((prev) => {
      const next = new Set(prev);
      for (const d of [-2, -1, 0, 1, 2]) next.add((((active + d) % n) + n) % n);
      return next.size === prev.size ? prev : next;
    });
  }, [active, n]);

  // One timer per project, no per frame work. Any change of condition restarts it,
  // so resuming after hover always gives a fresh reading interval.
  const running = autoplay && !hover && onScreen && tabVisible && !suspended && !reduced;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), HOLD_MS + MOVE_MS);
    return () => clearTimeout(t);
  }, [running, active, n]);

  const go = useCallback(
    (to: number) => {
      const next = ((to % n) + n) % n;
      setActive(next);
      setAutoplay(false); // manual use stops automatic rotation until Play
      setAnnounce(`Project ${next + 1} of ${n}: ${projectsData[next].title}`);
    },
    [n, setAnnounce]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    swiped.current = false;
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY, t: Date.now() };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiped.current = true;
      go(active + (dx < 0 ? 1 : -1));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Projects"
      className="showcase"
      onPointerEnter={(e) => { if (e.pointerType !== "touch") setHover(true); }}
      onPointerLeave={(e) => { if (e.pointerType !== "touch") setHover(false); }}
      // Keyboard focus entering stops rotation until the visitor chooses Play.
      onFocus={(e) => { if ((e.target as HTMLElement).matches(":focus-visible")) setAutoplay(false); }}
      onKeyDown={onKeyDown}
    >
      {/* Stage: touch-action keeps normal vertical page scrolling; horizontal swipes are ours. */}
      <div
        ref={stageRef}
        className="showcase-stage"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { swipe.current = null; }}
      >
        {projectsData.map((project, i) => {
          const off = ringOffset(i, active, n);
          const abs = Math.abs(off);
          const clamped = Math.max(-2, Math.min(2, off));
          const side = Math.sign(clamped);
          const visible = abs <= 1;
          const scale = abs === 0 ? 1 : abs === 1 ? "var(--sc)" : "calc(var(--sc) * 0.88)";
          const isActive = off === 0;
          return (
            <button
              key={project.link}
              type="button"
              className="showcase-card"
              aria-label={isActive ? `Enlarge preview of ${project.title}` : `Show ${project.title}, project ${i + 1} of ${n}`}
              aria-hidden={visible ? undefined : true}
              tabIndex={visible ? 0 : -1}
              {...(!visible ? ({ inert: "" } as Record<string, string>) : {})}
              onClick={(e) => {
                if (swiped.current) { swiped.current = false; return; }
                if (isActive) onOpen(project, e.currentTarget);
                else go(i);
              }}
              style={{
                transform: `translate3d(calc(-50% + ${clamped} * var(--dx)), 0, calc(${Math.abs(clamped)} * var(--zd))) rotateY(calc(${-side} * var(--rot))) scale(${scale})`,
                opacity: isActive ? 1 : abs === 1 ? 0.92 : 0,
                zIndex: 30 - abs * 10 < 0 ? 0 : 30 - abs * 10,
                cursor: isActive ? "zoom-in" : visible ? "pointer" : "default",
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <Frame project={project}>
                {abs <= 2 || seen.has(i) ? (
                  <Image
                    src={project.src}
                    alt=""
                    width={project.width}
                    height={project.height}
                    sizes="(min-width: 1280px) 740px, (min-width: 1024px) 640px, (min-width: 640px) 520px, 300px"
                    quality={80}
                    priority={i === 0}
                    className="h-full w-full object-cover object-top"
                  />
                ) : null}
                {/* Receding previews are dimmed rather than blurred. */}
                <span
                  aria-hidden="true"
                  className="showcase-dim pointer-events-none absolute inset-0 bg-slate-950"
                  style={{ opacity: isActive ? 0 : 0.38 }}
                />
                {isActive && (
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white/85 ring-1 ring-white/15">
                    <Maximize2 size={14} />
                  </span>
                )}
              </Frame>
            </button>
          );
        })}
      </div>

      {/* Controls: always available, quiet */}
      <div className="mt-2 flex items-center justify-center gap-2.5">
        <button type="button" onClick={() => go(active - 1)} aria-label="Previous project" className="showcase-ctl">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        {!reduced && (
          <button
            type="button"
            onClick={() => setAutoplay((v) => !v)}
            aria-label={autoplay ? "Pause automatic rotation" : "Play automatic rotation"}
            className="showcase-ctl"
          >
            {autoplay ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          </button>
        )}
        <button type="button" onClick={() => go(active + 1)} aria-label="Next project" className="showcase-ctl">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
        <span className="ml-2 min-w-[3.25rem] text-sm tabular-nums text-slate-400" aria-label={`Project ${active + 1} of ${n}`}>
          {active + 1} / {n}
        </span>
      </div>

      {/* Captions stack in one cell; only the active one is visible and reachable. */}
      <div className="mt-6 grid">
        {projectsData.map((project, i) => (
          <Caption key={project.link} project={project} active={i === active} />
        ))}
      </div>

      {/* Polite announcement for manual selection only; automatic changes stay silent. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announce}</p>
    </div>
  );
}

function GalleryItem({ project, onOpen }: { project: Project; onOpen: OnOpen }) {
  return (
    <li className="flex flex-col">
      <button
        type="button"
        onClick={(e) => onOpen(project, e.currentTarget)}
        aria-label={`Enlarge preview of ${project.title}`}
        className="relative block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
      >
        <Frame project={project}>
          <Image
            src={project.src}
            alt=""
            width={project.width}
            height={project.height}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            quality={75}
            className="h-full w-full object-cover object-top"
          />
        </Frame>
      </button>
      <p className="mt-4 text-sm text-slate-400">{project.subtitle}</p>
      <h3 className="mt-1 text-2xl text-white">{project.title}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-300">{project.desc}</p>
      {project.tags.length > 0 && <p className="mt-2 text-[13px] tracking-wide text-slate-400">{project.tags.join(" · ")}</p>}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link mt-1 inline-flex min-h-[44px] items-center gap-1.5 self-start text-sm font-medium text-white underline decoration-indigo-300/40 underline-offset-8 transition-colors hover:decoration-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
      >
        Visit website<span className="sr-only">: {project.title}</span>
        <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </a>
    </li>
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

export default function ProjectsShowcaseCarousel() {
  const [preview, setPreview] = useState<Project | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [announce, setAnnounce] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const openPreview = useCallback<OnOpen>((p) => setPreview(p), []);
  const suspended = useMemo(() => preview !== null || galleryOpen, [preview, galleryOpen]);

  const toggleGallery = () => {
    const closing = galleryOpen;
    setGalleryOpen(!galleryOpen);
    if (closing) {
      // Keep focus on the toggle and bring the showcase back into view.
      requestAnimationFrame(() => {
        toggleRef.current?.focus({ preventScroll: true });
        sectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
  };

  return (
    <section
      ref={sectionRef}
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
        <h2 className="mb-8 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-10 md:text-5xl">
          A few things I&apos;ve built.
        </h2>

        <Showcase onOpen={openPreview} suspended={suspended} announce={announce} setAnnounce={setAnnounce} />

        <div className="mt-6 flex justify-center">
          <button
            ref={toggleRef}
            type="button"
            onClick={toggleGallery}
            aria-expanded={galleryOpen}
            aria-controls="all-projects"
            className="btn-compact btn-compact-light px-6"
          >
            {galleryOpen ? "Show fewer projects" : "View all projects"}
          </button>
        </div>

        {galleryOpen && (
          <ul id="all-projects" aria-label="All projects" className="mt-14 grid list-none gap-x-8 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => (
              <GalleryItem key={project.link} project={project} onOpen={openPreview} />
            ))}
          </ul>
        )}
      </div>
      <PreviewDialog project={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
