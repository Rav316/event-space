import { Button } from '@/components/ui';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const EventsPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={'flex justify-center mt-8'}>
      <div className={'flex items-center space-x-2'}>
        <Button
          variant={'outline'}
          size={'sm'}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft />
          <span className={'max-[528px]:hidden'}>{'Предыдущая'}</span>
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size={'sm'}
            onClick={() => handlePageChange(page)}
            className={'border'}
          >
            {page}
          </Button>
        ))}

        <Button
          variant={'outline'}
          size={'sm'}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className={'max-[528px]:hidden'}>{'Следующая'}</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
