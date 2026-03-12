import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Pencil,
  Plus,
  Tags,
  Trash2,
} from 'lucide-react';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { SearchInput } from '@/components/shared';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const MOCK_CATEGORIES = [
  { id: 1,  name: 'Конференция' },
  { id: 2,  name: 'Семинар' },
  { id: 3,  name: 'Мастер-класс' },
  { id: 4,  name: 'Спортивное мероприятие' },
  { id: 5,  name: 'Культурное мероприятие' },
  { id: 6,  name: 'Выставка' },
  { id: 7,  name: 'Концерт' },
  { id: 8,  name: 'Лекция' },
  { id: 9,  name: 'Тренинг' },
  { id: 10, name: 'Олимпиада' },
  { id: 11, name: 'Хакатон' },
  { id: 12, name: 'Квест' },
  { id: 13, name: 'Круглый стол' },
  { id: 14, name: 'Защита проектов' },
  { id: 15, name: 'Научная конференция' },
  { id: 16, name: 'Студенческий форум' },
  { id: 17, name: 'День открытых дверей' },
  { id: 18, name: 'Торжественная церемония' },
  { id: 19, name: 'Спектакль' },
  { id: 20, name: 'Кинопоказ' },
  { id: 21, name: 'Дискуссия' },
  { id: 22, name: 'Воркшоп' },
  { id: 23, name: 'Турнир' },
  { id: 24, name: 'Фестиваль' },
  { id: 25, name: 'Ярмарка' },
];

const PAGE_SIZE_OPTIONS = [5, 10, 15];

export const CategoriesTab = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const handleSort = () => {
    setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'));
    setPage(0);
  };

  const SortIcon = () => {
    if (sortDir === null) return <ArrowUpDown className={'ml-1 h-4 w-4'} />;
    return sortDir === 'asc'
      ? <ArrowUp className={'ml-1 h-4 w-4'} />
      : <ArrowDown className={'ml-1 h-4 w-4'} />;
  };

  const filtered = MOCK_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const sorted = sortDir
    ? [...filtered].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name, 'ru');
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : filtered;

  const totalElements = sorted.length;
  const totalPages = Math.ceil(totalElements / pageSize);
  const paginated = sorted.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className={'flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'}>
      <div className={'flex justify-between items-center'}>
        <div className={'flex flex-col'}>
          <div className={'flex gap-2 items-center'}>
            <Tags />
            <span className={'font-medium text-xl'}>Категории мероприятий</span>
          </div>
          <span className={'text-muted-foreground text-sm'}>
            Управление категориями для классификации мероприятий
          </span>
        </div>
        <Button>
          <Plus />
          <span>Добавить категорию</span>
        </Button>
      </div>

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={'Поиск категорий...'}
      />

      <Table className={'table-fixed w-full'}>
        <colgroup>
          <col className={'w-[88%]'} />
          <col className={'w-[12%]'} />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead
              className={'cursor-pointer select-none'}
              onClick={handleSort}
            >
              <div className={'flex items-center'}>
                Название
                <SortIcon />
              </div>
            </TableHead>
            <TableHead className={'text-right'}>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell className={'font-medium'}>{cat.name}</TableCell>
              <TableCell className={'text-right'}>
                <div className={'flex items-center justify-end gap-1'}>
                  <Button variant={'ghost'} size={'icon'} className={'h-8 w-8'}>
                    <Pencil className={'w-4 h-4 text-muted-foreground'} />
                  </Button>
                  <Button variant={'ghost'} size={'icon'} className={'h-8 w-8'}>
                    <Trash2 className={'w-4 h-4 text-red-500'} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className={'flex items-center justify-between'}>
        <span className={'text-sm text-muted-foreground'}>
          {totalElements} категорий
        </span>
        <div className={'flex items-center gap-3'}>
          <div className={'flex items-center gap-2'}>
            <span className={'text-sm text-muted-foreground'}>Строк на странице</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(0);
              }}
            >
              <SelectTrigger className={'h-8 w-16'}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className={'flex items-center gap-2'}>
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
            >
              Назад
            </Button>
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1}
            >
              Вперёд
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
