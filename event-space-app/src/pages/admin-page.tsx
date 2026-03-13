import { Wrapper } from '@/components/hoc';
import { useMe } from '@/api/auth/hooks.ts';
import { Loader } from 'lucide-react';
import { AnimatedTabs } from '@/components/shared';
import { adminTabs } from '@/constants/admin-tabs.ts';
import { useState } from 'react';
import { AdminComplaintsTab, AdminEventsTab, AdminReviewTab, AdminUsersTab } from '@/components/shared/admin';
import { useAdminStatistics } from '@/api/admin/hooks.ts';

const AdminPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isPending } = useMe();
  const { data: statistics } = useAdminStatistics();

  if (isPending || !data) {
    return <Loader />;
  }

  const tabs = adminTabs.map((tab) =>
    tab.text === 'Жалобы'
      ? { ...tab, badge: statistics?.pendingComplaints }
      : tab
  );

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
        tabs={tabs}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      {renderTabContent()}
    </Wrapper>
  );
};

export default AdminPage;
