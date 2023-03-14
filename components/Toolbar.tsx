"use client";

import { Button } from "@fluid-design/fluid-ui";
import { ImAirplane, ImPhone } from "react-icons/im";
import { ExpandType, SituationType, useIsland } from "@/lib/store";

export const Toolbar = () => {
  const { isAnimating, reset, switchSituation, switchIsland } = useIsland();
  return (
    <div className='flex gap-2 flex-col'>
      <div className='flex gap-2 justify-center'>
        <Button
          sr='Call'
          onClick={() => switchSituation(SituationType.CallIncomingCapsule)}
          color='lime'
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
          color='lime'
          disabled={isAnimating}
          icon={ImAirplane}
          iconOnly
          weight='light'
          size='lg'
          shape='pill'
        />
      </div>
      <div className='flex gap-2 justify-center'>
        <Button
          label='Pill'
          onClick={() => switchIsland(ExpandType.Pill)}
          color='cyan'
          weight='clear'
          disabled={isAnimating}
        />
        <Button
          label='Pill Full'
          onClick={() => switchIsland(ExpandType.PillFull)}
          color='cyan'
          weight='clear'
          disabled={isAnimating}
        />
        <Button
          label='Capsule'
          onClick={() => switchIsland(ExpandType.Capsule)}
          color='cyan'
          weight='clear'
          disabled={isAnimating}
        />
        <Button
          label='Full'
          onClick={() => switchIsland(ExpandType.Full)}
          color='cyan'
          weight='clear'
          disabled={isAnimating}
        />
        <Button label='Reset' onClick={reset} disabled={isAnimating} />
      </div>
    </div>
  );
};
