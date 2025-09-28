import React from 'react';
import { Layers, Users } from 'lucide-react';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils.ts';

interface Props {
  name: string;
  capacity: number;
  floor: number;
  type: string;
  selected?: boolean;
  onClick?: () => void;
}

export const SpaceItem: React.FC<Props> = ({
  name,
  capacity,
  floor,
  type,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col gap-1 border border-[#E5E5E5] rounded-md p-5 hover:bg-[#F5F5F5] transition-all duration-300 cursor-pointer',
        { 'bg-[#F5F5F5] border-[#C4C4C4]': selected },
      )}
    >
      <span className={'font-medium'}>{name}</span>
      <div
        className={
          'flex min-[4445px]:items-center gap-5 text-muted-foreground max-[444px]:flex-col'
        }
      >
        <div className={'flex gap-5'}>
          <div className={'flex items-center gap-2'}>
            <Users width={15} height={15} />
            {capacity} чел.
          </div>
          <div className={'flex items-center gap-2'}>
            <Layers width={15} height={15} />
            {floor} этаж
          </div>
        </div>
        <Badge variant={'secondary'}>{type}</Badge>
      </div>
    </div>
  );
};
