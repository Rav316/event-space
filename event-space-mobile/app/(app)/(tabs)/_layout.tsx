import { Tabs } from 'expo-router';
import { House, QrCode, Settings } from 'lucide-react-native';
import { useIconColor } from '@/src/hooks/use-icon-color';
import { Pressable, View, useColorScheme } from 'react-native';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';

type ScanButtonProps = BottomTabBarButtonProps & {
  children: React.ReactNode;
};

const ScanButton = ({ children, onPress }: ScanButtonProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={onPress}
        className="w-[58px] h-[58px] rounded-full bg-black dark:bg-white  flex justify-center items-center absolute -top-[29px]"
      >
        {children}
      </Pressable>
    </View>
  );
};

const TabLayout = () => {
  const iconColor = useIconColor();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const scanIconColor = isDark ? '#000000' : '#FFFFFF';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: iconColor,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 65,
          overflow: 'visible',
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
          borderTopWidth: 0.5,
          borderTopColor: isDark ? '#333' : '#ccc',
        }
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
          tabBarIcon: () => <QrCode color={scanIconColor} />,
          tabBarButton: (props) => <ScanButton {...props} />,
          tabBarLabel: () => null
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color }) => <Settings color={color} />
        }}
      />
    </Tabs>
  );
};

export default TabLayout;