import { Avatar, AvatarImage, Badge, Label, Separator } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface Props {
  editMode?: boolean;
}

export const UserMainInfoBlock: React.FC<Props> = ({ editMode }) => {
  return (
    <div
      className={
        'flex flex-col items-center gap-3 border border-[#E5E5E5] rounded-2xl p-5'
      }
    >
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://avatars.githubusercontent.com/u/118563959?v=4" />
        </Avatar>

        <AnimatePresence>
          {editMode && (
            <motion.div
              key="avatar-upload"
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 10 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
              className={cn('absolute bottom-0 right-0')}
            >
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
                  <Upload className="h-3 w-3" />
                </div>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </Label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={'flex flex-col items-center gap-0.5'}>
        <span className={'font-medium text-xl text-center'}>
          Иванов Иван Иванович
        </span>
        <span className={'text-muted-foreground'}>test@test.test</span>
      </div>
      <Badge variant={'outline'}>Участник</Badge>
      <Separator />
      <div
        className={
          'flex justify-between w-full max-[425px]:justify-center min-[800px]:max-[1300px]:justify-center'
        }
      >
        <span
          className={
            'text-muted-foreground max-[425px]:hidden min-[800px]:max-[1300px]:hidden'
          }
        >
          Факультет
        </span>
        <span className="font-medium text-center">
          Информационные технологии
        </span>
      </div>
      <div
        className={cn(
          'flex justify-between w-full gap-2 max-[425px]:flex-row-reverse max-[425px]:justify-center',
          'min-[800px]:max-[1300px]:flex-row-reverse min-[800px]:max-[1300px]:justify-center',
        )}
      >
        <span className="text-muted-foreground">Курс</span>
        <span className="font-medium">3</span>
      </div>
      <Separator />
      <span className={'text-muted-foreground text-center text-sm'}>
        Дата регистрации: 15.01.2024
      </span>
    </div>
  );
};
