"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const PinContainer = ({
  children,
  className,
  containerClassName,
  link,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  link?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg) scale(1)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <div
      className={cn(
        "relative group/pin z-50 cursor-pointer w-full h-full",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute inset-0 w-full h-full flex justify-center items-center"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 top-1/2 w-full h-full max-w-sm rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] border border-[#6567ea] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden bg-slate-950"
        >
          <Link
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("relative z-50 w-full h-full block", className)}
          >
            {children}
          </Link>
        </div>
      </div>
    </div>
  );
};
