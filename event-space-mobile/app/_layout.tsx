import '@/global.css';

import { Stack } from 'expo-router';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider } from '@react-navigation/native';
import { NAV_THEME } from '@/src/lib/theme';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/api/queryClient';
import { useMMKVString } from 'react-native-mmkv';
import { STORAGE_KEYS } from '@/src/storage/keys';
import { storage } from '@/src/storage/storage';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [accessToken] = useMMKVString(STORAGE_KEYS.ACCESS_TOKEN, storage);

  const isAuthenticated = !!accessToken;

  console.log('is authenticated? ', isAuthenticated);

  const activeScheme = (colorScheme ?? 'light').colorScheme!;
  return (
    <ThemeProvider value={NAV_THEME[activeScheme]}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style={activeScheme === 'dark' ? 'light' : 'dark'} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isAuthenticated}>
              <Stack.Screen name={'(app)'}/>
            </Stack.Protected>

            <Stack.Protected guard={!isAuthenticated}>
              <Stack.Screen name={'(auth)'}/>
            </Stack.Protected>
          </Stack>
          <PortalHost />
        </QueryClientProvider>
      </KeyboardProvider>
    </ThemeProvider>
  );
}
