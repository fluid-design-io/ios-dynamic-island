"use client";

import { MdAirplanemodeActive } from "react-icons/md";
import { ImArrowRight2 } from "react-icons/im";
import { FaSuitcase } from "react-icons/fa";
import { motion } from "framer-motion";
import { Island } from "@/components";

const FlyStatus = (props: any) => (
  <motion.svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox='0 0 80 20'
    {...props}
  >
    <path
      d='M664.041 104.635c-266.019 0-481.992 215.973-481.992 481.992s215.973 481.993 481.992 481.993 481.989-215.974 481.989-481.993-215.97-481.992-481.989-481.992Zm0 6.342c262.518 0 475.649 213.131 475.649 475.65 0 262.518-213.131 475.653-475.649 475.653-262.519 0-475.65-213.135-475.65-475.653 0-262.519 213.131-475.65 475.65-475.65Z'
      className='fill-[#79F79B]'
      transform='translate(-169.41 -24.997) scale(.31536)'
    />
  </motion.svg>
);
type FlyComponent = Record<string, React.FC<any>>;

export const Fly: FlyComponent = {};

Fly.Pill = (): React.ReactElement => {
  return (
    <Island.Pill>
      <Island.PillStart className='text-green-400 uppercase'>
        <div className='rounded-full p-0.5 bg-green-400 inline-block'>
          <ImArrowRight2 className='w-[0.4375rem] h-[0.4375rem] text-[#020202] rotate-45' />
        </div>
        <span className='text-2xs font-medium'>JFK</span>
      </Island.PillStart>

      <Island.Cutout />
      <Island.PillEnd className='text-green-400'>
        <span className='text-2xs font-medium'>in 55m</span>
      </Island.PillEnd>
    </Island.Pill>
  );
};

Fly.Full = (): React.ReactElement => {
  return (
    <Island.Full>
      <div className='flex w-full justify-between'>
        <motion.div
          layoutId='fly-left'
          className='text-green-400 uppercase h-full flex items-start gap-1.5'
          initial={{
            WebkitFilter: "blur(8px)",
          }}
          animate={{
            WebkitFilter: "blur(0px)",
            transition: {
              type: "spring",
              bounce: 0,
            },
          }}
          exit={{ WebkitFilter: "blur(8px)" }}
          transition={{ type: "spring", bounce: 0.01 }}
        >
          <span className='text-xs text-zinc-100 font-light'>FL123</span>
        </motion.div>
        <motion.div
          layoutId='fly-right'
          layout
          className='text-green-400 h-full flex items-center gap-1.5'
          initial={{
            WebkitFilter: "blur(8px)",
          }}
          animate={{
            WebkitFilter: "blur(0px)",
            transition: {
              type: "spring",
              bounce: 0,
            },
          }}
          exit={{ WebkitFilter: "blur(8px)" }}
          transition={{ type: "spring", bounce: 0.01 }}
        >
          <div className='rounded overflow-hidden'>
            <div className='p-0.5 from-[#080808] to-[#2F2F2F] bg-gradient-to-t'>
              <MdAirplanemodeActive className='w-3 h-3 text-zinc-200 rotate-45' />
            </div>
          </div>
          <span className='text-xs text-zinc-100 font-extralight tracking-tight'>
            FLIGHTY
          </span>
        </motion.div>
      </div>
      <motion.div
        className='flex w-full flex-col mt-7'
        initial={{
          opacity: 0,
          WebkitFilter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          WebkitFilter: "blur(0px)",
          transition: {
            delay: 0.15,
            duration: 0.4,
          },
        }}
        exit={{ opacity: 0, WebkitFilter: "blur(8px)" }}
      >
        <div className='flex justify-between gap-3'>
          <div className='font-bold text-zinc-50 text-3xl'>SFO</div>
          <div className='flex-1 flex justify-center items-center relative overflow-hidden'>
            <div className='absolute left-0.5 bg-[#79F79B] rounded-full p-[0.1875rem]'>
              <ImArrowRight2 className='w-2 h-2 text-[#020202] -rotate-45' />
            </div>
            <FlyStatus className='h-8 -mt-4' />
            <div className='absolute right-0.5 bg-[#79F79B] rounded-full p-[0.1875rem]'>
              <ImArrowRight2 className='w-2 h-2 text-[#020202] rotate-45' />
            </div>
            <div className='absolute top-[-0.325rem] right-9'>
              <MdAirplanemodeActive className='w-8 h-8 text-zinc-50 rotate-[97deg]' />
            </div>
          </div>
          <div className='font-bold text-zinc-50 text-3xl'>JFK</div>
        </div>
        <div className='flex justify-between items-center gap-3 mt-2'>
          <div className='text-[#79F79B] flex flex-col'>
            <span className='text'>On Time</span>
            <span className='text-2xs -mt-1'>Landing in 55m</span>
          </div>
          <div className='flex-grow' />
          <div className='text-zinc-800 bg-amber-300/80 rounded-lg flex-shrink-0 flex justify-center items-center gap-2 px-2 py-0.5'>
            <FaSuitcase className='w-4 h-4 text-zinc-800' />
            <span className='font-semibold text-sm'>4</span>
          </div>
        </div>
      </motion.div>
    </Island.Full>
  );
};

Fly.Pill.displayName = "Fly.Pill";
Fly.Full.displayName = "Fly.Full";
