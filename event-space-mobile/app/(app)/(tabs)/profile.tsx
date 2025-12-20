import { ScrollMainLayout } from '@/src/hoc';
import { removeTokens } from '@/src/storage/auth-helper';
import {
  StyledButton,
  StyledText
} from '@/src/components/ui';
import {
  ProfileAvatar,
  ProfileForm,
  ProfileSkeleton
} from '@/src/components/shared/profile';
import { useForm } from 'react-hook-form';
import { UserEditDto } from '@/src/api/users/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema } from '@/src/schemas/user-profile-schema';
import { useMe } from '@/src/api/auth/hooks';
import { View } from 'react-native';
import { useEffect } from 'react';
import { Pencil } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const ProfileTab = () => {
  const colorScheme = useColorScheme().colorScheme;


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
      {isPending || !user ? (
        <ProfileSkeleton />
      ) : (
        <>
          <ProfileAvatar user={user} />
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
          <View className={'w-full gap-3'}>
            <StyledButton>
              <Pencil
                color={colorScheme === 'dark' ? 'black' : 'white'}
                size={16}
              />
              <StyledText>Редактировать профиль</StyledText>
            </StyledButton>
            <StyledButton onPress={logout} variant={'destructive'}>
              <StyledText>Выйти</StyledText>
            </StyledButton>
          </View>
        </>
      )}
    </ScrollMainLayout>
  );
};

export default ProfileTab;
