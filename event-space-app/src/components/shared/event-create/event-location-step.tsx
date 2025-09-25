import {
  Label,
  RequiredMark,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { SpaceFilters, SpaceList } from '@/components/shared';

const locations = [
  'Корпус 1',
  'Корпус 2',
  'Корпус 3',
  'Корпус 4',
  'Корпус 5',
  'Корпус 6',
  'Корпус 7',
];

const spaces = [
  'Аудитория 1',
  'Аудитория 2',
  'Аудитория 3',
  'Аудитория 4',
  'Аудитория 5',
  'Аудитория 6',
];

export const EventLocationStep = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <div
        className={'flex items-center gap-4 mb-4 w-full max-[530px]:flex-col'}
      >
        <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
          <Label htmlFor={'location'}>
            Локация <RequiredMark />
          </Label>
          <Select>
            <SelectTrigger id={'location'} className={'w-full'}>
              <SelectValue placeholder="Выберите корпус" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
          <Label htmlFor={'space'}>
            Аудитория / зал <RequiredMark />
          </Label>
          <Select>
            <SelectTrigger id={'space'} className={'w-full'}>
              <SelectValue placeholder={'Выберите место проведения'} />
            </SelectTrigger>
            <SelectContent>
              {spaces.map((space) => (
                <SelectItem key={space} value={space}>
                  {space}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className={'flex flex-col gap-0.5'}>
        <h3 className={'font-medium text-lg'}>
          Выбор места проведения <RequiredMark />
        </h3>
        <span className={'text-muted-foreground text-sm'}>
          Выберите кабинет в корпусе "{locations[0]}" ({spaces.length} кабинетов
          доступно)
        </span>
      </div>
      <SpaceFilters />
      <SpaceList />
    </div>
  );
};
