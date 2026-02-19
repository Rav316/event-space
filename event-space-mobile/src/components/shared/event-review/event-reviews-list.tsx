import { View } from 'react-native';
import { EventReview } from '@/src/components/shared/event-review/event-review';

export const EventReviewsList = () => {
  return (
    <View className={'gap-2'}>
      <EventReview/>
      <EventReview/>
      <EventReview/>
    </View>
  )
}