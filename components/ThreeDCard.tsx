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
    <div className="flex flex-col w-full h-full p-4 gap-4">
      {/* Image Container */}
      <div className="w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex-shrink-0">
        <Image
          src={src}
          alt={alt}
          height={400}
          width={400}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-lg text-slate-100 leading-tight line-clamp-2">
          {title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 flex-1">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default ThreeDCard;
