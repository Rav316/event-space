export const getEventImageUrl = (imageUrl: string) => {
  const staticUrl = process.env.EXPO_PUBLIC_STATIC_URL;
  if (!imageUrl) return undefined;
  return /^https?:\/\//i.test(imageUrl) ? imageUrl : `${staticUrl}${imageUrl}`;
};
