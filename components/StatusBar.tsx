"use client";

import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDimensionsById } from "@/hooks/useDimensionsById";
import { useDimensions } from "@/hooks/useDimensions";
import { IoCellular } from "react-icons/io5";
import { IoIosWifi, IoIosBatteryFull } from "react-icons/io";
import { TbNavigationFilled } from "react-icons/tb";
import clsx from "clsx";
import { ExpandType, useIsland } from "@/lib/store";

const Item = memo(({ children }: { children: React.ReactNode }) => {
  const duration = 0.13;
  const variants = {
    initial: {
      width: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    animate: {
      width: "auto",
      marginLeft: 2,
      marginRight: 2,
      duration: duration + 0.07,
    },
    exit: {
      width: 0,
      marginLeft: 0,
      marginRight: 0,
      transition: {
        width: { duration, ease: "linear" },
        default: { duration: duration + 0.2 },
      },
    },
  };
  const spanVariants = {
    initial: {
      scale: 1,
      opacity: 0,
      WebkitFilter: "blur(3px)",
    },
    animate: {
      scale: 1,
      opacity: 1,
      WebkitFilter: "blur(0px)",
      transition: {
        scale: { delay: 0 },
        default: { delay: 0.2, duration: duration + 0.1 },
      },
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: {
        opacity: { duration: duration / 2 },
        default: { ease: "linear", duration: duration, delay: 0 },
      },
    },
  };

  return (
    <motion.div
      //   layoutId={id}
      //   layout
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ type: "spring", bounce: 0 }}
      variants={variants}
      //   style={{ overflow: "hidden" }}
    >
      <motion.div variants={spanVariants}>{children}</motion.div>
    </motion.div>
  );
});

Item.displayName = "Item";

export const StatusBar = () => {
  const statusBarRef = useRef<HTMLDivElement>(null);
  const { expand, isAnimating, islandDimensions, situation } = useIsland();
  const { width: statsBarWidth } = useDimensions(statusBarRef);
  const { width: islandWidth } = useDimensionsById("island");
  const [largestIslandWidth, setLargestIslandWidth] = useState(0);
  const [lastIslandWidth, setLastIslandWidth] = useState(0);
  const [hideLocation, setHideLocation] = useState(true);
  const [hideStatusDot, setHideStatusDot] = useState(true);

  const shouldInteractWithIsland =
    expand === ExpandType.None || expand === ExpandType.Pill;
  const statusIconClassName = "text-zinc-900 w-5 h-5";
  const rem = (x: number) => 4 * x;
  const widthLeft = Math.max(
    statsBarWidth - largestIslandWidth - rem(5),
    rem(5)
  );
  const widthPerSide = widthLeft / 2 - rem(2.5);
  const transition = {
    type: "spring",
    bounce: 0.4,
    restDelta: 0.008,
  };
  useEffect(() => {
    if (shouldInteractWithIsland) {
      setLargestIslandWidth(islandWidth);
    }
  }, [islandWidth, shouldInteractWithIsland]);
  return (
    <>
      <motion.div
        ref={statusBarRef}
        className='absolute top-0 inset-x-0 px-2.5 py-3 gap-0 flex justify-between items-center text-zinc-900 z-10'
        initial={false}
        animate={{
          WebkitFilter: !shouldInteractWithIsland ? "blur(3px)" : "blur(0px)",
          opacity: !shouldInteractWithIsland ? 0.6 : 1,
        }}
        transition={{
          opacity: { duration: 0.2, ease: "linear" },
          default: {
            type: "spring",
            bounce: 0,
            duration: 0.2,
          },
        }}
      >
        <motion.div
          className='font-semibold flex-grow flex justify-center items-center w-full'
          //   style={{ maxWidth: widthPerSide }}
          transition={transition}
        >
          <AnimatePresence mode='popLayout' initial={false}>
            {widthLeft > 80 && (
              <Item key='clock'>
                <span>9:41</span>
              </Item>
            )}
            {!hideLocation && (
              <TbNavigationFilled className='w-4 h-4 text-zinc-900 rotate-45 -translate-y-0.5' />
            )}
          </AnimatePresence>
        </motion.div>
        {/* Gap */}
        <motion.div
          style={{
            width: largestIslandWidth,
          }}
          transition={transition}
          className='bg-red-200 h-full flex-shrink-0'
        />
        <motion.div
          className='flex items-center flex-grow justify-center w-full'
          transition={transition}
        >
          <AnimatePresence mode='popLayout' initial={false}>
            {widthLeft > 110 && (
              <Item key='signal'>
                <IoCellular
                  className={clsx(statusIconClassName, "w-4 h-4 scale-95")}
                />
              </Item>
            )}
            {widthLeft > 170 && (
              <Item key='wifi'>
                <IoIosWifi className={statusIconClassName} />
              </Item>
            )}
            {widthLeft > 80 && (
              <Item key='battery'>
                <IoIosBatteryFull
                  className={clsx(statusIconClassName, "w-7 h-7")}
                />
              </Item>
            )}
            {!hideStatusDot && (
              <Item key='statusDot'>
                <div className='bg-amber-500 w-1 h-1 rounded-full' />
              </Item>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <div className='bg-black absolute top-36 inset-x-0 w-full text-purple-200 p-4 hidden'>
        <p>Width: {statsBarWidth}</p>
        <p>Width Left: {widthLeft}</p>
        <p>Width Perside: {widthPerSide}</p>
        <p>Island Dynamic Width: {islandWidth}</p>
        <p>Island Static Width: {largestIslandWidth}</p>
        <p>lastIslandWidth: {lastIslandWidth}</p>
        <p>Situation: {situation}</p>
      </div>
    </>
  );
};
