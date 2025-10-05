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
import {
  EventBadge,
  EventDescription,
  EventProgram,
  EventRegistrationBlock,
  EventShareBlock,
} from '@/components/shared';
import type { EventStep } from '@/api/events/model.ts';
import { EventOrganizerBlock } from '@/components/shared/event-organizer-block.tsx';

const steps: EventStep[] = [
  {
    id: 1,
    name: 'step 1',
    startTime: '10:00',
    endTime: '12:00',
    description:
      'description 1 description 1 description 1 description 1 description 1 description 1 description 1 description 1 description 1 description 1 description 1',
  },
  {
    id: 2,
    name: 'step 2',
    startTime: '12:00',
    endTime: '14:00',
    description:
      'description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 ',
  },
  {
    id: 3,
    name: 'step 3',
    startTime: '14:00',
    endTime: '16:00',
    description:
      'description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 ',
  },
  {
    id: 4,
    name: 'step 4',
    startTime: '16:00',
    endTime: '18:00',
    description:
      'description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 ',
  },
];

const EventPage = () => {
  return (
    <Wrapper className={'max-w-[1400px]'}>
      <div className={'flex flex-col gap-5 max-w-[1400px] mt-[20px]'}>
        <div>
          <Button variant={'outline'}>
            <ArrowLeft />
            <span>Назад</span>
          </Button>
        </div>
        <div className={'flex gap-5'}>
          <div className={'flex flex-col gap-5 flex-7'}>
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
            <EventDescription
              description={
                'Присоединяйтесь к самому масштабному хакатону года! AI Challenge 2024 - это уникальная возможность продемонстрировать свои навыки в области искусственного интеллекта и получить признание экспертов.\n' +
                '\n' +
                '🎯 Что вас ждет:\n' +
                '\n' +
                '• 48 часов интенсивной разработки\n' +
                '\n' +
                '• Менторинг от экспертов из ведущих IT-компаний\n' +
                '\n' +
                '• Доступ к современным AI-инструментам и API\n' +
                '\n' +
                '• Нетворкинг с единомышленниками\n' +
                '\n' +
                '• Призовой фонд 500,000 рублей\n' +
                '\n' +
                '📋 Требования:\n' +
                '\n' +
                '• Команды от 2 до 4 человек\n' +
                '\n' +
                '• Базовые знания Python/JavaScript\n' +
                '\n' +
                '• Понимание основ машинного обучения (желательно)\n' +
                '\n' +
                '• Собственный ноутбук\n' +
                '\n' +
                '🏆 Призы:\n' +
                '\n' +
                '1 место - 200,000 рублей + стажировка в Яндексе\n' +
                '\n' +
                '2 место - 150,000 рублей + сертификат от Microsoft\n' +
                '\n' +
                '3 место - 100,000 рублей + доступ к премиум-курсам\n' +
                '\n' +
                'Специальные номинации за инновационность и социальную значимость'
              }
            />
            <EventProgram steps={steps} />
          </div>
          <div className={'flex-3 flex flex-col gap-4'}>
            <EventRegistrationBlock registered={156} quantity={200} />
            <EventOrganizerBlock />
            <EventShareBlock />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EventPage;
