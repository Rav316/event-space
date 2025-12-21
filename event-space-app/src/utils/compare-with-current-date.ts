export const compareWithToday = (dateStr?: string) => {
  if(!dateStr) {
    return -1;
  }
  const [y, m, d] = dateStr.split('-').map(Number);

  const inputDate = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate > today) return 1;
  if (inputDate < today) return -1;
  return 0;
};
