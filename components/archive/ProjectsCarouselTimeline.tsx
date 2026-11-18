"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
// Showcase: a card carousel that follows the reference clip.
// Each card holds its own content (left) and screenshot (right). One cycle is:
//   settled hold -> takeover (the screenshot grows across the SAME card while the
//   content withdraws) -> travel (outgoing card recedes, next card comes forward;
//   it starts before the takeover has finished) -> arrival (screenshot settles to
//   the right as the content is revealed).
// It is one native Web Animations timeline per cycle, so hover or focus can pause it
// at any moment and resume from exactly that point. Every animated property is a
// transform or opacity (no layout), on prepared layers whose identity never changes.
// ---------------------------------------------------------------------------

const HOLD = 3000; // the only long pause: the settled card, readable
const TAKE = 400; // content withdraws, screenshot grows across the card
const TRAVEL_AT = 280; // travel starts before the takeover has finished (overlap)
const TRAVEL = 660; // outgoing card recedes, next card comes forward
const MEDIA_BACK_AT = 220; // into the travel: incoming screenshot starts settling to its side
const REVEAL_AT = 330; // into the travel: incoming content starts to appear
const REVEAL = 330;
const FADE = 240; // outgoing content fade
// Decelerating curves with a soft landing and no overshoot. Takeover and travel overlap, so
// the speed of one hands over to the next instead of dropping to zero in between.
const EASE_TRAVEL = "cubic-bezier(0.3, 0, 0.1, 1)";
const EASE_TAKE = "cubic-bezier(0.3, 0, 0.15, 1)";
const EASE_FADE = "cubic-bezier(0.4, 0, 0.6, 1)";

type Metrics = {
  cw: number; // active card width
  ch: number; // card height (fixed, so the stage never changes height)
  x1: number; x2: number; // horizontal distance of first and second neighbours
  s1: number; s2: number; // their scales
  split: number; // share of the card taken by the screenshot when settled (0 to 1)
  stack: boolean; // mobile: screenshot below the content instead of beside it
  pad: number; // matte padding around the screenshot
};
const DESKTOP: Metrics = { cw: 720, ch: 380, x1: 500, x2: 600, s1: 0.6, s2: 0.44, split: 0.64, stack: false, pad: 10 };
const TABLET: Metrics = { cw: 560, ch: 340, x1: 390, x2: 470, s1: 0.6, s2: 0.44, split: 0.62, stack: false, pad: 10 };
const MOBILE: Metrics = { cw: 300, ch: 500, x1: 250, x2: 330, s1: 0.8, s2: 0.6, split: 0.46, stack: true, pad: 10 };

type OnOpen = (p: Project, trigger: HTMLElement) => void;

const N = projectsData.length;
// Signed distance on a ring, in [-N/2, N/2): the last project sits directly before the first.
const ringOffset = (i: number, active: number) => {
  const half = N / 2;
  return ((((i - active + half) % N) + N) % N) - half;
};
const clampSlot = (o: number) => Math.max(-3, Math.min(3, o));

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

// Resting look of a card in a slot. The same functions feed the React styles and the
// final animation keyframes, so committing a cycle never causes a jump.
const slotX = (m: Metrics, o: number) => {
  const a = Math.abs(o);
  return a === 0 ? 0 : Math.sign(o) * (a === 1 ? m.x1 : a === 2 ? m.x2 : m.x2 + 90);
};
const slotScale = (m: Metrics, o: number) => (o === 0 ? 1 : Math.abs(o) === 1 ? m.s1 : m.s2);
const slotTransform = (m: Metrics, o: number) =>
  `translate3d(calc(-50% + ${slotX(m, o)}px), 0, 0) scale(${slotScale(m, o)})`;
const slotOpacity = (o: number) => (Math.abs(o) >= 3 ? 0 : 1);
const slotZ = (o: number) => 30 - Math.abs(o) * 10;
const slotDim = (o: number) => (o === 0 ? 0 : Math.abs(o) === 1 ? 0.32 : Math.abs(o) === 2 ? 0.5 : 0.6);

