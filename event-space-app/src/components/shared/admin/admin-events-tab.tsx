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
  CheckCircle,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

const PAGE_SIZE_OPTIONS = [10, 15, 25];

const mockEvents = [
  {
    id: 1,
    title: 'Хакатон AI Challenge 2024',
    organizer: 'Проф. Иванов А.С.',
    category: 'IT-секции',
    date: '2024-02-25',
    participants: 156,
    maxParticipants: 200,
    status: 'active',
  },
  {
    id: 2,
    title: 'Концерт студенческого хора',
    organizer: 'Анна Петрова',
    category: 'Культурные',
    date: '2024-02-28',
    participants: 45,
    maxParticipants: 100,
    status: 'active',
  },
  {
    id: 3,
    title: 'Мастер-класс по веб-дизайну',
    organizer: 'Мария Сидорова',
    category: 'Мастер-классы',
    date: '2024-03-05',
    participants: 30,
    maxParticipants: 50,
    status: 'active',
  },
  {
    id: 4,
    title: 'Спортивный турнир по футболу',
    organizer: 'Дмитрий Козлов',
    category: 'Спортивные',
    date: '2024-03-12',
    participants: 0,
    maxParticipants: 22,
    status: 'draft',
  },
  {
    id: 5,
    title: 'Научная конференция "Будущее технологий"',
    organizer: 'Проф. Смирнова Е.В.',
    category: 'Научные',
    date: '2024-01-20',
    participants: 120,
    maxParticipants: 150,
    status: 'completed',
  },
  {
    id: 6,
    title: 'Вечеринка "Welcome Students"',
    organizer: 'Иван Петров',
    category: 'Культурные',
    date: '2024-02-15',
    participants: 85,
    maxParticipants: 100,
    status: 'cancelled',
  },
  {
    id: 7,
    title: 'Олимпиада по математике',
    organizer: 'Проф. Белова Т.И.',
    category: 'Научные',
    date: '2024-03-20',
    participants: 60,
    maxParticipants: 80,
    status: 'active',
  },
  {
    id: 8,
    title: 'Фотовыставка "Наш кампус"',
    organizer: 'Екатерина Новикова',
    category: 'Культурные',
    date: '2024-03-18',
    participants: 0,
    maxParticipants: 300,
    status: 'draft',
  },
  {
    id: 9,
    title: 'Лекция по кибербезопасности',
    organizer: 'Алексей Громов',
    category: 'IT-секции',
    date: '2024-02-10',
    participants: 95,
    maxParticipants: 100,
    status: 'completed',
  },
  {
    id: 10,
    title: 'Турнир по настольному теннису',
    organizer: 'Сергей Волков',
    category: 'Спортивные',
    date: '2024-03-25',
    participants: 16,
    maxParticipants: 32,
    status: 'active',
  },
  {
    id: 11,
    title: 'Воркшоп по UX/UI дизайну',
    organizer: 'Ольга Тихонова',
    category: 'Мастер-классы',
    date: '2024-04-02',
    participants: 0,
    maxParticipants: 25,
    status: 'draft',
  },
  {
    id: 12,
    title: 'День открытых дверей факультета ИТ',
    organizer: 'Проф. Захаров М.В.',
    category: 'Научные',
    date: '2024-03-30',
    participants: 200,
    maxParticipants: 500,
    status: 'active',
  },
];

const statusOrder = { active: 0, draft: 1, completed: 2, cancelled: 3 };

type SortCol = 'title' | 'category' | 'date' | 'participants' | 'status';

function sortEvents(events: typeof mockEvents, key: SortCol, dir: 'asc' | 'desc') {
  return [...events].sort((a, b) => {
    let cmp = 0;
    if (key === 'title') cmp = a.title.localeCompare(b.title, 'ru');
    else if (key === 'category') cmp = a.category.localeCompare(b.category, 'ru');
    else if (key === 'date') cmp = a.date.localeCompare(b.date);
    else if (key === 'participants') cmp = a.participants - b.participants;
    else if (key === 'status')
      cmp =
        statusOrder[a.status as keyof typeof statusOrder] -
        statusOrder[b.status as keyof typeof statusOrder];
    return dir === 'asc' ? cmp : -cmp;
  });
}

const statusConfig = {
  active: { label: 'Активен', className: 'bg-green-100 text-green-700 border-green-200' },
  draft: { label: 'Черновик', className: 'bg-gray-100 text-gray-700 border-gray-200' },
  completed: { label: 'Завершено', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  cancelled: { label: 'Отменено', className: 'bg-red-600 text-white border-red-600' },
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
  const [sortKey, setSortKey] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

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

  const filtered = search.trim()
    ? mockEvents.filter((e) => {
        const q = search.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
        );
      })
    : mockEvents;

  const filteredEvents = sortKey ? sortEvents(filtered, sortKey, sortDir) : filtered;
  const totalPages = Math.ceil(filteredEvents.length / pageSize);
  const pageEvents = filteredEvents.slice(page * pageSize, (page + 1) * pageSize);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className={'border border-[#E5E5E5] rounded-2xl p-5 flex flex-col gap-4'}>
      <div className={'flex items-center justify-between min-h-8'}>
        <span className={'font-medium text-lg'}>Управление мероприятиями</span>
      </div>

      <SearchInput
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        placeholder="Поиск по названию, организатору или категории..."
      />

      <Table>
        <TableHeader>
          <TableRow>
            {(['title', 'category', 'date', 'participants', 'status'] as const).map((col) => (
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
                      status: 'Статус',
                    }[col]
                  }
                  <SortIcon col={col} />
                </div>
              </TableHead>
            ))}
            <TableHead className={'text-right'}>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageEvents.map((event) => {
            const sc = statusConfig[event.status as keyof typeof statusConfig];
            return (
              <TableRow key={event.id}>
                <TableCell>
                  <div className={'flex flex-col'}>
                    <span className={'font-medium'}>{event.title}</span>
                    <span className={'text-xs text-muted-foreground'}>{event.organizer}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{event.category}</Badge>
                </TableCell>
                <TableCell className={'whitespace-nowrap'}>{formatDate(event.date)}</TableCell>
                <TableCell>
                  <ParticipantsBar current={event.participants} max={event.maxParticipants} />
                </TableCell>
                <TableCell>
                  <Badge className={sc.className}>{sc.label}</Badge>
                </TableCell>
                <TableCell className={'text-right'}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className={'h-8 w-8'}>
                        <Settings className={'w-4 h-4 text-muted-foreground'} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {event.status !== 'cancelled' ? (
                        <DropdownMenuItem className={'text-red-600 gap-2 cursor-pointer'}>
                          <Ban className={'w-4 h-4'} /> Отменить
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className={'text-green-600 gap-2 cursor-pointer'}>
                          <CheckCircle className={'w-4 h-4'} /> Восстановить
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className={'flex items-center justify-between'}>
        <span className={'text-sm text-muted-foreground'}>
          {filteredEvents.length} мероприятий
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
