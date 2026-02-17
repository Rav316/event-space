import { StyledText } from '@/src/components/ui';
import { Image } from 'expo-image';
import { Badge } from '@/src/components/ui/badge';
import { categoryColors } from '@/src/constants/category-colors';
import { Calendar, MapPin } from 'lucide-react-native';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useColorScheme } from 'nativewind';
import { getEventImageUrl } from '@/src/utils/get-event-image-url';
import { EventListPreviewDto } from '@/src/api/events/models';
import { ContextMenuView } from 'react-native-ios-context-menu';
import {formatDateToRuFormat} from "@/src/utils/format-date-to-ru-format";

interface Props {
  event: EventListPreviewDto;
}

const PREVIEW_WIDTH = Dimensions.get('window').width - 48;
const MAX_PREVIEW_HEIGHT = Dimensions.get('window').height * 0.6;

export const EventListItem: React.FC<Props> = ({ event }) => {
  const { colorScheme } = useColorScheme();
  const [previewHeight, setPreviewHeight] = useState(PREVIEW_WIDTH);

  const imageUrl = event.imageUrl ? getEventImageUrl(event.imageUrl) : null;

  const getPlaceholderText = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const placeholderText = event.name ? getPlaceholderText(event.name) : 'EV';

  const imageElement = imageUrl ? (
    Platform.OS === 'ios' ? (
      <ContextMenuView
        menuConfig={{
          menuTitle: '',
          menuItems: []
        }}
        previewConfig={{
          previewType: 'CUSTOM',
          previewSize: 'INHERIT',
          borderRadius: 16,
          preferredCommitStyle: 'dismiss',
          isResizeAnimated: false,
        }}
        renderPreview={() => (
          <View style={{ width: PREVIEW_WIDTH, height: previewHeight }}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.previewImage}
              contentFit="cover"
            />
          </View>
        )}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit={'cover'}
          transition={200}
          onLoad={(e) => {
            const { width, height } = e.source;
            const ratio = height / width;
            setPreviewHeight(Math.min(PREVIEW_WIDTH * ratio, MAX_PREVIEW_HEIGHT));
          }}
        />
      </ContextMenuView>
    ) : (
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        contentFit={'cover'}
        transition={200}
      />
    )
  ) : (
    <View
      style={styles.image}
      className="items-center justify-center rounded-2xl bg-secondary dark:bg-zinc-800 border border-black/5 dark:border-white/10"
    >
      <StyledText
        className="text-2xl font-bold tracking-tighter text-zinc-400 dark:text-zinc-500"
        style={{ opacity: 0.8 }}
      >
        {placeholderText}
      </StyledText>
    </View>
  );

  return (
    <View
      className={
        'rounded-2xl border-2 border-[#E5E5E5] dark:border-[#333333] p-4 bg-white dark:bg-[#1A1A1A]'
      }
    >
      <View className={'w-full flex-row items-center gap-4'}>
        {imageElement}

        <View className={'flex-1 items-start h-full gap-1'}>
          <Badge className={categoryColors[event.category.id - 1].badge}>
            <StyledText className={categoryColors[event.category.id - 1].text}>
              {event.category.name}
            </StyledText>
          </Badge>

          <StyledText
            className={'font-bold text-base leading-5 text-foreground'}
            numberOfLines={2}
          >
            {event.name}
          </StyledText>

          <View className={'flex-row gap-2 items-center mt-1'}>
            <Calendar
              size={14}
              color={colorScheme === 'dark' ? '#A1A1AA' : '#71717A'}
            />
            <StyledText className={'text-muted-foreground text-xs'}>
              {formatDateToRuFormat(event.eventDate)}
            </StyledText>
          </View>

          <View className={'flex-row gap-2 items-center'}>
            <MapPin
              size={14}
              color={colorScheme === 'dark' ? '#A1A1AA' : '#71717A'}
            />
            <StyledText
              className={'text-muted-foreground text-xs flex-1'}
              numberOfLines={1}
            >
              {event.space.name}
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
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});
