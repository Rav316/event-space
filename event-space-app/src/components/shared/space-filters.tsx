import { Funnel, Search, Users } from 'lucide-react';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

export const SpaceFilters = () => {
  return (
    <div className="flex gap-4 bg-[#F5F5F5] p-4 rounded-md max-[800px]:flex-col">
      <div className="flex flex-col gap-2">
        <Label htmlFor="search" className="flex items-center gap-1">
          <Search width={15} height={15} />
          Поиск помещения
        </Label>
        <Input
          id="search"
          placeholder="Введите название или номер"
          className="min-w-[250px] bg-white/80 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="space-type" className="flex items-center gap-1">
          <Funnel width={15} height={15} />
          Тип помещения
        </Label>
        <Select defaultValue={String(0)}>
          <SelectTrigger
            id="space-type"
            className="min-w-[200px] bg-white/80 border border-gray-300 rounded-md max-[800px]:w-full"
          >
            <SelectValue placeholder="Выберите тип помещения" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={String(0)}>Все типы</SelectItem>
            <SelectItem value={String(1)}>Лекционная</SelectItem>
            <SelectItem value={String(2)}>Лаборатория</SelectItem>
            <SelectItem value={String(3)}>Коммуникация</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="capacity" className="flex items-center gap-1">
          <Users width={15} height={15} />
          Вместимость
        </Label>
        <Select defaultValue={String(0)}>
          <SelectTrigger
            id="capacity"
            className="min-w-[200px] bg-white/80 border border-gray-300 rounded-md max-[800px]:w-full"
          >
            <SelectValue placeholder="Выберите вместимость" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={String(0)}>Любая</SelectItem>
            <SelectItem value={String(1)}>До 30 человек</SelectItem>
            <SelectItem value={String(2)}>30 - 100 человек</SelectItem>
            <SelectItem value={String(3)}>Более 100 человек</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
