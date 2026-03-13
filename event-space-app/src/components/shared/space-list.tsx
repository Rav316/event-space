import { Building2 } from 'lucide-react';
import { ScrollArea, Skeleton } from '@/components/ui';
import React from 'react';
import type { SpaceListDto } from '@/api/spaces/model.ts';
import { SpaceItem, SpacesNotFound } from '@/components/shared';

interface Props {
  spaces: SpaceListDto[];
  value?: string;
  onValueChange?: (value: string) => void;
  isPending?: boolean;
}

export const SpaceList: React.FC<Props> = ({
  spaces,
  value,
  onValueChange,
  isPending,
}) => {
  return (
    <div
      className={'flex flex-col gap-4 p-5 border border-[#E5E5E5] rounded-md'}
    >
      <div className={'flex items-center gap-2 mb-2'}>
        <Building2 />
        <span>Доступные пространства</span>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="flex flex-col gap-2">
          {isPending ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className={'w-full h-[85px]'} />
            ))
          ) : (
            <>
              {spaces.length === 0 ? (
                <SpacesNotFound />
              ) : (
                <>
                  {spaces.map((space) => (
                    <SpaceItem
                      key={space.id}
                      onClick={() => onValueChange?.(String(space.id))}
                      name={space.name}
                      capacity={space.capacity}
                      floor={space.floor}
                      type={space.type}
                      selected={Number(value) === space.id}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
