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
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <Link
      href={link}
      className={cn(
        "relative group/pin z-50  cursor-pointer flex justify-center items-center p-5 lg:p-0 h-[400px] w-full",
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
        className="flex justify-center items-center h-full w-full"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2  flex flex-col justify-between items-center  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] border bg-transparent border-[#6567ea] group-hover/pin:border-white/[0.2] transition duration-700  h-full w-full"
        >
          <div className={cn(" relative z-50 ", className)}>{children}</div>
        </div>
      </div>
    </Link>
  );
};
