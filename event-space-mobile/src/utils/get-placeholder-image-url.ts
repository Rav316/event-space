export const getPlaceholderImageUrl = (name: string) => {
  const placeholderUrl = process.env.EXPO_PUBLIC_PLACEHOLDER_URL;
  return `${placeholderUrl}/?text=${name}`;
}