import React from "react";
import Button from "./ui/Button";
import { aboutData } from "../lib/data";
import Head from "./Head";
import TransitionWrapper from "./TransitionWrapper";

const About: React.FC = () => {
  return (
    <section
      className="w-full p-3 flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto"
      id="about"
    >
      <Head heading="About Me" />
      <TransitionWrapper>
        <div className="flex max-lg:flex-col gap-10 flex-wrap mx-auto justify-center max-w-5xl">
          {aboutData.map((item) => (
            <Button
              img={item.img}
              question={item.question}
              answer={item.answer}
              key={item.answer}
              className="max-w-[46%] w-full"
            />
          ))}
        </div>
      </TransitionWrapper>
    </section>
  );
};

export default About;
