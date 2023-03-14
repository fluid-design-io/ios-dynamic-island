export const Camera = () => {
  return (
    <div className='absolute h-7 w-7 flex justify-center items-center top-0 right-0 rounded-full'>
      <div className='relative h-6 w-6'>
        <div className='absolute inset-0 bg-gradient-to-r from-zinc-900 to-transparent rounded-full'></div>
        <div className='absolute inset-0.5 bg-zinc-900 rounded-full'></div>
        <div className='absolute inset-1 rounded-full bg-stone-800'></div>
        <div className='absolute inset-1.5 rounded-full bg-gradient-to-br from-neutral-800 to-zinc-900'></div>
        <div className='absolute inset-2 rounded-full bg-gradient-to-br from-blue-700 via-black to-blue-900'></div>
        <div className='absolute rounded-full bg-white w-0.5 h-0.5 blur-[1px] left-[9.5px] top-[9px]' />
        <div className='absolute rounded-full bg-blue-200/50 w-0.5 h-0.5 blur-[1px] left-[11.5px] bottom-[8.5px]' />
      </div>
    </div>
  );
};
