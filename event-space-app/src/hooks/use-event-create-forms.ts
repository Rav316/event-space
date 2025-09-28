import { useEventCreationStore } from '@/store/use-event-creation-store.ts';
import { useForm } from 'react-hook-form';
import {
  type EventMainInfo,
  eventMainInfoSchema,
} from '@/schemas/event-main-info-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type EventDateTime,
  eventDateTimeSchema,
} from '@/schemas/event-date-time-schema.ts';

export const useEventCreateForms = () => {
  const eventCreateDto = useEventCreationStore((state) => state.event);
  const mainInfoForm = useForm<EventMainInfo>({
    resolver: zodResolver(eventMainInfoSchema),
    defaultValues: {
      name: eventCreateDto.name,
      shortDescription: eventCreateDto.shortDescription,
      description: eventCreateDto.description,
      tags: eventCreateDto.tags,
      category: eventCreateDto.category,
    },
  });

  const eventDateTimeForm = useForm<EventDateTime>({
    resolver: zodResolver(eventDateTimeSchema),
    defaultValues: {
      eventDate: eventCreateDto.eventDate,
      startTime: eventCreateDto.startTime,
      endTime: eventCreateDto.endTIme,
      deadline: eventCreateDto.deadline,
    },
  });

  return { mainInfoForm, eventDateTimeForm };
};
