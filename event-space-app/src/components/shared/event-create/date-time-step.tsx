import { Input, Label } from '@/components/ui';

export const DateTimeStep = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex items-center gap-4 w-full max-[530px]:flex-col'}>
        <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
          <Label htmlFor={'start-date'}>
            Дата проведения <span className={'text-red-500'}>*</span>
          </Label>
          <Input id={'start-date'} type={'date'} max={'2099-12-31'} />
        </div>
        <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
          <Label htmlFor={'start-time'}>
            Время начала <span className={'text-red-500'}>*</span>
          </Label>
          <Input id={'start-time'} type={'time'} />
        </div>
        <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
          <Label htmlFor={'end-time'}>
            Время окончания <span className={'text-red-500'}>*</span>
          </Label>
          <Input id={'end-time'} type={'time'} />
        </div>
      </div>
      <div className={'flex flex-col gap-1'}>
        <Label>Дедлайн регистрации</Label>
        <Input type={'date'} max={'2099-12-31'} />
      </div>
    </div>
  );
};
