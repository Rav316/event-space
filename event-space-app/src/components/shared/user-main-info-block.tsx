import { Avatar, AvatarFallback, AvatarImage, Badge, Label, Separator } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { useMe } from '@/api/auth/hooks.ts';
import { userRoles } from '@/constants/user-roles.ts';

interface Props {
  editMode?: boolean;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserMainInfoBlock: React.FC<Props> = ({
  editMode,
  setSelectedFile,
  previewUrl,
  setPreviewUrl,
}) => {
  const { data } = useMe();

  if (!data) {
    return;
  }

  const user = data.user;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const avatarSrc =
    previewUrl ||
    user.avatarUrl || undefined;

  return (
    <div
      className={
        'flex flex-col items-center gap-3 border border-[#E5E5E5] rounded-2xl p-5'
      }
    >
      <div className="relative">
        <Avatar key={avatarSrc || 'fallback'} className="h-20 w-20">
          {avatarSrc ? (
            <AvatarImage src={avatarSrc} />
          ) : (
            <AvatarFallback className="text-2xl font-semibold bg-muted">
              {user.firstName && user.lastName
                ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
                : '??'}
            </AvatarFallback>
          )}
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
              className="absolute bottom-0 right-0"
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
                  onChange={handleFileChange}
                />
              </Label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={'flex flex-col items-center gap-0.5'}>
        <span className={'font-medium text-xl text-center'}>
          {user.firstName} {user.lastName}
        </span>

        <span className={'text-muted-foreground'}>{user.email}</span>
      {/*  TODO добавить проверку занятности почты при отправке формы*/}
      </div>
      <Badge variant={'outline'}>{userRoles[user.role]}</Badge>
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
        <span className="font-medium text-center">{user.faculty.name}</span>
      </div>
      <div
        className={cn(
          'flex justify-between w-full gap-2 max-[425px]:flex-row-reverse max-[425px]:justify-center',
          'min-[800px]:max-[1300px]:flex-row-reverse min-[800px]:max-[1300px]:justify-center',
        )}
      >
        <span className="text-muted-foreground">Курс</span>
        <span className="font-medium">{user.course}</span>
      </div>
      <Separator />
      <span className={'text-muted-foreground text-center text-sm'}>
        Дата регистрации:{' '}
        {new Date(user.registerDate).toLocaleDateString('ru-RU')}
      </span>
    </div>
  );
};
