"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useActive } from "./useActive";
import Image from "next/image";
import { ArrowUpRight, Maximize2, X } from "lucide-react";

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
    src: "/graboqs.com.png", width: 3452, height: 2124,
    alt: "GraBoqs waitlist website with the headline Sales are coming in and a dashboard preview",
    title: "GraBoqs",
    subtitle: "Waitlist website",
    link: "https://graboqs.com",
    desc: "The waitlist website for GraBoqs, inviting store owners to join. I built the site.",
    tags: ["Next.js", "Tailwind"],
    surface: "rgba(129, 120, 230, 0.09)",
  },
  {
    src: "/tcgtelegraph.png", width: 3000, height: 1780,
    alt: "TCG Telegraph homepage with latest news, an editor's pick and trending stories",
    title: "TCG Telegraph",
    subtitle: "News and community site",
    link: "https://tcgtelegraph-frontend.vercel.app/",
    desc: "A news and guides site for trading card game fans. I built the website.",
    tags: ["Next.js", "Tailwind", "Nest.js"],
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
    src: "/nokless-app.png", width: 2400, height: 1600,
    alt: "Three screens of the Nokless mobile app: a service provider profile, the home screen with quick actions, and the link history.",
    title: "Nokless Mobile App",
    subtitle: "Mobile app",
    link: "https://nokless.vercel.app/",
    desc: "The mobile app for Nokless, a smart security product that lets visitors reach you by QR link and call, with no doorbell hardware. I built the app.",
    tags: [],
    surface: "rgba(99, 102, 241, 0.09)",
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

// Two rows, in opposite directions. Row one is the first seven (the strongest work first), row two the rest.
const rowA = projectsData.slice(0, 7);
const rowB = projectsData.slice(7);

/** One moving card: the screenshot on top (opens the enlarged preview), the details underneath. */
function MarqueeCard({ project, onOpen, dup }: { project: Project; onOpen: OnOpen; dup?: boolean }) {
  return (
    <article className="group/t relative flex w-[240px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] transition-colors duration-300 hover:border-white/25 md:w-[360px]">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]" style={{ backgroundImage: "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(99, 102, 241, 0.20), transparent 80%)" }} />
      <div className="relative p-3 md:p-3.5">
        <button
          type="button"
          tabIndex={dup ? -1 : undefined}
          onClick={(e) => onOpen(project, e.currentTarget)}
          aria-label={`Enlarge preview of ${project.title}`}
          style={{ aspectRatio: "3 / 2" }}
          className="relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/15 bg-slate-950 transition-transform duration-500 ease-out group-hover/t:scale-[1.015] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-indigo-300"
        >
          <Image src={project.src} alt="" fill draggable={false} loading="eager" sizes="(min-width: 768px) 360px, 240px" quality={80} className="object-cover object-top" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_40%)]" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/75 text-white/85 ring-1 ring-white/15">
            <Maximize2 size={12} />
          </span>
        </button>
      </div>
      <div className="relative flex flex-1 flex-col px-5 pb-3 pt-1 md:px-6 md:pb-4">
        <h3 className="text-lg leading-tight text-white md:text-xl">{project.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-slate-300 md:text-sm">{project.desc}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={dup ? -1 : undefined}
          className="group/link mt-auto inline-flex min-h-[40px] items-center gap-1.5 self-start pt-1.5 text-sm font-medium text-white underline decoration-indigo-300/40 underline-offset-8 transition-colors hover:decoration-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
        >
          Visit website<span className="sr-only">: {project.title}</span>
          <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

function Group({ list, onOpen, hidden }: { list: Project[]; onOpen: OnOpen; hidden?: boolean }) {
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {list.map((project) => (
        <li key={project.link} className="flex list-none">
          <MarqueeCard project={project} onOpen={onOpen} dup={hidden} />
        </li>
      ))}
    </ul>
  );
}

/**
 * One moving row. It drifts slowly by itself (the same speed as before) and can also be dragged or swiped
 * in either direction with a little momentum. It loops with no end: the content is two identical groups
 * and the position wraps by exactly one group. Transform only; the loop runs only while the row is on screen.
 */
