export const getEventImageUrl = (imageUrl: string) => {
  const staticUrl = process.env.EXPO_PUBLIC_STATIC_URL;
  return imageUrl
    ? `${staticUrl}${imageUrl}` : undefined
};
