"use client";

import { ExpandType, useIsland } from "@/lib/store";
import {
  motion,
  useSpring,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
export const CircleIsland = () => {
  const { expand } = useIsland();
  const [isSplitted, setIsSplitted] = useState(false);
  const inputMorphValue = [0, 6, 8];
  const morph = useSpring(0, { stiffness: 170, damping: 30, mass: 2 }); // min 0, max 8
  const leftSideWidth = useSpring(32, { bounce: 0.18 });
  // const morphOppo = size - morph.get();
  const morphValue = useTransform(morph, inputMorphValue, [0, 0, 8]);
  const morphOppo = useTransform(morph, inputMorphValue, [16, 16, 8]);
  const bezierStrength = useTransform(morph, inputMorphValue, [3.6, 7, 8]);
  // const upperMidpoint = (morph.get() / 8) * 3.4 + 3.6; // min 3.6 max 7
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
    [333 / 2 + 24, 333 / 2 + 60]
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
      leftSideWidth.set(62);
    } else {
      setIsSplitted(false);
      morph.set(0);
      leftSideWidth.set(32);
    }
  }, [expand, morph, setIsSplitted]);
  return (
    <>
      <motion.div
        className='absolute top-0 z-20 rounded-l-full h-[32px] island-background overflow-hidden'
        style={{
          width: leftSideWidth,
          right: 333 / 2 + 102 / 2 - 32,
        }}
      >
        <div>Hi there</div>
      </motion.div>
      <motion.svg
        key={`circle-island-${expand}`}
        fill='inhert'
        width='32'
        height='32'
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 z-20 rounded-[50%] rotate-180 overflow-visible island-fill-color'
        transition={{
          zIndex: { duration: 0 },
        }}
        style={{
          zIndex: expand === ExpandType.Split ? 10 : 0,
          left: 333 / 2 + 24,
        }}
      >
        <motion.path d={d} fill='inherit' />
      </motion.svg>
      <motion.div
        key={`circle-island-background-${expand}`}
        style={{
          position: "absolute",
          left: distanceTransform,
          zIndex: expand === ExpandType.Split ? 10 : 0,
        }}
        className='absolute top-0 z-40'
        transition={{
          zIndex: { duration: 0 },
        }}
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
        />
      </motion.div>
    </>
  );
};
