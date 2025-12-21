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
import { Spinner } from '@/src/components/ui/spinner';
import { LogoutModal } from '@/src/components/modal';
const ProfileTab = () => {
  const colorScheme = useColorScheme().colorScheme;
  const logout = () => {
    removeTokens();
    queryClient.clear();
  };
  const [selectedAsset, setSelectedAsset] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    if (editUserMutation.isPending) return;
    setRefreshing(true);
    try {
      await queryClient.refetchQueries({
        queryKey: ['me']
      });
    } finally {
      setRefreshing(false);
    }
  };
  const { data, isError } = useMe();
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
    setAvatarRemoved(false);
    const asset = result.assets[0];
    setSelectedAsset(asset);
  };
  const onSubmit = profileForm.handleSubmit(async (data) => {
    const isFormChanged = !deepEqual(data, initialUserData);
    const isAvatarChanged = !!selectedAsset;
    if (!isFormChanged && !isAvatarChanged && !avatarRemoved) {
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
    editUserMutation.mutate(
      {
        user: { ...data },
        userId: user?.id || 0,
        avatar: selectedAsset,
        avatarRemoved
      },
      {
        onSuccess: () => {
          setSelectedAsset(null);
          setSelectedAsset(null);
          setAvatarRemoved(false);
        }
      }
    );
  });
  return (
    <ScrollMainLayout
      className={'items-center flex-1'}
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      {refreshing && isError ? (
        <ProfileSkeleton />
      ) : isError ? (
        <View className={'items-center justify-center w-full flex-1 gap-2'}>
          <StyledText className={'text-2xl text-center font-medium'}>
            Произошла ошибка при загрузке профиля
          </StyledText>
          <StyledText className={'text-muted-foreground text-center'}>
            Пожалуйста, обновите страницу или попробуйте позже.
          </StyledText>
          <StyledButton>
            <StyledText onPress={onRefresh}>Обновить страницу</StyledText>
          </StyledButton>
        </View>
      ) : !user ? (
        <ProfileSkeleton />
      ) : (
        <>
          <ProfileAvatar
            user={user}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            chooseAvatar={chooseAvatar}
            avatarRemoved={avatarRemoved}
            setAvatarRemoved={setAvatarRemoved}
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
            <StyledButton
              disabled={editUserMutation.isPending}
              onPress={onSubmit}
            >
              {editUserMutation.isPending ? (
                <>
                  <Spinner />
                  <StyledText>Сохранение...</StyledText>
                </>
              ) : (
                <>
                  <Pencil
                    color={colorScheme === 'dark' ? 'black' : 'white'}
                    size={16}
                  />
                  <StyledText>Сохранить изменения</StyledText>
                </>
              )}
            </StyledButton>
            <LogoutModal logout={logout} />
          </View>
        </>
      )}
    </ScrollMainLayout>
  );
};
export default ProfileTab;
