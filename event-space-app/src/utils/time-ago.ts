export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });

  const divisions: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'seconds'],
    [60, 'minutes'],
    [24, 'hours'],
    [7, 'days'],
    [4.34524, 'weeks'],
    [12, 'months'],
    [Number.POSITIVE_INFINITY, 'years'],
  ];

  let duration = diffInSeconds;
  for (let i = 0; i < divisions.length; i++) {
    const [amount, unit] = divisions[i];
    if (Math.abs(duration) < amount) {
      return rtf.format(-Math.round(duration), unit);
    }
    duration /= amount;
  }

  return 'давно';
};
