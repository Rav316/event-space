import { StyledText } from '@/src/components/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu';
import { UserAvatar } from '@/src/components/shared/profile/user-avatar';
import { Trash2, Upload } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { UserReadDto } from '@/src/api/users/models';
import React, { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Burnt from 'burnt';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  user: UserReadDto;
}

export const ProfileAvatar: React.FC<Props> = ({ user }) => {
  const staticContentUrl = process.env.EXPO_PUBLIC_STATIC_URL;
  const colorScheme = useColorScheme().colorScheme;

  const [localAvatarUri, setLocalAvatarUri] = useState<string | null>(
    null
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setLocalAvatarUri(null);
      };
    }, [])
  );

  const chooseAvatar = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Burnt.toast({
        title: 'Доступ к галерее запрещен',
        preset: 'error'
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      quality: 1
    });

    if (result.canceled) return;

    setLocalAvatarUri(result.assets[0].uri);
  };

  const removeAvatar = () => {
    setLocalAvatarUri(null);
  };

  const avatarUrl =
    localAvatarUri ??
    (user.avatarUrl ? `${staticContentUrl}${user.avatarUrl}` : false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          firstName={user.firstName}
          lastName={user.lastName}
          avatarUrl={avatarUrl}
          className={'w-24 h-24'}
          avatarFallbackClassName={'text-3xl'}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="center" sideOffset={7}>
        <DropdownMenuItem onPress={chooseAvatar}>
          <Upload
            color={colorScheme === 'dark' ? 'white' : 'black'}
            width={16}
            height={16}
          />
          <StyledText>Изменить аватар</StyledText>
        </DropdownMenuItem>

        <DropdownMenuItem onPress={removeAvatar}>
          <Trash2
            color={colorScheme === 'dark' ? 'white' : 'black'}
            width={16}
            height={16}
          />
          <StyledText className="text-destructive">
            Убрать выбранное фото
          </StyledText>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
