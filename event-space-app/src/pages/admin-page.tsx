import { Wrapper } from '@/components/hoc';
import { useMe } from '@/api/auth/hooks.ts';
import { Loader } from 'lucide-react';
import { AnimatedTabs } from '@/components/shared';
import { adminTabs } from '@/constants/admin-tabs.tsx';
import { useState } from 'react';
import { AdminComplaintsTab, AdminEventsTab, AdminReviewTab, AdminUsersTab } from '@/components/shared/admin';

const AdminPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isPending } = useMe();
  if (isPending || !data) {
    return <Loader />;
  }

  const renderTabContent = () => {
    switch (activeIndex) {
      case 0:
        return <AdminReviewTab />;
      case 1:
        return <AdminUsersTab />;
      case 2:
        return <AdminEventsTab />;
      case 3:
        return <AdminComplaintsTab />;
    }
  };

  return (
    <Wrapper className={'flex flex-col py-5 gap-5'}>
      <div className={'flex flex-col'}>
        <span className={'font-bold text-3xl'}>Административная панель</span>
        <span className={'text-muted-foreground'}>
          Добро пожаловать, {data.user.firstName}! Управление системой
          EventSpace
        </span>
      </div>
      <AnimatedTabs
        tabs={adminTabs}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      {renderTabContent()}
    </Wrapper>
  );
};

export default AdminPage;
