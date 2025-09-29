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
import type { EventStep } from '@/api/events/model.ts';
import { eventStepSchema } from '@/schemas/event-step-schema.ts';
import { type EventLocationData, eventLocationSchema } from '@/schemas/event-location-schema.ts';

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
      endTime: eventCreateDto.endTime,
      deadline: eventCreateDto.deadline,
    },
  });

  const eventStepForm = useForm<EventStep>({
    resolver: zodResolver(eventStepSchema),
    defaultValues: {
      name: '',
      startTime: '',
      endTime: '',
      description: ''
    }
  });

  const eventLocationForm = useForm<EventLocationData>({
    resolver: zodResolver(eventLocationSchema),
    defaultValues: {
      space: eventCreateDto.space
    }
  });

  const resetForms = () => {
    mainInfoForm.reset();
    eventDateTimeForm.reset();
    eventLocationForm.reset();
  }


  return { mainInfoForm, eventDateTimeForm, eventStepForm, eventLocationForm, resetForms };
};
