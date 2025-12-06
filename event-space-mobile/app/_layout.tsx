import '@/global.css';

import { queryClient } from '@/src/api/queryClient';
import { NAV_THEME } from '@/src/lib/theme';
import { STORAGE_KEYS } from '@/src/storage/keys';
import { storage } from '@/src/storage/storage';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useMMKVString } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [accessToken] = useMMKVString(STORAGE_KEYS.ACCESS_TOKEN, storage);

  const isAuthenticated = !!accessToken;

  console.log('is authenticated? ', isAuthenticated);

  const activeScheme = (colorScheme ?? 'light').colorScheme!;
  return (
    <ThemeProvider value={NAV_THEME[activeScheme]}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
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
            </GestureHandlerRootView>
          </QueryClientProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
