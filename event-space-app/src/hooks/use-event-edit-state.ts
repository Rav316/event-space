import { useEffect, useState } from 'react';
import type {
  EventDetailsDto,
  EventStepCreateDto,
} from '@/api/events/model.ts';
import type { SpaceFilter } from '@/api/spaces/model.ts';
import { recalculateStepTimes } from '@/utils/recalculate-step-times.ts';

export const useEventEditState = (event?: EventDetailsDto) => {
  const staticContentUrl = import.meta.env.VITE_STATIC_URL;
  const [eventData, setEventData] = useState<EventDetailsDto | undefined>(
    undefined,
  );
  const [eventSteps, setEventSteps] = useState<EventStepCreateDto[]>([]);
  const [spaceFilter, setSpaceFilter] = useState<SpaceFilter>({
    building: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      setEventData(event);
      setEventSteps(event.steps || []);
      updateSpaceFilter({ building: event.building || 0 });
      setPreviewUrl(
        (event.imageUrl && staticContentUrl + event.imageUrl) || null,
      );
    }
  }, [event, staticContentUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const updateEventData = (updates: Partial<EventDetailsDto>) => {
    setEventData((prev) => (prev ? { ...prev, ...updates } : undefined));
  };

  const addEventStep = (step: EventStepCreateDto) => {
    setEventSteps((prev) => [...prev, step]);
  };

  const updateEventStep = (
    index: number,
    data: Partial<EventStepCreateDto>,
  ) => {
    setEventSteps((prev) => {
      const newSteps = [...prev];
      newSteps[index] = { ...newSteps[index], ...data };
      return newSteps;
    });
  };

  const removeEventStep = (index: number) => {
    setEventSteps((prev) => {
      const newSteps = [...prev];
      newSteps.splice(index, 1);
      return recalculateStepTimes(newSteps, eventData?.startTime ?? '00:00');
    });
  };

  const updateSpaceFilter = (filter: Partial<SpaceFilter>) => {
    setSpaceFilter((prev) => ({ ...prev, ...filter }));
  };

  const setFile = (file: File) => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    const newUrl = URL.createObjectURL(file);
    setPreviewUrl(newUrl);
    setImageFile(file);
  };

  const clearImage = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setImageFile(new File([], ''));
  };

  const reorderEventSteps = (oldIndex: number, newIndex: number) => {
    setEventSteps((prev) => {
      const steps = [...prev];
      const [moved] = steps.splice(oldIndex, 1);
      steps.splice(newIndex, 0, moved);
      return recalculateStepTimes(steps, eventData?.startTime ?? '00:00');
    });
  };

  const resetEventSteps = () => {
    setEventSteps([]);
  };

  return {
    eventData,
    updateEventData,
    eventSteps,
    addEventStep,
    updateEventStep,
    removeEventStep,
    reorderEventSteps,
    resetEventSteps,
    spaceFilter,
    updateSpaceFilter,
    previewUrl,
    setFile,
    clearImage,
    imageFile,
  };
};
