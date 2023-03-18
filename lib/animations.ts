export const itemEnterAnimation = {
  opacity: 0,
  x: 0,
  scaleX: 1,
  WebkitFilter: "blur(8px)",
};

export const itemExpandAnimation = {
  x: 0,
  scaleX: 1,
  WebkitFilter: "blur(0px)",
  opacity: 1,
  transition: {
    delay: 0,
    type: "spring",
    bounce: 0,
    duration: 0.36,
  },
};
export const itemExitAnimation = {
  scaleX: 0.5,
  WebkitFilter: "blur(8px)",
  opacity: 0,
};
