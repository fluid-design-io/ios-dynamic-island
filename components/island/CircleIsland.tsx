"use client";

import {
  itemEnterAnimation,
  itemExitAnimation,
  itemExpandAnimation,
} from "@/lib/animations";
import { ExpandType, SituationType, useIsland } from "@/lib/store";
import {
  motion,
  useSpring,
  useMotionTemplate,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import { MusicAndCounter } from "../situations/MusicAndCounter";
export const CircleIsland = () => {
  const {
    expand,
    situation,
    initialExpandAnimation,
    switchDuration,
    startAnimating,
    stopAnimating,
  } = useIsland();
  const [isSplitted, setIsSplitted] = useState(false);
  const inputMorphValue = isSplitted ? [0, 6, 8] : [0, 2, 8];
  const morph = useSpring(0, {
    stiffness: isSplitted ? 180 : 120,
    damping: isSplitted ? 30 : 50,
    mass: 2,
  }); // min 0, max 8
  const leftSideWidth = useSpring(32, { bounce: 0.18 });
  const morphValue = useTransform(morph, inputMorphValue, [0, 0, 8]);
  const morphOppo = useTransform(morph, inputMorphValue, [16, 16, 8]);
  const bezierStrength = useTransform(morph, inputMorphValue, [3.6, 7, 8]);
  const outputUpperMidpoint = [3.6, 1, 7];
  const outputLowerMidpoint = [12.4, 15, 9];
  const upperMidpoint = useTransform(
    morph,
    inputMorphValue,
    outputUpperMidpoint
  );
  const lowerMidpoint = useTransform(
    morph,
    inputMorphValue,
    outputLowerMidpoint
  );
  const leftEdge = useTransform(morph, inputMorphValue, [0, -4.5, 8]);
  const leftEdgeCenter = useTransform(morph, inputMorphValue, [0, -4, 8]);
  const distanceTransform = useTransform(
    morph,
    [0, 8],
    [333 / 2 + 20, 333 / 2 + 60]
  );
  // the transform of the opposite side of the island for the water drop effect
  const distanceOffsetTransform = useTransform(
    morph,
    [0, 4, 8],
    [333 / 2 + 20, 333 / 2 + 24, 333 / 2 + 20]
  );
  const circleIslandWidth = useTransform(morph, inputMorphValue, [
    32,
    isSplitted ? 36 : 32,
    32,
  ]);
  const d = useMotionTemplate`M8 0C${bezierStrength} ${morphValue} ${leftEdge} ${upperMidpoint} ${leftEdgeCenter} 8C${leftEdge} ${lowerMidpoint} ${bezierStrength} ${morphOppo} 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0Z`;

  useEffect(() => {
    if (expand === ExpandType.Split) {
      setIsSplitted(true);
      morph.set(8);
      setTimeout(() => {
        leftSideWidth.set(62);
      }, 100);
    } else {
      setIsSplitted(false);
      morph.set(0);
      leftSideWidth.set(32);
    }
  }, [expand]);
  morph.on("change", (value) => {
    if (value < 0.2 || value > 7.6) {
      stopAnimating();
    } else {
      startAnimating();
    }
  });
  const initial = itemEnterAnimation
    ? { ...itemEnterAnimation, scaleX: 1 }
    : itemEnterAnimation;
  const animate = initialExpandAnimation
    ? {
        ...itemExpandAnimation,
        transition: {
          delay: switchDuration / 1000,
        },
      }
    : {
        itemExpandAnimation,
        transition: {
          delay: 0.14,
        },
      };
  const exit = itemExitAnimation;

  return (
    <>
      <motion.div
        className='absolute top-0 z-20 rounded-l-full h-[32px] overflow-hidden island-background'
        style={{
          width: leftSideWidth,
          right: 333 / 2 + 102 / 2 - 32,
        }}
      >
        <AnimatePresence>
          {situation === SituationType.MusicAndCounter && (
            <motion.div
              key={`circle-island-left-${expand}`}
              initial={initial}
              animate={animate}
              exit={exit}
              className='flex justify-start items-center h-full pl-2'
            >
              <MusicAndCounter.Left />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.svg
        key={`circle-island-${expand}`}
        fill='inhert'
        width='32'
        height='32'
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 z-20 rounded-[50%] rotate-180 overflow-visible island-fill-color'
        style={{
          left: distanceOffsetTransform,
        }}
      >
        <motion.path d={d} fill='inherit' />
      </motion.svg>
      <motion.div
        key={`circle-island-background-${expand}`}
        style={{
          position: "absolute",
          left: distanceTransform,
        }}
        className='absolute top-0 z-20'
      >
        <motion.svg
          fill='inhert'
          width='32'
          height='32'
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'
          className='overflow-visible rounded-[50%] absolute left-0 top-0 island-fill-color'
        >
          <motion.path d={d} fill='inherit' />
        </motion.svg>
        <motion.div
          style={{
            width: circleIslandWidth,
          }}
          className='absolute left-0 top-0 island-background h-[32px] rounded-[50%] overflow-visible'
        >
          <AnimatePresence>
            {situation === SituationType.MusicAndCounter && (
              <motion.div
                key={`circle-island-right-${expand}`}
                initial={initial}
                animate={animate}
                exit={{
                  ...exit,
                  transition: {
                    opacity: {
                      delay: 2,
                      duration: 0.7,
                    },
                  },
                }}
                className='flex justify-center items-center h-full'
                transition={{ type: "spring", bounce: 0, duration: 0.7 }}
              >
                <MusicAndCounter.Right />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};
