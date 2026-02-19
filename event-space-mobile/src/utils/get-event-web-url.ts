export const getEventWebUrl = (eventId: number) => {
  const webUrl = process.env.EXPO_PUBLIC_WEB_URL;
  return `${webUrl}/events/${eventId}`;
};
