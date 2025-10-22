export const getEventImageUrl = (name: string, imageUrl?: string) => {
  const staticUrl = import.meta.env.VITE_STATIC_URL;
  const placeholderUrl = import.meta.env.VITE_PLACEHOLDER_URL;
  return imageUrl
    ? `${staticUrl}${imageUrl}`
    : `${placeholderUrl}/?text=${name}`;
};
