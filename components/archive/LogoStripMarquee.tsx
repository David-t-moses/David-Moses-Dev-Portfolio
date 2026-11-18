"use client";

import React, { useEffect, useRef } from "react";
import { projectLogos, type ProjectLogo } from "@/lib/logos";
import { useActive } from "../useActive";

const rowA = projectLogos.filter((l) => l.row === 1);
const rowB = projectLogos.filter((l) => l.row === 2);

/** One group of logos. Only the first group is exposed to assistive technology. */
function Group({ logos, hidden }: { logos: ProjectLogo[]; hidden?: boolean }) {
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.name} className="flex shrink-0 items-center">
          <img
            src={l.src}
            alt={hidden ? "" : `${l.name} logo`}
            width={Math.round(l.h * l.ratio)}
            height={l.h}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ height: l.h, width: "auto" }}
            className="opacity-60"
          />
        </li>
      ))}
    </ul>
  );
}

function Row({ logos, reverse }: { logos: ProjectLogo[]; reverse?: boolean }) {
  return (
    <div className={`marquee-track ${reverse ? "marquee-right" : "marquee-left"}`}>
      <Group logos={logos} />
      <Group logos={logos} hidden />
    </div>
  );
}

/**
 * Two slow rows of project logos. CSS transform only; no per frame JavaScript.
 * Movement pauses on hover, keyboard focus, when off screen and when the tab is
 * hidden (a data attribute flips, no React render). Reduced motion is static.
 */
export default function LogoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { state, subscribe } = useActive(ref);

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
    <div
      ref={ref}
      role="group"
      aria-label="Logos of projects shown in this portfolio"
      tabIndex={0}
      className="marquee relative flex flex-col gap-5 overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 py-9 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-300"
    >
      <Row logos={rowA} />
      <Row logos={rowB} reverse />
    </div>
  );
}
