import { ExpandType } from "./store";

/**
 * switch the island size
 * @param prevExpand the previous island size
 * @param newExpand the new island size
 * based on the previous expand state, and the new expand state, calculate the bounce effect
 * the size compareson of the island is: undefined < pill < pill-full < capsule < full
 * the smaller the island, the more bounce effect it has
 * based on the previous size,  and the new size, calculate the bounce effect */
export const calculateBouceEffect = (
  prevExpand: ExpandType,
  newExpand: ExpandType
) => {
  let bounceEffect = 0.25;
  let duration = 200;
  if (prevExpand == ExpandType.None && newExpand == ExpandType.Pill) {
    // undefined -> pill
    bounceEffect = 0.2;
    duration = 200;
  }
  if (prevExpand == ExpandType.None && newExpand == ExpandType.Full) {
    // undefined -> full
    bounceEffect = 0.15;
    duration = 200;
  }
  if (prevExpand == ExpandType.None && newExpand == ExpandType.PillFull) {
    // undefined -> full
    bounceEffect = 0.25;
    duration = 200;
  }
  if (prevExpand == ExpandType.None && newExpand == ExpandType.Capsule) {
    // undefined -> capsule
    bounceEffect = 0.25;
    duration = 200;
  }
  if (prevExpand == ExpandType.Pill && newExpand == ExpandType.PillFull) {
    // pill -> pill-full
    bounceEffect = 0.2;
    duration = 200;
  }
  if (prevExpand == ExpandType.Pill && newExpand == ExpandType.Capsule) {
    // pill -> capsule
    bounceEffect = 0.25;
    duration = 650;
  }
  if (prevExpand == ExpandType.Pill && newExpand == ExpandType.Full) {
    // pill -> full
    bounceEffect = 0.2;
    duration = 250;
  }
  if (prevExpand == ExpandType.Full && newExpand == ExpandType.Pill) {
    // full -> pill
    bounceEffect = 0.18;
    duration = 780;
  }
  if (prevExpand == ExpandType.Full && newExpand == ExpandType.Capsule) {
    // full -> pill
    bounceEffect = 0.2;
    duration = 600;
  }
  if (prevExpand == ExpandType.Full && newExpand == ExpandType.None) {
    // full -> undefined
    bounceEffect = 0.1;
    duration = 900;
  }
  if (prevExpand == ExpandType.Capsule && newExpand == ExpandType.Pill) {
    // capsule -> undefined
    bounceEffect = 0.25;
    duration = 600;
  }
  if (prevExpand == ExpandType.Capsule && newExpand == ExpandType.PillFull) {
    // capsule -> undefined
    bounceEffect = 0;
    duration = 600;
  }
  if (prevExpand == ExpandType.Capsule && newExpand == ExpandType.None) {
    // capsule -> undefined
    bounceEffect = 0.15;
    duration = 650;
  }
  if (prevExpand == ExpandType.PillFull && newExpand == ExpandType.None) {
    // pill-full -> undefined
    bounceEffect = 0.08;
    duration = 800;
  }
  if (prevExpand == ExpandType.Pill && newExpand == ExpandType.None) {
    // pill -> undefined
    bounceEffect = 0.08;
    duration = 800;
  }
  if (prevExpand == ExpandType.None && newExpand == ExpandType.None) {
    // undefined -> undefined
    duration = 200;
  }
  return { bounceEffect, duration };
};
