import { Button } from '@/components/ui';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const EventsPagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisible = 5;

  let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end >= totalPages) {
    end = totalPages - 1;
    start = Math.max(0, end - maxVisible + 1);
  }

  const visiblePages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

  return (
    <div className={'flex justify-center mt-8'}>
      <div className={'flex items-center space-x-2'}>
        <Button
          variant={'outline'}
          size={'sm'}
          disabled={currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft />
          <span className={'max-[528px]:hidden'}>{'Предыдущая'}</span>
        </Button>

        {visiblePages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size={'sm'}
            onClick={() => onPageChange(page)}
            className={'border'}
          >
            {page + 1}
          </Button>
        ))}

        <Button
          variant={'outline'}
          size={'sm'}
          disabled={currentPage === totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span className={'max-[528px]:hidden'}>{'Следующая'}</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
