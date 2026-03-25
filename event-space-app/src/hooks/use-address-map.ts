import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import type { MapRef } from '@/components/ui/map';
import {
  cleanAddress,
  reverseGeocode,
  searchAddresses,
  type Suggestion,
} from '@/utils/nominatim';

export type { Suggestion };

interface UseAddressMapOptions {
  mapRef: React.RefObject<MapRef | null>;
  onAddressConfirmed: (addr: string) => void;
}

export const useAddressMap = ({
  mapRef,
  onAddressConfirmed,
}: UseAddressMapOptions) => {
  const [markerCoords, setMarkerCoords] = useState<[number, number] | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddressFocused, setIsAddressFocused] = useState(false);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [debouncedSearch] = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 3) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    setIsSearching(true);

    searchAddresses(debouncedSearch).then((results) => {
      if (!cancelled) {
        setSuggestions(results);
        setIsSearching(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch]);

  const confirmAddress = useCallback(
    (addr: string) => {
      onAddressConfirmed(addr);
      setSearchQuery('');
      setIsAddressFocused(false);
      setSuggestions([]);
      setShowSuggestions(false);
    },
    [onAddressConfirmed],
  );

  const handleMapClick = useCallback(
    async (lng: number, lat: number) => {
      setMarkerCoords([lng, lat]);
      setIsGeocoding(true);
      const addr = await reverseGeocode(lat, lng);
      setIsGeocoding(false);
      if (addr) confirmAddress(addr);
    },
    [confirmAddress],
  );

  const handleSuggestionSelect = useCallback(
    (suggestion: Suggestion) => {
      const cleaned = cleanAddress(suggestion.display_name);
      const lng = parseFloat(suggestion.lon);
      const lat = parseFloat(suggestion.lat);

      confirmAddress(cleaned);
      setMarkerCoords([lng, lat]);
      mapRef.current?.flyTo({ center: [lng, lat], zoom: 16, duration: 800 });
    },
    [confirmAddress, mapRef],
  );

  const reset = useCallback(
    (opts?: { lat?: number | null; lng?: number | null }) => {
      setMarkerCoords(
        opts?.lat != null && opts?.lng != null ? [opts.lng, opts.lat] : null,
      );
      setSuggestions([]);
      setShowSuggestions(false);
      setSearchQuery('');
      setIsAddressFocused(false);
    },
    [],
  );

  return {
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
  };
};
