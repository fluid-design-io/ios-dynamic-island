"use client";

import { Button } from "@fluid-design/fluid-ui";
import { ImAirplane, ImPhone } from "react-icons/im";
import { ExpandType, SituationType, useIsland } from "@/lib/store";
import { IoMusicalNotes, IoTimer } from "react-icons/io5";

export const Toolbar = () => {
  const { isAnimating, reset, switchSituation, switchIsland } = useIsland();
  return (
    <div className='flex gap-2 flex-col'>
      <div className='flex gap-2 justify-center'>
        <Button
          sr='Call'
          onClick={() => switchSituation(SituationType.CallIncomingCapsule)}
          color='indigo'
          disabled={isAnimating}
          icon={ImPhone}
          iconOnly
          weight='light'
          size='lg'
          shape='pill'
        />
        <Button
          sr='Fly'
          onClick={() => switchSituation(SituationType.Fly)}
          color='indigo'
          disabled={isAnimating}
          icon={ImAirplane}
          iconOnly
          weight='light'
          size='lg'
          shape='pill'
        />
        <Button
          sr='Fly'
          onClick={() => switchSituation(SituationType.MusicAndCounter)}
          color='indigo'
          disabled={isAnimating}
          weight='light'
          size='lg'
          shape='pill'
          iconStart={IoMusicalNotes}
          iconEnd={IoTimer}
          className='p-1.5 py-1'
        >
          +
        </Button>
      </div>
      <div className='flex gap-2 justify-center'>
        <Button
          label='Pill'
          onClick={() => switchIsland(ExpandType.Pill)}
          color='cyan'
          weight='clear'
          size='sm'
          disabled={isAnimating}
        />
        <Button
          label='Capsule'
          onClick={() => switchIsland(ExpandType.Capsule)}
          color='cyan'
          weight='clear'
          size='sm'
          disabled={isAnimating}
        />
        <Button
          label='Split'
          onClick={() => switchIsland(ExpandType.Split)}
          color='cyan'
          weight='clear'
          size='sm'
          disabled={isAnimating}
        />
        <Button
          label='Full'
          onClick={() => switchIsland(ExpandType.Full)}
          color='cyan'
          weight='clear'
          size='sm'
          disabled={isAnimating}
        />
        <Button
          label='Reset'
          onClick={reset}
          disabled={isAnimating}
          size='sm'
          color='indigo'
        />
      </div>
    </div>
  );
};
