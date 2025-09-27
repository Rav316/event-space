import React, { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { EventMainInfo } from '@/schemas/event-main-info-schema.ts';

export const useTags = (form: UseFormReturn<EventMainInfo>) => {
  const tags = form.watch('tags') || [];
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag && tags.length < 5 && !tags.includes(newTag)) {
      form.setValue('tags', [...tags, newTag], { shouldValidate: true });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    form.setValue(
      'tags',
      tags.filter((t) => t !== tag),
      { shouldValidate: true },
    );
  };

  const onInputTagEnterPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  };

  return {
    tags,
    newTag,
    setNewTag,
    addTag,
    removeTag,
    onInputTagEnterPress,
  };
};
