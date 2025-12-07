import { QrEventInfoItem } from '@/src/components/shared/qr-scan/qr-event-info-item';
import { cn } from '@/src/lib/utils';
import { useColorScheme } from 'nativewind';
import { FlatList, View } from 'react-native';

const EVENT_DETAILS = [
  { title: 'Event name', value: 'Innovate & Inspire Summit 2024' },
  { title: 'Date', value: 'October 26, 2025' },
  { title: 'Time', value: '9:00 AM - 5:00 PM' },
  {
    title: 'Location',
    value:
      'Metropolis Convention Center, 48 Skyline Avenue, Floor 7, Pavilion D',
  },
];

export const QrEventInfo = () => {
  const colorScheme = useColorScheme().colorScheme;
  const separatorColor = colorScheme === 'dark' ? 'bg-white/10' : 'bg-black/10';

  return (
    <View
      className={cn(
        'w-full rounded-xl p-4',
        colorScheme === 'dark' ? 'bg-[#181818]' : 'bg-[#F7F8F6]'
      )}
    >
      <FlatList
        data={EVENT_DETAILS}
        scrollEnabled={false}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <QrEventInfoItem {...item} />}
        ItemSeparatorComponent={() => (
          <View className={cn('my-2 h-px w-full', separatorColor)} />
        )}
      />
    </View>
  );
};