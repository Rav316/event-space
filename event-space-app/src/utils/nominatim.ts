export interface Suggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

const COUNTRY_NAMES = new Set([
  'россия',
  'russia',
  'российская федерация',
  'рф',
]);

export const cleanAddress = (displayName: string): string =>
  displayName
    .split(', ')
    .filter((part) => {
      const trimmed = part.trim();
      if (/^\d+$/.test(trimmed)) return false;
      return !COUNTRY_NAMES.has(trimmed.toLowerCase());
    })
    .join(', ') || displayName;

export const reverseGeocode = async (
  lat: number,
  lng: number,
): Promise<string | null> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );
    const data = await res.json();
    if (!data.display_name) return null;
    return cleanAddress(data.display_name);
  } catch {
    return null;
  }
};

export const searchAddresses = async (query: string): Promise<Suggestion[]> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=0`,
    );
    return await res.json();
  } catch {
    return [];
  }
};
