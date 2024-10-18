"use client";

import React from "react";
import Head from "./Head";
import Image from "next/image";
import { Form } from "./Form";
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import TransitionWrapper from "./TransitionWrapper";
import Link from "next/link";

const Contact = () => {
  return (
    <section
      className="w-full pt-[100px] pb-5 lg:px-10 flex flex-col justify-center items-center max-md:text-center bg-slate-950 mx-auto overflow-hidden"
      id="contact"
    >
      <Head heading="Let's Have a Chat" className="mx-auto" />
      <div className="max-w-5xl flex flex-col mx-auto justify-center w-full">
        <TransitionWrapper>
          <div className="flex justify-between items-center w-full max-md:flex-col-reverse mx-auto">
            <div className="relative flex lg:w-1/2 w-full h-[20rem] md:h-[35rem] max-h-full min-h-full max-[900px]:px-10">
              <Image
                src="/contact-img.jpg"
                alt="contact"
                height={1000}
                width={1000}
                className="opacity-80"
              />
              <div className="absolute left-5 bottom-5 flex max-md:flex-col text-white max-[900px]:px-12">
                <div className="flex max-md:flex-col justify-between items-start gap-5 text-left flex-wrap">
                  <h2 className="font-bold text-lg w-full">
                    BELIEVE IN <span className="text-blue-400">DAVID</span>{" "}
                  </h2>
                  <div className="md:w-4/5">
                    <h3 className="font-bold">EMAIL</h3>
                    <p>davidtmoses5@gmail.com</p>
                  </div>
                  <div className="md:w-4/5">
                    <h3 className="font-bold">WORKING HOURS</h3>
                    <p>9:00AM - 5:00PM</p>
                  </div>
                  <div className="md:w-4/5">
                    <h3 className="font-bold">ADDRESS</h3>
                    <p>Africa NG</p>
                  </div>
                  <div className="flex gap-3 text-xl">
                    <Link
                      href="https://github.com/david-t-moses/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <FaGithub />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/david-t-moses/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      href="https://x.com/david_t_moses"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      href="https://discordapp.com/users/1277554581454458911"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <FaDiscord />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 text-left flex justify-center items-center">
              <Form />
            </div>
          </div>
        </TransitionWrapper>
      </div>
    </section>
  );
};

export default Contact;
