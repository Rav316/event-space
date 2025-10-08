import { Skeleton } from '@/components/ui';

export const EventSkeleton = () => {
  return (
    <div className={'flex gap-5 max-[980px]:flex-col'}>
      <div className={'flex flex-col gap-5 flex-[7.7]'}>
        <div className={'group relative rounded-2xl'}>
          <Skeleton className={'h-[336px] w-full rounded-2xl'}/>
          <div className="absolute z-10 top-3 left-3">
            <Skeleton className={'h-8 w-24'}/>
          </div>
        </div>
        <Skeleton className={'h-8 w-1/2'}/>
        <div className={'flex items-center gap-2'}>
          <Skeleton className={'h-[72px] w-1/2'}/>
          <Skeleton className={'h-[72px] w-1/2'}/>
          <Skeleton className={'h-[72px] w-1/2'}/>
        </div>

      </div>
      <div
        className={
          'flex-[2.3] flex flex-col gap-4 min-[900px]:max-[980px]:flex-row'
        }
      >
        <Skeleton
          className={'max-[980px]:flex-1 max-[900px]:flex-none w-full h-[196px]'}
        />
        <Skeleton
          className={'max-[980px]:flex-1 max-[900px]:flex-none w-full h-[196px]'}
        />
        <Skeleton
          className={'max-[980px]:flex-1 max-[900px]:flex-none w-full h-[196px]'}
        />
      </div>
    </div>
  )
}