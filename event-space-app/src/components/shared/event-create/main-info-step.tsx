import {
  Badge,
  Button,
  Input,
  Label, RequiredMark,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea
} from '@/components/ui';
import React, { useState } from 'react';
import { Hash } from 'lucide-react';
import { eventCreateCategories } from '@/constants/event-create-categories.ts';

export const MainInfoStep = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag && tags.length < 5 && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const onInputTagEnterPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  };

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-2'}>
        <Label htmlFor={'name'}>
          Название мероприятия <RequiredMark/>
        </Label>
        <Input id={'name'} placeholder={'Введите названия мероприятия'} />
      </div>
      <div className={'flex flex-col gap-2'}>
        <Label htmlFor={'short-description'}>
          Краткое описание <RequiredMark/>
        </Label>
        <div className={'flex flex-col gap-1'}>
          <Textarea
            className={'resize-none'}
            id={'short-description'}
            placeholder={'Краткое описание для карточки мероприятия'}
          />
          <span className={'text-xs text-muted-foreground'}>123/200</span>
        </div>
      </div>
      <div className={'flex flex-col gap-2'}>
        <Label htmlFor={'description'}>
          Подробное описание <RequiredMark/>
        </Label>
        <Textarea
          className={'resize-none'}
          id={'description'}
          placeholder={'Подробное описание для карточки мероприятия'}
        />
      </div>
      <div className="flex max-[600px]:flex-col justify-between gap-4">
        <div className="flex flex-col gap-2 w-1/2 max-[600px]:w-full">
          <Label htmlFor="category">
            Категория <RequiredMark/>
          </Label>
          <Select>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {eventCreateCategories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 w-1/2 max-[600px]:w-full">
          <Label htmlFor="target-audience">Целевая аудитория</Label>
          <Input
            id="target-audience"
            placeholder="Например: студенты 3-4 курса"
            className="w-full"
          />
        </div>
      </div>
      <div className={'flex flex-col gap-2'}>
        <Label htmlFor={'tags'}>Теги мероприятия</Label>
        <div className={'flex gap-x-2'}>
          <Input
            id={'tags'}
            placeholder={'Добавить тег'}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={onInputTagEnterPress}
          />
          <Button variant={'outline'} onClick={addTag}>
            <Hash />
          </Button>
        </div>
        <div className={'flex flex-wrap gap-2'}>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant={'secondary'}
              className={'cursor-pointer'}
              onClick={() => removeTag(tag)}
            >
              {tag} x
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
