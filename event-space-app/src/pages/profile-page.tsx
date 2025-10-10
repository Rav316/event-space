import { Wrapper } from '@/components/hoc';
import {
  AnimatedTabs,
  ProfileHeader, UserMainInfoBlock
} from '@/components/shared';
import { profileTabs } from '@/constants/profile-tabs.ts';
import { useState } from 'react';
import { UserInfo, UserStatistics } from '@/components/shared/user-profile';

const ProfilePage = () => {
  const [profileActiveTab, setProfileActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const renderProfileTab = () => {
    switch (profileActiveTab) {
      case 0:
        return <UserInfo editMode={editMode} />;
      case 1:
        return <UserStatistics/>
    }
  };

  return (
    <Wrapper>
      <div className={'flex flex-col gap-5 mt-[20px]'}>
        <ProfileHeader setEditMode={setEditMode} editMode={editMode} />
        <div className={'flex gap-5'}>
          <div className={'flex flex-col gap-5 flex-3'}>
            <UserMainInfoBlock editMode={editMode} />
          </div>
          <div className={'flex flex-col gap-5 flex-7'}>
            <AnimatedTabs
              tabs={profileTabs}
              activeIndex={profileActiveTab}
              setActiveIndex={setProfileActiveTab}
            />
            {renderProfileTab()}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
