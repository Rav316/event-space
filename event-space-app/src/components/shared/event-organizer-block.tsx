import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';

export const EventOrganizerBlock = () => {
  return (
    <div
      className={'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5'}
    >
      <span className={'font-medium text-xl'}>Организатор</span>
      <div className={'flex items-center gap-3'}>
        <Avatar className={'h-12 w-12'}>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/118563959?v=4"
            alt="avatar"
          />
          <AvatarFallback>ИИ</AvatarFallback>
        </Avatar>
        <div className={'flex flex-col gap-0.5'}>
          <span className={'font-medium text-lg'}>Иванов Иван Иванович</span>
          <span className={'text-muted-foreground'}>Участник</span>
        </div>
      </div>
    </div>
  );
};
