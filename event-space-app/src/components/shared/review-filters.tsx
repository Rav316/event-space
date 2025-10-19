import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

export const ReviewFilters = () => {
  return (
    <div className={'flex gap-2 justify-between items-center max-[625px]:flex-col max-[625px]:items-start'}>
      <div className={'flex items-center gap-2 max-[430px]:w-full max-[370px]:flex-col'}>
        <Select defaultValue='Все оценки'>
          <SelectTrigger className='max-[370px]:w-full min-[370px]:max-[430px]:flex-1'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['Все оценки', '5 звёзд', '4 звезды', '3 звезды', '2 звезды', '1 звёзда'].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue='Новые'>
          <SelectTrigger className='max-[370px]:w-full min-[370px]:max-[430px]:flex-1'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['Новые', 'Старые', 'Высокие оценки', 'Низкие оценки', 'Полезные'].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

