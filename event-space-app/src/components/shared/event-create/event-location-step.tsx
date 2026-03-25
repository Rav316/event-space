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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useBuildings } from '@/api/buildings/hooks.ts';
import { useSpaces } from '@/api/spaces/hooks.ts';
import type { EventCreateDto } from '@/api/events/model.ts';
import type { SpaceFilter } from '@/api/spaces/model.ts';
import type { Building } from '@/api/buildings/model.ts';
import {
  Map,
  MapControls,
  MapMarker,
  MapPopup,
  MarkerContent,
  useMap,
  type MapRef,
} from '@/components/ui/map';
import { MapLanguageRu } from '@/components/modal/building-map-components';

function MapFitBuildings({
  buildings,
  initialSelectedId,
}: {
  buildings: Building[];
  initialSelectedId: number;
}) {
  const { map, isLoaded } = useMap();
  const initialIdRef = useRef(initialSelectedId);

  useEffect(() => {
    if (!map || !isLoaded || buildings.length === 0) return;

    const selected = initialIdRef.current
      ? buildings.find((b) => b.id === initialIdRef.current)
      : null;

    if (selected) {
      map.flyTo({
        center: [selected.longitude!, selected.latitude!],
        zoom: 16,
        duration: 800,
      });
      return;
    }

    if (buildings.length === 1) {
      map.flyTo({
        center: [buildings[0].longitude!, buildings[0].latitude!],
        zoom: 15,
        duration: 0,
      });
      return;
    }

    const lngs = buildings.map((b) => b.longitude!);
    const lats = buildings.map((b) => b.latitude!);
    map.fitBounds(
      [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ],
      { padding: 60, maxZoom: 15, duration: 0 },
    );
  }, [map, isLoaded, buildings]);
  return null;
}

interface Props {
  form: ReturnType<typeof useForm<EventLocationData>>;
  event: EventCreateDto;
  building: number;
  filter: SpaceFilter;
  setFilter: (filter: Partial<SpaceFilter>) => void;
}

export const EventLocationStep: React.FC<Props> = ({
  form,
  event,
  filter,
  setFilter,
}) => {
  const mapRef = useRef<MapRef>(null);
  const [popupBuildingId, setPopupBuildingId] = useState<number | null>(
    filter.building || null,
  );

  useEffect(() => {
    if (event.participantQuantity) {
      setFilter({ minCapacity: event.participantQuantity });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.participantQuantity]);

  const { data: buildings, isPending: isBuildingsPending } = useBuildings();
  const { data: spaces, isPending: isSpacesPending } = useSpaces(filter);

  const withCoords = useMemo(
    () => (buildings ?? []).filter((b) => b.latitude != null && b.longitude != null),
    [buildings],
  );

  const defaultCenter: [number, number] =
    withCoords.length > 0
      ? [withCoords[0].longitude!, withCoords[0].latitude!]
      : [37.6173, 55.7558];

  const popupBuilding = withCoords.find((b) => b.id === popupBuildingId) ?? null;

  const handleBuildingSelect = (buildingId: number) => {
    setFilter({ building: buildingId });
    setPopupBuildingId(buildingId);
    const b = withCoords.find((b) => b.id === buildingId);
    if (b) {
      mapRef.current?.flyTo({
        center: [b.longitude!, b.latitude!],
        zoom: 16,
        duration: 600,
      });
    }
  };

  const showMap = !isBuildingsPending && withCoords.length > 0;

  return (
    <FormProvider {...form}>
      <form className={'flex flex-col gap-4'}>
        <div className={showMap ? 'flex gap-4 items-stretch max-[600px]:flex-col' : undefined}>
          {/* Left: Map */}
          {showMap && (
            <div className="flex flex-col gap-1 w-[45%] max-[600px]:w-full shrink-0">
              <Label>Корпус на карте</Label>
              <div className="flex-1 min-h-80 rounded-xl overflow-hidden border border-[#E8E8E8]">
                <Map ref={mapRef} center={defaultCenter} zoom={11} theme="light">
                  <MapControls position="bottom-right" showZoom showCompass />
                  <MapLanguageRu />
                  <MapFitBuildings buildings={withCoords} initialSelectedId={filter.building} />
                  {withCoords.map((building) => (
                    <MapMarker
                      key={building.id}
                      longitude={building.longitude!}
                      latitude={building.latitude!}
                      onClick={() => handleBuildingSelect(building.id)}
                    >
                      <MarkerContent>
                        <div
                          className={`size-4 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-150 ${
                            building.id === filter.building
                              ? 'bg-foreground scale-125'
                              : 'bg-[#888] hover:bg-foreground hover:scale-110'
                          }`}
                        />
                      </MarkerContent>
                    </MapMarker>
                  ))}
                  {popupBuilding && (
                    <MapPopup
                      longitude={popupBuilding.longitude!}
                      latitude={popupBuilding.latitude!}
                      onClose={() => setPopupBuildingId(null)}
                      closeButton
                      focusAfterOpen={false}
                      closeOnClick={false}
                      className="w-52"
                    >
                      <div className="space-y-0.5">
                        <p className="font-medium text-foreground text-sm">
                          {popupBuilding.name}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {popupBuilding.address}
                        </p>
                      </div>
                    </MapPopup>
                  )}
                </Map>
              </div>
            </div>
          )}

          {/* Right: Dropdown + Space selection */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <div className="flex flex-col gap-1">
              <Label htmlFor={'location'}>
                Локация <RequiredMark />
              </Label>
              {isBuildingsPending ? (
                <Skeleton className={'w-full h-8'} />
              ) : (
                <Select
                  value={filter.building === 0 ? undefined : String(filter.building)}
                  onValueChange={(value) => handleBuildingSelect(Number(value))}
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

            {filter.building !== 0 && (
              <>
                <div className={'flex flex-col gap-0.5'}>
                  <h3 className={'font-medium text-lg'}>
                    Выбор места проведения <RequiredMark />
                  </h3>
                  <span className={'text-muted-foreground text-sm'}>
                    Выберите кабинет в корпусе "
                    {buildings?.find((b) => b.id === filter.building)?.name}" (
                    {spaces?.length} пространств доступно)
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
          </div>
        </div>

        {form.formState.errors.space && (
          <FormErrorMessage>
            {form.formState.errors.space.message}
          </FormErrorMessage>
        )}
      </form>
    </FormProvider>
  );
};
