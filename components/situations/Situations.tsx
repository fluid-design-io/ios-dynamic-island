"use client";

import { SituationType, useIsland } from "@/lib/store";
import { AnimatePresence } from "framer-motion";
import { Call } from "./Call";
import { Fly } from "./Fly";

export const Situations = () => {
  const { situation } = useIsland();
  return (
    <AnimatePresence mode='popLayout'>
      {situation === SituationType.Fly && <Fly.Pill key={`fly`} />}
      {situation === SituationType.FlyFull && <Fly.Full key={`fly-full`} />}
      {situation === SituationType.CallIncomingCapsule && (
        <Call.InComingCapsule key={`call-incoming-capsule`} />
      )}
      {situation === SituationType.CallAnsweredCapsule && (
        <Call.AnsweredCapsule key={`call-answered-capsule`} />
      )}
      {situation === SituationType.CallAnsweredPill && (
        <Call.AnsweredPill key={`call-answered-capsule`} />
      )}
    </AnimatePresence>
  );
};

export const switchTabHoldSituation = (
  situation: SituationType,
  switchSituation: (situation: SituationType, reset?: boolean) => void
) => {
  switch (situation) {
    case SituationType.Fly:
      switchSituation(SituationType.FlyFull, false);
      break;
    case SituationType.CallAnsweredPill:
      switchSituation(SituationType.CallAnsweredCapsule, false);
      break;
    default:
      break;
  }
};
