"use client";

import { BsClockHistory } from "react-icons/bs";
import musicAlbum from "@/public/images/music-album.jpg";
import Image from "next/image";

export const MusicAndCounter = {} as any;

MusicAndCounter.Left = () => {
  return (
    <Image
      src={musicAlbum}
      alt='music albumn'
      className='object-cover w-4 h-4 rounded'
      placeholder='blur'
    />
  );
};

MusicAndCounter.Right = () => {
  return <BsClockHistory className='w-4 h-4 text-amber-500' />;
};

MusicAndCounter.Left.displayName = "MusicAndCounter.Left";
MusicAndCounter.Right.displayName = "MusicAndCounter.Right";
