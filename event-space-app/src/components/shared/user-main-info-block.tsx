import { Avatar, AvatarImage, Badge, Separator } from '@/components/ui';

export const UserMainInfoBlock = () => {
  return (
    <div className={'flex flex-col items-center gap-3 border border-[#E5E5E5] rounded-2xl p-5'}>
      <Avatar className={'w-24 h-24'}>
        <AvatarImage src={'https://avatars.githubusercontent.com/u/118563959?v=4'}/>
      </Avatar>
      <div className={'flex flex-col items-center gap-0.5'}>
        <span className={'font-medium text-xl'}>Иванов Иван Иванович</span>
        <span className={'text-muted-foreground'}>test@test.test</span>
      </div>
      <Badge variant={'outline'}>Участник</Badge>
      <Separator/>
      <div className={'flex justify-between w-full'}>
        <span className={'text-muted-foreground'}>Факультет</span>
        <span className={'font-medium'}>Информационные технологии</span>
      </div>
      <div className={'flex justify-between w-full'}>
        <span className={'text-muted-foreground'}>Курс</span>
        <span className={'font-medium'}>3</span>
      </div>
      <Separator/>
      <span className={'text-muted-foreground text-center text-sm'}>Дата регистрации: 15.01.2024</span>
    </div>
  )
}