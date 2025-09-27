import type { EventCreateDto, EventStep } from '@/api/events/model.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface EventCreationStore {
  event: EventCreateDto;
  eventSteps: EventStep[];
  setEventData: (event: Partial<EventCreateDto>) => void;
  setEventSteps: (steps: EventStep[]) => void;
  addEventStep: (step: EventStep) => void;
  removeEventStep: (index: number) => void;
  resetEvent: () => void;
  resetEventSteps: () => void;
}

export const useEventCreationStore = create<EventCreationStore>()(
  devtools(
    immer((set) => ({
      event: {
        name: '',
        tags: [],
        eventDate: new Date(),
        startTime: '',
        endTIme: '',
        space: 0,
        shortDescription: '',
        description: '',
        category: 0
      },
      eventSteps: [],
      setEventData: (event) =>
        set((state) => {
          state.event = {
            ...state.event,
            ...event,
          };
        }),
      setEventSteps: (steps) => set({ eventSteps: steps }),
      addEventStep: (step) =>
        set((state) => (state.eventSteps = [...state.eventSteps, step])),
      removeEventStep: (index) =>
        set(
          (state) =>
            (state.eventSteps = state.eventSteps.filter((_, i) => i !== index)),
        ),
      resetEvent: () =>
        set(
          (state) =>
            (state.event = {
              name: '',
              tags: [],
              eventDate: new Date(),
              startTime: '',
              endTIme: '',
              space: 0,
              shortDescription: '',
              description: '',
              category: 0,
            }),
        ),
      resetEventSteps: () => set((state) => (state.eventSteps = [])),
    })),
    {
      store: 'event-creation-store',
    },
  ),
);
