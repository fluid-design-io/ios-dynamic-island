"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { useIsland } from "@/lib/store";

export const Pill = ({ children }: { children: React.ReactNode }) => (
  <div className='island-pill-container'>{children}</div>
);
export const PillStart = ({
  blurOnInitial = true,
  blurOnExit = true,
  className,
  children,
}: {
  blurOnInitial?: boolean;
  blurOnExit?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  const { initialExpandAnimation, switchDuration } = useIsland();
  const initialCustomExpandAnimation = initialExpandAnimation
    ? {
        opacity: 0,
        x: -16,
        scaleX: 0.5,
      }
    : {
        opacity: 0,
        x: 0,
        scaleX: 1,
      };
  return (
    <motion.div
      layoutId='pill-left'
      className={clsx("island-pill-start", className)}
      initial={{
        ...initialCustomExpandAnimation,
        WebkitFilter: blurOnInitial ? "blur(8px)" : "",
      }}
      animate={{
        x: 0,
        scaleX: 1,
        WebkitFilter: "blur(0px)",
        opacity: 1,
        transition: {
          delay: initialExpandAnimation ? switchDuration / 1000 + 0.14 : 0,
          type: "spring",
          bounce: 0,
          duration: 0.36,
        },
      }}
      exit={{
        x: 4,
        scaleX: 0.5,
        WebkitFilter: blurOnExit ? "blur(8px)" : "",
        opacity: 0,
      }}
      transition={{ type: "spring", bounce: 0.01 }}
    >
      {children}
    </motion.div>
  );
};

export const PillEnd = ({
  blurOnInitial = true,
  blurOnExit = true,
  className,
  children,
}: {
  blurOnInitial?: boolean;
  blurOnExit?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  const { initialExpandAnimation, switchDuration } = useIsland();
  const initialCustomExpandAnimation = initialExpandAnimation
    ? {
        opacity: 0,
        x: 16,
        scaleX: 0.5,
      }
    : {
        opacity: 0,
        x: 0,
        scaleX: 1,
      };
  return (
    <motion.div
      layoutId='pill-right'
      layout
      className={clsx("island-pill-end", className)}
      initial={{
        ...initialCustomExpandAnimation,
        WebkitFilter: blurOnInitial ? "blur(8px)" : "",
        opacity: 0,
      }}
      animate={{
        x: 0,
        scaleX: 1,
        WebkitFilter: "blur(0px)",
        opacity: 1,
        transition: {
          delay: initialExpandAnimation ? switchDuration / 1000 + 0.14 : 0,
          type: "spring",
          bounce: 0,
          duration: 0.36,
        },
      }}
      exit={{
        x: 16,
        scaleX: 0.5,
        WebkitFilter: blurOnExit ? "blur(8px)" : "",
        opacity: 0,
      }}
      transition={{ type: "spring", bounce: 0.01 }}
    >
      {children}
    </motion.div>
  );
};

Pill.displayName = "Pill";
PillStart.displayName = "PillStart";
PillEnd.displayName = "PillEnd";
