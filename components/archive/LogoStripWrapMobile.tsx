"use client";

// The moving version is kept in components/archive/LogoStripMarquee.tsx. It is still now, because the
// Projects section right below it is the moving one.

import React from "react";
import { projectLogos, type ProjectLogo } from "@/lib/logos";

const rowA = projectLogos.filter((l) => l.row === 1);
const rowB = projectLogos.filter((l) => l.row === 2);

function Row({ logos }: { logos: ProjectLogo[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-7 gap-y-4 p-0 md:gap-x-16 md:gap-y-5">
      {logos.map((l) => (
        <li key={l.name} className="flex shrink-0 items-center">
          <img
            src={l.src}
            alt={`${l.name} logo`}
            width={Math.round(l.h * l.ratio)}
            height={l.h}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ height: l.h, width: "auto" }}
            className="object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 max-md:!h-auto max-md:!w-auto max-md:max-h-[18px] max-md:max-w-[78px]"
          />
        </li>
      ))}
    </ul>
  );
}

/** Two quiet rows of logos from the projects shown below. Nothing moves. */
export default function LogoStrip() {
  return (
    <div
      role="group"
      aria-label="Logos of projects shown in this portfolio"
      className="flex flex-col gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 px-5 py-8 md:gap-7 md:px-6 md:py-12"
    >
      <Row logos={rowA} />
      <Row logos={rowB} />
    </div>
  );
}
