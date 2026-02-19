import { Platform, View } from 'react-native';
import { StyledButton, StyledText } from '@/src/components/ui';
import { CalendarPlus, Link2 } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as Clipboard from 'expo-clipboard';
import * as Burnt from 'burnt';
import * as Calendar from 'expo-calendar';
import { getEventWebUrl } from '@/src/utils/get-event-web-url';

interface EventShareBlockProps {
  eventId: number;
  event: {
    name: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    description?: string;
    space: {
      name: string;
      building: {
        name: string;
        address: string;
      };
    };
  };
}

const buildDateTime = (date: string, time: string): Date =>
  new Date(`${date}T${time}`);

export const EventShareBlock = ({ eventId, event }: EventShareBlockProps) => {
  const colorScheme = useColorScheme().colorScheme;
  const resolvedIconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';

  const eventUrl = getEventWebUrl(eventId);

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(eventUrl);
    Burnt.toast({ title: 'Ссылка скопирована', preset: 'done' });
  };

  const handleAddToCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Burnt.toast({ title: 'Нет доступа к календарю', preset: 'error' });
      return;
    }

    try {
      let calendarId: string;

      if (Platform.OS === 'ios') {
        const defaultCalendar = await Calendar.getDefaultCalendarAsync();
        calendarId = defaultCalendar.id;
      } else {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        const primary =
          calendars.find((cal) => cal.isPrimary && cal.allowsModifications) ??
          calendars.find((cal) => cal.allowsModifications);
        if (primary) {
          calendarId = primary.id;
        } else {
          calendarId = await Calendar.createCalendarAsync({
            title: 'Event Space',
            color: '#4285F4',
            entityType: Calendar.EntityTypes.EVENT,
            source: {
              isLocalAccount: true,
              name: 'Event Space',
              type: Calendar.SourceType.LOCAL,
            },
            name: 'event-space',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
          });
        }
      }

      const startDate = buildDateTime(event.eventDate, event.startTime);
      const endDate = buildDateTime(event.eventDate, event.endTime);
      const location = `${event.space.building.name}, ${event.space.name}, ${event.space.building.address}`;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      await Calendar.createEventAsync(calendarId, {
        title: event.name,
        startDate,
        endDate,
        location,
        notes: event.description || undefined,
        timeZone,
      });

      Burnt.toast({ title: 'Добавлено в календарь', preset: 'done' });
    } catch {
      Burnt.toast({ title: 'Не удалось добавить в календарь', preset: 'error' });
    }
  };

  return (
    <View
      className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-2'}
    >
      <StyledText className={'font-medium text-xl'}>Поделиться</StyledText>
      <View className={'gap-2'}>
        <StyledButton variant={'outline'} onPress={handleCopyLink}>
          <Link2 color={resolvedIconColor} />
          <StyledText>Скопировать ссылку</StyledText>
        </StyledButton>
        <StyledButton variant={'outline'} onPress={handleAddToCalendar}>
          <CalendarPlus color={resolvedIconColor} />
          <StyledText>Добавить в календарь</StyledText>
        </StyledButton>
      </View>
    </View>
  );
};
