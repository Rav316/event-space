export const getAvatarUrl = (avatarUrl: string | null) => {
  const staticContentUrl = import.meta.env.VITE_STATIC_URL;
  return avatarUrl ? `${staticContentUrl}${avatarUrl}` : false;
}