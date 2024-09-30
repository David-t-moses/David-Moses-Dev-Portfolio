import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid } from "./ui/BentoGrid";
import Grid from "./Grid";
import Head from "./Head";
import TransitionWrapper from "./TransitionWrapper";

export function TechStack() {
  return (
    <div className="relative w-full py-[100px] lg:px-5 flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto">
      <div className=" absolute size-3/5 w-4/5  border bg-blue_bg -right-[60%] blur-[100px] rounded-full" />
      <Head heading="My Tech Stack" className="mx-auto" />
      <TransitionWrapper>
        <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]max-md:w-full">
          {items.map((item, i) => (
            <Grid
              key={i}
              title={item.title}
              alt={item.alt}
              description={item.description}
              src={item.header}
              className={cn("max-md:mt-5", item.className)}
            />
          ))}
        </BentoGrid>
      </TransitionWrapper>
    </div>
  );
}

const items = [
  {
    title: "TypeScript",
    description: "Well experienced in TypeScript",
    header: "/typescript.jpeg",
    alt: "typescript",
    className: "md:col-span-2",
  },
  {
    title: "Git and Github",
    description: "Proficient with the use of Git and Github",
    header: "/git-github.jpg",
    alt: "git-github",
    className: "md:col-span-1",
  },
  {
    title: "TailwindCSS",
    description: "Well experienced in styling with TailwindCSS",
    header: "/tailwind.jpeg",
    alt: "tailwind",
    className: "md:col-span-1",
  },
  {
    title: "React.JS",
    description: "Great proficiency in ReactJS",
    header: "/react.jpeg",
    alt: "react",
    className: "md:col-span-2",
  },
  {
    title: "Next.JS",
    description:
      "Well experienced in building Fullstack web applications with NextJS",
    header: "/next.jpeg",
    alt: "next",
    className: "md:col-span-3",
  },
];
