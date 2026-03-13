export const getPlaceholderImageUrl = (name: string) => {
  const placeholderUrl = import.meta.env.VITE_PLACEHOLDER_URL;
  return `${placeholderUrl}/?text=${name}`;
};
