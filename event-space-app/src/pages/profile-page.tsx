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
import {
  type UserProfileData,
  userProfileSchema,
} from '@/schemas/user-profile-schema.ts';
import { useMe } from '@/api/auth/hooks.ts';

const ProfilePage = () => {
  const [profileActiveTab, setProfileActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data } = useMe();
  const user = data?.user;

  const userProfileForm = useForm<UserProfileData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      faculty: user?.faculty.id || 0,
      course: user?.course || 0,
      description: user?.description || '',
      tgUsername: user?.tgUsername || '',
      vkUrl: user?.vkUrl || '',
      githubUrl: user?.githubUrl || '',
    },
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
    setPreviewUrl(null)
    userProfileForm.reset();
  };

  return (
    <Wrapper>
      <div className={'flex flex-col gap-5 mt-[20px]'}>
        <ProfileHeader
          onEditClick={() => setEditMode(true)}
          onCancelClick={onCancelClick}
          editMode={editMode}
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
