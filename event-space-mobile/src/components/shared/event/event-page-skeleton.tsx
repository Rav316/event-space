import { View } from 'react-native';
import { Skeleton } from '@/src/components/ui';

export const EventPageSkeleton = () => (
  <View className={'gap-4 px-3 pt-3'}>
    {/* Image */}
    <View className={'relative'}>
      <Skeleton className={'w-full h-[200px] rounded-2xl'} />
      <Skeleton className={'absolute top-2.5 left-2.5 h-6 w-20 rounded-full'} />
      <Skeleton className={'absolute top-2.5 right-2.5 w-9 h-9 rounded-xl'} />
    </View>

    {/* Title */}
    <View className={'gap-1.5'}>
      <Skeleton className={'h-5 w-full rounded'} />
      <Skeleton className={'h-5 w-2/3 rounded'} />
    </View>

    {/* Event badges (Calendar, MapPin, Users, Flame) */}
    <View className={'gap-2'}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} className={'flex-row border border-black/20 dark:border-white/20 rounded-xl items-center p-3 gap-3'}>
          <Skeleton className={'w-6 h-6 rounded-md'} />
          <View className={'gap-1.5'}>
            <Skeleton className={'h-4 w-40 rounded'} />
            <Skeleton className={'h-3 w-52 rounded'} />
          </View>
        </View>
      ))}
    </View>

    {/* Organizer block */}
    <View className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-2'}>
      <Skeleton className={'h-6 w-32 rounded'} />
      <View className={'flex-row items-center gap-2'}>
        <Skeleton className={'w-12 h-12 rounded-full'} />
        <View className={'gap-1.5'}>
          <Skeleton className={'h-4 w-28 rounded'} />
          <Skeleton className={'h-3 w-44 rounded'} />
        </View>
      </View>
    </View>

    {/* Share block */}
    <View className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-2'}>
      <Skeleton className={'h-6 w-28 rounded'} />
      <View className={'gap-2'}>
        <Skeleton className={'h-10 w-full rounded-xl'} />
        <Skeleton className={'h-10 w-full rounded-xl'} />
      </View>
    </View>

    {/* Reviews block */}
    <View className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-3'}>
      <View className={'flex-row gap-2 items-center'}>
        <Skeleton className={'w-6 h-6 rounded-md'} />
        <Skeleton className={'h-6 w-44 rounded'} />
      </View>
      <View className={'flex-row items-center gap-4'}>
        <View className={'items-center gap-2'}>
          <Skeleton className={'h-10 w-14 rounded'} />
          <Skeleton className={'h-3 w-20 rounded'} />
          <Skeleton className={'h-3 w-12 rounded'} />
        </View>
        <View className={'flex-1 gap-0.5'}>
          {[5, 4, 3, 2, 1].map((r) => (
            <View key={r} className={'flex-row items-center gap-2 py-0.5'}>
              <Skeleton className={'h-3 w-4 rounded'} />
              <Skeleton className={'flex-1 h-2 rounded-full'} />
            </View>
          ))}
        </View>
      </View>
    </View>

    {/* Reviews list */}
    <View className={'gap-2'}>
      {[0, 1, 2].map((i) => (
        <View key={i} className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-3'}>
          <View className={'flex-row items-center gap-2'}>
            <Skeleton className={'w-10 h-10 rounded-full'} />
            <View className={'gap-1.5'}>
              <Skeleton className={'h-4 w-28 rounded'} />
              <Skeleton className={'h-3 w-36 rounded'} />
            </View>
          </View>
          <Skeleton className={'h-4 w-3/4 rounded'} />
          <View className={'gap-1.5'}>
            <Skeleton className={'h-3 w-full rounded'} />
            <Skeleton className={'h-3 w-full rounded'} />
            <Skeleton className={'h-3 w-2/3 rounded'} />
          </View>
          <Skeleton className={'h-px w-full rounded'} />
          <Skeleton className={'h-8 w-32 rounded-xl'} />
        </View>
      ))}
    </View>
  </View>
);
