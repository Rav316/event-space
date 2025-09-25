import { Building2 } from 'lucide-react';
import { SpaceItem } from '@/components/shared/space-item.tsx';
import { ScrollArea } from '@/components/ui';

export const SpaceList = () => {
  return (
    <div
      className={'flex flex-col gap-4 p-5 border border-[#E5E5E5] rounded-md'}
    >
      <div className={'flex items-center gap-2 mb-2'}>
        <Building2 />
        <span>Доступные кабинеты</span>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="flex flex-col gap-2">
          <SpaceItem
            name="Лаборатория 102"
            capacity={20}
            floor={1}
            type="Лаборатория"
          />
          <SpaceItem
            name="Лаборатория неорганической химии"
            capacity={24}
            floor={1}
            type="Лаборатория"
          />
          <SpaceItem
            name="Аудитория 201"
            capacity={80}
            floor={2}
            type="Лекционная"
          />
          <SpaceItem
            name="Конференц-зал"
            capacity={80}
            floor={4}
            type="Конференц-зал"
          />
        </div>
      </ScrollArea>
    </div>
  );
};
