"use client";
import React from "react";
import { BackgroundBeamsWithCollision } from "./ui/Background";
import Image from "next/image";
import TransitionWrapper from "./TransitionWrapper";

export default function Hero() {
  return (
    <header
      className="relative w-full h-screen flex flex-col justify-center items-center max-md:text-center"
      id="home"
    >
      <BackgroundBeamsWithCollision>
        <div className=" absolute size-3/5 w-4/5  border bg-blue_bg -left-[60%] blur-[100px] rounded-full" />
        <div className=" absolute size-3/5 w-4/5  border bg-blue_bg -right-[60%] blur-[100px] rounded-full" />
        <TransitionWrapper>
          <div className="flex max-md:flex-col justify-between items-center w-full max-w-6xl max-[1100px]:px-[8%] gap-8">
            <div className="flex-1 max-w-5xl">
              <h1 className="text-3xl md:text-5xl text-white font-bold z-10 leading-9">
                TRANSFORM YOUR VISION INTO
                <span className="text-blue-400"> REALITY!</span>
              </h1>
              <p className="text-white mt-7 max-md:text-sm">
                Innovative Tech Solutions Tailored for Your Success Unlock the
                full potential of your digital presence with custom web
                development designed to captivate, engage, and convert. Let's
                turn your ideas into stunning websites that not only look
                amazing but perform flawlessly.
              </p>
              <p className="text-white mt-7 text-[18px] font-bold">
                Hi i&apos;m David | Full Stack Web Developer.
              </p>
            </div>

            <div className="flex-1 flex justify-center items-center max-w-xl">
              <Image
                src="/image-1.png"
                alt="Hero img"
                width={600}
                height={600}
                className="w-full h-auto object-contain max-sm:hidden"
                priority
              />
            </div>
          </div>
        </TransitionWrapper>
      </BackgroundBeamsWithCollision>
    </header>
  );
}
