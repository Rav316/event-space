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
import type { EventStepCreateDto } from '@/api/events/model.ts';
import { eventStepSchema } from '@/schemas/event-step-schema.ts';
import {
  type EventLocationData,
  eventLocationSchema,
} from '@/schemas/event-location-schema.ts';
import { useMemo } from 'react';

export const useEventCreateForms = () => {
  const eventCreateDto = useEventCreationStore((state) => state.event);

  const mainInfoDefaults = useMemo(
    () => ({
      name: eventCreateDto.name,
      shortDescription: eventCreateDto.shortDescription,
      description: eventCreateDto.description,
      tags: eventCreateDto.tags,
      category: eventCreateDto.category,
    }),
    [eventCreateDto],
  );

  const eventDateTimeDefaults = useMemo(
    () => ({
      eventDate: eventCreateDto.eventDate,
      startTime: eventCreateDto.startTime,
      endTime: eventCreateDto.endTime,
      deadline: eventCreateDto.deadline,
    }),
    [eventCreateDto],
  );

  const eventLocationDefaults = useMemo(
    () => ({
      space: eventCreateDto.space,
    }),
    [eventCreateDto],
  );

  const mainInfoForm = useForm<EventMainInfo>({
    resolver: zodResolver(eventMainInfoSchema),
    defaultValues: mainInfoDefaults,
  });

  const eventDateTimeForm = useForm<EventDateTime>({
    resolver: zodResolver(eventDateTimeSchema),
    defaultValues: eventDateTimeDefaults,
  });

  const eventStepForm = useForm<EventStepCreateDto>({
    resolver: zodResolver(eventStepSchema),
    defaultValues: {
      name: '',
      startTime: '',
      endTime: '',
      description: '',
    },
  });

  const eventLocationForm = useForm<EventLocationData>({
    resolver: zodResolver(eventLocationSchema),
    defaultValues: eventLocationDefaults,
  });

  const resetForms = () => {
    mainInfoForm.reset();
    eventDateTimeForm.reset();
    eventLocationForm.reset();
  };

  return {
    mainInfoForm,
    eventDateTimeForm,
    eventStepForm,
    eventLocationForm,
    resetForms,
  };
};
