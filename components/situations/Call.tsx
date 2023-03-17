/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Island } from "../island";
import avatar from "@/public/images/call-avatar.jpg";
import Image from "next/image";
import { ImPhone } from "react-icons/im";
import { motion } from "framer-motion";
import { SituationType, useIsland } from "@/lib/store";
import { VoiceIndicator } from "@/components/Icons";
import { formatTime, useTimer } from "@/hooks/useTimer";

type CallComponent = Record<string, React.FC<any>>;

export const Call: CallComponent = {};

Call.AnsweredPill = (): React.ReactElement => {
  const { time } = useTimer();
  return (
    <Island.Pill>
      <Island.PillStart className='text-green-400 uppercase'>
        <div className='inline-block -translate-x-1'>
          <ImPhone className='w-2.5 h-2.5 text-green-500 rotate-[15deg]' />
        </div>
        <span className='text-2xs font-medium normal-nums -translate-x-1 tabular-nums'>
          {formatTime(time)}
        </span>
      </Island.PillStart>
      <Island.PillEnd className='text-green-400'>
        <VoiceIndicator className='h-3.5 w-8' />
      </Island.PillEnd>
    </Island.Pill>
  );
};

Call.InComingCapsule = () => {
  const { switchDuration, reset, switchSituation } = useIsland();
  const { start } = useTimer();
  return (
    <Island.Capsule>
      <div className='flex justify-between w-full gap-3 items-center'>
        <motion.div
          className='flex justify-center items-center gap-3'
          initial={{ opacity: 0, WebkitFilter: "blur(8px)" }}
          animate={{
            opacity: 1,
            WebkitFilter: "blur(0px)",
            transition: { delay: switchDuration / 1000 + 0.14 },
          }}
          exit={{ opacity: 0, WebkitFilter: "blur(8px)" }}
        >
          <div className='translate-x-[-1px]'>
            <Image
              src={avatar}
              placeholder='blur'
              alt='Avatar'
              className='h-10 w-10 rounded-full overflow-hidden object-cover'
            />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='text-2xs text-zinc-400'>iPhone</p>
            <h3 className='font-medium text-zinc-50 -mt-1 text-sm'>
              Aga Orlova
            </h3>
          </div>
        </motion.div>
        <motion.div
          className='flex items-center gap-3'
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: switchDuration / 1000 + 0.14 },
          }}
          exit={{ opacity: 0, scale: 0.88 }}
        >
          <button
            className='bg-red-500 rounded-full p-3 hover:bg-red-600 active:bg-red-600/80 transition-colors duration-200 ease-in-out'
            onClick={reset}
            aria-label='Hang up'
          >
            <ImPhone className='w-4 h-4 text-zinc-50 rotate-[135deg] translate-y-0.5' />
          </button>
          <button
            className='bg-green-500 rounded-full p-2.5 hover:bg-green-600 active:bg-green-600/80 transition-colors duration-200 ease-in-out'
            aria-label='Answer call'
            onClick={() => {
              start();
              setTimeout(() => {
                switchSituation(SituationType.CallAnsweredPill, false);
              }, 100);
            }}
          >
            <ImPhone className='w-4 h-4 text-zinc-50' />
          </button>
        </motion.div>
      </div>
    </Island.Capsule>
  );
};

Call.AnsweredCapsule = () => {
  const { switchDuration, reset } = useIsland();
  const { time, stop } = useTimer();
  return (
    <Island.Capsule>
      <div className='flex justify-between w-full gap-3 items-center'>
        <motion.div
          className='flex justify-center items-center gap-3'
          initial={{ opacity: 0, WebkitFilter: "blur(8px)" }}
          animate={{
            opacity: 1,
            WebkitFilter: "blur(0px)",
            transition: { delay: switchDuration / 1000 + 0.14 },
          }}
          exit={{ opacity: 0, WebkitFilter: "blur(8px)" }}
        >
          <div className='translate-x-[-1px]'>
            <Image
              src={avatar}
              placeholder='blur'
              alt='Avatar'
              className='h-10 w-10 rounded-full overflow-hidden object-cover'
            />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='text-2xs text-zinc-400 tabular-nums'>
              {formatTime(time)}
            </p>
            <h3 className='font-medium text-zinc-50 -mt-1 text-sm'>
              Aga Orlova
            </h3>
          </div>
        </motion.div>
        <motion.div
          className='flex items-center gap-3'
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: switchDuration / 1000 + 0.14 },
          }}
          exit={{ opacity: 0, scale: 0.88 }}
        >
          <button
            className='bg-red-500 rounded-full p-3 hover:bg-red-600 active:bg-red-600/80 transition-colors duration-200 ease-in-out'
            onClick={() => {
              stop();
              reset();
            }}
            aria-label='Hang up'
          >
            <ImPhone className='w-4 h-4 text-zinc-50 rotate-[135deg] translate-y-0.5' />
          </button>
        </motion.div>
      </div>
    </Island.Capsule>
  );
};

Call.AnsweredPill.displayName = "Call.Pill";
Call.InComingCapsule.displayName = "Call.InComing";
Call.AnsweredCapsule.displayName = "Call.Answered";
