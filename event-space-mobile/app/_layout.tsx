import '@/global.css';

import { Stack } from 'expo-router';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider } from '@react-navigation/native';
import { NAV_THEME } from '@/src/lib/theme';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const activeScheme = (colorScheme ?? 'light').colorScheme!;
  return (
    <ThemeProvider value={NAV_THEME[activeScheme]}>
      <StatusBar style={activeScheme === 'dark' ? 'light' : 'dark'} />
      <Stack />
      <PortalHost />
    </ThemeProvider>
  );
}
