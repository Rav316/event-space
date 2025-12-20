import { Tabs, useRouter } from 'expo-router';
import { House, QrCode, User } from 'lucide-react-native';
import { useIconColor } from '@/src/hooks/use-icon-color';
import { Pressable, View, useColorScheme } from 'react-native';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@/src/lib/utils';

type ScanButtonProps = BottomTabBarButtonProps & {
  children: React.ReactNode;
  isDark: boolean;
};

const ScanButton = ({ onPress, isDark }: ScanButtonProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={onPress}
        className={cn(
          'w-[58px] h-[58px] rounded-full  flex justify-center items-center absolute -top-[29px] border',
          isDark ? 'bg-white' : 'bg-black'
        )}
      >
        <QrCode color={isDark ? '#000000' : '#FFFFFF'} />
      </Pressable>
    </View>
  );
};

const TabLayout = () => {
  const iconColor = useIconColor();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: iconColor,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom,
          overflow: 'visible',
          borderTopWidth: 0.5,
          borderTopColor: isDark ? '#333' : '#ccc'
        },
        tabBarItemStyle: {
          paddingTop: 10
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => <House color={color} />
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: 'Сканирование',
          tabBarIcon: () => <View />,
          tabBarButton: (props) => <ScanButton isDark={isDark} {...props} />,
          tabBarLabel: () => null,
          tabBarItemStyle: { paddingTop: 0 }
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();

            router.push('/qr-scan');
          }
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <User color={color} />
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
