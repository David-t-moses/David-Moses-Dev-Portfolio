"use client";

import { servicesData } from "@/lib/data";
import React from "react";
import Head from "./Head";
import Button from "./ui/Button";
import TransitionWrapper from "./TransitionWrapper";

const Services = () => {
  return (
    <section
      className="w-full py-[100px] p-3 flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto"
      id="services"
    >
      <Head heading="Services" className="mx-auto" />
      <div className="max-w-5xl flex flex-col mx-auto bg justify-center w-full">
        <TransitionWrapper>
          <div className="flex max-lg:flex-col gap-7 flex-wrap mx-auto justify-center w-full items-center ">
            {servicesData.map((item) => (
              <Button
                img={item.img}
                answer={item.answer}
                key={item.answer}
                className="max-w-[30%] w-full h-[200px]"
              />
            ))}
          </div>
        </TransitionWrapper>
      </div>
    </section>
  );
};

export default Services;
