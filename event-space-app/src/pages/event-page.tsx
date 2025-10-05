import eventExample from '../assets/event-example.jpg';

import { Badge, Button } from '@/components/ui';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  QrCode,
  Share2,
  Users,
} from 'lucide-react';
import { Wrapper } from '@/components/hoc';
import { categoryColors } from '@/constants/category-colors.ts';
import { EventBadge } from '@/components/shared';

const EventPage = () => {
  return (
    <Wrapper>
      <div className={'flex flex-col gap-5 px-40'}>
        <div>
          <Button variant={'outline'}>
            <ArrowLeft />
            <span>Назад</span>
          </Button>
        </div>
        <div className={'flex gap-5'}>
          <div className={'flex flex-col gap-5 w-[70%]'}>
            <div className={'group relative rounded-2xl'}>
              <img
                className={'w-full object-cover h-[336px] rounded-2xl'}
                src={eventExample}
                alt={'event-example'}
              />
              <div className="absolute z-10 top-3 left-3">
                <Badge className={categoryColors[0]}>{'Спорт'}</Badge>
              </div>
              <div className={'absolute z-10 top-3 right-3 flex space-x-2'}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-100 transition-opacity"
                  onClick={(e) => e.preventDefault()}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-100 transition-opacity"
                  onClick={(e) => e.preventDefault()}
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <h3 className={'text-3xl font-bold'}>Хакатон AI Challenge 2025</h3>
            <div className={'flex items-center gap-2'}>
              <Badge variant={'outline'}>AI</Badge>
              <Badge variant={'outline'}>Машинное обучение</Badge>
              <Badge variant={'outline'}>Python</Badge>
              <Badge variant={'outline'}>JavaScript</Badge>
              <Badge variant={'outline'}>Хакатон</Badge>
            </div>
            <div className={'flex items-center gap-2 w-full'}>
              <EventBadge
                Icon={Calendar}
                text={'15 января 2024'}
                caption={'10:00 - 18:00'}
              />
              <EventBadge
                Icon={MapPin}
                text={'IT-корпус, аудитория 301'}
                caption={'IT-корпус'}
              />
              <EventBadge
                Icon={Users}
                text={'156/200'}
                caption={'участников'}
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EventPage;
