import { QrEventInfoItem } from '@/src/components/shared/qr-scan/qr-event-info-item';
import { cn } from '@/src/lib/utils';
import { useColorScheme } from 'nativewind';
import { FlatList, View } from 'react-native';
import { EventQrInfoDto } from '@/src/api/events/models';
import React from 'react';

interface Props {
  eventInfo: EventQrInfoDto;
}

export const QrEventInfo: React.FC<Props> = ({ eventInfo }) => {
  const eventDetails = [
    { title: 'Название события', value: eventInfo.name },
    { title: 'Дата события', value: eventInfo.date },
    {
      title: 'Время события',
      value: `${eventInfo.startTime.slice(0, 5)} - ${eventInfo.endTime.slice(0, 5)}`
    },
    {
      title: 'Место проведения',
      value: `${eventInfo.address}, ${eventInfo.space}`
    }
  ];

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
        data={eventDetails}
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
