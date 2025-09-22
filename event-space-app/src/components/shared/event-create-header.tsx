import { Button } from '@/components/ui';
import { useNavigate } from 'react-router';
import { ArrowLeft, Eye, Save, Trash } from 'lucide-react';

export const EventCreateHeader = () => {
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
          className={'max-[630px]:hidden'}
        >
          <ArrowLeft />
          <span className={'max-[950px]:hidden'}>Назад</span>
        </Button>
        <div className={'flex flex-col w-full max-[570px]:items-center'}>
          <h1 className={'font-bold text-3xl max-[443px]:text-2xl'}>
            Создать мероприятие
          </h1>
          <p className={'text-muted-foreground max-[443px]:text-sm'}>
            Заполните информацию о вашем мероприятии
          </p>
        </div>
      </div>
      <div className={'flex items-center gap-2 max-[570px]:justify-center'}>
        <Button variant="outline" className="max-[455px]:flex-1">
          <Save className={'max-[400px]:hidden'} />
          <span className="max-[570px]:w-full hidden max-[570px]:block max-[445px]:text-xs min-[885px]:block">
            Сохранить
          </span>
        </Button>
        <Button variant="outline" className="max-[455px]:flex-1">
          <Eye className={'max-[400px]:hidden'} />
          <span className="max-[570px]:w-full hidden max-[570px]:block max-[445px]:text-xs min-[885px]:block">
            Предпросмотр
          </span>
        </Button>
        <Button variant="outline" className="max-[455px]:flex-1">
          <Trash className={'max-[400px]:hidden'} />
          <span className="max-[570px]:w-full hidden max-[570px]:block max-[445px]:text-xs min-[885px]:block">
            Очистить
          </span>
        </Button>
      </div>
    </div>
  );
};
