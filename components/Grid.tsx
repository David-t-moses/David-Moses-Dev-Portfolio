import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Grid = ({
  title,
  description,
  src,
  alt,
  className,
}: {
  title: string;
  description: string;
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "relative row-span-1 rounded-2xl bg-black/10 flex flex-col space-y-4 justify-between border-white shadow-input dark:shadow-none p-4 hover:shadow-xl max-md:h-[300px] max-md:w-full cursor-pointer",
        className
      )}
    >
      <div className="relative h-[80%] flex">
        <Image
          src={src}
          alt={alt}
          height={300}
          width={1300}
          className="rounded-2xl opacity-90"
        />
      </div>
      <div>
        <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-xs text-neutral-300">
          {description}
        </div>
      </div>
    </section>
  );
};

export default Grid;