function Row({ list, onOpen, reverse, seconds }: { list: Project[]; onOpen: OnOpen; reverse?: boolean; seconds: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // static layout instead

    const dir = reverse ? -1 : 1;
    let x = 0; // distance travelled along the row, in px
    let v = 0; // momentum from a swipe, px per second
    let drift = 0; // eased auto drift, px per second
    let last = performance.now();
    let raf = 0;
    let visible = false;
    let hover = false;
    let focus = false;
    let pid = -1;
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startPos = 0;
    let lastX = 0;
    let lastT = 0;

    const half = () => track.scrollWidth / 2;
    const apply = () => {
      const h = half();
      if (h > 0) x = ((x % h) + h) % h;
      track.style.transform = `translate3d(${-x}px,0,0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging) {
        const paused = hover || focus || !!wrap.closest('[data-preview="open"]');
        const target = paused ? 0 : (dir * half()) / seconds;
        drift += (target - drift) * Math.min(1, dt * 6);
        x += (drift + v) * dt;
        v *= Math.exp(-dt * 3);
        if (Math.abs(v) < 3) v = 0;
      }
      apply();
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      const should = visible && !document.hidden;
      if (should && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!should && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }, { rootMargin: "80px" });
    io.observe(wrap);
    document.addEventListener("visibilitychange", run);

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pid = e.pointerId;
      startX = lastX = e.clientX;
      startPos = x;
      lastT = performance.now();
      moved = false;
      v = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pid) return;
      const dx = e.clientX - startX;
      if (!dragging && Math.abs(dx) > 6) {
        dragging = true;
        moved = true;
        try { wrap.setPointerCapture(pid); } catch { /* ignore */ }
        wrap.dataset.drag = "true";
      }
      if (dragging) {
        x = startPos - dx;
        const now = performance.now();
        const dtm = (now - lastT) / 1000;
        if (dtm > 0) v = 0.6 * v + 0.4 * (-(e.clientX - lastX) / dtm);
        lastX = e.clientX;
        lastT = now;
        apply();
      }
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pid) return;
      pid = -1;
      if (dragging) {
        dragging = false;
        delete wrap.dataset.drag;
        v = Math.max(-3500, Math.min(3500, v));
        if (performance.now() - lastT > 90) v = 0; // held still before letting go
        drift = 0;
      }
    };
    const onClick = (e: MouseEvent) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); x += e.deltaX; v = 0; apply(); }
    };
    const onEnter = (e: PointerEvent) => { if (e.pointerType === "mouse") hover = true; };
    const onLeave = () => { hover = false; };
    const onFocusIn = () => { focus = true; };
    const onFocusOut = () => { focus = false; };

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);
    wrap.addEventListener("click", onClick, true);
    wrap.addEventListener("wheel", onWheel, { passive: false });
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("focusin", onFocusIn);
    wrap.addEventListener("focusout", onFocusOut);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", run);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
      wrap.removeEventListener("click", onClick, true);
      wrap.removeEventListener("wheel", onWheel);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("focusin", onFocusIn);
      wrap.removeEventListener("focusout", onFocusOut);
    };
  }, [reverse, seconds]);

  return (
    <div ref={wrapRef} className="cursor-grab touch-pan-y select-none overflow-hidden data-[drag=true]:cursor-grabbing">
      <div ref={trackRef} className="marquee-track" style={{ animation: "none" }}>
        <Group list={list} onOpen={onOpen} />
        <Group list={list} onOpen={onOpen} hidden />
      </div>
    </div>
  );
}

export default function Projects() {
  const [preview, setPreview] = useState<Project | null>(null);
  const openPreview = useCallback<OnOpen>((p) => setPreview(p), []);
  const ref = useRef<HTMLDivElement>(null);
  const { state, subscribe } = useActive(ref);

  // Edge to edge, two rows in opposite directions. CSS transform only; it stops while off screen, on
  // hover and keyboard focus, with the tab hidden, and while the enlarged preview is open.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      const s = state.current;
      el.dataset.paused = !s.onScreen || !s.tabVisible ? "true" : "false";
    };
    sync();
    return subscribe(sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          Products I&apos;ve shipped.
        </h2>

        <div className="relative left-1/2 w-[min(1340px,calc(100vw-48px))] -translate-x-1/2">
          {/* Light blue glow behind both ends: the fade reveals this instead of black */}
          <span aria-hidden="true" className="pointer-events-none absolute -left-10 inset-y-0 w-64 rounded-full bg-[#5565e0]/35 blur-[110px]" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-10 inset-y-0 w-64 rounded-full bg-[#5565e0]/35 blur-[110px]" />
          <div
          ref={ref}
          role="group"
          aria-label="Projects"
          data-preview={preview ? "open" : "closed"}
          className="marquee marquee-cards marquee-soft relative flex flex-col gap-4 overflow-hidden py-1 lg:gap-5"
        >
          <Row list={rowA} onOpen={openPreview} seconds={135} />
          <Row list={rowB} onOpen={openPreview} reverse seconds={115} />
        </div>
        </div>
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
