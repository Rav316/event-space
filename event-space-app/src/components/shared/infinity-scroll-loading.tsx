import { Spinner } from '@/components/ui';

export const InfinityScrollLoading = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-center text-muted-foreground">
      <span>Загрузка...</span>
      <Spinner />
    </div>
  );
};
