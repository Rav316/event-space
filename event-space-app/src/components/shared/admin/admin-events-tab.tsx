import { SearchInput } from '@/components/shared';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Ban,
  Settings,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useEventsByFilter } from '@/api/admin/hooks.ts';
import { categoryColors } from '@/constants/category-colors.ts';
import { eventStatuses } from '@/constants/event-statuses.ts';

const PAGE_SIZE_OPTIONS = [10, 15, 25];

type SortCol = 'title' | 'category' | 'date' | 'participants';

const sortColToParam: Record<SortCol, string> = {
  title: 'name',
  category: 'category',
  date: 'date',
  participants: 'registeredUsers',
};


function ParticipantsBar({ current, max }: { current: number; max: number }) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  return (
    <div className={'flex items-center gap-2'}>
      <span className={'text-sm whitespace-nowrap w-[60px] text-right inline-block'}>{current}/{max}</span>
      <div className={'h-2 rounded-full bg-gray-200 w-[70px] shrink-0'}>
        <div className={'h-2 rounded-full bg-gray-700'} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export const AdminEventsTab = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [sortKey, setSortKey] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const sort = sortKey ? `${sortColToParam[sortKey]},${sortDir}` : undefined;
  const { data, isLoading } = useEventsByFilter(
    { page, size: pageSize, search: debouncedSearch.trim() || undefined },
    sort,
  );

  const events = data?.content ?? [];
  const totalElements = data?.metadata.totalElements ?? 0;
  const totalPages = data ? Math.ceil(totalElements / pageSize) : 0;

  const handleSort = (key: SortCol) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(0);
  };

  const SortIcon = ({ col }: { col: SortCol }) => {
    if (sortKey !== col) return <ArrowUpDown className={'ml-2 h-4 w-4'} />;
    return sortDir === 'asc' ? (
      <ArrowUp className={'ml-2 h-4 w-4'} />
    ) : (
      <ArrowDown className={'ml-2 h-4 w-4'} />
    );
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div
      className={'border border-[#E5E5E5] rounded-2xl p-5 flex flex-col gap-4'}
    >
      <div className={'flex items-center justify-between min-h-8'}>
        <span className={'font-medium text-lg'}>Управление мероприятиями</span>
      </div>

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск по названию, организатору или категории..."
      />

      <Table className={'table-fixed w-full'}>
        <colgroup>
          <col className={'w-[35%]'} />
          <col className={'w-[15%]'} />
          <col className={'w-[15%]'} />
          <col className={'w-[18%]'} />
          <col className={'w-[10%]'} />
          <col className={'w-[7%]'} />
        </colgroup>
        <TableHeader>
          <TableRow>
            {(['title', 'category', 'date', 'participants'] as const).map(
              (col) => (
                <TableHead
                  key={col}
                  className={'cursor-pointer select-none'}
                  onClick={() => handleSort(col)}
                >
                  <div className={'flex items-center gap-1'}>
                    {
                      {
                        title: 'Мероприятие',
                        category: 'Категория',
                        date: 'Дата',
                        participants: 'Участники',
                      }[col]
                    }
                    <SortIcon col={col} />
                  </div>
                </TableHead>
              ),
            )}
            <TableHead>Статус</TableHead>
            <TableHead className={'text-right'}>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}>
                    <div className={'h-8 bg-muted animate-pulse rounded'} />
                  </TableCell>
                </TableRow>
              ))
            : events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className={'flex flex-col'}>
                      <span className={'font-medium'}>{event.name}</span>
                      <span className={'text-xs text-muted-foreground'}>
                        {event.author}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={categoryColors[event.category.id - 1]}
                    >
                      {event.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell className={'whitespace-nowrap'}>
                    {formatDate(event.eventDate)}
                  </TableCell>
                  <TableCell>
                    <ParticipantsBar
                      current={event.registeredUsers}
                      max={event.participantQuantity}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge className={eventStatuses[event.status]?.className}>
                      {eventStatuses[event.status]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className={'text-right'}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={'h-8 w-8'}
                        >
                          <Settings
                            className={'w-4 h-4 text-muted-foreground'}
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className={'text-red-600 gap-2 cursor-pointer'}
                        >
                          <Ban className={'w-4 h-4'} /> Отменить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <div className={'flex items-center justify-between'}>
        <span className={'text-sm text-muted-foreground'}>
          {totalElements} мероприятий
        </span>
        <div className={'flex items-center gap-3'}>
          <div className={'flex items-center gap-2'}>
            <span className={'text-sm text-muted-foreground'}>
              Строк на странице
            </span>
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
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
            >
              Назад
            </Button>
            <Button
              variant="outline"
              size="sm"
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
