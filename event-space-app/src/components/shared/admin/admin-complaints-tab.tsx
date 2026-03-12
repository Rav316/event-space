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
import React, { useState } from 'react';

const PAGE_SIZE_OPTIONS = [10, 15, 25];

type TargetType = 'review' | 'event';
type ComplaintStatus = 'pending' | 'reviewed' | 'resolved' | 'rejected';

const mockComplaints = [
  {
    id: 1,
    author: { firstName: 'Анна', lastName: 'Иванова', id: 'user123' },
    targetType: 'review' as TargetType,
    targetTitle: 'Отзыв на "Хакатон AI Challenge"',
    reasonTitle: 'Неприемлемое поведение',
    reasonDescription:
      'Пользователь оставил отзыв с оскорбительным содержанием и нецензурной лексикой.',
    date: '2024-02-10',
    status: 'pending' as ComplaintStatus,
  },
  {
    id: 2,
    author: { firstName: 'Михаил', lastName: 'Сергеев', id: 'user789' },
    targetType: 'review' as TargetType,
    targetTitle: 'Отзыв на "Концерт студенческого хора"',
    reasonTitle: 'Спам',
    reasonDescription: 'Пользователь оставил несколько одинаковых отзывов подряд.',
    date: '2024-02-11',
    status: 'pending' as ComplaintStatus,
  },
  {
    id: 3,
    author: { firstName: 'Елена', lastName: 'Кузнецова', id: 'user234' },
    targetType: 'event' as TargetType,
    targetTitle: 'Мероприятие "Мастер-класс по веб-дизайну"',
    reasonTitle: 'Мошенничество',
    reasonDescription:
      'Мероприятие заявлено как бесплатное, но при регистрации требуют оплату.',
    date: '2024-02-05',
    status: 'reviewed' as ComplaintStatus,
  },
  {
    id: 4,
    author: { firstName: 'Дмитрий', lastName: 'Волков', id: 'user890' },
    targetType: 'event' as TargetType,
    targetTitle: 'Мероприятие "Спортивный турнир по футболу"',
    reasonTitle: 'Дезинформация',
    reasonDescription: 'Информация о мероприятии не соответствует действительности.',
    date: '2024-01-28',
    status: 'resolved' as ComplaintStatus,
  },
  {
    id: 5,
    author: { firstName: 'Светлана', lastName: 'Морозова', id: 'user345' },
    targetType: 'event' as TargetType,
    targetTitle: 'Мероприятие "Фотовыставка «Наш кампус»"',
    reasonTitle: 'Неприемлемый контент',
    reasonDescription: 'Изображение мероприятия содержит неприемлемый контент.',
    date: '2024-01-15',
    status: 'rejected' as ComplaintStatus,
  },
  {
    id: 6,
    author: { firstName: 'Артём', lastName: 'Громов', id: 'user456' },
    targetType: 'review' as TargetType,
    targetTitle: 'Отзыв на "Научная конференция"',
    reasonTitle: 'Ложная информация',
    reasonDescription: 'Отзыв содержит заведомо ложные сведения об организаторе.',
    date: '2024-02-08',
    status: 'pending' as ComplaintStatus,
  },
  {
    id: 7,
    author: { firstName: 'Ольга', lastName: 'Белова', id: 'user567' },
    targetType: 'event' as TargetType,
    targetTitle: 'Мероприятие "Олимпиада по математике"',
    reasonTitle: 'Некорректное описание',
    reasonDescription: 'Описание мероприятия вводит участников в заблуждение.',
    date: '2024-02-20',
    status: 'resolved' as ComplaintStatus,
  },
];

