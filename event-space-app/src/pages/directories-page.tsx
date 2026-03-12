import { Wrapper } from '@/components/hoc';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { AnimatedTabs } from '@/components/shared';
import { directoriesTabs } from '@/constants/directories-tabs.ts';
import { BuildingTab, SpacesTab, CategoriesTab, FacultiesTab } from '@/components/shared/directories';

const DirectoriesPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const renderTabContent = () => {
    switch (activeIndex) {
      case 0:
        return <BuildingTab/>;
      case 1:
        return <SpacesTab />;
      case 2:
        return <CategoriesTab />;
      case 3:
        return <FacultiesTab />;
    }
  }

  return (
    <Wrapper className={'flex flex-col py-5 gap-5'}>
      <div className={'flex items-center gap-5'}>
        <div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft />
            <span>Назад</span>
          </Button>
        </div>
        <div className={'flex flex-col'}>
          <span className={'font-bold text-3xl'}>Управление справочниками</span>
          <span className={'text-muted-foreground'}>
            Настройка локаций, категорий и других справочных данных
          </span>
        </div>
      </div>
      <AnimatedTabs
        tabs={directoriesTabs}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      {renderTabContent()}
    </Wrapper>
  );
};

export default DirectoriesPage;
