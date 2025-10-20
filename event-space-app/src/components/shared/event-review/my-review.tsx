import { Button, Separator } from '@/components/ui';
import { Pencil, ThumbsUp, Trash2 } from 'lucide-react';
import { StarRating } from '@/components/shared';

export const MyReview = () => {
  return (
    <div
      className={'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5'}
    >
      <div
        className={
          'flex gap-4 justify-between items-center max-[550px]:flex-col max-[550px]:items-start'
        }
      >
        <span className={'font-medium text-xl'}>Ваш отзыв</span>
        <div className={'flex gap-4 items-center max-[400px]:flex-col max-[400px]:w-full'}>
          <Button variant={'outline'} className={'max-[400px]:w-full'}>
            <Pencil />
            <span>Редактировать</span>
          </Button>
          <Button className="bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white max-[400px]:w-full">
            <Trash2 />
            <span>Удалить</span>
          </Button>
        </div>
      </div>
      <div className={'flex flex-col gap-0.5'}>
        <StarRating rating={4} />
        <span className={'text-muted-foreground'}>20.01.2024</span>
      </div>
      <h3 className={'font-medium text-xl'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        tincidunt tellus vitae erat curae.
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam odio
        lectus, elementum in nunc in, iaculis dignissim metus. Quisque sit amet
        viverra tellus. Duis porttitor faucibus molestie. Nullam dictum eros
        libero, a ornare diam vehicula laoreet. Curabitur dapibus efficitur
        tortor. Nullam sed libero faucibus, eleifend felis ac, convallis purus.
        Mauris feugiat tortor et blandit vehicula. Fusce vitae turpis eget nisl
        aliquam efficitur non nec magna. Nullam eget libero fermentum, suscipit
        sapien in, vehicula leo. Nunc lectus mi, facilisis ac efficitur vitae,
        iaculis ut nulla. Aenean et euismod ex, at eleifend odio. Aenean
        malesuada at ipsum vel fringilla. Sed vitae dolor in augue mattis
        scelerisque vitae id odio. Ut urna dui, auctor nec justo et, porttitor
        egestas ex. Praesent pretium, justo at vestibulum ultricies, nunc odio
        tincidunt nulla, in sodales nisi ante ac nibh. Pellentesque venenatis
        dictum vehicula. Ut dapibus blandit nulla a ultrices. Nullam elit enim,
        sollicitudin in cras.
      </p>
      <Separator />
      <div className={'flex gap-4 items-center'}>
        <ThumbsUp size={24} className={'shrink-0'} />
        <span>15 человек посчитали этот отзыв полезным</span>
      </div>
    </div>
  );
};
