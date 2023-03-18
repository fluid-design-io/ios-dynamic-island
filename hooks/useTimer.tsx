import { create } from "zustand";

type TimerStore = {
  time: number;
  intervalId?: NodeJS.Timeout;
  setTime: (time: number) => void;
  start: () => void;
  stop: () => void;
};

export const useTimer = create<TimerStore>((set, get) => ({
  time: 0,
  intervalId: undefined,
  setTime: (time) => set(() => ({ time })),
  start: () => {
    const intervalId = setInterval(() => {
      set((state) => ({ time: state.time + 1 }));
    }, 1000);
    set(() => ({ intervalId }));
  },
  stop: () => {
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId);
    set(() => ({ intervalId: undefined, time: 0 }));
  },
}));

export const formatTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  return hours > 0
    ? `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
    : `${paddedMinutes}:${paddedSeconds}`;
};
