import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { EventListPreviewDto } from '@/src/api/events/models';
import { EventListItem } from '@/src/components/shared/event/event-list-item';

interface Props {
  event: EventListPreviewDto;
}

export const AnimatedEventListItem: React.FC<Props> = ({ event }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            })
          }
        ]
      }}
    >
      <EventListItem event={event} />
    </Animated.View>
  );
};