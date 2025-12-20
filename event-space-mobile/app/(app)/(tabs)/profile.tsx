import { ScrollMainLayout } from '@/src/hoc';
import { removeTokens } from '@/src/storage/auth-helper';
import { StyledButton, StyledText } from '@/src/components/ui';
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
import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { deepEqual } from '@/src/utils/deep-equal';
import { validateEmailUnique } from '@/src/utils/validation';
import { queryClient } from '@/src/api/queryClient';
import { useCheckEmail, useEditUser } from '@/src/api/users/hooks';
import * as ImagePicker from 'expo-image-picker';
import * as Burnt from 'burnt';
import { userRoles } from '@/src/types/userRoles';

const ProfileTab = () => {
  const colorScheme = useColorScheme().colorScheme;

  const logout = () => {
    removeTokens();
  };

  const [localAvatarUri, setLocalAvatarUri] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const { data, isPending, isError } = useMe();
  const checkEmailMutation = useCheckEmail();
  const editUserMutation = useEditUser();

  const user = data?.user;

  const defaultValues = {
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
  };

  const profileForm = useForm<UserEditDto>({
    resolver: zodResolver(userProfileSchema),
    defaultValues
  });

  const [initialUserData, setInitialUserData] =
    useState<UserEditDto>(defaultValues);

  useEffect(() => {
    if (user) {
      const userData = {
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
      };

      profileForm.reset(userData);
      setInitialUserData(userData);
    }
  }, [user, profileForm]);

  if (isError) {
    return <StyledText>Error loading profile</StyledText>;
  }

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

    const asset = result.assets[0];

    setLocalAvatarUri(asset.uri);
    setSelectedAsset(asset);
  };

  const onSubmit = profileForm.handleSubmit(async (data) => {
    const isFormChanged = !deepEqual(data, initialUserData);
    const isAvatarChanged = !!selectedAsset;

    if (!isFormChanged && !isAvatarChanged) {
      return;
    }

    const emailOk = await validateEmailUnique({
      email: data.email,
      defaultEmail: initialUserData.email,
      queryClient,
      checkEmailMutation,
      form: profileForm
    });

    if (!emailOk) return;

    editUserMutation.mutate({
      user: { ...data },
      userId: user?.id || 0,
      avatar: selectedAsset
    });
  });

  return (
    <ScrollMainLayout className={'items-center'}>
      {isPending || !user ? (
        <ProfileSkeleton />
      ) : (
        <>
          <ProfileAvatar
            user={user}
            localAvatarUri={localAvatarUri}
            setLocalAvatarUri={setLocalAvatarUri}
            chooseAvatar={chooseAvatar}
          />
          <View className={'w-full items-center'}>
            <StyledText className={'text-2xl font-semibold'}>
              {user.firstName} {user.lastName}
            </StyledText>
            <View className={'flex-row gap-2 items-center justify-center'}>
              <StyledText className={'text-muted-foreground'}>
                {userRoles[user.role].label}
              </StyledText>
              <StyledText
                className={'text-muted-foreground text-2xl font-bold'}
              >
                ·
              </StyledText>
              <StyledText className={'text-muted-foreground'}>
                {user.faculty.name}
              </StyledText>
            </View>
            <ProfileForm form={profileForm} />
          </View>
          <View className={'w-full gap-3'}>
            <StyledButton onPress={onSubmit}>
              <Pencil
                color={colorScheme === 'dark' ? 'black' : 'white'}
                size={16}
              />
              <StyledText>Сохранить изменения</StyledText>
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
