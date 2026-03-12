import { ArrowDown, ArrowUp, ArrowUpDown, DoorOpen, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  Badge,
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

const MOCK_SPACES = [
  { id: 1,  name: 'Аудитория 101',   location: 'Главный корпус',    type: 'Аудитория',    floor: 1, capacity: 40 },
  { id: 2,  name: 'Аудитория 205',   location: 'Главный корпус',    type: 'Аудитория',    floor: 2, capacity: 50 },
  { id: 3,  name: 'Аудитория 301',   location: 'IT-корпус',         type: 'Аудитория',    floor: 3, capacity: 30 },
  { id: 4,  name: 'Лаборатория 401', location: 'IT-корпус',         type: 'Лаборатория',  floor: 4, capacity: 20 },
  { id: 5,  name: 'Зал №3',          location: 'Библиотека',        type: 'Читальный зал',floor: 2, capacity: 40 },
  { id: 6,  name: 'Спортзал',        location: 'Спортивный комплекс', type: 'Спортзал',  floor: 1, capacity: 100 },
  { id: 7,  name: 'Бассейн',         location: 'Спортивный комплекс', type: 'Бассейн',   floor: 1, capacity: 80 },
  { id: 8,  name: 'Конференц A',     location: 'Главный корпус',    type: 'Конференц-зал',floor: 3, capacity: 60 },
  { id: 9,  name: 'Конференц B',     location: 'IT-корпус',         type: 'Конференц-зал',floor: 2, capacity: 25 },
  { id: 10, name: 'Актовый зал',     location: 'Главный корпус',    type: 'Актовый зал',  floor: 1, capacity: 500 },
  { id: 11, name: 'Студия звукозаписи', location: 'IT-корпус',      type: 'Студия',       floor: 3, capacity: 10 },
  { id: 12, name: 'Коворкинг',       location: 'IT-корпус',         type: 'Коворкинг',    floor: 1, capacity: 35 },
  { id: 13, name: 'Лаборатория химии', location: 'Главный корпус',  type: 'Лаборатория',  floor: 2, capacity: 20 },
  { id: 14, name: 'Лаборатория физики', location: 'Главный корпус', type: 'Лаборатория',  floor: 3, capacity: 20 },
  { id: 15, name: 'Тренажёрный зал', location: 'Спортивный комплекс', type: 'Спортзал',  floor: 2, capacity: 45 },
  { id: 16, name: 'Читальный зал',   location: 'Библиотека',        type: 'Читальный зал',floor: 1, capacity: 60 },
  { id: 17, name: 'Аудитория 502',   location: 'IT-корпус',         type: 'Аудитория',    floor: 5, capacity: 30 },
  { id: 18, name: 'Переговорная 1',  location: 'Главный корпус',    type: 'Переговорная', floor: 4, capacity: 12 },
  { id: 19, name: 'Переговорная 2',  location: 'Главный корпус',    type: 'Переговорная', floor: 4, capacity: 12 },
  { id: 20, name: 'Музейный зал',    location: 'Главный корпус',    type: 'Выставочный зал', floor: 1, capacity: 70 },
  { id: 21, name: 'Лекционный зал',  location: 'IT-корпус',         type: 'Аудитория',    floor: 1, capacity: 120 },
  { id: 22, name: 'Мастерская',      location: 'Спортивный комплекс', type: 'Мастерская', floor: 1, capacity: 15 },
  { id: 23, name: 'Зал единоборств', location: 'Спортивный комплекс', type: 'Спортзал',  floor: 2, capacity: 30 },
  { id: 24, name: 'Архивный зал',    location: 'Библиотека',        type: 'Архив',        floor: 3, capacity: 8 },
  { id: 25, name: 'Серверная',       location: 'IT-корпус',         type: 'Техническое помещение', floor: 5, capacity: 5 },
];

const PAGE_SIZE_OPTIONS = [5, 10, 15];

type SortCol = 'name' | 'location' | 'type' | 'floor' | 'capacity';

export const SpacesTab = () => {
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

  const filtered = MOCK_SPACES.filter((s) =>
    [s.name, s.location, s.type, String(s.floor), String(s.capacity)]
      .join(' ')
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase()),
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const cmp =
          typeof aVal === 'number' && typeof bVal === 'number'
            ? aVal - bVal
            : String(aVal).localeCompare(String(bVal), 'ru');
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : filtered;

  const totalElements = sorted.length;
  const totalPages = Math.ceil(totalElements / pageSize);
  const paginated = sorted.slice(page * pageSize, page * pageSize + pageSize);

  const SORTABLE_COLS = ['name', 'location', 'type', 'floor', 'capacity'] as const;
  const COL_LABELS: Record<SortCol, string> = {
    name: 'Название',
    location: 'Локация',
    type: 'Тип пространства',
    floor: 'Этаж',
    capacity: 'Вместимость',
  };

  return (
    <div className={'flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'}>
      <div className={'flex justify-between items-center'}>
        <div className={'flex flex-col'}>
          <div className={'flex gap-2 items-center'}>
            <DoorOpen />
            <span className={'font-medium text-xl'}>Кабинеты и аудитории</span>
          </div>
          <span className={'text-muted-foreground text-sm'}>
            Управление помещениями для мероприятий
          </span>
        </div>
        <Button>
          <Plus />
          <span>Добавить кабинет</span>
        </Button>
      </div>

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={'Поиск кабинетов...'}
      />

      <Table className={'table-fixed w-full'}>
        <colgroup>
          <col className={'w-[22%]'} />
          <col className={'w-[20%]'} />
          <col className={'w-[20%]'} />
          <col className={'w-[10%]'} />
          <col className={'w-[16%]'} />
          <col className={'w-[12%]'} />
        </colgroup>
        <TableHeader>
          <TableRow>
            {SORTABLE_COLS.map((col) => (
              <TableHead
                key={col}
                className={'cursor-pointer select-none'}
                onClick={() => handleSort(col)}
              >
                <div className={'flex items-center'}>
                  {COL_LABELS[col]}
                  <SortIcon col={col} />
                </div>
              </TableHead>
            ))}
            <TableHead className={'text-right'}>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((space) => (
            <TableRow key={space.id}>
              <TableCell className={'font-medium'}>{space.name}</TableCell>
              <TableCell>{space.location}</TableCell>
              <TableCell>{space.type}</TableCell>
              <TableCell>
                <Badge variant={'outline'}>{space.floor} этаж</Badge>
              </TableCell>
              <TableCell>{space.capacity} чел.</TableCell>
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
          {totalElements} помещений
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
