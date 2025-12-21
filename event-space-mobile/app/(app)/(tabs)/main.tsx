import { MainLayout } from '@/src/hoc';
import { EventList } from '@/src/components/shared/event';

const MainTab = () => {
  return (
    <MainLayout className={'gap-6'}>
      <EventList />
    </MainLayout>
  );
}



export default MainTab;