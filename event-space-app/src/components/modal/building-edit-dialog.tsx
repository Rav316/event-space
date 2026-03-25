import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MapPin, Pencil } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormErrorMessage,
  Input,
  Label,
  Spinner,
} from '@/components/ui';
import { Map, MapControls, type MapRef } from '@/components/ui/map';
import { buildingEditSchema } from '@/schemas/building-edit-schema.ts';
import {
  useCheckBuildingName,
  useEditBuilding,
} from '@/api/buildings/hooks.ts';
import type { BuildingEditDto } from '@/api/buildings/model.ts';
import { z } from 'zod';
import { cleanAddress } from '@/utils/nominatim';
import { useAddressMap } from '@/hooks/use-address-map';
import {
  DraggableMarker,
  MapClickListener,
  MapLanguageRu,
} from './building-map-components';

type BuildingEditForm = z.infer<typeof buildingEditSchema>;

interface Props {
  id: number;
  name: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
}

const DEFAULT_CENTER: [number, number] = [37.6173, 55.7558];
const DEFAULT_ZOOM = 10;

export const BuildingEditDialog = ({
  id,
  name,
  address,
  latitude,
  longitude,
}: Props) => {
  const [open, setOpen] = useState(false);
  const mapRef = useRef<MapRef>(null);

  const form = useForm<BuildingEditForm>({
    resolver: zodResolver(buildingEditSchema),
    defaultValues: { name, address },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const addressValue = useWatch({ control: form.control, name: 'address' });

  const {
    markerCoords,
    isGeocoding,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    isSearching,
    searchQuery,
    setSearchQuery,
    isAddressFocused,
    setIsAddressFocused,
    blurTimerRef,
    handleMapClick,
    handleSuggestionSelect,
    reset,
  } = useAddressMap({
    mapRef,
    onAddressConfirmed: (addr) =>
      form.setValue('address', addr, { shouldValidate: false }),
  });

  useEffect(() => {
    if (open) {
      form.reset({ name, address });
      reset({ lat: latitude, lng: longitude });
    }
  }, [open, name, address, latitude, longitude, form, reset]);

  const checkNameMutation = useCheckBuildingName();
  const editMutation = useEditBuilding();

  const onSubmit = form.handleSubmit(async (data) => {
    if (data.name !== name) {
      const nameExists = await checkNameMutation.mutateAsync(data.name);
      if (nameExists) {
        form.setError('name', {
          type: 'manual',
          message: 'Локация с таким названием уже существует',
        });
        return;
      }
    }

    const dto: BuildingEditDto = {
      name: data.name,
      address: data.address,
      latitude: markerCoords ? markerCoords[1] : null,
      longitude: markerCoords ? markerCoords[0] : null,
    };
    await editMutation.mutateAsync({ id, data: dto });
    setOpen(false);
  });

  const initialCenter: [number, number] =
    latitude != null && longitude != null
      ? [longitude, latitude]
      : DEFAULT_CENTER;
  const initialZoom = latitude != null && longitude != null ? 15 : DEFAULT_ZOOM;

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className={'h-8 w-8'}>
          <Pencil className={'w-4 h-4 text-muted-foreground'} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Изменить локацию</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-name">Название</Label>
            <Input
              id="edit-name"
              placeholder="Главный корпус"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <FormErrorMessage>
                {form.formState.errors.name.message}
              </FormErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-address">
              Адрес
              {(isGeocoding || isSearching) && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground font-normal">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {isGeocoding ? 'Определение адреса...' : 'Поиск...'}
                </span>
              )}
            </Label>
            <div className="relative">
              <Input
                id="edit-address"
                autoComplete="off"
                placeholder={
                  isAddressFocused
                    ? 'Введите адрес для поиска...'
                    : addressValue || 'Выберите адрес на карте или из списка'
                }
                value={isAddressFocused ? searchQuery : (addressValue ?? '')}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  setIsAddressFocused(true);
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  blurTimerRef.current = setTimeout(() => {
                    setIsAddressFocused(false);
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }, 150);
                }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full rounded-xl border border-[#E8E8E8] bg-white shadow-sm overflow-hidden">
                  {suggestions.map((s) => (
                    <li key={s.place_id}>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2.5 text-sm hover:bg-[#F7F5F0] transition-colors border-b border-[#E8E8E8] last:border-0 truncate"
                        onMouseDown={() => {
                          if (blurTimerRef.current)
                            clearTimeout(blurTimerRef.current);
                        }}
                        onClick={() => handleSuggestionSelect(s)}
                      >
                        {cleanAddress(s.display_name)}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {form.formState.errors.address && (
              <FormErrorMessage>
                {form.formState.errors.address.message}
              </FormErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Местоположение на карте
            </Label>
            <p className="text-xs text-muted-foreground">
              Кликните на карту или перетащите маркер — адрес заполнится
              автоматически
            </p>
            <div className="h-[200px] sm:h-[260px] rounded-xl overflow-hidden border border-[#E8E8E8]">
              {open && (
                <Map
                  ref={mapRef}
                  center={initialCenter}
                  zoom={initialZoom}
                  theme="light"
                >
                  <MapControls position="bottom-right" showZoom showCompass />
                  <MapLanguageRu />
                  <MapClickListener onMapClick={handleMapClick} />
                  {markerCoords && (
                    <DraggableMarker
                      coords={markerCoords}
                      onDragEnd={(lng, lat) => handleMapClick(lng, lat)}
                    />
                  )}
                </Map>
              )}
            </div>
            {markerCoords && (
              <p className="text-xs text-muted-foreground">
                {markerCoords[1].toFixed(5)}, {markerCoords[0].toFixed(5)}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={editMutation.isPending || checkNameMutation.isPending}
            >
              {(editMutation.isPending || checkNameMutation.isPending) && (
                <Spinner />
              )}
              {editMutation.isPending ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
