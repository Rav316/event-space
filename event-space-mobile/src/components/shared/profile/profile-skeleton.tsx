import {
  Skeleton
} from '@/src/components/ui';
import { View } from 'react-native';

export const ProfileSkeleton = () => {
  return (
    <>
      <Skeleton className={'w-24 h-24 rounded-full'} />
      <View className={'w-full items-center'}>
        <Skeleton className={'h-5 w-[200px] mt-3'} />
        <Skeleton className={'h-4 w-[300px] mt-3'} />
      </View>
      <View className={'w-full'}>
        <Skeleton className={'h-3 w-24 mt-9'} />
        <Skeleton className={'h-10 w-full mt-2'} />

        <View className={'flex-row gap-2 w-full mt-12'}>
          <View className={'gap-1 flex-1 basis-0'}>
            <Skeleton className={'h-3 w-24'} />
            <Skeleton className={'h-10 w-full mt-2'} />
          </View>
          <View className={'gap-1 flex-1 basis-0'}>
            <Skeleton className={'h-3 w-24'} />
            <Skeleton className={'h-10 w-full mt-2'} />
          </View>
        </View>

        <View className={'flex-row gap-2 w-full mt-12'}>
          <View className={'gap-1 flex-1 basis-0'}>
            <Skeleton className={'h-3 w-24'} />
            <Skeleton className={'h-10 w-full mt-2'} />
          </View>
          <View className={'gap-1 flex-1 basis-0'}>
            <Skeleton className={'h-3 w-24'} />
            <Skeleton className={'h-10 w-full mt-2'} />
          </View>
        </View>
      </View>
    </>
  );
}