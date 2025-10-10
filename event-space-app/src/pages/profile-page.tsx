import { Wrapper } from '@/components/hoc';
import { Button } from '@/components/ui';
import { SquarePen } from 'lucide-react';
import { AnimatedTabs, UserMainInfoBlock } from '@/components/shared';
import { profileTabs } from '@/constants/profile-tabs.ts';

const ProfilePage = () => {
  return (
    <Wrapper>
      <div className={'flex flex-col gap-5 mt-[20px]'}>
        <div className={'flex justify-between'}>
          <h1 className={'text-3xl font-bold'}>Мой профиль</h1>
          <Button>
            <SquarePen/>
            <span>Редактировать</span>
          </Button>
        </div>
        <div className={'flex gap-5'}>
          <div className={'flex flex-col gap-5 flex-3'}>
            <UserMainInfoBlock/>
          </div>
          <div className={'flex flex-col gap-5 flex-7'}>
            <AnimatedTabs tabs={profileTabs}/>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default ProfilePage;