import { Wrapper } from '@/components/hoc';
import {
  AnimatedTabs,
  ProfileHeader,
  UserMainInfoBlock,
} from '@/components/shared';
import { profileTabs } from '@/constants/profile-tabs.ts';
import { useState } from 'react';
import {
  UserInfo,
  UserSettings,
  UserStatistics,
} from '@/components/shared/user-profile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema } from '@/schemas/user-profile-schema.ts';
import { useMe } from '@/api/auth/hooks.ts';
import type { UserEditDto } from '@/api/users/model.ts';
import { useEditUser } from '@/api/users/hooks.ts';
import {deepEqual} from "@/utils/deep-equal.ts";

const ProfilePage = () => {
  const [profileActiveTab, setProfileActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data } = useMe();
  const user = data?.user;
  const editUserMutation = useEditUser();

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
    githubUrl: user?.githubUrl || '',
  }

  const userProfileForm = useForm<UserEditDto>({
    resolver: zodResolver(userProfileSchema),
    defaultValues,
  });

  const renderProfileTab = () => {
    switch (profileActiveTab) {
      case 0:
        return <UserInfo editMode={editMode} form={userProfileForm} />;
      case 1:
        return <UserStatistics />;
      case 2:
        return <UserSettings editMode={editMode} />;
    }
  };

  const onCancelClick = () => {
    setEditMode(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    userProfileForm.reset();
  };

  const onSubmit = userProfileForm.handleSubmit((data) => {
    const isChanged = !deepEqual(data, defaultValues);
    if (!isChanged && !selectedFile) {
      setEditMode(false);
      return;
    }

    editUserMutation.mutate({
      user: { ...data },
      userId: user?.id || 0,
      avatar: selectedFile,
    }, {
      onSuccess: () => {
        userProfileForm.reset(data);
        setEditMode(false);
      }
    });
  });

  return (
    <Wrapper>
      <div className={'flex flex-col gap-5 mt-[20px]'}>
        <ProfileHeader
          onEditClick={() => setEditMode(true)}
          onCancelClick={onCancelClick}
          editMode={editMode}
          onSaveClick={onSubmit}
          isLoading={editUserMutation.isPending}
        />
        <div className={'flex gap-5 max-[800px]:flex-col'}>
          <div className={'flex flex-col gap-5 flex-3'}>
            <UserMainInfoBlock
              editMode={editMode}
              setSelectedFile={setSelectedFile}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          </div>
          <div className={'flex flex-col gap-5 flex-7'}>
            <AnimatedTabs
              tabs={profileTabs}
              activeIndex={profileActiveTab}
              setActiveIndex={setProfileActiveTab}
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
