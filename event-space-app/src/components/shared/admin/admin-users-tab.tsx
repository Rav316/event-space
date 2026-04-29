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
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { userRoles } from '@/constants/user-roles.ts';
import { useUsersByFilter } from '@/api/admin/hooks.ts';
import { getAvatarUrl } from '@/utils/get-avatar-url.ts';
import {
  useBlockUser,
  useBlockUsers,
  useChangeUserRole,
  useUnlockUser,
} from '@/api/users/hooks.ts';
import { useMe } from '@/api/auth/hooks.ts';

const PAGE_SIZE_OPTIONS = [10, 15, 25];

const roleLabels: Record<number, string> = Object.fromEntries(
  userRoles.map((label, index) => [index, label]),
);

type SortCol = 'name' | 'role' | 'program' | 'status';

const sortColToParam: Record<SortCol, string> = {
  name: 'fullName',
  role: 'role',
  program: 'program',
  status: 'status',
};

export const AdminUsersTab = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [sortKey, setSortKey] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [blockTarget, setBlockTarget] = useState<number[] | null>(null);
  const [blockReason, setBlockReason] = useState('');
  const [roleTarget, setRoleTarget] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const { data: meData } = useMe();
  const currentUserId = meData?.user.id;

  const blockUserMutation = useBlockUser();
  const blockUsersMutation = useBlockUsers();
  const unlockUserMutation = useUnlockUser();
  const changeRoleMutation = useChangeUserRole();

  useEffect(() => {
    setPage(0);
    setSelected(new Set());
  }, [debouncedSearch]);

  const sort = sortKey ? `${sortColToParam[sortKey]},${sortDir}` : undefined;
  const { data, isLoading } = useUsersByFilter(
    { page, size: pageSize, search: debouncedSearch.trim() || undefined },
    sort,
  );

  const users = data?.content ?? [];
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

  const pageIds = users.filter((u) => u.id !== currentUserId).map((u) => u.id);
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
    if (id === currentUserId) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openRoleModal = (userId: number, currentRole: number) => {
    setRoleTarget(userId);
    setSelectedRole(String(currentRole));
  };

  const closeRoleModal = () => {
    setRoleTarget(null);
    setSelectedRole('');
  };

  const handleRoleConfirm = () => {
    if (roleTarget === null || selectedRole === '') return;
    changeRoleMutation.mutate(
      { id: roleTarget, role: Number(selectedRole) },
      { onSuccess: closeRoleModal },
    );
  };

  const openBlockModal = (ids: number[]) => {
    setBlockTarget(ids);
    setBlockReason('');
  };

  const closeBlockModal = () => {
    setBlockTarget(null);
    setBlockReason('');
  };

  const handleBlockConfirm = () => {
    if (!blockTarget) return;
    if (blockTarget.length === 1) {
      blockUserMutation.mutate(
        { id: blockTarget[0], reason: blockReason },
        {
          onSuccess: () => {
            closeBlockModal();
            setSelected(new Set());
          },
        },
      );
    } else {
      blockUsersMutation.mutate(blockTarget, {
        onSuccess: () => {
          closeBlockModal();
          setSelected(new Set());
        },
      });
    }
  };

  return (
    <div
      className={'border border-[#E8E8E8] rounded-2xl p-5 flex flex-col gap-4'}
    >
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
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск по имени или email..."
      />

      <Table className={'table-fixed w-full'}>
        <colgroup>
          <col className={'w-10'} />
          <col className={'w-[35%]'} />
          <col className={'w-[15%]'} />
          <col className={'w-[25%]'} />
          <col className={'w-[13%]'} />
          <col className={'w-[7%]'} />
        </colgroup>
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
            {(['name', 'role', 'program', 'status'] as const).map((col) => (
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
                      program: 'Направление/Курс',
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
          {isLoading
            ? Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}>
                    <div className={'h-8 bg-muted animate-pulse rounded'} />
                  </TableCell>
                </TableRow>
              ))
            : users.map((user) => (
                <TableRow
                  key={user.id}
                  data-state={selected.has(user.id) ? 'selected' : undefined}
                >
                  <TableCell>
                    <Checkbox
                      checked={selected.has(user.id)}
                      onCheckedChange={() => toggleOne(user.id)}
                      disabled={user.id === currentUserId}
                      aria-label="Выбрать пользователя"
                    />
                  </TableCell>
                  <TableCell>
                    <div className={'flex items-center gap-3'}>
                      <UserAvatar
                        firstName={user.firstName}
                        lastName={user.lastName}
                        avatarUrl={getAvatarUrl(user.avatarUrl)}
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
                      {roleLabels[user.role] ?? 'Неизвестно'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={'flex flex-col'}>
                      <span>{user.program?.name}</span>
                      {user.course != null && (
                        <span className={'text-xs text-muted-foreground'}>
                          {user.course} курс
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.active ? 'default' : 'destructive'}>
                      {user.active ? 'Активен' : 'Заблокирован'}
                    </Badge>
                  </TableCell>
                  <TableCell className={'text-right'}>
                    {user.id !== currentUserId && (
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
                            className={'gap-2 cursor-pointer'}
                            onClick={() => openRoleModal(user.id, user.role)}
                          >
                            <ShieldCheck className={'w-4 h-4'} /> Изменить роль
                          </DropdownMenuItem>
                          {user.active ? (
                            <DropdownMenuItem
                              className={'text-red-600 gap-2 cursor-pointer'}
                              onClick={() => openBlockModal([user.id])}
                            >
                              <Ban className={'w-4 h-4'} /> Заблокировать
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className={'text-green-600 gap-2 cursor-pointer'}
                              onClick={() => unlockUserMutation.mutate(user.id)}
                            >
                              <CheckCircle className={'w-4 h-4'} />{' '}
                              Разблокировать
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <div className={'flex items-center justify-between'}>
        <span className={'text-sm text-muted-foreground'}>
          {selected.size} из {totalElements} строк выбрано.
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
              <SelectTrigger className={'h-8 w-[70px]'}>
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

      <Dialog
        open={roleTarget !== null}
        onOpenChange={(open) => !open && closeRoleModal()}
      >
        <DialogContent className={'sm:max-w-sm'}>
          <DialogHeader>
            <DialogTitle>Изменить роль</DialogTitle>
          </DialogHeader>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите роль" />
            </SelectTrigger>
            <SelectContent>
              {userRoles.map((label, index) => (
                <SelectItem key={index} value={String(index)}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant={'outline'} onClick={closeRoleModal}>
              Отмена
            </Button>
            <Button
              onClick={handleRoleConfirm}
              disabled={changeRoleMutation.isPending || selectedRole === ''}
            >
              <ShieldCheck className={'w-4 h-4 mr-1'} />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={blockTarget !== null}
        onOpenChange={(open) => !open && closeBlockModal()}
      >
        <DialogContent className={'sm:max-w-md'}>
          <DialogHeader>
            <DialogTitle>
              Заблокировать пользователя
              {blockTarget && blockTarget.length > 1 ? 'й' : ''}
            </DialogTitle>
          </DialogHeader>
          <div className={'flex flex-col gap-2'}>
            <span className={'text-sm text-muted-foreground'}>
              {blockTarget && blockTarget.length > 1
                ? `Будет заблокировано ${blockTarget.length} пользователей.`
                : 'Укажите причину блокировки.'}
            </span>
            {blockTarget?.length === 1 && (
              <>
                <Textarea
                  placeholder={'Причина блокировки...'}
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  maxLength={128}
                  className={
                    'resize-none min-h-20 max-h-40 overflow-y-auto break-all'
                  }
                />
                <span
                  className={`text-xs self-end ${blockReason.length >= 128 ? 'text-red-500' : 'text-muted-foreground'}`}
                >
                  {blockReason.length}/128
                </span>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant={'outline'} onClick={closeBlockModal}>
              Отмена
            </Button>
            <Button
              variant={'destructive'}
              onClick={handleBlockConfirm}
              disabled={
                blockUserMutation.isPending || blockUsersMutation.isPending
              }
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
