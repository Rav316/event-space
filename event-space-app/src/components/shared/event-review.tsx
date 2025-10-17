import { Avatar, AvatarImage, Button } from '@/components/ui';
import { Flag, Star, ThumbsUp } from 'lucide-react';

export const EventReview = () => {
  return (
    <div
      className={'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5'}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>

        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Иван Иванов</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
            </div>
            <span className="text-muted-foreground">14.10.2025</span>
          </div>
        </div>
      </div>
      <span className="font-medium text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        viverra, velit at hendrerit posuere, nisi risus tincidunt augue.
      </span>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
        Donec vel neque nec lorem vulputate commodo. Proin rhoncus, eros non
        tincidunt interdum, massa ante congue arcu, sed suscipit sem est sed
        metus. Morbi laoreet elit nec massa fermentum, nec porttitor libero
        dictum. Sed ac ante eget mauris consequat porttitor. Integer commodo
        gravida justo, et tincidunt augue faucibus vitae. Phasellus id mi vitae
        eros posuere sodales ut at metus. Praesent euismod orci non sapien
        varius, ac ullamcorper sapien aliquet. Pellentesque id varius odio.
        Etiam nec velit risus. Sed venenatis neque eu eros blandit, nec cursus
        sapien ornare. Suspendisse nec risus non ante mattis pretium. Mauris nec
        mattis nulla. Nulla quis facilisis nulla. Morbi imperdiet, ligula ut
        varius pulvinar, erat nisl dignissim tortor, nec elementum augue lorem
        non arcu. Aliquam nec magna vel sapien tincidunt suscipit at id lacus.
        Sed consequat leo at purus consequat, non vulputate ex accumsan. Donec
        sed urna nec libero fermentum vulputate. Curabitur sed neque in eros
        hendrerit aliquet non in risus. Sed in mauris nec sapien cursus faucibus
        ac in nisl. Donec tincidunt, ipsum id interdum elementum, tortor neque
        porta urna, id porttitor lorem risus at libero. Suspendisse a facilisis
        justo, nec gravida lorem. Curabitur tristique tortor nec bibendum
        gravida.
      </p>
      <div className={'flex items-center gap-3 max-[450px]:flex-col max-[450px]:items-start max-[450px]:gap-2'}>
        <Button variant={'ghost'}>
          <ThumbsUp />
          <span>Полезно (10)</span>
        </Button>
        <Button variant={'ghost'}>
          <Flag />
          <span>Пожаловаться</span>
        </Button>
      </div>
    </div>
  );
};
