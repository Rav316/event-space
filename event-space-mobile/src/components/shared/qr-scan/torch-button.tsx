import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { Flashlight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface Props {
  onToggle: () => void;
  isActive: boolean;
}

export const TorchButton: React.FC<Props> = ({ onToggle, isActive }) => {
  const anim = useSharedValue(isActive ? 1 : 0);

  const onPress = async () => {
    onToggle();
    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Medium
    )
  }

  useEffect(() => {
    anim.value = withTiming(isActive ? 1 : 0, { duration: 220 });
  }, [anim, isActive]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      anim.value,
      [0, 1],
      ['rgba(0,0,0,0.6)', 'rgba(255, 255, 255, 0.8)']
    ),
  }));

  const whiteIconStyle = useAnimatedStyle(() => ({
    opacity: 1 - anim.value,
    transform: [{ scale: 1 - anim.value * 0.2 }],
  }));

  const blackIconStyle = useAnimatedStyle(() => ({
    opacity: anim.value,
    transform: [{ scale: 0.8 + anim.value * 0.2 }],
  }));

  return (
    <Animated.View
      style={[
        animatedContainerStyle,
        {
          width: 56,
          height: 56,
          borderRadius: 999,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        className="w-full h-full items-center justify-center relative"
      >
        <Animated.View style={[whiteIconStyle, { position: 'absolute' }]}>
          <Flashlight color="white" size={24} />
        </Animated.View>

        <Animated.View style={[blackIconStyle]}>
          <Flashlight color="black" size={24} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};