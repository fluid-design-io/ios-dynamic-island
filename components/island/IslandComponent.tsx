"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Frame,
  Toolbar,
  Camera,
  Situations,
  switchTabHoldSituation,
} from "@/components";

import clsx from "clsx";
import { useTapAndHold } from "@/hooks/useTapAndHold";
import { ExpandType, SituationType, useIsland } from "@/lib/store";
import { CircleIsland } from "./CircleIsland";

export const IslandComponent = () => {
  const {
    expand,
    situation,
    islandBouceEffect,
    islandDimensions,
    isAnimating,
    goBack,
    switchSituation,
    startAnimating,
    stopAnimating,
  } = useIsland();
  const islandRef = useRef<HTMLDivElement>(null);
  const [isTapped, resetTapped] = useTapAndHold(
    islandRef,
    () => {
      if (situation !== SituationType.None) {
        if (
          expand === ExpandType.Pill ||
          expand === ExpandType.PillFull ||
          expand === ExpandType.Split
        ) {
          switchTabHoldSituation(situation, switchSituation);
          setTimeout(() => {
            resetTapped();
          }, 1000);
        }
      }
    },
    400
  );
  const [isCircleIslandActive, setIsCircleIslandActive] = useState(false);

  const islandVariants = {
    hover:
      expand === ExpandType.Pill
        ? {
            scale: 1.03,
            transition: {
              type: "spring",
              bounce: 0.4,
            },
          }
        : {},
    tap:
      expand === ExpandType.Pill
        ? {
            scale: 0.98,
            transition: {
              type: "spring",
              bounce: 0.1,
            },
          }
        : expand === ExpandType.None
        ? { scale: 0.94 }
        : {},
  };
  const islandBgVariants = {
    hover:
      expand === ExpandType.Pill
        ? {
            scale: 1.05,
            transition: {
              type: "spring",
              bounce: 0.4,
            },
          }
        : {},
    tap:
      expand === ExpandType.Pill
        ? {
            scale: 0.9,
            transition: {
              type: "spring",
              bounce: 0.08,
            },
          }
        : expand === ExpandType.None
        ? {
            scale: 0.94,
            transition: {
              type: "spring",
              bounce: 0.95,
              duration: 0.15,
            },
          }
        : {},
  };
  const cutoutShadowValue = useSpring(0, { bounce: 0 });
  const cutoutOpacityValue = useSpring(1, { stiffness: 100 });
  const islandShadowY = useSpring(0, { bounce: 0 });
  const islandShadowBlur = useSpring(0, { bounce: 0 });
  const islandOpacityValue = useSpring(0, { stiffness: 100 });
  const islandCutoutDropShadow = useMotionTemplate`0px 0px ${cutoutShadowValue}px ${cutoutShadowValue}px rgba(0, 0, 0, ${cutoutOpacityValue})`;
  const islandDropShadow = useMotionTemplate`0px ${islandShadowY}px ${islandShadowBlur}px -8px rgba(0, 0, 0, ${islandOpacityValue})`;

  useEffect(() => {
    cutoutShadowValue.jump(0);
    if (isAnimating) {
      if (expand === ExpandType.None) {
        cutoutShadowValue.set(0);
        cutoutOpacityValue.set(1);
      }
      if (expand === ExpandType.Capsule || expand === ExpandType.Full) {
        cutoutShadowValue.set(16);
        setTimeout(() => {
          cutoutOpacityValue.set(0);
        }, 250);
      }
    }
  }, [isAnimating, cutoutShadowValue, expand, cutoutOpacityValue]);

  useEffect(() => {
    if (expand === ExpandType.Capsule) {
      islandShadowY.set(10);
      islandShadowBlur.set(24);
      islandOpacityValue.set(0.35);
    }
    if (expand === ExpandType.Full) {
      islandShadowY.set(16);
      islandShadowBlur.set(36);
      islandOpacityValue.set(0.4);
    }
    if (expand !== ExpandType.Capsule && expand !== ExpandType.Full) {
      islandShadowY.set(0);
      islandShadowBlur.set(0);
      islandOpacityValue.set(0);
    }
  }, [expand, islandShadowY, islandShadowBlur, islandOpacityValue]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (expand === ExpandType.Split) {
      setIsCircleIslandActive(true);
    } else {
      intervalId = setInterval(() => {
        // @ts-ignore
        if (expand !== ExpandType.Split) {
          setIsCircleIslandActive(false);
        } else {
          setIsCircleIslandActive(true);
          clearInterval(intervalId);
        }
      }, 1400);
    }

    return () => clearInterval(intervalId);
  }, [expand]);
  return (
    <div className='flex flex-col justify-between w-full'>
      <Frame>
        <div className='flex flex-col justify-end items-center w-full h-full flex-1 relative'>
          {/* Top island with camera */}
          <motion.div
            style={{
              position: "absolute",
              height: 32 - 2,
              width: 102 - 4,
              borderRadius: 18,
              backgroundColor: "#020202",
              zIndex: 50,
              top: 1,
              pointerEvents: "none",
              boxShadow: islandCutoutDropShadow,
              clip: "rect(0px, 166px, 64px, -64px)",
            }}
            transition={{
              type: "spring",
              bounce: 0,
              restDelta: 0.008,
            }}
          >
            <Camera />
          </motion.div>

          {/* Circle Island for clock example */}
          {isCircleIslandActive && <CircleIsland />}
          {/* Main Island */}
          <motion.div
            id='island'
            ref={islandRef} // this is the ref for the tap and hold
            className={clsx(
              "z-30 absolute ring-1 island select-none touch-manipulation mx-auto inset-x-0 top-0 overflow-hidden",
              {
                "ring-black/0 dark:ring-white/0": expand === ExpandType.None,
                "ring-black/5 dark:ring-white/5": expand !== ExpandType.None,
              }
            )}
            initial={false}
            animate={{
              height: islandDimensions.height,
              width: islandDimensions.width,
              borderRadius: islandDimensions.borderRadius,
            }}
            whileHover='hover'
            whileTap='tap'
            transition={{
              default: {
                type: "spring",
                bounce: islandBouceEffect,
                restDelta: 0.008,
              },
              left: {
                type: "spring",
                bounce: islandBouceEffect + 0.1,
              },
            }}
            style={{
              boxShadow: islandDropShadow,
            }}
            variants={islandVariants}
            onAnimationStart={startAnimating}
            onAnimationComplete={stopAnimating}
          >
            {/* island background for hover/tap */}
            <motion.div
              className='island-background absolute pointer-events-none z-30 inset-0'
              initial={false}
              animate={{
                borderRadius: islandDimensions.borderRadius,
              }}
              variants={islandBgVariants}
              transition={{
                type: "spring",
                bounce: 0.3,
                restDelta: 0.008,
              }}
            />
            <Situations />
          </motion.div>
          <div className='flex-1' />
        </div>
        <AnimatePresence>
          {(expand === ExpandType.Full || expand === ExpandType.Capsule) && (
            <div
              className='absolute inset-0 z-20'
              style={{
                WebkitMask: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${
                  islandDimensions.height
                }px, rgba(0,0,0,0) ${islandDimensions.height + 72}px)`,
              }}
            >
              <motion.div
                key={`overlay-${expand}`}
                className='w-full h-full bg-black/0 backdrop-blur-[4px] backdrop-saturate-150 backdrop-brightness-75'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={goBack}
              />
            </div>
          )}
        </AnimatePresence>
      </Frame>
      <Toolbar />
    </div>
  );
};
IslandComponent.displayName = "Island";
