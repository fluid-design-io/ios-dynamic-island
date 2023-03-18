"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { useIsland } from "@/lib/store";
import {
  itemEnterAnimation,
  itemExitAnimation,
  itemExpandAnimation,
} from "@/lib/animations";

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
  return (
    <motion.div
      layoutId='pill-left'
      className={clsx("island-pill-start", className)}
      initial={
        initialExpandAnimation
          ? { ...itemEnterAnimation, opacity: 0, x: -16, scaleX: 0.5 }
          : itemEnterAnimation
      }
      animate={
        initialExpandAnimation
          ? {
              ...itemExpandAnimation,
              transition: {
                ...itemExpandAnimation.transition,
                delay: switchDuration / 1000 + 0.14,
              },
            }
          : itemExpandAnimation
      }
      exit={{ ...itemExitAnimation, x: 4 }}
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
  return (
    <motion.div
      layoutId='pill-right'
      layout
      className={clsx("island-pill-end", className)}
      initial={
        initialExpandAnimation
          ? { ...itemEnterAnimation, opacity: 0, x: 16, scaleX: 0.5 }
          : itemEnterAnimation
      }
      animate={
        initialExpandAnimation
          ? {
              ...itemExpandAnimation,
              transition: {
                ...itemExpandAnimation.transition,
                delay: switchDuration / 1000 + 0.14,
              },
            }
          : itemExpandAnimation
      }
      exit={{ ...itemExitAnimation, x: -4 }}
      transition={{ type: "spring", bounce: 0.01 }}
    >
      {children}
    </motion.div>
  );
};

Pill.displayName = "Pill";
PillStart.displayName = "PillStart";
PillEnd.displayName = "PillEnd";
