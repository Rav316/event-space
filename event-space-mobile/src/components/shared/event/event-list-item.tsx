import { StyledText } from '@/src/components/ui';
import { IEvent } from '@/src/components/shared/event/event-list';
import { Image } from 'expo-image';
import { Badge } from '@/src/components/ui/badge';
import { categoryColors } from '@/src/constants/category-colors';
import { Calendar, MapPin } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useColorScheme } from 'nativewind';
import { getEventImageUrl } from '@/src/utils/get-event-image-url';

interface Props {
  event: IEvent;
}

export const EventListItem: React.FC<Props> = ({ event }) => {
  const colorScheme = useColorScheme().colorScheme;

  return (
    <View
      className={
        'rounded-2xl border-2 border-[#E5E5E5] dark:border-[#333333] p-4'
      }
    >
      <View className={'w-full flex-row items-center gap-3'}>
        <Image
          source={{ uri: getEventImageUrl(event.name, event.imageUrl) }}
          style={styles.image}
          contentFit={'cover'}
        />
        <View className={'flex-1 items-start h-full gap-1'}>
          <Badge className={categoryColors[event.category.id - 1].badge}>
            <StyledText className={categoryColors[event.category.id - 1].text}>
              {event.category.name}
            </StyledText>
          </Badge>
          <StyledText
            className={'font-semibold'}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {event.name}
          </StyledText>
          <View className={'flex-row gap-2 items-center w-full'}>
            <Calendar
              width={15}
              height={15}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            />
            <StyledText
              className={'text-muted-foreground text-xs flex-1'}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {event.eventDate}, {event.startTime} - {event.endTime}
            </StyledText>
          </View>
          <View className={'flex-row gap-2 w-full'}>
            <MapPin
              width={15}
              height={15}
              style={{ marginTop: 3 }}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            />
            <StyledText
              className={'text-muted-foreground text-xs flex-1'}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {event.space.building.address}, {event.space.name}
            </StyledText>
          </View>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 16
  }
});
