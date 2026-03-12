import { SearchInput, UserAvatar } from '@/components/shared';
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
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
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Eye,
  Settings,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useComplaintsByFilter } from '@/api/admin/hooks.ts';
import type { ComplaintListDto } from '@/api/admin/model.ts';

const PAGE_SIZE_OPTIONS = [10, 15, 25];

const statusConfig: Record<number, { label: string; className: string; icon?: React.ReactNode }> = {
  0: {
    label: 'Ожидает',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: <AlertTriangle className={'w-3 h-3'} />,
  },
  1: {
    label: 'Рассмотрена',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  2: {
    label: 'Решена',
    className: 'bg-gray-900 text-white border-gray-900',
  },
  3: {
    label: 'Отклонена',
    className: 'bg-white text-gray-700 border-gray-300',
  },
};

const targetTypeLabels: Record<string, string> = {
  EVENT_REVIEW: 'Отзыв',
  EVENT: 'Мероприятие',
};

type SortCol = 'targetType' | 'complaintTypeName' | 'complaintDate' | 'status';

const sortColToField: Record<SortCol, string> = {
  targetType: 'targetType',
  complaintTypeName: 'complaintTypeName',
  complaintDate: 'complaintDate',
  status: 'status',
};

function getTargetTitle(complaint: ComplaintListDto): string {
  try {
    const snapshot = JSON.parse(complaint.targetSnapshot);
    if (complaint.targetType === 'EVENT_REVIEW') return snapshot.title ?? `Отзыв #${complaint.targetId}`;
    if (complaint.targetType === 'EVENT') return snapshot.name ?? `Мероприятие #${complaint.targetId}`;
  } catch {
    // ignore
  }
  return `#${complaint.targetId}`;
}

function ReviewDialog({
  complaint,
  open,
  onClose,
}: {
  complaint: ComplaintListDto | null;
  open: boolean;
  onClose: () => void;
}) {
  const [comment, setComment] = useState('');

  if (!complaint) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className={'sm:max-w-md'}>
        <DialogHeader>
          <DialogTitle>Рассмотрение жалобы</DialogTitle>
          <DialogDescription>Рассмотрите жалобу и примите соответствующие меры</DialogDescription>
        </DialogHeader>
        <div className={'flex flex-col gap-4 py-2'}>
          <div className={'flex flex-col gap-0.5'}>
            <span className={'font-medium text-sm'}>Жалобщик</span>
            <span className={'text-sm text-muted-foreground'}>
              {complaint.authorFirstName} {complaint.authorLastName}
            </span>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className={'font-medium text-sm'}>
              {targetTypeLabels[complaint.targetType] ?? complaint.targetType}
            </span>
            <span className={'text-sm text-muted-foreground'}>{getTargetTitle(complaint)}</span>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className={'font-medium text-sm'}>Причина</span>
            <span className={'text-sm text-muted-foreground'}>{complaint.complaintTypeName}</span>
          </div>
          {complaint.description && (
            <div className={'flex flex-col gap-0.5'}>
              <span className={'font-medium text-sm'}>Описание</span>
              <span className={'text-sm text-muted-foreground break-all'}>{complaint.description}</span>
            </div>
          )}
          <div className={'flex flex-col gap-1.5'}>
            <span className={'font-medium text-sm'}>Комментарий администратора</span>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ваш комментарий к решению..."
              className={'resize-none'}
              rows={3}
            />
          </div>
        </div>
        <div className={'flex justify-end gap-2 pt-2'}>
          <Button variant="outline" onClick={onClose}>
            Отклонить
          </Button>
          <Button onClick={onClose}>Принять меры</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const AdminComplaintsTab = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [reviewComplaint, setReviewComplaint] = useState<ComplaintListDto | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const sort = sortKey ? `${sortColToField[sortKey]},${sortDir}` : undefined;
  const { data } = useComplaintsByFilter({ page, size: pageSize, search: debouncedSearch || undefined }, sort);

  const complaints = data?.content ?? [];
  const totalElements = data?.metadata.totalElements ?? 0;
  const totalPages = Math.ceil(totalElements / pageSize);

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
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  return (
    <div className={'border border-[#E5E5E5] rounded-2xl p-5 flex flex-col gap-4'}>
      <div className={'flex items-center justify-between min-h-8'}>
        <div className={'flex items-center gap-2'}>
          <AlertTriangle className={'w-5 h-5'} />
          <span className={'font-medium text-lg'}>Жалобы пользователей</span>
        </div>
      </div>

      <SearchInput
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        placeholder="Поиск по жалобщику, причине или объекту..."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Жалобщик</TableHead>
            {(['targetType', 'complaintTypeName', 'complaintDate', 'status'] as const).map((col) => (
              <TableHead
                key={col}
                className={'cursor-pointer select-none'}
                onClick={() => handleSort(col)}
              >
                <div className={'flex items-center gap-1'}>
                  {
                    {
                      targetType: 'На что',
                      complaintTypeName: 'Причина',
                      complaintDate: 'Дата',
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
          {complaints.map((complaint) => {
            const sc = statusConfig[complaint.status];
            return (
              <TableRow key={complaint.id}>
                <TableCell>
                  <div className={'flex items-center gap-3'}>
                    <UserAvatar
                      firstName={complaint.authorFirstName}
                      lastName={complaint.authorLastName}
                    />
                    <div className={'flex flex-col'}>
                      <span className={'font-medium whitespace-nowrap'}>
                        {complaint.authorFirstName} {complaint.authorLastName}
                      </span>
                      <span className={'text-xs text-muted-foreground'}>
                        ID: {complaint.authorId}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={'flex flex-col'}>
                    <Badge variant="outline" className={'w-fit whitespace-nowrap'}>
                      {targetTypeLabels[complaint.targetType] ?? complaint.targetType}
                    </Badge>
                    <span className={'text-xs text-muted-foreground mt-1 max-w-40 truncate'}>
                      {getTargetTitle(complaint)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className={'max-w-xs'}>
                  <div className={'flex flex-col'}>
                    <span className={'font-medium'}>{complaint.complaintTypeName}</span>
                    {complaint.description && (
                      <span className={'text-xs line-clamp-2'}>{complaint.description}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className={'whitespace-nowrap text-sm'}>
                  {formatDate(complaint.complaintDate)}
                </TableCell>
                <TableCell>
                  {sc && (
                    <Badge className={`${sc.className} flex items-center gap-1 w-fit whitespace-nowrap`}>
                      {sc.icon}
                      {sc.label}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className={'text-right'}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className={'h-8 w-8'}>
                        <Settings className={'w-4 h-4 text-muted-foreground'} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className={'gap-2 cursor-pointer'}
                        onSelect={() => setReviewComplaint(complaint)}
                      >
                        <Eye className={'w-4 h-4'} /> Рассмотреть
                      </DropdownMenuItem>
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
          {totalElements} жалоб
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
      <ReviewDialog
        complaint={reviewComplaint}
        open={reviewComplaint !== null}
        onClose={() => setReviewComplaint(null)}
      />
    </div>
  );
};
