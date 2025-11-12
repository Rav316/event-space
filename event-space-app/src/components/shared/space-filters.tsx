import { Funnel, Search } from 'lucide-react';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@/components/ui';
import { useSpaceFilterStore } from '@/store/use-space-filter-store.ts';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSpaceTypes } from '@/api/space-types/hooks.ts';

export const SpaceFilters = () => {
  const spaceFilter = useSpaceFilterStore((state) => state.filter);
  const setSpaceFilter = useSpaceFilterStore((state) => state.setFilter);
  const { data: spaceTypes, isPending: isSpaceTypesPending } = useSpaceTypes();

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    setSpaceFilter({ name: debouncedSearch });
  }, [debouncedSearch, setSpaceFilter]);

  return (
    <div className="flex gap-4 bg-[#F5F5F5] p-4 rounded-md max-[600px]:flex-col">
      <div className="flex flex-col gap-2">
        <Label htmlFor="search" className="flex items-center gap-1">
          <Search width={15} height={15} />
          Поиск помещения
        </Label>
        <Input
          id="search"
          placeholder="Введите название или номер"
          defaultValue={spaceFilter.name}
          className="min-w-[250px] bg-white/80 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="space-type" className="flex items-center gap-1">
          <Funnel width={15} height={15} />
          Тип помещения
        </Label>
        {isSpaceTypesPending ? (
          <Skeleton className={'w-full h-8'} />
        ) : (
          <Select
            defaultValue={spaceFilter.type ? String(spaceFilter.type) : 'all'}
            onValueChange={(value) =>
              setSpaceFilter({
                type: value === 'all' ? undefined : Number(value),
              })
            }
          >
            <SelectTrigger
              id="space-type"
              className="min-w-[200px] bg-white/80 border border-gray-300 rounded-md max-[800px]:w-full"
            >
              <SelectValue placeholder="Выберите тип помещения" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>{' '}
              {spaceTypes?.map((spaceType) => (
                <SelectItem key={spaceType.id} value={String(spaceType.id)}>
                  {spaceType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};
