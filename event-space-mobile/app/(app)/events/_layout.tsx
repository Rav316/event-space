import { NAV_THEME } from '@/src/lib/theme';
import { Icon } from '@/src/components/ui/icon';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, useColorScheme } from 'react-native';

export default function EventsLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const { colors } = NAV_THEME[colorScheme];
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerShadowVisible: true,
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <Pressable
              onPress={() => router.back()}
              style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon as={ArrowLeft} size={24} style={{ color: colors.text }} />
            </Pressable>
          ) : null,
      }}
    />
  );
}
