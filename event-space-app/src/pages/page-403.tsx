import { ArrowLeft, House, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui';
import { Link, useNavigate } from 'react-router';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';

const Page403 = () => {
  const navigate = useNavigate();
  const setAuthModalOpen = useAuthModalStore((state) => state.setIsOpen);

  return (
    <div
      className={
        'flex flex-col justify-center items-center gap-y-5 h-[calc(100vh-100px)]'
      }
    >
      <div className="p-6 bg-destructive/10 rounded-full">
        <Shield className="h-16 w-16 text-destructive" />
      </div>
      <h1 className={'text-5xl font-bold text-[#E3E3E6]'}>403</h1>
      <span className={'text-3xl font-medium text-center'}>
        Доступ запрещён
      </span>
      <p className={'text-muted-foreground text-lg text-center'}>
        У вас недостаточно прав для просмотра этой страницы
      </p>
      <div
        className={
          'flex flex-col items-center p-5 border border-[#E5E5E5] rounded-2xl w-full max-w-[600px] gap-y-3'
        }
      >
        <div className={'flex items-center gap-2'}>
          <Lock className={'text-muted-foreground'} />
          <span className={'font-medium'}>Возможные причины</span>
        </div>
        <ul className={'list-disc pl-5'}>
          <li className={'text-muted-foreground'}>
            Страница доступна только администраторам
          </li>
          <li className={'text-muted-foreground'}>
            Страница доступна только авторизованным пользователям
          </li>
          <li className={'text-muted-foreground'}>
            Ваш аккаунт заблокирован или удалён
          </li>
        </ul>
      </div>
      <div
        className={
          'flex flex-col items-center p-5 border border-[#E5E5E5] bg-[#F4F2F7] rounded-2xl w-full max-w-[600px] gap-y-3'
        }
      >
        <span className={'font-medium'}>Что можно сделать?</span>
        <ul className={'list-disc pl-5'}>
          <li className={'text-muted-foreground'}>
            Войдите в систему под учётной записью с необходимыми правами
          </li>
          <li className={'text-muted-foreground'}>
            Убедитесь, что вы вошли в систему
          </li>
          <li className={'text-muted-foreground'}>
            Проверьте, что вы используете правильную учётную запись
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
        <Button
          className={'h-[40px]'}
          variant={'outline'}
          onClick={() => setAuthModalOpen(true)}
        >
          <Shield />
          Войти в систему
        </Button>
      </div>
    </div>
  );
};

export default Page403;
