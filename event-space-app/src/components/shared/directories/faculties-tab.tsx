import { ArrowDown, ArrowUp, ArrowUpDown, GraduationCap, Pencil, Plus, Trash2 } from 'lucide-react';
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

const MOCK_FACULTIES = [
  { id: 1,  name: 'Факультет информационных технологий',  location: 'IT-корпус' },
  { id: 2,  name: 'Факультет математики',                 location: 'Главный корпус' },
  { id: 3,  name: 'Факультет физики',                     location: 'Главный корпус' },
  { id: 4,  name: 'Факультет химии',                      location: 'Главный корпус' },
  { id: 5,  name: 'Факультет биологии',                   location: 'Главный корпус' },
  { id: 6,  name: 'Факультет экономики',                  location: 'IT-корпус' },
  { id: 7,  name: 'Факультет юриспруденции',              location: 'Главный корпус' },
  { id: 8,  name: 'Факультет психологии',                 location: 'IT-корпус' },
  { id: 9,  name: 'Факультет иностранных языков',         location: 'Главный корпус' },
  { id: 10, name: 'Факультет истории',                    location: 'Главный корпус' },
  { id: 11, name: 'Факультет философии',                  location: 'Главный корпус' },
  { id: 12, name: 'Факультет социологии',                 location: 'IT-корпус' },
  { id: 13, name: 'Факультет журналистики',               location: 'IT-корпус' },
  { id: 14, name: 'Факультет архитектуры',                location: 'Спортивный комплекс' },
  { id: 15, name: 'Факультет медицины',                   location: 'Главный корпус' },
  { id: 16, name: 'Факультет педагогики',                 location: 'Главный корпус' },
  { id: 17, name: 'Факультет музыки',                     location: 'IT-корпус' },
  { id: 18, name: 'Факультет физической культуры',        location: 'Спортивный комплекс' },
  { id: 19, name: 'Факультет менеджмента',                location: 'IT-корпус' },
  { id: 20, name: 'Факультет дизайна',                    location: 'IT-корпус' },
  { id: 21, name: 'Факультет политологии',                location: 'Главный корпус' },
  { id: 22, name: 'Факультет экологии',                   location: 'Главный корпус' },
  { id: 23, name: 'Факультет географии',                  location: 'Главный корпус' },
  { id: 24, name: 'Факультет робототехники',              location: 'IT-корпус' },
  { id: 25, name: 'Факультет кибербезопасности',          location: 'IT-корпус' },
];

const PAGE_SIZE_OPTIONS = [5, 10, 15];

type SortCol = 'name' | 'location';

export const FacultiesTab = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortKey, setSortKey] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const handleSort = (key: SortCol) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(0);
  };

  const SortIcon = ({ col }: { col: SortCol }) => {
    if (sortKey !== col) return <ArrowUpDown className={'ml-1 h-4 w-4'} />;
    return sortDir === 'asc'
      ? <ArrowUp className={'ml-1 h-4 w-4'} />
      : <ArrowDown className={'ml-1 h-4 w-4'} />;
  };

  const filtered = MOCK_FACULTIES.filter((f) =>
    [f.name, f.location]
      .join(' ')
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase()),
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const cmp = a[sortKey].localeCompare(b[sortKey], 'ru');
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
            <GraduationCap />
            <span className={'font-medium text-xl'}>Факультеты</span>
          </div>
          <span className={'text-muted-foreground text-sm'}>
            Управление факультетами и их локациями
          </span>
        </div>
        <Button>
          <Plus />
          <span>Добавить факультет</span>
        </Button>
      </div>

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={'Поиск факультетов...'}
      />

      <Table className={'table-fixed w-full'}>
        <colgroup>
          <col className={'w-[68%]'} />
          <col className={'w-[20%]'} />
          <col className={'w-[12%]'} />
        </colgroup>
        <TableHeader>
          <TableRow>
            {(['name', 'location'] as const).map((col) => (
              <TableHead
                key={col}
                className={'cursor-pointer select-none'}
                onClick={() => handleSort(col)}
              >
                <div className={'flex items-center'}>
                  {{ name: 'Название', location: 'Локация' }[col]}
                  <SortIcon col={col} />
                </div>
              </TableHead>
            ))}
            <TableHead className={'text-right'}>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((faculty) => (
            <TableRow key={faculty.id}>
              <TableCell className={'font-medium'}>{faculty.name}</TableCell>
              <TableCell>{faculty.location}</TableCell>
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
          {totalElements} факультетов
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
