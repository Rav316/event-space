import { ArrowRight, Calendar, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui';
import { HeroSectionCard } from '@/components/shared/hero-section-card.tsx';

export const HeroSection = () => {
  return (
    <div className={'flex flex-col items-center gap-y-5'}>
      <div
        className={
          'px-5 max-w-[600px] py-2.5 bg-white rounded-3xl flex justify-center items-center gap-2 border border-[#E5E5E5]'
        }
      >
        <Sparkles />
        <span className={'font-medium text-center'}>
          Новая платформа для студенческих мероприятий
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 bg-clip-text text-transparent">
        EventSpace
      </h1>
      <p className={'max-w-[600px] text-center text-[#717182] text-lg'}>
        Открывайте, создавайте и участвуйте в студенческих мероприятиях. Система
        афиши нового поколения для активной студенческой жизни.
      </p>

      <div
        className={
          'flex gap-x-3 w-auto justify-center max-[440px]:flex-col max-[440px]:gap-y-3 max-[440px]:w-full'
        }
      >
        <Button className={'group h-[40px] max-[440px]:w-full'}>
          Создать мероприятие
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-[3px] transition-transform" />
        </Button>
        <Button variant={'outline'} className={'h-[40px] max-[440px]:w-full'}>
          Обзор мероприятий
        </Button>
      </div>

      <div
        className={
          'flex gap-x-5 items-center max-w-[800px] max-[599px]:flex-col max-[599px]:gap-y-6'
        }
      >
        <HeroSectionCard
          Icon={Calendar}
          title={'Простое планирование'}
          description={
            'Создавайте мероприятия за считанные минуты с интуитивным интерфейсом'
          }
        />
        <HeroSectionCard
          Icon={Users}
          title={'QR-регистрация'}
          description={
            'Мгновенная регистрация участников через QR-коды и push-уведомления'
          }
        />

        <HeroSectionCard
          Icon={Sparkles}
          title={'Аналитика'}
          description={
            'Детальная статистика и отчеты для повышения эффективности мероприятий'
          }
        />
      </div>
    </div>
  );
};
