import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Pencil, Trash2, Upload } from 'lucide-react';
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
  const [avatarRemoved, setAvatarRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!data) return null;

  const staticContentUrl = import.meta.env.VITE_STATIC_URL;
  const user = data.user;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handle file change');
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAvatarRemoved(false);
    }
    e.target.value = '';
  };

  const handleFileRemove = () => {
    // setSelectedFile(null);
    setSelectedFile(new File([], 'empty'))
    setPreviewUrl(null);
    setAvatarRemoved(true);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const avatarSrc =
    !avatarRemoved &&
    (previewUrl ??
      (user.avatarUrl ? `${staticContentUrl}${user.avatarUrl}` : undefined));

  return (
    <div className="flex flex-col items-center gap-3 border border-[#E5E5E5] rounded-2xl p-5">
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
              key="avatar-actions"
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  sideOffset={5}
                  className="w-44 whitespace-nowrap"
                  side="bottom"
                >
                  <DropdownMenuItem
                    onClick={handleUploadClick}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <Upload className="h-4 w-4 shrink-0" />
                    <span>Изменить аватар</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleFileRemove}
                    className="flex items-center gap-2 text-destructive focus:text-destructive select-none"
                  >
                    <Trash2 className="h-4 w-4 shrink-0" />
                    <span>Удалить аватар</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Скрытый input вне DropdownMenu — обязательно! */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="font-medium text-xl text-center">
          {user.firstName} {user.lastName}
        </span>

        <span className="text-muted-foreground">{user.email}</span>
      </div>

      <Badge variant="outline">{userRoles[user.role]}</Badge>
      <Separator />

      <div className="flex justify-between w-full max-[425px]:justify-center min-[800px]:max-[1300px]:justify-center">
        <span className="text-muted-foreground max-[425px]:hidden min-[800px]:max-[1300px]:hidden">
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

      <span className="text-muted-foreground text-center text-sm">
        Дата регистрации:{' '}
        {new Date(user.registerDate).toLocaleDateString('ru-RU')}
      </span>
    </div>
  );
};
