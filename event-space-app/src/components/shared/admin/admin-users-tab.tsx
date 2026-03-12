import { SearchInput, UserAvatar } from '@/components/shared';
import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  Textarea,
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

const mockUsers = [
  {
    id: 1,
    firstName: 'Тестовый',
    lastName: 'Пользователь',
    email: 'test@test.com',
    role: 'student',
    faculty: 'Информационные технологии',
    course: '3 курс',
    status: 'active',
  },
  {
    id: 2,
    firstName: 'Алексей',
    lastName: 'Иванов',
    email: 'teacher@campus.ru',
    role: 'teacher',
    faculty: 'Информационные технологии',
    status: 'active',
  },
  {
    id: 3,
    firstName: 'Иван',
    lastName: 'Петров',
    email: 'petrov@campus.ru',
    role: 'student',
    faculty: 'Экономический факультет',
    course: '2 курс',
    status: 'blocked',
  },
  {
    id: 4,
    firstName: 'Анна',
    lastName: 'Сидорова',
    email: 'sidorova@campus.ru',
    role: 'student',
    faculty: 'Юридический факультет',
    course: '1 курс',
    status: 'pending',
  },
  {
    id: 5,
    firstName: 'Дмитрий',
    lastName: 'Кузнецов',
    email: 'kuznetsov@campus.ru',
    role: 'student',
    faculty: 'Физико-математический факультет',
    course: '4 курс',
    status: 'active',
  },
  {
    id: 6,
    firstName: 'Олег',
    lastName: 'Смирнов',
    email: 'smirnov@campus.ru',
    role: 'student',
    faculty: 'Факультет дизайна и искусств',
    course: '3 курс',
    status: 'blocked',
  },
  {
    id: 7,
    firstName: 'Елена',
    lastName: 'Морозова',
    email: 'morozova@campus.ru',
    role: 'teacher',
    faculty: 'Экономический факультет',
    status: 'pending',
  },
  {
    id: 8,
    firstName: 'Сергей',
    lastName: 'Николаев',
    email: 'nikolaev@campus.ru',
    role: 'student',
    faculty: 'Информационные технологии',
    course: '1 курс',
    status: 'active',
  },
  {
    id: 9,
    firstName: 'Мария',
    lastName: 'Попова',
    email: 'popova@campus.ru',
    role: 'teacher',
    faculty: 'Юридический факультет',
    status: 'active',
  },
  {
    id: 10,
    firstName: 'Артём',
    lastName: 'Волков',
    email: 'volkov@campus.ru',
    role: 'student',
    faculty: 'Экономический факультет',
    course: '3 курс',
    status: 'pending',
  },
  {
    id: 11,
    firstName: 'Наталья',
    lastName: 'Козлова',
    email: 'kozlova@campus.ru',
    role: 'teacher',
    faculty: 'Физико-математический факультет',
    status: 'active',
  },
  {
    id: 12,
    firstName: 'Павел',
    lastName: 'Лебедев',
    email: 'lebedev@campus.ru',
    role: 'student',
    faculty: 'Факультет дизайна и искусств',
    course: '2 курс',
    status: 'blocked',
  },
  {
    id: 13,
    firstName: 'Юлия',
    lastName: 'Новикова',
    email: 'novikova@campus.ru',
    role: 'student',
    faculty: 'Информационные технологии',
    course: '4 курс',
    status: 'active',
  },
  {
    id: 14,
    firstName: 'Андрей',
    lastName: 'Соколов',
    email: 'sokolov@campus.ru',
    role: 'teacher',
    faculty: 'Экономический факультет',
    status: 'pending',
  },
  {
    id: 15,
    firstName: 'Ирина',
    lastName: 'Михайлова',
    email: 'mikhaylova@campus.ru',
    role: 'student',
    faculty: 'Юридический факультет',
    course: '3 курс',
    status: 'active',
  },
  {
    id: 16,
    firstName: 'Роман',
    lastName: 'Орлов',
    email: 'orlov@campus.ru',
    role: 'student',
    faculty: 'Физико-математический факультет',
    course: '1 курс',
    status: 'blocked',
  },
  {
    id: 17,
    firstName: 'Екатерина',
    lastName: 'Виноградова',
    email: 'vinogradova@campus.ru',
    role: 'teacher',
    faculty: 'Факультет дизайна и искусств',
    status: 'active',
  },
  {
    id: 18,
    firstName: 'Максим',
    lastName: 'Захаров',
    email: 'zakharov@campus.ru',
    role: 'student',
    faculty: 'Информационные технологии',
    course: '2 курс',
    status: 'pending',
  },
  {
    id: 19,
    firstName: 'Светлана',
    lastName: 'Федорова',
    email: 'fedorova@campus.ru',
    role: 'student',
    faculty: 'Экономический факультет',
    course: '4 курс',
    status: 'active',
  },
  {
    id: 20,
    firstName: 'Константин',
    lastName: 'Белов',
    email: 'belov@campus.ru',
    role: 'teacher',
    faculty: 'Юридический факультет',
    status: 'blocked',
  },
  {
    id: 21,
    firstName: 'Татьяна',
    lastName: 'Громова',
    email: 'gromova@campus.ru',
    role: 'student',
    faculty: 'Физико-математический факультет',
    course: '3 курс',
    status: 'active',
  },
  {
    id: 22,
    firstName: 'Виктор',
    lastName: 'Зайцев',
    email: 'zaytsev@campus.ru',
    role: 'student',
    faculty: 'Факультет дизайна и искусств',
    course: '1 курс',
    status: 'pending',
  },
  {
    id: 23,
    firstName: 'Ольга',
    lastName: 'Тихонова',
    email: 'tikhonova@campus.ru',
    role: 'teacher',
    faculty: 'Информационные технологии',
    status: 'active',
  },
  {
    id: 24,
    firstName: 'Денис',
    lastName: 'Борисов',
    email: 'borisov@campus.ru',
    role: 'student',
    faculty: 'Экономический факультет',
    course: '2 курс',
    status: 'active',
  },
  {
    id: 25,
    firstName: 'Людмила',
    lastName: 'Крылова',
    email: 'krylova@campus.ru',
    role: 'student',
    faculty: 'Юридический факультет',
    course: '4 курс',
    status: 'blocked',
  },
  {
    id: 26,
    firstName: 'Игорь',
    lastName: 'Власов',
    email: 'vlasov@campus.ru',
    role: 'teacher',
    faculty: 'Физико-математический факультет',
    status: 'pending',
  },
];

