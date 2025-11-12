import {
  FormErrorMessage,
  Label,
  RequiredMark,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@/components/ui';
import { SpaceFilters, SpaceList } from '@/components/shared';
import { FormProvider, type useForm } from 'react-hook-form';
import type { EventLocationData } from '@/schemas/event-location-schema.ts';
import React, { useEffect } from 'react';
import { useBuildings } from '@/api/buildings/hooks.ts';
import { useSpaceFilterStore } from '@/store/use-space-filter-store.ts';
import { useSpaces } from '@/api/spaces/hooks.ts';
import { useEventCreationStore } from '@/store/use-event-creation-store.ts';

interface Props {
  form: ReturnType<typeof useForm<EventLocationData>>;
}

export const EventLocationStep: React.FC<Props> = ({ form }) => {
  const spaceFilter = useSpaceFilterStore((state) => state.filter);
  const setSpaceFilter = useSpaceFilterStore((state) => state.setFilter);
  const event = useEventCreationStore((state) => state.event);

  useEffect(() => {
    if (event.participantQuantity) {
      setSpaceFilter({ minCapacity: event.participantQuantity });
    }
  }, [event.participantQuantity, setSpaceFilter]);

  const { data: buildings, isPending: isBuildingsPending } = useBuildings();
  const { data: spaces, isPending: isSpacesPending } = useSpaces(spaceFilter);

  return (
    <FormProvider {...form}>
      <form className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
          <Label htmlFor={'location'}>
            Локация <RequiredMark />
          </Label>
          {isBuildingsPending ? (
            <Skeleton className={'w-full h-8'} />
          ) : (
            <Select
              defaultValue={
                spaceFilter.building === 0
                  ? undefined
                  : String(spaceFilter.building)
              }
              onValueChange={(value) =>
                setSpaceFilter({ building: Number(value) })
              }
            >
              <SelectTrigger id={'location'} className={'w-full'}>
                <SelectValue placeholder="Выберите корпус" />
              </SelectTrigger>
              <SelectContent>
                {buildings?.map((building) => (
                  <SelectItem key={building.id} value={String(building.id)}>
                    {`${building.name}, ${building.address}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {spaceFilter.building !== 0 && (
          <>
            <div className={'flex flex-col gap-0.5'}>
              <h3 className={'font-medium text-lg'}>
                Выбор места проведения <RequiredMark />
              </h3>
              <span className={'text-muted-foreground text-sm'}>
                Выберите кабинет в корпусе "
                {buildings?.find((b) => b.id === spaceFilter.building)?.name}" (
                {spaces?.length} кабинетов доступно)
              </span>
            </div>
            <SpaceFilters />
            <SpaceList
              spaces={spaces || []}
              isPending={isSpacesPending}
              value={form.watch('space')?.toString()}
              onValueChange={(value) => form.setValue('space', Number(value))}
            />
          </>
        )}
        {form.formState.errors.space && (
          <FormErrorMessage>
            {form.formState.errors.space.message}
          </FormErrorMessage>
        )}
      </form>
    </FormProvider>
  );
};
