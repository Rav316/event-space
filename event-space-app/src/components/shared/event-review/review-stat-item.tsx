import { StarRating } from '@/components/shared';
import { Badge, Button } from '@/components/ui';
import { Calendar, ExternalLink, Users } from 'lucide-react';

export const ReviewStatItem = () => {
  return (
    <div
      className={
        'flex flex-col gap-2 border border-[#E5E5E5] rounded-2xl p-5 bg-[#F9F9F9] hover:border-[#C4C4C4] transition-all duration-300'
      }
    >
      <div className={'flex items-center gap-2 justify-between'}>
        <span className={'font-medium'}>Хакатон AI Challenge 2025</span>
        <StarRating rating={5} starSize={15} className={'gap-1'} />
      </div>
      <div className={'flex items-center gap-2'}>
        <Badge
          variant={'outline'}
          className={'bg-orange-100 text-orange-900 border-orange-100'}
        >
          IT-секции
        </Badge>
        <div className={'flex items-center gap-2'}>
          <Calendar className={'text-muted-foreground'} size={15} />
          <span className={'text-muted-foreground text-sm'}>
            15 октября 2024
          </span>
        </div>
        <div className={'flex items-center gap-2'}>
          <Users className={'text-muted-foreground'} size={15} />
          <span className={'text-muted-foreground text-sm'}>45 участников</span>
        </div>
      </div>
      <p className={'max-[410px]:leading-5'}>
        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut erat
            ullamcorper, ullamcorper lectus sed, consequat purus. Praesent magna
            orci, blandit vitae porta vitae, condimentum id urna. Donec quis
            sagittis erat. Mauris ex justo, imperdiet id venenatis vitae, tempus et
            odio. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Integer sit amet augue quis risus
            hendrerit convallis. Nulla vitae dui malesuada, hendrerit ex nec, tempus
            tortor. Aliquam nec auctor lorem, vitae tincidunt ante.`.slice(
          0,
          225,
        ) + '…'}
      </p>
      <div className={'flex items-center gap-2 justify-between'}>
        <span className={'text-muted-foreground text-sm'}>2 недели назад</span>
        <Button variant={'ghost'}>
          <span className={'text-sm'}>Перейти к событию</span>
          <ExternalLink size={13}/>
        </Button>
      </div>
    </div>
  );
};
