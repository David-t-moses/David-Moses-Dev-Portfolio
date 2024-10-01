"use client";

import React, { ReactNode } from "react";
import { useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

const TransitionWrapper = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out overflow-hidden transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 delay-1000"
      }`}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
