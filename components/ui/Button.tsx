import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";

const Button = ({
  img,
  question,
  answer,
  className,
  spanClassName,
  icon,
  type,
}: {
  img?: string;
  question?: string;
  answer: ReactNode;
  className?: string;
  spanClassName?: string;
  icon?: ReactNode;
  type?: any;
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 max-w-[280px] max-lg:max-w-2xl",
        className
      )}
      type={type}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className={cn(
          "inline-flex flex-col h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl",
          spanClassName
        )}
      >
        {img && (
          <div className="text-center mb-4">
            <Image
              src={img}
              alt="image-1"
              height={50}
              width={50}
              className="bg-blue_bg rounded-full mx-auto"
            />
            <h3 className="text-lg font-bold">{question}</h3>
          </div>
        )}
        <p className="text-slate-300 flex gap-2">
          {answer} {icon}
        </p>
      </span>
    </button>
  );
};

export default Button;
