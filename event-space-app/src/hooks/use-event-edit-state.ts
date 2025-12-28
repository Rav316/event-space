import { useEffect, useState } from 'react';
import type {
  EventDetailsDto,
  EventStepCreateDto,
} from '@/api/events/model.ts';
import type { SpaceFilter } from '@/api/spaces/model.ts';

export const useEventEditState = (event?: EventDetailsDto) => {
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
      setPreviewUrl(event.imageUrl || null);
    }
  }, [event]);

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
      return newSteps;
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
    setImageFile(null);
  };

  const resetEventSteps = () => {
    setEventSteps([]);
  }

  return {
    eventData,
    updateEventData,
    eventSteps,
    addEventStep,
    updateEventStep,
    removeEventStep,
    resetEventSteps,
    spaceFilter,
    updateSpaceFilter,
    previewUrl,
    setFile,
    clearImage,
    imageFile,
  };
};
