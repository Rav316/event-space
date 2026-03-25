import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useBuildings } from '@/api/buildings/hooks.ts';
import {
  Map,
  MapControls,
  MapMarker,
  MapPopup,
  MarkerContent,
  useMap,
  type MapRef,
} from '@/components/ui/map';
import type { Building } from '@/api/buildings/model.ts';
import type { LayerSpecification } from 'maplibre-gl';

interface Props {
  className?: string;
}

function MapLanguageRu() {
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
}

function MapFitBounds({ buildings }: { buildings: Building[] }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded || buildings.length === 0) return;

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
      { padding: 80, maxZoom: 15, duration: 0 },
    );
  }, [map, isLoaded, buildings]);

  return null;
}

export const VenuesMapSection: React.FC<Props> = ({ className }) => {
  const { data: buildings, isPending } = useBuildings();
  const mapRef = useRef<MapRef>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const withCoords = (buildings ?? []).filter(
    (b) => b.latitude != null && b.longitude != null,
  );

  const selectedBuilding = withCoords.find((b) => b.id === selectedId) ?? null;

  if (!isPending && withCoords.length === 0) return null;

  const defaultCenter: [number, number] =
    withCoords.length > 0
      ? [withCoords[0].longitude!, withCoords[0].latitude!]
      : [37.6173, 55.7558];

  const handleLegendClick = (building: Building) => {
    setSelectedId(building.id);
    mapRef.current?.flyTo({
      center: [building.longitude!, building.latitude!],
      zoom: 16,
      duration: 800,
    });
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <MapPin className="text-muted-foreground" />
        <div className="flex flex-col gap-y-1">
          <span className="font-medium text-2xl">Площадки на карте</span>
          <span className="text-muted-foreground">
            Все места проведения мероприятий
          </span>
        </div>
      </div>

      <div className="flex gap-4 h-[420px]">
        {/* Legend */}
        <div className="w-56 shrink-0 flex flex-col border border-[#E8E8E8] rounded-2xl overflow-hidden">
          <div className="px-3 py-2.5 border-b border-[#E8E8E8]">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Локации · {withCoords.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isPending
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="px-3 py-3 border-b border-[#E8E8E8] last:border-0">
                    <div className="h-3.5 w-3/4 rounded bg-[#E8E8E8] animate-pulse mb-1.5" />
                    <div className="h-2.5 w-full rounded bg-[#E8E8E8] animate-pulse" />
                  </div>
                ))
              : withCoords.map((building) => {
                  const isActive = building.id === selectedId;
                  return (
                    <button
                      key={building.id}
                      type="button"
                      onClick={() => handleLegendClick(building)}
                      className={`w-full text-left px-3 py-3 border-b border-[#E8E8E8] last:border-0 transition-colors duration-150 flex items-start gap-2 ${
                        isActive ? 'bg-[#F7F5F0]' : 'hover:bg-[#F7F5F0]'
                      }`}
                    >
                      <span
                        className={`mt-1 size-2 rounded-full shrink-0 transition-colors ${
                          isActive ? 'bg-foreground' : 'bg-[#C8C8C8]'
                        }`}
                      />
                      <div className="min-w-0">
                        <p
                          className={`text-sm leading-snug truncate ${
                            isActive ? 'font-medium' : 'text-foreground'
                          }`}
                        >
                          {building.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {building.address}
                        </p>
                      </div>
                    </button>
                  );
                })}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-[#E8E8E8]">
          {!isPending && (
            <Map ref={mapRef} center={defaultCenter} zoom={11} theme="light">
              <MapControls position="bottom-right" showZoom showCompass />
              <MapLanguageRu />
              <MapFitBounds buildings={withCoords} />
              {withCoords.map((building) => (
                <MapMarker
                  key={building.id}
                  longitude={building.longitude!}
                  latitude={building.latitude!}
                  onClick={() => setSelectedId(building.id)}
                >
                  <MarkerContent>
                    <div
                      className={`size-4 rounded-full border-2 border-white shadow-lg cursor-pointer transition-colors ${
                        building.id === selectedId
                          ? 'bg-foreground scale-125'
                          : 'bg-[#888]'
                      }`}
                    />
                  </MarkerContent>
                </MapMarker>
              ))}
              {selectedBuilding && (
                <MapPopup
                  longitude={selectedBuilding.longitude!}
                  latitude={selectedBuilding.latitude!}
                  onClose={() => setSelectedId(null)}
                  closeButton
                  focusAfterOpen={false}
                  closeOnClick={false}
                  className="w-56"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      {selectedBuilding.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {selectedBuilding.address}
                    </p>
                  </div>
                </MapPopup>
              )}
            </Map>
          )}
        </div>
      </div>
    </motion.div>
  );
};
