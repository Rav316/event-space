import { ArrowDown, ArrowUp, ArrowUpDown, MapPin, Pencil, Plus, Trash2 } from 'lucide-react';
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

const MOCK_LOCATIONS = [
  { id: 1,  name: 'Главный корпус',             address: 'ул. Ленина, 1' },
  { id: 2,  name: 'IT-корпус',                  address: 'ул. Ленина, 3' },
  { id: 3,  name: 'Спортивный комплекс',        address: 'ул. Спортивная, 15' },
  { id: 4,  name: 'Актовый зал',                address: 'ул. Ленина, 1' },
  { id: 5,  name: 'Библиотека',                 address: 'ул. Университетская, 10' },
  { id: 6,  name: 'Конференц-зал №1',           address: 'ул. Ленина, 1' },
  { id: 7,  name: 'Конференц-зал №2',           address: 'ул. Ленина, 3' },
  { id: 8,  name: 'Лекционная аудитория 201',   address: 'ул. Ленина, 3' },
  { id: 9,  name: 'Лаборатория робототехники',  address: 'ул. Ленина, 5' },
  { id: 10, name: 'Коворкинг-пространство',     address: 'ул. Ленина, 5' },
  { id: 11, name: 'Студенческий клуб',          address: 'ул. Парковая, 2' },
  { id: 12, name: 'Столовая',                   address: 'ул. Университетская, 10' },
  { id: 13, name: 'Медицинский кабинет',        address: 'ул. Парковая, 2' },
  { id: 14, name: 'Актовый зал №2',             address: 'ул. Спортивная, 15' },
  { id: 15, name: 'Лаборатория химии',          address: 'ул. Ленина, 7' },
  { id: 16, name: 'Лаборатория физики',         address: 'ул. Ленина, 7' },
  { id: 17, name: 'Читальный зал',              address: 'ул. Университетская, 10' },
  { id: 18, name: 'Бассейн',                    address: 'ул. Спортивная, 17' },
  { id: 19, name: 'Тренажёрный зал',            address: 'ул. Спортивная, 15' },
  { id: 20, name: 'Аудитория 305',              address: 'ул. Ленина, 3' },
  { id: 21, name: 'Деканат',                    address: 'ул. Ленина, 1' },
  { id: 22, name: 'Музей университета',         address: 'ул. Университетская, 12' },
  { id: 23, name: 'Пресс-центр',                address: 'ул. Университетская, 12' },
  { id: 24, name: 'Кабинет психолога',          address: 'ул. Парковая, 2' },
  { id: 25, name: 'Зал заседаний учёного совета', address: 'ул. Ленина, 1' },
];

const PAGE_SIZE_OPTIONS = [5, 10, 15];

type SortCol = 'name' | 'address';

export const LocationTab = () => {
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

  const filtered = MOCK_LOCATIONS.filter((loc) =>
    [loc.name, loc.address]
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
            <MapPin />
            <span className={'font-medium text-xl'}>Локации и адреса</span>
          </div>
          <span className={'text-muted-foreground text-sm'}>
            Управление местами проведения мероприятий
          </span>
        </div>
        <Button>
          <Plus />
          <span>Добавить локацию</span>
        </Button>
      </div>

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={'Поиск локаций...'}
      />

      <Table className={'table-fixed w-full'}>
        <colgroup>
          <col className={'w-[40%]'} />
          <col className={'w-[48%]'} />
          <col className={'w-[12%]'} />
        </colgroup>
        <TableHeader>
          <TableRow>
            {(['name', 'address'] as const).map((col) => (
              <TableHead
                key={col}
                className={'cursor-pointer select-none'}
                onClick={() => handleSort(col)}
              >
                <div className={'flex items-center'}>
                  {{ name: 'Название', address: 'Адрес' }[col]}
                  <SortIcon col={col} />
                </div>
              </TableHead>
            ))}
            <TableHead className={'text-right'}>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((loc) => (
            <TableRow key={loc.id}>
              <TableCell className={'font-medium'}>{loc.name}</TableCell>
              <TableCell>{loc.address}</TableCell>
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
          {totalElements} локаций
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
}
