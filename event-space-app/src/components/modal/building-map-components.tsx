import { useEffect } from 'react';
import type { LayerSpecification, MapMouseEvent } from 'maplibre-gl';
import { MapMarker, MarkerContent, useMap } from '@/components/ui/map';


export const MapLanguageRu = () => {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const style = map.getStyle();
    if (!style?.layers) return;

    style.layers.forEach((layer: LayerSpecification) => {
      if (layer.type === 'symbol' && layer.layout?.['text-field']) {
        map.setLayoutProperty(layer.id, 'text-field', [
          'coalesce',
          ['get', 'name:ru'],
          ['get', 'name'],
        ]);
      }
    });
  }, [map, isLoaded]);

  return null;
};

export const MapClickListener = ({
  onMapClick,
}: {
  onMapClick: (lng: number, lat: number) => void;
}) => {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const handleClick = (e: MapMouseEvent) => {
      onMapClick(e.lngLat.lng, e.lngLat.lat);
    };

    map.on('click', handleClick);
    return () => { map.off('click', handleClick); };
  }, [map, isLoaded, onMapClick]);

  return null;
};

export const DraggableMarker = ({
  coords,
  onDragEnd,
}: {
  coords: [number, number];
  onDragEnd: (lng: number, lat: number) => void;
}) => (
  <MapMarker
    longitude={coords[0]}
    latitude={coords[1]}
    draggable
    onDragEnd={({ lng, lat }) => onDragEnd(lng, lat)}
  >
    <MarkerContent>
      <div className="size-4 rounded-full bg-foreground border-2 border-white shadow-lg cursor-grab" />
    </MarkerContent>
  </MapMarker>
);