const roleLabels = { student: 'Студент', teacher: 'Организатор' };
const statusOrder = { active: 0, pending: 1, blocked: 2 };

type SortCol = 'name' | 'role' | 'faculty' | 'status';

function sortUsers(users: typeof mockUsers, key: SortCol, dir: 'asc' | 'desc') {
  return [...users].sort((a, b) => {
    let cmp = 0;
    if (key === 'name')
      cmp = `${a.lastName} ${a.firstName}`.localeCompare(
        `${b.lastName} ${b.firstName}`,
        'ru',
      );
    else if (key === 'role') cmp = a.role.localeCompare(b.role);
    else if (key === 'faculty') cmp = a.faculty.localeCompare(b.faculty, 'ru');
    else if (key === 'status')
      cmp =
        statusOrder[a.status as keyof typeof statusOrder] -
        statusOrder[b.status as keyof typeof statusOrder];
    return dir === 'asc' ? cmp : -cmp;
  });
}

export const AdminUsersTab = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [blockTarget, setBlockTarget] = useState<number[] | null>(null);
  const [blockReason, setBlockReason] = useState('');

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
    ? mockUsers.filter((u) => {
        const q = search.toLowerCase();
        return (
          u.firstName.toLowerCase().includes(q) ||
          u.lastName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
        );
      })
    : mockUsers;

  const filteredUsers = sortKey
    ? sortUsers(filtered, sortKey, sortDir)
    : filtered;
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const pageUsers = filteredUsers.slice(page * pageSize, (page + 1) * pageSize);
  const pageIds = pageUsers.map((u) => u.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const somePageSelected = pageIds.some((id) => selected.has(id));

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) pageIds.forEach((id) => next.delete(id));
      else pageIds.forEach((id) => next.add(id));
      return next;
    });
  };

  const toggleOne = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openBlockModal = (ids: number[]) => {
    setBlockTarget(ids);
    setBlockReason('');
  };

  const handleBlockConfirm = () => {
    console.log('Block users:', blockTarget, 'Reason:', blockReason);
    setBlockTarget(null);
    setBlockReason('');
  };

  return (
    <div className={'border border-[#E5E5E5] rounded-2xl p-5 flex flex-col gap-4'}>
      <div className={'flex items-center justify-between'}>
        <span className={'font-medium text-lg'}>Управление пользователями</span>
        <div
          className={`flex items-center gap-2 transition-opacity ${selected.size > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <span className={'text-sm text-muted-foreground'}>
            {selected.size} выбрано
          </span>
          <Button
            variant="outline"
            size="sm"
            className={'text-red-600 border-red-200 hover:bg-red-50 gap-1'}
            onClick={() => openBlockModal([...selected])}
          >
            <Ban className={'w-3 h-3'} />
            Заблокировать
          </Button>
        </div>
      </div>

      <SearchInput
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        placeholder="Поиск по имени или email..."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={'w-10'}>
              <Checkbox
                checked={
                  somePageSelected && !allPageSelected
                    ? 'indeterminate'
                    : allPageSelected
                }
                onCheckedChange={toggleAll}
                aria-label="Выбрать всех"
              />
            </TableHead>
            {(['name', 'role', 'faculty', 'status'] as const).map((col) => (
              <TableHead
                key={col}
                className={'cursor-pointer select-none'}
                onClick={() => handleSort(col)}
              >
                <div className={'flex items-center gap-1'}>
                  {
                    {
                      name: 'Пользователь',
                      role: 'Роль',
                      faculty: 'Факультет/Курс',
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
          {pageUsers.map((user) => (
            <TableRow
              key={user.id}
              data-state={selected.has(user.id) ? 'selected' : undefined}
            >
              <TableCell>
                <Checkbox
                  checked={selected.has(user.id)}
                  onCheckedChange={() => toggleOne(user.id)}
                  aria-label="Выбрать пользователя"
                />
              </TableCell>
              <TableCell>
                <div className={'flex items-center gap-3'}>
                  <UserAvatar
                    firstName={user.firstName}
                    lastName={user.lastName}
                  />
                  <div className={'flex flex-col'}>
                    <span className={'font-medium'}>
                      {user.firstName} {user.lastName}
                    </span>
                    <span className={'text-xs text-muted-foreground'}>
                      {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {roleLabels[user.role as keyof typeof roleLabels]}
                </Badge>
              </TableCell>
              <TableCell>
                <div className={'flex flex-col'}>
                  <span>{user.faculty}</span>
                  {user.course && (
                    <span className={'text-xs text-muted-foreground'}>
                      {user.course}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge>
                  {user.status === 'active'
                    ? 'Активен'
                    : user.status === 'blocked'
                      ? 'Заблокирован'
                      : 'Ожидает'}
                </Badge>
              </TableCell>
              <TableCell className={'text-right'}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className={'h-8 w-8'}>
                      <Settings className={'w-4 h-4 text-muted-foreground'} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user.status !== 'blocked' ? (
                      <DropdownMenuItem
                        className={'text-red-600 gap-2 cursor-pointer'}
                        onClick={() => openBlockModal([user.id])}
                      >
                        <Ban className={'w-4 h-4'} /> Заблокировать
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className={'text-green-600 gap-2 cursor-pointer'}>
                        <CheckCircle className={'w-4 h-4'} /> Разблокировать
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className={'flex items-center justify-between'}>
        <span className={'text-sm text-muted-foreground'}>
          {selected.size} из {filteredUsers.length} строк выбрано.
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

      <Dialog open={blockTarget !== null} onOpenChange={(open) => !open && setBlockTarget(null)}>
        <DialogContent className={'sm:max-w-md'}>
          <DialogHeader>
            <DialogTitle>Заблокировать пользователя{blockTarget && blockTarget.length > 1 ? 'й' : ''}</DialogTitle>
          </DialogHeader>
          <div className={'flex flex-col gap-2'}>
            <span className={'text-sm text-muted-foreground'}>
              {blockTarget && blockTarget.length > 1
                ? `Будет заблокировано ${blockTarget.length} пользователей.`
                : 'Укажите причину блокировки.'}
            </span>
            <Textarea
              placeholder={'Причина блокировки...'}
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              maxLength={128}
              className={'resize-none min-h-20 max-h-40 overflow-y-auto break-all'}
            />
            <span className={`text-xs self-end ${blockReason.length >= 128 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {blockReason.length}/128
            </span>
          </div>
          <DialogFooter>
            <Button variant={'outline'} onClick={() => setBlockTarget(null)}>
              Отмена
            </Button>
            <Button
              variant={'destructive'}
              onClick={handleBlockConfirm}
              disabled={!blockReason.trim()}
            >
              <Ban className={'w-4 h-4 mr-1'} />
              Заблокировать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
