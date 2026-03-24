import type { EventCreateDto, EventStepCreateDto } from '@/api/events/model.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getTodayDate } from '@/utils/get-today-date.ts';
import { recalculateStepTimes } from '@/utils/recalculate-step-times.ts';

interface EventCreationState {
  event: EventCreateDto;
  eventSteps: EventStepCreateDto[];
  setEventData: (event: Partial<EventCreateDto>) => void;
  setEventSteps: (steps: EventStepCreateDto[]) => void;
  addEventStep: (step: EventStepCreateDto) => void;
  removeEventStep: (index: number) => void;
  resetEvent: () => void;
  resetEventSteps: () => void;
  updateEventStep: (index: number, data: Partial<EventStepCreateDto>) => void;
  reorderEventSteps: (oldIndex: number, newIndex: number) => void;
}

export const useEventCreationStore = create<EventCreationState>()(
  devtools(
    immer((set) => ({
      event: {
        name: '',
        eventDate: getTodayDate(),
        startTime: '',
        endTime: '',
        space: 0,
        shortDescription: '',
        description: '',
        category: 0,
        deadline: getTodayDate(),
        participantQuantity: 0,
      },
      eventSteps: [],
      setEventData: (event) =>
        set(
          (state) => {
            state.event = { ...state.event, ...event };
          },
          false,
          'setEventData',
        ),
      setEventSteps: (steps) =>
        set({ eventSteps: steps }, false, 'setEventSteps'),
      addEventStep: (step) =>
        set(
          (state) => {
            state.eventSteps.push(step);
          },
          false,
          'addEventStep',
        ),
      removeEventStep: (index) =>
        set(
          (state) => {
            const steps = [...state.eventSteps];
            steps.splice(index, 1);
            state.eventSteps = recalculateStepTimes(
              steps,
              state.event.startTime || '00:00',
            );
          },
          false,
          'removeEventStep',
        ),
      resetEvent: () =>
        set(
          (state) => {
            state.event = {
              name: '',
              tags: [],
              eventDate: getTodayDate(),
              startTime: '',
              endTime: '',
              space: 0,
              shortDescription: '',
              description: '',
              category: 0,
              deadline: getTodayDate(),
              participantQuantity: 0,
            };
          },
          false,
          'resetEvent',
        ),
      resetEventSteps: () =>
        set(
          (state) => {
            state.eventSteps = [];
          },
          false,
          'resetEventSteps',
        ),
      updateEventStep: (index: number, data: Partial<EventStepCreateDto>) =>
        set(
          (state) => {
            state.eventSteps[index] = { ...state.eventSteps[index], ...data };
          },
          false,
          'updateEventStep',
        ),
      reorderEventSteps: (oldIndex: number, newIndex: number) =>
        set(
          (state) => {
            const steps = [...state.eventSteps];
            const [moved] = steps.splice(oldIndex, 1);
            steps.splice(newIndex, 0, moved);
            state.eventSteps = recalculateStepTimes(steps, state.event.startTime);
          },
          false,
          'reorderEventSteps',
        ),
    })),
    {
      name: 'eventCreationStore',
      store: 'event-creation-store',
    },
  ),
);
