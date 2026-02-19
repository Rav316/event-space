import { Stack, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';
import { Calendar, Flame, MapPin, Share2, Users } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Badge } from '@/src/components/ui/badge';
import { StyledText } from '@/src/components/ui';
import { categoryColors } from '@/src/constants/category-colors';
import { EventBadge, EventOrganizerBlock, EventShareBlock } from '@/src/components/shared/event';
import {
  initialWindowMetrics,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { EventReviewsBlock, EventReviewsList } from '@/src/components/shared/event-review';

const EventPage = () => {
  const { id } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();

  const insets = useSafeAreaInsets();

  const bottomInset =
    insets.bottom || initialWindowMetrics?.insets?.bottom || 0;

  return (
    <>
      <Stack.Screen options={{ title: `Мероприятие #${id}` }} />
      <ScrollView>
        <View
          className={'gap-4 px-3 pt-3'}
          style={{ paddingBottom: bottomInset }}
        >
          <View className={'relative'}>
            <Image
              source={{
                uri: 'https://preview.redd.it/red-crown-suffocation-wallpaper-for-pc-1920-1080-v0-slxie4jgv6kg1.png?width=1080&crop=smart&auto=webp&s=0c10eabebdc141d6c545c5b638064e4272f2f5c9'
              }}
              style={{ width: '100%', height: 200, borderRadius: 16 }}
              contentFit={'cover'}
              onError={(e) => console.log('Image error:', e)}
            />
            <Badge
              className={'absolute top-2.5 left-2.5 ' + categoryColors[0].badge}
            >
              <StyledText className={categoryColors[0].text}>
                Концерт
              </StyledText>
            </Badge>

            <Pressable
              className={
                'absolute top-2.5 right-2.5 w-9 h-9 rounded-xl items-center justify-center bg-white/60 dark:bg-black/50'
              }
            >
              <Share2
                size={18}
                color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
              />
            </Pressable>
          </View>
          <StyledText className={'font-medium text-xl'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </StyledText>
          <View className={'gap-2'}>
            <EventBadge
              Icon={Calendar}
              text={'18 февраля 2026 г.'}
              caption={'19:00 - 20:00'}
            />
            <EventBadge
              Icon={MapPin}
              text={'building 1, Библиотека'}
              caption={'ул. Академическая, 12, Корпус А'}
            />
            <EventBadge
              Icon={Users}
              text={'0 / 20 участников'}
              caption={'Лимит не превышен'}
            />
            <EventBadge
              Icon={Flame}
              text={'18.02.2026'}
              caption={'Дедлайн регистрации'}
              iconColor={'orange'}
            />
          </View>
          <EventOrganizerBlock />
          <EventShareBlock/>
          <EventReviewsBlock />
          <EventReviewsList/>
        </View>
      </ScrollView>
    </>
  );
};

export default EventPage;
