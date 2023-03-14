import clsx from "clsx";
import { StatusBar } from "./StatusBar";

export const Frame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex-1 h-full flex flex-col items-center p-4'>
      <div className='w-full rounded-t-[4rem] p-1 border-[1.5px] relative border-zinc-300 pb-0 border-b-0 rounded-b bg-gradient-to-t from-[#09070B] to-[#28232F] max-w-sm mx-auto'>
        <div className='grid rounded-t-[3.75rem] rounded-b p-2 min-h-[24rem] w-full mx-auto h-full bg-gradient-to-t from-[#21026f] via-[#e481ef] to-purple-100 relative overflow-hidden border-[0.625rem] border-zinc-900 border-b-0'>
          <StatusBar />
          <Wallpaper />
          {children}
        </div>
        <Antannas />
        <Buttons />
        <Speaker />
      </div>
    </div>
  );
};

export const Wallpaper = () => {
  return (
    <>
      <div
        style={{
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle at center, rgba(210,21,217,0.8) 0%, rgba(243,146,247,0.3) 50%)",
        }}
        className='absolute inset-x-[-50%] top-[-45%] mix-blend-hard-light'
      />
      <div
        style={{
          width: "300%",
          height: "200%",
          background:
            "radial-gradient(circle at center, rgba(9,2,46,0.2) 0%, rgba(197,104,212,0.25) 30%)",
        }}
        className='absolute inset-x-[-100%] bottom-[-130%] mix-blend-hard-light'
      />
      <div
        className='absolute inset-0'
        style={{
          WebkitMask:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 70%)",
        }}
      >
        <div
          style={{
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle at center, rgba(31,2,72,0.9) 0%, rgba(210,21,217,0) 50%)",
          }}
          className='absolute -inset-x-1/2 bottom-[-100%] mix-blend-multiply'
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(0deg, rgba(9,2,46,.5) 0%, rgba(167,74,192,0.25) 100%)",
        }}
        className='absolute -inset-x-0 bottom-0 mix-blend-color-screen'
      />
    </>
  );
};

export const Antannas = () => {
  const antannaBandClassName = clsx("bg-[#68566E] absolute z-20");
  return (
    <>
      {/* Left */}
      <div
        className={clsx(
          antannaBandClassName,
          "h-2 top-[4.5rem] -left-0.5 w-0.5"
        )}
      />
      {/* Top */}
      <div
        className={clsx(
          antannaBandClassName,
          "h-0.5 right-[4.5rem] -top-0.5 w-2"
        )}
      />
      {/* Right */}
      <div
        className={clsx(
          antannaBandClassName,
          "h-2 top-[4.5rem] -right-0.5 w-0.5"
        )}
      />
    </>
  );
};

export const Buttons = () => {
  const buttonClassName = clsx("absolute w-0.5");
  const buttonGradient =
    "linear-gradient(0deg, rgba(205,201,205,1) 0%, rgba(42,35,53,1) 8%, rgba(84,77,95,1) 16%, rgba(121,112,132,1) 50%, rgba(84,77,95,1) 88%, rgba(42,35,53,1) 92%, rgba(205,201,205,1) 100%)";
  return (
    <>
      <div
        className={clsx(buttonClassName, "-left-1 top-[8.25rem] h-6")}
        style={{ background: buttonGradient }}
      />
      <div
        className={clsx(buttonClassName, "-left-1 top-[12rem] h-14")}
        style={{ background: buttonGradient }}
      />
      <div
        className={clsx(buttonClassName, "-left-1 top-[16.5rem] h-14")}
        style={{ background: buttonGradient }}
      />
      <div
        className={clsx(buttonClassName, "-right-1 top-[14.125rem] h-24")}
        style={{ background: buttonGradient }}
      />
    </>
  );
};

export const Speaker = () => {
  return (
    <div
      className={clsx(
        "absolute w-16 top-1 h-0.5 bg-zinc-200/5 inset-x-0 mx-auto",
        "rounded-b-full border-[0.5px] border-t-0 border-white/5"
      )}
    >
      <div
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px,rgba(0, 0, 0, 0.3) 0.5px,rgba(0, 0, 0, 0) 0)",
          backgroundSize: "2px 2px",
        }}
        className='absolute inset-0 w-full h-full'
      />
    </div>
  );
};
