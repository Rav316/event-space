export const getPlaceholderImageUrl = (name: string, maxLength = 20) => {
  const placeholderUrl = import.meta.env.VITE_PLACEHOLDER_URL;
  const text = name.length > maxLength ? name.slice(0, maxLength).trimEnd() + '…' : name;
  return `${placeholderUrl}/?text=${encodeURIComponent(text)}`;
};
