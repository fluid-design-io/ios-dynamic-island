import { useEffect, useState } from "react";

export type TapAndHoldProps = [boolean, () => void];

export const useTapAndHold = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  holdTime = 1000
): TapAndHoldProps => {
  const [isTapped, setIsTapped] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout>();
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const handleTapStart = () => {
      setHoldTimeout(
        setTimeout(() => {
          setIsTapped(true);
        }, holdTime)
      );
    };
    const handleTapEnd = () => {
      clearTimeout(holdTimeout);
    };
    const handleTapCancel = () => {
      clearTimeout(holdTimeout);
      setIsTapped(false);
    };
    if (isTapped) {
      callback();
      setIsTapped(false);
    }

    node.addEventListener("touchstart", handleTapStart, { passive: true });
    node.addEventListener("mousedown", handleTapStart, { passive: true });
    node.addEventListener("touchend", handleTapEnd, { passive: true });
    node.addEventListener("mouseup", handleTapEnd, { passive: true });
    node.addEventListener("touchcancel", handleTapCancel, { passive: true });
    node.addEventListener("mouseleave", handleTapCancel, { passive: true });

    return () => {
      node.removeEventListener("touchstart", handleTapStart);
      node.removeEventListener("mousedown", handleTapStart);
      node.removeEventListener("touchend", handleTapEnd);
      node.removeEventListener("mouseup", handleTapEnd);
      node.removeEventListener("touchcancel", handleTapCancel);
      node.removeEventListener("mouseleave", handleTapCancel);
      clearTimeout(holdTimeout);
    };
  }, [ref, callback, holdTime, holdTimeout, isTapped]);

  const reset = () => {
    setIsTapped(false);
  };

  return [isTapped, reset];
};
