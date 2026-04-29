import { Wrapper } from '@/components/hoc';
import {
  AnimatedTabs,
  ProfileHeader,
  ProfileMainInfoBlock,
  ProfileStatisticsGroup,
} from '@/components/shared';
import { profileTabs } from '@/constants/profile-tabs.ts';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema } from '@/schemas/user-profile-schema.ts';
import { useMe } from '@/api/auth/hooks.ts';
import type { UserEditDto } from '@/api/users/model.ts';
import { useCheckEmail, useEditUser } from '@/api/users/hooks.ts';
import { deepEqual } from '@/utils/deep-equal.ts';
import { validateEmailUnique } from '@/utils/validation.ts';
import { UserInfo, UserSettings } from '@/components/shared/profile-tabs';

const getProfileTabIndex = (search: string) => {
  const tabParam = new URLSearchParams(search).get('tab');

  if (tabParam === 'settings') {
    return 1;
  }

  return 0;
};

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileActiveTab, setProfileActiveTab] = useState(() =>
    getProfileTabIndex(location.search),
  );
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const { data } = useMe();
  const user = data?.user;
  const editUserMutation = useEditUser();
  const checkEmailMutation = useCheckEmail();

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    program: user?.program.id || 0,
    course: user?.course,
    description: user?.description || '',
    phone: user?.phone || '',
    tgUsername: user?.tgUsername || '',
    vkUrl: user?.vkUrl || '',
    githubUrl: user?.githubUrl || '',
    newEventNotifications: user?.newEventNotifications,
  };

  const userProfileForm = useForm<UserEditDto>({
    resolver: zodResolver(userProfileSchema),
    defaultValues,
  });

  useEffect(() => {
    setProfileActiveTab(getProfileTabIndex(location.search));
  }, [location.search]);

  const handleTabChange = (index: number) => {
    setProfileActiveTab(index);

    const params = new URLSearchParams(location.search);
    params.set('tab', index === 1 ? 'settings' : 'info');

    const search = params.toString();
    navigate(
      {
        pathname: location.pathname,
        search: search ? `?${search}` : '',
      },
      { replace: true },
    );
  };

  const renderProfileTab = () => {
    switch (profileActiveTab) {
      case 0:
        return <UserInfo editMode={editMode} form={userProfileForm} />;
      case 1:
        return <UserSettings editMode={editMode} form={userProfileForm} />;
    }
  };

  const onCancelClick = () => {
    setEditMode(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    userProfileForm.reset();
  };

  const onSubmit = userProfileForm.handleSubmit(async (data) => {
    console.log('newEventNotifications', data.newEventNotifications);
    const isChanged = !deepEqual(data, defaultValues);
    if (!isChanged && !selectedFile) {
      setEditMode(false);
      return;
    }

    const emailOk = await validateEmailUnique({
      email: data.email,
      defaultEmail: defaultValues.email,
      checkEmailMutation,
      form: userProfileForm,
    });

    if (!emailOk) return;

    editUserMutation.mutate(
      {
        user: { ...data },
        userId: user?.id || 0,
        avatar: selectedFile,
        avatarRemoved,
      },
      {
        onSuccess: () => {
          userProfileForm.reset(data);
          setEditMode(false);
          setAvatarRemoved(false);
        },
      },
    );
  });

  return (
    <Wrapper>
      <div className={'flex flex-col gap-5 mt-5'}>
        <ProfileHeader
          onEditClick={() => setEditMode(true)}
          onCancelClick={onCancelClick}
          editMode={editMode}
          onSaveClick={onSubmit}
          isLoading={editUserMutation.isPending}
        />
        <div className={'flex gap-5 max-[800px]:flex-col'}>
          <div className={'flex flex-col gap-5 flex-3'}>
            <div className={'flex flex-col gap-5'}>
              <ProfileMainInfoBlock
                editMode={editMode}
                setSelectedFile={setSelectedFile}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                avatarRemoved={avatarRemoved}
                setAvatarRemoved={setAvatarRemoved}
              />
              <ProfileStatisticsGroup />
            </div>
          </div>
          <div className={'flex flex-col gap-5 flex-7'}>
            <AnimatedTabs
              tabs={profileTabs}
              activeIndex={profileActiveTab}
              setActiveIndex={handleTabChange}
            />
            <div className="min-h-[400px] transition-all duration-300">
              {renderProfileTab()}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