// The screenshot layer always has the full card size, so its content is laid out once and
// never reflows. Settled, it is shown smaller and to one side with a uniform scale (the
// same proportions as when it fills the card), so nothing is stretched and no layout runs.
const containIn = (bw: number, bh: number, ratio: number) => {
  const w = Math.min(bw, bh * ratio);
  return { w, h: w / ratio };
};
const IDENTITY = "translate3d(0px, 0px, 0) scale(1)";
function settledImageTransform(m: Metrics, ratio: number) {
  const full = containIn(m.cw - 2 * m.pad, m.ch - 2 * m.pad, ratio);
  const part = m.stack
    ? containIn(m.cw - 2 * m.pad, m.ch * m.split - 2 * m.pad, ratio)
    : containIn(m.cw * m.split - 2 * m.pad, m.ch - 2 * m.pad, ratio);
  const s = part.w / full.w;
  const tx = m.stack ? 0 : (m.cw * (1 - m.split)) / 2;
  const ty = m.stack ? (m.ch * (1 - m.split)) / 2 : 0;
  return `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
}
// The matte behind the screenshot: one flat rectangle scaled from the card's right edge
// (or bottom edge on mobile). It has no content, so non uniform scaling is invisible.
const matteTransform = (m: Metrics, settled: boolean) =>
  !settled ? "scale(1, 1)" : m.stack ? `scale(1, ${m.split})` : `scale(${m.split}, 1)`;

type Cycle = { anims: Animation[]; els: HTMLElement[]; from: number; to: number; manual: boolean; hold: number };

function Showcase({
  onOpen,
  suspended,
  announce,
  setAnnounce,
}: {
  onOpen: OnOpen;
  suspended: boolean;
  announce: string;
  setAnnounce: (s: string) => void;
}) {
  const reduced = useMediaFlag("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaFlag("(max-width: 639px)");
  const isTablet = useMediaFlag("(max-width: 1279px)");
  const m = isMobile ? MOBILE : isTablet ? TABLET : DESKTOP;

  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  // Screenshots are mounted three steps either way, so the one that is about to enter a
  // visible slot is already decoded long before it moves, and nothing mounts at a boundary.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1, 2, 3, N - 1, N - 2, N - 3]));

  const stageRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const textEls = useRef<(HTMLDivElement | null)[]>([]);
  const iconEls = useRef<(HTMLSpanElement | null)[]>([]);
  const matteEls = useRef<(HTMLDivElement | null)[]>([]);
  const imageEls = useRef<(HTMLButtonElement | null)[]>([]);
  const dimEls = useRef<(HTMLSpanElement | null)[]>([]);
  const cycle = useRef<Cycle | null>(null);
  const pending = useRef<number | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const metricsRef = useRef(m);
  metricsRef.current = m;

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
      for (const d of [-3, -2, -1, 0, 1, 2, 3]) next.add((((active + d) % N) + N) % N);
      return next.size === prev.size ? prev : next;
    });
  }, [active]);

  const autoAllowed = onScreen && tabVisible && !suspended && !reduced && !hover && !focusIn;

  const cancelCycle = useCallback(() => {
    const c = cycle.current;
    if (!c) return;
    c.anims.forEach((a) => { a.onfinish = null; a.cancel(); });
    c.els.forEach((el) => { el.style.willChange = ""; }); // rendering hints only while moving
    cycle.current = null;
  }, []);

  // Build one cycle's animations. Every involved element gets keyframes spanning the whole
  // timeline, so a single clock drives them and pausing it pauses everything together.
  const startCycle = useCallback((from: number, to: number, manual: boolean) => {
    const mt = metricsRef.current;
    const hold = manual ? 0 : HOLD;
    const tTake1 = hold + TAKE;
    const tTrav0 = hold + TRAVEL_AT;
    const tTrav1 = tTrav0 + TRAVEL;
    const tReveal1 = tTrav0 + REVEAL_AT + REVEAL;
    const D = Math.max(tTrav1, tReveal1, tTake1);
    const at = (t: number) => Math.min(1, t / D);
    const dir = Math.sign(ringOffset(to, from)) || 1;
    const adjacent = Math.abs(ringOffset(to, from)) <= 1;
    const anims: Animation[] = [];
    const els: HTMLElement[] = [];
    const run = (el: HTMLElement | null, frames: Keyframe[]) => {
      if (!el) return;
      el.style.willChange = "transform, opacity";
      els.push(el);
      anims.push(el.animate(frames, { duration: D, fill: "both", easing: "linear" }));
    };
    const two = (a: Keyframe, b: Keyframe, t0: number, t1: number, easing: string): Keyframe[] => [
      { offset: 0, ...a, easing: "linear" },
      { offset: at(t0), ...a, easing },
      { offset: at(t1), ...b },
      { offset: 1, ...b },
    ];

    for (let i = 0; i < N; i++) {
      const f = i === to && !adjacent ? dir * 3 : clampSlot(ringOffset(i, from));
      const t = clampSlot(ringOffset(i, to));
      if (Math.abs(f) >= 3 && Math.abs(t) >= 3) continue; // hidden before and after
      const tf0 = slotTransform(mt, f), tf1 = slotTransform(mt, t);
      const op0 = slotOpacity(f), op1 = slotOpacity(t);
      const crossing = f !== 0 && t !== 0 && Math.sign(f) !== Math.sign(t);
      if (crossing) {
        // Would sweep across the stage (non adjacent selection): fade out here, fade in there.
        const out = at(tTrav0 + 140), back = at(tTrav1 - 180);
        run(cardEls.current[i], [
          { offset: 0, transform: tf0, opacity: op0, easing: EASE_FADE },
          { offset: at(tTrav0), transform: tf0, opacity: op0, easing: EASE_FADE },
          { offset: out, transform: tf0, opacity: 0 },
          { offset: out, transform: tf1, opacity: 0 },
          { offset: back, transform: tf1, opacity: 0, easing: EASE_FADE },
          { offset: at(tTrav1), transform: tf1, opacity: op1 },
          { offset: 1, transform: tf1, opacity: op1 },
        ]);
      } else if (t === 0) {
        // Incoming card: glides with the rest, and passes in front of the outgoing one once they
        // cross. That is a single z-index step in its own animation, so nothing is reordered mid glide.
        run(cardEls.current[i], two({ transform: tf0, opacity: op0 }, { transform: tf1, opacity: op1 }, tTrav0, tTrav1, EASE_TRAVEL));
        run(cardEls.current[i], [
          { offset: 0, zIndex: slotZ(f), easing: "steps(1, end)" },
          { offset: at(tTrav0 + TRAVEL * 0.25), zIndex: 35 },
          { offset: 1, zIndex: 35 },
        ]);
      } else {
        run(cardEls.current[i], two({ transform: tf0, opacity: op0 }, { transform: tf1, opacity: op1 }, tTrav0, tTrav1, EASE_TRAVEL));
      }
      run(dimEls.current[i], two({ opacity: slotDim(f) }, { opacity: slotDim(t) }, tTrav0, tTrav1, EASE_TRAVEL));

      if (i === from) {
        // Outgoing card: the content withdraws and the screenshot grows across this same card.
        const ratio = projectsData[i].width / projectsData[i].height;
        run(textEls.current[i], two({ opacity: 1 }, { opacity: 0 }, hold, hold + FADE, EASE_FADE));
        run(iconEls.current[i], two({ opacity: 1 }, { opacity: 0 }, hold, hold + FADE, EASE_FADE));
        run(matteEls.current[i], two({ transform: matteTransform(mt, true) }, { transform: matteTransform(mt, false) }, hold, tTake1, EASE_TAKE));
        run(imageEls.current[i], two({ transform: settledImageTransform(mt, ratio) }, { transform: IDENTITY }, hold, tTake1, EASE_TAKE));
      }
      if (t === 0) {
        // Incoming card: the screenshot settles to its side while the content is revealed.
        const ratio = projectsData[i].width / projectsData[i].height;
        run(textEls.current[i], two({ opacity: 0 }, { opacity: 1 }, tTrav0 + REVEAL_AT, tReveal1, EASE_FADE));
        run(iconEls.current[i], two({ opacity: 0 }, { opacity: 1 }, tTrav0 + REVEAL_AT, tReveal1, EASE_FADE));
        run(matteEls.current[i], two({ transform: matteTransform(mt, false) }, { transform: matteTransform(mt, true) }, tTrav0 + MEDIA_BACK_AT, tTrav1, EASE_TAKE));
        run(imageEls.current[i], two({ transform: IDENTITY }, { transform: settledImageTransform(mt, ratio) }, tTrav0 + MEDIA_BACK_AT, tTrav1, EASE_TAKE));
      }
    }
    const c: Cycle = { anims, els, from, to, manual, hold };
    cycle.current = c;
    const lead = anims[0];
    if (lead) lead.onfinish = () => setActive(to);
    else setActive(to);
    return c;
  }, []);

  // Commit: once React has the new resting layout, drop the animations that held the end state.
  useLayoutEffect(() => {
    if (cycle.current && cycle.current.to === active) {
      cancelCycle();
      if (pending.current !== null && pending.current !== active) {
        const target = pending.current;
        pending.current = null;
        startCycle(active, target, true);
      }
    }
  }, [active, cancelCycle, startCycle]);

  // One place decides whether the clock runs. Manual transitions obey the dialog, the tab
  // and reduced motion only; automatic ones also obey hover, focus and visibility.
  useEffect(() => {
    if (reduced) { cancelCycle(); return; }
    const c = cycle.current;
    if (c) {
      const run = c.manual ? tabVisible && !suspended : autoAllowed;
      c.anims.forEach((a) => (run ? a.play() : a.pause()));
      return;
    }
    if (autoAllowed) startCycle(active, (active + 1) % N, false);
  }, [autoAllowed, reduced, active, tabVisible, suspended, cancelCycle, startCycle]);

  useEffect(() => () => cancelCycle(), [cancelCycle]);

  // Dots, neighbour clicks and swipes: select a project through a coherent transition.
  const select = useCallback(
    (target: number) => {
      const to = ((target % N) + N) % N;
      setAnnounce(`Project ${to + 1} of ${N}: ${projectsData[to].title}`);
      if (reduced) { cancelCycle(); setActive(to); return; }
      const c = cycle.current;
      if (!c) {
        if (to !== active) startCycle(active, to, true);
        return;
      }
      const t = Number(c.anims[0]?.currentTime ?? 0);
      if (!c.manual && t < c.hold) {
        // Still in the settled hold: nothing has moved yet, so switch cleanly and skip the wait.
        cancelCycle();
        if (to !== active) startCycle(active, to, true);
      } else if (c.to === to) {
        // The running transition already leads there: let it finish, now as a manual one.
        c.manual = true;
        c.anims.forEach((a) => a.play());
      } else {
        // A different transition is under way: let it finish, then continue to the target.
        pending.current = to;
        c.manual = true;
        c.anims.forEach((a) => a.play());
      }
    },
    [active, cancelCycle, reduced, setAnnounce, startCycle]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    swiped.current = false;
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiped.current = true;
      select(active + (dx < 0 ? 1 : -1));
    }
  };

  const stageH = m.ch + 24;
  const textBox = m.stack
    ? { width: "100%", height: `${(1 - m.split) * 100}%` }
    : { width: `${(1 - m.split) * 100}%`, height: "100%" };
  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Projects"
      className="showcase"
      onPointerEnter={(e) => { if (e.pointerType !== "touch") setHover(true); }}
      onPointerLeave={(e) => { if (e.pointerType !== "touch") setHover(false); }}
      onFocus={(e) => { if ((e.target as HTMLElement).matches(":focus-visible")) setFocusIn(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusIn(false); }}
    >
      <div
        ref={stageRef}
        className="relative mx-auto"
        style={{ height: stageH, touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { swipe.current = null; }}
      >
        {projectsData.map((project, i) => {
          const o = clampSlot(ringOffset(i, active));
          const isActive = o === 0;
          const ratio = project.width / project.height;
          return (
            <div
              key={project.link}
              ref={(el) => { cardEls.current[i] = el; }}
              aria-hidden={isActive ? undefined : true}
              onClick={() => {
                if (swiped.current) { swiped.current = false; return; }
                if (!isActive && Math.abs(o) <= 2) select(i);
              }}
              className="absolute left-1/2 top-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_22px_50px_-28px_rgba(0,0,0,0.9)]"
              style={{
                width: m.cw,
                height: m.ch,
                transform: slotTransform(m, o),
                opacity: slotOpacity(o),
                zIndex: slotZ(o),
                cursor: isActive ? "default" : Math.abs(o) <= 2 ? "pointer" : "default",
                pointerEvents: Math.abs(o) >= 3 ? "none" : "auto",
              }}
            >
              {/* Matte behind the screenshot: one flat layer scaled between its side and the whole card */}
              <div
                ref={(el) => { matteEls.current[i] = el; }}
                className="absolute inset-0 bg-white/[0.04]"
                style={{ transformOrigin: m.stack ? "50% 100%" : "100% 50%", transform: matteTransform(m, isActive) }}
              />

              {/* Content: name, description, technologies, link. Fixed size, only its opacity changes. */}
              <div
                ref={(el) => { textEls.current[i] = el; }}
                className="absolute left-0 top-0 flex flex-col overflow-hidden p-6 md:p-7"
                style={{ ...textBox, opacity: isActive ? 1 : 0, padding: m.stack ? 20 : undefined }}
                {...(!isActive ? ({ inert: "" } as Record<string, string>) : {})}
              >
                <h3 className="text-2xl leading-tight text-white">{project.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{project.desc}</p>
                <div className="mt-auto">
                  {project.tags.length > 0 && <p className="mb-1 text-xs tracking-wide text-slate-400">{project.tags.join(" · ")}</p>}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-white underline decoration-indigo-300/40 underline-offset-8 transition-colors hover:decoration-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
                  >
                    Visit website<span className="sr-only">: {project.title}</span>
                    <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Screenshot: a full card sized layer. Settled it is scaled down uniformly to its
                  side; during the takeover the transform simply returns to identity. */}
              <button
                ref={(el) => { imageEls.current[i] = el; }}
                type="button"
                tabIndex={isActive ? 0 : -1}
                // Not `disabled`: a disabled button swallows clicks, so neighbour cards could not be selected.
                onClick={(e) => { if (isActive) onOpen(project, e.currentTarget); }}
                aria-label={`Enlarge preview of ${project.title}`}
                className="absolute inset-0 block focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-300"
                style={{
                  padding: m.pad,
                  cursor: isActive ? "zoom-in" : "pointer",
                  transform: isActive ? settledImageTransform(m, ratio) : IDENTITY,
                }}
              >
                <span className="relative block h-full w-full">
                  {seen.has(i) || Math.abs(o) <= 3 ? (
                    <Image
                      src={project.src}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 620px, (min-width: 640px) 540px, 280px"
                      quality={82}
                      priority={i === 0}
                      className="rounded-md object-contain"
                    />
                  ) : null}
                </span>
              </button>

              {/* Decorative affordance, outside the scaled layer so it stays crisp and in place */}
              <span
                ref={(el) => { iconEls.current[i] = el; }}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white/85 ring-1 ring-white/15"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                <Maximize2 size={14} />
              </span>

              {/* Receding cards are dimmed, never blurred */}
              <span
                ref={(el) => { dimEls.current[i] = el; }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-slate-950"
                style={{ opacity: slotDim(o) }}
              />
            </div>
          );
        })}
      </div>

      {/* Project navigation dots: the only thing beneath the stage */}
      <div className="mt-3 flex items-center justify-center" role="group" aria-label="Choose a project">
        {projectsData.map((project, i) => {
          const on = i === active;
          return (
            <button
              key={project.link}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show project ${i + 1} of ${N}: ${project.title}`}
              aria-current={on ? "true" : undefined}
              className="showcase-dot"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${on ? "w-5 bg-indigo-300" : "w-2 bg-white/25"}`} />
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">{announce}</p>
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

export default function ProjectsCarouselTimeline() {
  const [preview, setPreview] = useState<Project | null>(null);
  const [announce, setAnnounce] = useState("");
  const openPreview = useCallback<OnOpen>((p) => setPreview(p), []);

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
        <h2 className="mb-8 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-10 md:text-5xl">
          A few things I&apos;ve built.
        </h2>
        <Showcase onOpen={openPreview} suspended={preview !== null} announce={announce} setAnnounce={setAnnounce} />
      </div>
      <PreviewDialog project={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
