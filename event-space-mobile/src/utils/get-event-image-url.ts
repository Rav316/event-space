export const getEventImageUrl = (name: string, imageUrl?: string) => {
  const staticUrl = process.env.EXPO_PUBLIC_STATIC_URL;
  const placeholderUrl = process.env.EXPO_PUBLIC_PLACEHOLDER_URL;
  return imageUrl
    ? `${staticUrl}${imageUrl}`
    : `${placeholderUrl}/?text=${name}`;
};
