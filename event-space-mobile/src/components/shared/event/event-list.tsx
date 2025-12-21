import { FlatList, View } from 'react-native';
import { EventListItem } from '@/src/components/shared/event/event-list-item';
import { EventSearch } from '@/src/components/shared/event/event-search';
import { useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { EventFilters } from '@/src/components/shared/event/event-filters';

export interface IEvent {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  imageUrl: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  space: {
    id: number;
    name: string;
    capacity: number;
    building: {
      id: number;
      name: string;
      address: string;
    };
  };
}

const events: IEvent[] = [
  {
    id: 1,
    name: 'Summer Rooftop Mixer',
    category: {
      id: 1,
      name: 'Спортивные'
    },
    imageUrl: '/events/e2464b4b-566f-4b73-a6ca-e6fe9f4e5607.jpg',
    eventDate: '2026-01-12',
    startTime: '19:00',
    endTime: '22:00',
    space: {
      id: 1,
      name: 'Танцпол',
      capacity: 500,
      building: {
        id: 1,
        name: 'крыша',
        address: 'г. Москва, ул. Пушкинская, д. 1'
      }
    }
  },
  {
    id: 2,
    name: 'Community 5K Run',
    category: {
      id: 2,
      name: 'Культурные'
    },
    imageUrl: '/events/e2464b4b-566f-4b73-a6ca-e6fe9f4e5607.jpg',
    eventDate: '2026-01-12',
    startTime: '19:00',
    endTime: '22:00',
    space: {
      id: 1,
      name: 'Беговой маршрут',
      capacity: 500,
      building: {
        id: 1,
        name: 'крыша',
        address: 'г Санкт-Петербург, ул. Пушкинская, д. 1'
      }
    }
  },
  {
    id: 3,
    name: 'Tech Innovators Summit',
    category: {
      id: 5,
      name: 'Учебные'
    },
    imageUrl: '/events/e2464b4b-566f-4b73-a6ca-e6fe9f4e5607.jpg',
    eventDate: '2026-01-12',
    startTime: '19:00',
    endTime: '22:00',
    space: {
      id: 1,
      name: 'Конференц-зал',
      capacity: 500,
      building: {
        id: 1,
        name: 'первый корпус ВУЗа',
        address: 'г. Москва, ул. Ломоносова, д.5'
      }
    }
  },
  {
    id: 4,
    name: 'Summer Rooftop Mixer',
    category: {
      id: 1,
      name: 'Спортивные'
    },
    imageUrl: '/events/e2464b4b-566f-4b73-a6ca-e6fe9f4e5607.jpg',
    eventDate: '2026-01-12',
    startTime: '19:00',
    endTime: '22:00',
    space: {
      id: 1,
      name: 'Танцпол',
      capacity: 500,
      building: {
        id: 1,
        name: 'крыша',
        address: 'г. Москва, ул. Пушкинская, д. 1'
      }
    }
  },
  {
    id: 5,
    name: 'Community 5K Run',
    category: {
      id: 2,
      name: 'Культурные'
    },
    imageUrl: '/events/e2464b4b-566f-4b73-a6ca-e6fe9f4e5607.jpg',
    eventDate: '2026-01-12',
    startTime: '19:00',
    endTime: '22:00',
    space: {
      id: 1,
      name: 'Беговой маршрут',
      capacity: 500,
      building: {
        id: 1,
        name: 'крыша',
        address: 'г Санкт-Петербург, ул. Пушкинская, д. 1'
      }
    }
  },
  {
    id: 6,
    name: 'Tech Innovators Summit',
    category: {
      id: 5,
      name: 'Учебные'
    },
    imageUrl: '/events/e2464b4b-566f-4b73-a6ca-e6fe9f4e5607.jpg',
    eventDate: '2026-01-12',
    startTime: '19:00',
    endTime: '22:00',
    space: {
      id: 1,
      name: 'Конференц-зал',
      capacity: 500,
      building: {
        id: 1,
        name: 'первый корпус ВУЗа',
        address: 'г. Москва, ул. Ломоносова, д.5'
      }
    }
  },
  {
    id: 7,
    name: 'Summer Rooftop Mixer',
    category: {
      id: 1,
      name: 'Спортивные'
    },
    imageUrl: '/events/e2464b4b-566f-4b73-a6ca-e6fe9f4e5607.jpg',
    eventDate: '2026-01-12',
    startTime: '19:00',
    endTime: '22:00',
    space: {
      id: 1,
      name: 'Танцпол',
      capacity: 500,
      building: {
        id: 1,
        name: 'крыша',
        address: 'г. Москва, ул. Пушкинская, д. 1'
      }
    }
  },
  {
    id: 8,
    name: 'Community 5K Run',
    category: {
      id: 2,
      name: 'Культурные'
    },
    imageUrl: '/events/e2464b4b-566f-4b73-a6ca-e6fe9f4e5607.jpg',
    eventDate: '2026-01-12',
    startTime: '19:00',
    endTime: '22:00',
    space: {
      id: 1,
      name: 'Беговой маршрут',
      capacity: 500,
      building: {
        id: 1,
        name: 'крыша',
        address: 'г Санкт-Петербург, ул. Пушкинская, д. 1'
      }
    }
  },
  {
    id: 9,
    name: 'Tech Innovators Summit',
    category: {
      id: 5,
      name: 'Учебные'
    },
    imageUrl: '/events/e2464b4b-566f-4b73-a6ca-e6fe9f4e5607.jpg',
    eventDate: '2026-01-12',
    startTime: '19:00',
    endTime: '22:00',
    space: {
      id: 1,
      name: 'Конференц-зал',
      capacity: 500,
      building: {
        id: 1,
        name: 'первый корпус ВУЗа',
        address: 'г. Москва, ул. Ломоносова, д.5'
      }
    }
  }
];

export const EventList = () => {
  const listRef = useRef<FlatList>(null);

  useScrollToTop(listRef);

  return (
    <FlatList
      ref={listRef}
      data={events}
      renderItem={({ item }) => <EventListItem event={item} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View className={'h-3'} />}
      ListHeaderComponent={
        <View className={'gap-4'}>
          <EventSearch />
          <EventFilters />
        </View>
      }
      ListHeaderComponentStyle={{ marginBottom: 24 }}
      contentContainerClassName="pb-10"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};
