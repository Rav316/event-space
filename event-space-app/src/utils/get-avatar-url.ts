export const getAvatarUrl = (avatarUrl?: string | null | false) => {
  const staticContentUrl = import.meta.env.VITE_STATIC_URL;
  return avatarUrl
    ? /^https?:\/\//i.test(avatarUrl)
      ? avatarUrl
      : `${staticContentUrl}${avatarUrl}`
    : false;
};
