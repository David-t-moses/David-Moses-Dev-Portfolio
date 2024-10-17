import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Notification from "@/components/Notification";
import { Projects } from "@/components/Projects";
import Services from "@/components/Services";
import { TechStack } from "@/components/TechStack";
import TransitionWrapper from "@/components/TransitionWrapper";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="relative top-0 flex flex-col overflow-x-hidden">
      <Notification />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TransitionWrapper>
        <div className="w-full py-[100px] px-10 flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto max-sm:hidden">
          <div className="relative max-w-5xl flex flex-col mx-auto bg justify-center w-full max-h-36 overflow-hidden rounded-lg text-white">
            <div className="h-full w-full bg-blue_bg absolute top-0 left-0 opacity-70 z-10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]" />
            <div className="flex justify-between absolute top-0 left-0 z-20 w-full h-full gap-6 p-3 md:p-8 items-center">
              <div className="">
                <h1 className="font-semibold md:text-2xl text-[12px]">
                  Ready to take your business to the next level?
                </h1>
                <p className="text-slate-100 text-[8px] md:text-sm text-left">
                  Let's build something that turns your visitors into customers.
                </p>
              </div>
              <div>
                <Link
                  href="https://discordapp.com/users/1277554581454458911"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    type="button"
                    className="flex border p-2 gap-2 justify-between items-center rounded-md text-[12px] md:text-lg"
                  >
                    <p>Connect</p>
                    <span>
                      <FaArrowRightLong />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <Image
              src="/image-11.jpeg"
              alt="grow your business"
              height={5}
              width={5}
              className="w-full"
            />
          </div>
        </div>
      </TransitionWrapper>
      <TechStack />
      <Projects />
      <Contact />
    </div>
  );
}
