"use client";

import { IslandComponent } from "./IslandComponent";
import { Pill, PillStart, PillEnd } from "./IslandPill";
import { Full } from "./IslandFull";
import { Capsule } from "./IslandCapsule";
import { IslandCutout } from "./IslandCutout";

export const Island = Object.assign(IslandComponent, {
  Pill,
  PillStart,
  PillEnd,
  Full,
  Capsule,
  Cutout: IslandCutout,
});
