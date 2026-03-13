import { TextStyle, ViewStyle } from 'react-native';

export function categoryBadgeStyle(color = '#6366F1'): {
  badge: ViewStyle;
  text: TextStyle;
} {
  const hex = /^#[0-9A-Fa-f]{6}$/.test(color) ? color : '#6366F1';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // ~82% white + 18% color → solid pastel (≈ Tailwind -100)
  const bg = (c: number) => Math.round(255 * 0.82 + c * 0.18);
  const bgColor = `rgb(${bg(r)}, ${bg(g)}, ${bg(b)})`;

  return {
    badge: {
      backgroundColor: bgColor,
      borderColor: bgColor,
    },
    text: {
      color: hex,
    },
  };
}