const statusConfig: Record<ComplaintStatus, { label: string; className: string; icon?: React.ReactNode }> = {
  pending: {
    label: 'Ожидает',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: <AlertTriangle className={'w-3 h-3'} />,
  },
  reviewed: {
    label: 'Рассмотрена',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  resolved: {
    label: 'Решена',
    className: 'bg-gray-900 text-white border-gray-900',
  },
  rejected: {
    label: 'Отклонена',
    className: 'bg-white text-gray-700 border-gray-300',
  },
};

const targetTypeLabels: Record<TargetType, string> = {
  review: 'Отзыв',
  event: 'Мероприятие',
};

const statusOrder: Record<ComplaintStatus, number> = { pending: 0, reviewed: 1, resolved: 2, rejected: 3 };

type SortCol = 'author' | 'targetType' | 'reasonTitle' | 'date' | 'status';

function sortComplaints(complaints: typeof mockComplaints, key: SortCol, dir: 'asc' | 'desc') {
  return [...complaints].sort((a, b) => {
    let cmp = 0;
    if (key === 'author')
      cmp = `${a.author.lastName} ${a.author.firstName}`.localeCompare(
        `${b.author.lastName} ${b.author.firstName}`,
        'ru',
      );
    else if (key === 'targetType') cmp = a.targetType.localeCompare(b.targetType);
    else if (key === 'reasonTitle') cmp = a.reasonTitle.localeCompare(b.reasonTitle, 'ru');
    else if (key === 'date') cmp = a.date.localeCompare(b.date);
    else if (key === 'status') cmp = statusOrder[a.status] - statusOrder[b.status];
    return dir === 'asc' ? cmp : -cmp;
  });
}

type Complaint = (typeof mockComplaints)[number];

function ReviewDialog({
  complaint,
  open,
  onClose,
}: {
  complaint: Complaint | null;
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
              {complaint.author.firstName} {complaint.author.lastName}
            </span>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className={'font-medium text-sm'}>
              {complaint.targetType === 'review' ? 'Отзыв' : 'Мероприятие'}
            </span>
            <span className={'text-sm text-muted-foreground'}>{complaint.targetTitle}</span>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className={'font-medium text-sm'}>Причина</span>
            <span className={'text-sm text-muted-foreground'}>{complaint.reasonTitle}</span>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <span className={'font-medium text-sm'}>Описание</span>
            <span className={'text-sm text-muted-foreground'}>{complaint.reasonDescription}</span>
          </div>
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
  const [sortKey, setSortKey] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [reviewComplaint, setReviewComplaint] = useState<Complaint | null>(null);

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
    ? mockComplaints.filter((c) => {
        const q = search.toLowerCase();
        return (
          c.author.firstName.toLowerCase().includes(q) ||
          c.author.lastName.toLowerCase().includes(q) ||
          c.reasonTitle.toLowerCase().includes(q) ||
          c.targetTitle.toLowerCase().includes(q)
        );
      })
    : mockComplaints;

  const filteredComplaints = sortKey ? sortComplaints(filtered, sortKey, sortDir) : filtered;
  const totalPages = Math.ceil(filteredComplaints.length / pageSize);
  const pageComplaints = filteredComplaints.slice(page * pageSize, (page + 1) * pageSize);

  const pendingCount = mockComplaints.filter((c) => c.status === 'pending').length;

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
          {pendingCount > 0 && (
            <Badge className={'bg-red-500 text-white border-red-500 rounded-full h-5 min-w-5 flex items-center justify-center text-xs px-1.5'}>
              {pendingCount}
            </Badge>
          )}
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
            {(['author', 'targetType', 'reasonTitle', 'date', 'status'] as const).map((col) => (
              <TableHead
                key={col}
                className={'cursor-pointer select-none'}
                onClick={() => handleSort(col)}
              >
                <div className={'flex items-center gap-1'}>
                  {
                    {
                      author: 'Жалобщик',
                      targetType: 'На что',
                      reasonTitle: 'Причина',
                      date: 'Дата',
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
          {pageComplaints.map((complaint) => {
            const sc = statusConfig[complaint.status];
            return (
              <TableRow key={complaint.id}>
                <TableCell>
                  <div className={'flex items-center gap-3'}>
                    <UserAvatar
                      firstName={complaint.author.firstName}
                      lastName={complaint.author.lastName}
                    />
                    <div className={'flex flex-col'}>
                      <span className={'font-medium whitespace-nowrap'}>
                        {complaint.author.firstName} {complaint.author.lastName}
                      </span>
                      <span className={'text-xs text-muted-foreground'}>
                        ID: {complaint.author.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={'flex flex-col'}>
                    <Badge variant="outline" className={'w-fit whitespace-nowrap'}>
                      {targetTypeLabels[complaint.targetType]}
                    </Badge>
                    <span className={'text-xs text-muted-foreground mt-1 max-w-40 truncate'}>
                      {complaint.targetTitle}
                    </span>
                  </div>
                </TableCell>
                <TableCell className={'max-w-xs'}>
                  <div className={'flex flex-col'}>
                    <span className={'font-medium'}>{complaint.reasonTitle}</span>
                    <span className={'text-xs line-clamp-2'}>
                      {complaint.reasonDescription}
                    </span>
                  </div>
                </TableCell>
                <TableCell className={'whitespace-nowrap text-sm'}>
                  {formatDate(complaint.date)}
                </TableCell>
                <TableCell>
                  <Badge className={`${sc.className} flex items-center gap-1 w-fit whitespace-nowrap`}>
                    {sc.icon}
                    {sc.label}
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
          {filteredComplaints.length} жалоб
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
