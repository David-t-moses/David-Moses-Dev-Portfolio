import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  alt,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  alt?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative row-span-1 rounded-2xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none border-white/[0.2] justify-between flex flex-col space-y-4 overflow-hidden max-md:h-[300px] max-md:w-full",
        className
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200y ">
        <Image
          src={header}
          alt={alt}
          height={500}
          width={900}
          quality={100}
          className="absolute top-0 left-0"
        />
      </div>

      <div className="group-hover/bento:translate-x-2 transition duration-200y  z-20">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
