import { Button } from '@/components/ui';
import { ArrowLeft, House, Search } from 'lucide-react';
import { Wrapper } from '@/components/hoc';
import { Link, useNavigate } from 'react-router';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div
        className={
          'flex flex-col justify-center items-center gap-y-5 h-[calc(100vh-100px)]'
        }
      >
        <h1 className={'text-9xl font-bold text-[#E3E3E6]'}>404</h1>
        <span className={'text-3xl font-medium text-center'}>
          Страница не найдена
        </span>
        <p className={'text-muted-foreground text-lg text-center'}>
          К сожалению, запрашиваемая страница не существует или была перемещена
        </p>
        <div
          className={
            'flex flex-col items-center p-5 border border-[#E5E5E5] rounded-2xl w-full max-w-[600px] gap-y-3'
          }
        >
          <span className={'font-medium'}>Что можно сделать?</span>
          <ul className={'list-disc pl-5'}>
            <li className={'text-muted-foreground'}>
              Проверьте правильность URL-адреса
            </li>
            <li className={'text-muted-foreground'}>
              Вернитесь на главную страницу
            </li>
            <li className={'text-muted-foreground'}>
              Используйте навигационное меню
            </li>
          </ul>
        </div>
        <div
          className={
            'flex gap-3 max-[499px]:flex-col max-[499px] max-[499px]:w-full'
          }
        >
          <Button
            className={'h-[40px]'}
            variant={'outline'}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
            Назад
          </Button>
          <Link to={'/'}>
            <Button className={'h-[40px]'}>
              <House />
              На главную
            </Button>
          </Link>
          <Button className={'h-[40px]'} variant={'outline'}>
            <Search />
            Найти мероприятия
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Page404;
