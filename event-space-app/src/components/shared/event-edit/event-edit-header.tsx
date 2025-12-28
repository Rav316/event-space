import { useNavigate } from 'react-router';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

export const EventEditHeader = () => {
  const navigate = useNavigate();

  return (
    <div
      className={
        'flex min-[570px]:items-center justify-between gap-4 max-[570px]:flex-col'
      }
    >
      <div className={'flex items-center gap-8'}>
        <Button
          onClick={() => navigate(-1)}
          variant={'outline'}
          className={'max-[550px]:hidden'}
        >
          <ArrowLeft />
          <span>Назад</span>
        </Button>
        <div className={'flex flex-col w-full'}>
          <h1 className={'font-bold text-3xl max-[443px]:text-2xl'}>
            Изменить мероприятие
          </h1>
          <p className={'text-muted-foreground max-[443px]:text-sm '}>
            Заполните информацию о вашем мероприятии
          </p>
        </div>
      </div>
    </div>
  );
};
