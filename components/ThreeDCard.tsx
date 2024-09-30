import Image from "next/image";
import React from "react";

const ThreeDCard = ({
  src,
  alt,
  title,
  desc,
}: {
  src: string;
  alt: string;
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex justify-start items-center basis-full flex-col  tracking-tight text-slate-100/50 sm:basis-1/2 w-full h-full gap-3">
      <div className=" flex h-3/5 bg-green-800 w-full rounded-2xl">
        <Image
          src={src}
          alt={alt}
          height={500}
          width={500}
          className="rounded-xl"
        />
      </div>
      <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-xl text-slate-100 text-left w-full">
        {title}
      </h3>
      <div className="text-base !m-0 !p-0 font-normal ">
        <span className="text-slate-300 ">{desc}</span>
      </div>
    </div>
  );
};

export default ThreeDCard;
