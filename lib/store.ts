import { create } from "zustand";
import { calculateBouceEffect } from "./calculateBouceEffect";

export enum ExpandType {
  Pill = "pill",
  PillFull = "pill-full",
  Capsule = "capsule",
  Full = "full",
  None = "none",
}

export enum SituationType {
  Fly = "fly-pill",
  FlyFull = "fly-full",
  CallAnsweredPill = "call-answered-pill",
  CallIncomingCapsule = "call-incoming-capsule",
  CallAnsweredCapsule = "call-answered-capsule",
  None = "none",
}

type IslandDimensions = {
  height: number;
  width: number | string;
  borderRadius: number;
};

interface IslandState {
  expand: ExpandType;
  situation: SituationType;
  isAnimating: boolean;
  islandBouceEffect: number;
  islandDimensions: IslandDimensions;
  switchDuration: number;
  /**
   * Initial animation for the island framer motion prop
   * If disabled, it will disable custom initial animation as if the island is expanded from the undefined state
   */
  initialExpandAnimation: boolean;
  switchSituation: (situation: SituationType, resetIsland?: boolean) => void;
  switchIsland: (newExpand: ExpandType, enableDelay?: boolean) => void;
  startAnimating: () => void;
  stopAnimating: () => void;
  reset: () => void;
  goBack: () => void;
}

export const EXPAND_PILL_FULL_WIDTH = "calc(100% - 4rem)";
export const EXPAND_CAPSULE_WIDTH = "calc(100% - 0.875rem)";
export const EXPAND_FULL_WIDTH = "100%";

export const useIsland = create<IslandState>((set, get) => {
  const islandDimensions = {
    height: 30,
    width: 102,
    borderRadius: 18,
  };

  /**
   * If situation contains '-full' or '-capsule', then set the situation from 'fly-full' to 'fly' or 'call-capsule' to 'call'
   */
  const goBack = () => {
    const { situation } = get();
    if (situation?.includes("-full") || situation?.includes("-capsule")) {
      let newSituation = (situation
        .replace("-full", "")
        .replace("-capsule", "") + "-pill") as SituationType;
      const situationTypes = Object.values(SituationType);
      if (!situationTypes.includes(newSituation)) {
        newSituation = SituationType.None;
      }
      console.log(`go back to ${newSituation} from ${situation} `);
      set({ initialExpandAnimation: false });
      get().switchSituation(newSituation as SituationType, false);
    } else {
      get().reset();
    }
  };
  const reset = () => {
    set({
      situation: SituationType.None,
      initialExpandAnimation: true,
    });
    get().switchIsland(ExpandType.None, true);
  };

  const switchSituation = (
    situation: SituationType,
    resetIsland: boolean = true
  ) => {
    const { switchDuration, expand } = get();
    const shouldReset = expand !== ExpandType.None && resetIsland;
    // reset the expand state, then set the situation
    if (shouldReset) reset();
    console.log(
      `reset: ${shouldReset}. Switch situation to ${situation} with duration: ${switchDuration}ms`
    );
    setTimeout(
      () => {
        set({ situation });
        switch (situation) {
          case SituationType.None:
            get().switchIsland(ExpandType.None, shouldReset);
          case SituationType.Fly:
            get().switchIsland(ExpandType.Pill, shouldReset);
            break;
          case SituationType.FlyFull:
            get().switchIsland(ExpandType.Full, shouldReset);
            break;
          case SituationType.CallIncomingCapsule:
            get().switchIsland(ExpandType.Capsule, shouldReset);
            break;
          case SituationType.CallAnsweredCapsule:
            get().switchIsland(ExpandType.Capsule, shouldReset);
            break;
          case SituationType.CallAnsweredPill:
            get().switchIsland(ExpandType.Pill, shouldReset);
            break;
          default:
            break;
        }
      },
      shouldReset ? switchDuration : 0
    );
  };

  const switchIsland = (newExpand: ExpandType, enableDelay = true) => {
    const prevExpand = get().expand;
    const { bounceEffect, duration } = calculateBouceEffect(
      prevExpand,
      newExpand
    );
    const situation = get().situation;
    const switchDuration = enableDelay ? duration : 0;
    console.log(
      `enableDelay: ${enableDelay}. witch island from ${prevExpand} to ${newExpand} with duration: ${switchDuration}ms`
    );
    set({
      switchDuration,
    });
    const pillOffset = checkForPillOffset(situation);
    switch (newExpand) {
      case ExpandType.None:
        setTimeout(() => {
          set({
            islandDimensions: {
              height: 30,
              width: 102,
              borderRadius: 18,
            },
            islandBouceEffect: bounceEffect,
            expand: newExpand,
          });
        }, 80);
        break;
      case ExpandType.Pill:
        setTimeout(() => {
          set({
            islandDimensions: {
              height: 30,
              width: 194 + pillOffset,
              borderRadius: 18,
            },
            islandBouceEffect: bounceEffect,
            expand: newExpand,
          });
        }, switchDuration);
        break;
      case ExpandType.PillFull:
        setTimeout(() => {
          set({
            islandDimensions: {
              height: 30,
              width: EXPAND_PILL_FULL_WIDTH,
              borderRadius: 18,
            },
            islandBouceEffect: bounceEffect,
            expand: newExpand,
          });
        }, switchDuration);
        break;
      case ExpandType.Capsule:
        setTimeout(() => {
          set({
            islandDimensions: {
              height: 64,
              width: EXPAND_CAPSULE_WIDTH,
              borderRadius: 32,
            },
            islandBouceEffect: bounceEffect,
            expand: newExpand,
          });
        }, switchDuration);
        break;
      case "full":
        setTimeout(() => {
          set({
            islandDimensions: {
              height: 160,
              width: EXPAND_FULL_WIDTH,
              borderRadius: 40,
            },
            islandBouceEffect: bounceEffect,
            expand: newExpand,
          });
        }, switchDuration);
        break;
      default:
        break;
    }
  };

  const startAnimating = () => {
    set({ isAnimating: true });
  };

  const stopAnimating = () => {
    set({ isAnimating: false });
  };

  return {
    expand: ExpandType.None,
    situation: SituationType.None,
    isAnimating: false,
    islandBouceEffect: 0.25,
    islandDimensions,
    switchDuration: 200,
    initialExpandAnimation: true,
    switchSituation,
    switchIsland,
    startAnimating,
    stopAnimating,
    reset,
    goBack,
  };
});

const checkForPillOffset = (situation: SituationType) => {
  switch (situation) {
    case SituationType.CallAnsweredPill:
      return 24;
    default:
      return 0;
  }
};
