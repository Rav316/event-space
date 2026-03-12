import { Wrapper } from '@/components/hoc';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { AnimatedTabs } from '@/components/shared';
import { directoriesTabs } from '@/constants/directories-tabs.ts';

const DirectoriesPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

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
    </Wrapper>
  );
};

export default DirectoriesPage;
