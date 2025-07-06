import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

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
    <motion.button
      className={cn(
        "relative inline-flex overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full h-full min-h-[320px]",
        className
      )}
      type={type}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className={cn(
          "inline-flex flex-col h-full w-full cursor-pointer items-start justify-between rounded-2xl bg-slate-950 p-6 text-sm font-medium text-white backdrop-blur-3xl overflow-hidden",
          spanClassName
        )}
      >
        {img && (
          <motion.div
            className="w-full text-center flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative inline-block">
              <motion.div
                className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-blue_bg p-1"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src={img}
                  alt={question || "About image"}
                  height={60}
                  width={60}
                  className="w-full h-full rounded-full object-cover"
                />
              </motion.div>
            </div>
            {question && (
              <motion.h3
                className="text-lg font-bold mt-3 text-white leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {question}
              </motion.h3>
            )}
          </motion.div>
        )}

        <motion.div
          className="flex-1 flex items-center justify-start w-full overflow-hidden mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-slate-300 text-sm leading-relaxed text-left break-words hyphens-auto flex items-start gap-2 w-full">
            <span className="flex-1 min-w-0">{answer}</span>
            {icon && <span className="flex-shrink-0 ml-2">{icon}</span>}
          </p>
        </motion.div>
      </span>
    </motion.button>
  );
};

export default Button;
