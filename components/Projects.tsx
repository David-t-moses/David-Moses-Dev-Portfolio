"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import ThreeDCard from "./ThreeDCard";
import { projectsData } from "@/lib/data";
import Head from "./Head";
import TransitionWrapper from "./TransitionWrapper";

export function Projects() {
  return (
    <section
      className="relative w-full py-[100px] lg:px-10 flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto overflow-x-hidden"
      id="projects"
    >
      <div className=" absolute size-3/5 w-4/5  border bg-blue_bg -right-[60%] blur-[100px] rounded-full" />
      <div className=" absolute size-3/5 w-4/5  border bg-blue_bg -left-[60%] blur-[100px] rounded-full" />
      <Head heading="Some Latest Projects" className="mx-auto" />
      <div className="max-w-5xl flex flex-col mx-auto justify-center w-full">
        <TransitionWrapper>
          <div className="flex max-md:flex-col w-full justify-center items-center gap-10 flex-wrap ">
            {projectsData.map((item) => (
              <div className="flex justify-between h-[27rem] items-center text-white w-[19rem] max-md:mt-5 md:h-[27rem] lg:h-96">
                <PinContainer
                  containerClassName="md:h-full"
                  className="w-full h-full"
                  link={item.link}
                >
                  <ThreeDCard
                    key={item.alt}
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    desc={item.desc}
                  />
                </PinContainer>
              </div>
            ))}
          </div>
        </TransitionWrapper>
      </div>
    </section>
  );
}
