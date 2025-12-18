import { ScrollMainLayout } from '@/src/hoc';
import { removeTokens } from '@/src/storage/auth-helper';
import {
  Avatar,
  AvatarFallback,
  StyledButton,
  StyledText
} from '@/src/components/ui';
import { ProfileForm } from '@/src/components/shared/profile';
import { useForm } from 'react-hook-form';
import { UserEditDto } from '@/src/api/user/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema } from '@/src/schemas/user-profile-schema';
import { useMe } from '@/src/api/auth/hooks';
import { Animated, View } from 'react-native';

const ProfileTab = () => {
  const logout = () => {
    removeTokens();
  };

  const { data } = useMe();
  const user = data?.user;

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    faculty: user?.faculty.id || 0,
    course: user?.course,
    description: user?.description || '',
    phone: user?.phone || '',
    tgUsername: user?.tgUsername || '',
    vkUrl: user?.vkUrl || '',
    githubUrl: user?.githubUrl || ''
  };

  const profileForm = useForm<UserEditDto>({
    resolver: zodResolver(userProfileSchema),
    defaultValues
  });

  return (
    <ScrollMainLayout className={'items-center'}>
      <Avatar alt={'avatar'} className={'w-24 h-24'}>
        <AvatarFallback>
          <StyledText className={'text-3xl'}>АС</StyledText>
        </AvatarFallback>
      </Avatar>
      <View className={'w-full items-center'}>
        <StyledText className={'text-2xl font-semibold'}>
          Александр Смирнов
        </StyledText>
        <View className={'flex-row gap-2 items-center justify-center'}>
          <StyledText className={'text-muted-foreground'}>Студент</StyledText>
          <StyledText className={'text-muted-foreground text-2xl font-bold'}>
            ·
          </StyledText>
          <StyledText className={'text-muted-foreground'}>
            Информатика
          </StyledText>
        </View>
        <ProfileForm form={profileForm} />
      </View>
      <StyledButton onPress={logout}>
        <StyledText>Выйти</StyledText>
      </StyledButton>
    </ScrollMainLayout>
  );
};

export default ProfileTab;
