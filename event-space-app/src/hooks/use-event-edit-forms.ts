import { useForm } from 'react-hook-form';
import {
  type EventMainInfo,
  eventMainInfoSchema,
} from '@/schemas/event-main-info-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { type EventDateTime } from '@/schemas/event-create-date-time-schema.ts';
import {
  type EventLocationData,
  eventLocationSchema,
} from '@/schemas/event-location-schema.ts';
import type {
  EventDetailsDto,
  EventStepCreateDto,
} from '@/api/events/model.ts';
import { useEffect } from 'react';
import { eventStepSchema } from '@/schemas/event-step-schema.ts';
import { eventEditDateTimeSchema } from '@/schemas/event-edit-date-time-schema.ts';

export const useEventEditForms = (event?: EventDetailsDto) => {
  const mainInfoForm = useForm<EventMainInfo>({
    resolver: zodResolver(eventMainInfoSchema),
    defaultValues: {
      name: '',
      shortDescription: '',
      description: '',
      tags: [],
      category: undefined,
      participantQuantity: 0,
    },
  });

  const eventDateTimeForm = useForm<EventDateTime>({
    resolver: zodResolver(eventEditDateTimeSchema),
    defaultValues: {
      eventDate: undefined,
      startTime: '',
      endTime: '',
      deadline: undefined,
    },
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
    defaultValues: {
      space: undefined,
    },
  });

  useEffect(() => {
    if (!event) return;

    mainInfoForm.reset({
      name: event.name,
      shortDescription: event.shortDescription,
      description: event.description,
      tags: event.tags,
      category: event.category,
      participantQuantity: event.participantQuantity,
    });

    eventDateTimeForm.reset({
      eventDate: event.eventDate,
      startTime: event.startTime.slice(0, 5),
      endTime: event.endTime.slice(0, 5),
      deadline: event.deadline,
    });

    eventLocationForm.reset({
      space: event.space,
    });
  }, [event, eventDateTimeForm, eventLocationForm, mainInfoForm]);

  return {
    mainInfoForm,
    eventDateTimeForm,
    eventLocationForm,
    eventStepForm,
  };
};
