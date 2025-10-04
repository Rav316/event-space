import {
  Badge,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { useEventFilterStore } from '@/store/use-event-filter-store';
import { Plus, X } from 'lucide-react';
import * as React from 'react';

export const TagsFilter = () => {
  const tags = useEventFilterStore((state) => state.filter.tags);
  const addTag = useEventFilterStore((state) => state.addTag);
  const removeTag = useEventFilterStore((state) => state.removeTag);
  const setFilter = useEventFilterStore((state) => state.setFilter);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newTag = event.currentTarget.value.trim();
      if (newTag && tags.length < 5 && !tags.includes(newTag)) {
        addTag(newTag);
        event.currentTarget.value = '';
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    removeTag(tag);
  };

  const handleClearTags = () => {
    setFilter({ tags: [] });
  };

  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant={'outline'} className={'max-[563px]:flex-1'}>
          <Plus />
          <span>Теги</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={'start'}
        collisionPadding={20}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className={'flex flex-col gap-y-5'}>
          <h4 className={'font-medium'}>Добавить теги для поиска</h4>
          <Input maxLength={10} placeholder={'Введите тег'} onKeyDown={handleKeyPress} />
          {tags.length !== 0 && (
            <div className={'flex flex-col gap-y-4'}>
              <div className={'flex justify-between items-center'}>
                <span className={'text-muted-foreground text-sm'}>
                  Активные теги:
                </span>
                <Button
                  variant={'secondary'}
                  className={'text-sm h-[25px]'}
                  onClick={handleClearTags}
                >
                  Очистить
                </Button>
              </div>
              <div className={'flex flex-wrap gap-x-2 gap-y-4 lg:gap-y-2'}>
                {tags.map((tag, index) => (
                  <Badge
                    className={'items-center'}
                    variant={'secondary'}
                    key={index}
                  >
                    <span>{tag}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
