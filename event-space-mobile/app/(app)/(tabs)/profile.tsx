import { ScrollMainLayout } from '@/src/hoc';
import { removeTokens } from '@/src/storage/auth-helper';
import {
  Avatar,
  AvatarFallback,
  StyledButton,
  StyledText
} from '@/src/components/ui';
import { ProfileForm, ProfileSkeleton } from '@/src/components/shared/profile';
import { useForm } from 'react-hook-form';
import { UserEditDto } from '@/src/api/user/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema } from '@/src/schemas/user-profile-schema';
import { useMe } from '@/src/api/auth/hooks';
import { View } from 'react-native';
import { useEffect } from 'react';

const ProfileTab = () => {
  const logout = () => {
    removeTokens();
  };

  const { data, isPending, isError } = useMe();
  const user = data?.user;

  const profileForm = useForm<UserEditDto>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      faculty: 0,
      course: undefined,
      description: '',
      phone: '',
      tgUsername: '',
      vkUrl: '',
      githubUrl: ''
    }
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        faculty: user.faculty?.id || 0,
        course: user.course,
        description: user.description || '',
        phone: user.phone || '',
        tgUsername: user.tgUsername || '',
        vkUrl: user.vkUrl || '',
        githubUrl: user.githubUrl || ''
      });
    }
  }, [user, profileForm]);

  if (isError) {
    return <StyledText>Error loading profile</StyledText>;
  }

  return (
    <ScrollMainLayout className={'items-center'}>
      {isPending ? (
        <ProfileSkeleton />
      ) : (
        <>
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
              <StyledText className={'text-muted-foreground'}>
                Студент
              </StyledText>
              <StyledText
                className={'text-muted-foreground text-2xl font-bold'}
              >
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
        </>
      )}
    </ScrollMainLayout>
  );
};

export default ProfileTab;
