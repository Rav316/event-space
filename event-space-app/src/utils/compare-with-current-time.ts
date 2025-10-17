export const compareWithCurrentTime = (
  dateStr: string,
  timeStr: string,
): number => {
  const target = new Date(`${dateStr}T${timeStr}`);
  const now = new Date();

  if (now.getTime() > target.getTime()) return 1;
  if (now.getTime() < target.getTime()) return -1;
  return 0;
};
