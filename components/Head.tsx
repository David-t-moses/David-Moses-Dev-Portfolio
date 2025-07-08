"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import TransitionWrapper from "./TransitionWrapper";

const Head = ({
  heading,
  className,
}: {
  heading: string;
  className?: string;
}) => {
  return (
    <TransitionWrapper>
      <div className={cn("flex items-center justify-center mb-20", className)}>
        <h1 className="text-white text-4xl font-bold">{heading}</h1>
        <Image
          src="/image-4.png"
          alt="image-4"
          height={20}
          width={20}
          className="bg-white rounded-[100%] h-6 w-6 ml-2 max-md:hidden"
        />
      </div>
    </TransitionWrapper>
  );
};

export default Head;
