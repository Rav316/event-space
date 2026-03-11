import { UserAvatar } from '@/components/shared';
import { Badge } from '@/components/ui';

export const LastUsersBlock = () => {
  const lastUsers = [
    {
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROHxYft1f_Ln_y_scKnh8-g5rLMmce7JKyPQ&s',
      firstName: 'Иван',
      lastName: 'Иванов',
      status: 'Активен',
    },
    {
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROHxYft1f_Ln_y_scKnh8-g5rLMmce7JKyPQ&s',
      firstName: 'Иван',
      lastName: 'Иванов',
      status: 'Активен',
    },
    {
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROHxYft1f_Ln_y_scKnh8-g5rLMmce7JKyPQ&s',
      firstName: 'Иван',
      lastName: 'Иванов',
      status: 'Активен',
    }
  ];

  return (
    <div className={'border border-[#E5E5E5] rounded-2xl p-3 w-full flex flex-col gap-2'}>
      <span className={'font-medium'}>Последние пользователи</span>
      <div className={'flex flex-col flex-1 gap-2'}>
        {lastUsers.map((user, index) => (
          <div className={'flex justify-between items-center'} key={index}>
            <div className={'flex gap-2 items-center'}>
              <UserAvatar
                firstName={user.firstName}
                lastName={user.lastName}
                avatarUrl={user.avatar}
              />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <Badge variant={'outline'}>{user.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}