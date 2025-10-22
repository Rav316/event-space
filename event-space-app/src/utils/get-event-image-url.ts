export const getEventImageUrl = (name: string, imageUrl?: string) => {
  const staticUrl = import.meta.env.VITE_STATIC_URL;
  return imageUrl
    ? `${staticUrl}${imageUrl}`
    : `https://placehold.co/142?text=${name}`;
};
