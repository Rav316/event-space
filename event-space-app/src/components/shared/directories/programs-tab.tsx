import { ArrowDown, ArrowUp, ArrowUpDown, GraduationCap } from 'lucide-react';
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
import { useProgramsByFilter } from '@/api/admin/hooks.ts';
import { ProgramCreateDialog } from '@/components/modal/program-create-dialog.tsx';
import { ProgramEditDialog } from '@/components/modal/program-edit-dialog.tsx';
import { ProgramDeleteDialog } from '@/components/modal/program-delete-dialog.tsx';

const PAGE_SIZE_OPTIONS = [10, 15, 25];

type SortCol = 'name';

export const ProgramsTab = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const sort = sortKey ? `${sortKey},${sortDir}` : undefined;
  const { data } = useProgramsByFilter(
    { page, size: pageSize, search: debouncedSearch },
    sort,
  );

  const rows = data?.content ?? [];
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
    if (sortKey !== col) return <ArrowUpDown className={'ml-1 h-4 w-4'} />;
    return sortDir === 'asc' ? (
      <ArrowUp className={'ml-1 h-4 w-4'} />
    ) : (
      <ArrowDown className={'ml-1 h-4 w-4'} />
    );
  };

  return (
    <div
      className={'flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'}
    >
      <div className={'flex justify-between items-center'}>
        <div className={'flex flex-col'}>
          <div className={'flex gap-2 items-center'}>
            <GraduationCap />
            <span className={'font-medium text-xl'}>Направления</span>
          </div>
          <span className={'text-muted-foreground text-sm'}>
            Управление направлениями
          </span>
        </div>
        <ProgramCreateDialog />
      </div>

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={'Поиск направлений...'}
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
              onClick={() => handleSort('name')}
            >
              <div className={'flex items-center'}>
                Название
                <SortIcon col={'name'} />
              </div>
            </TableHead>
            <TableHead className={'text-right'}>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((program) => (
            <TableRow key={program.id}>
              <TableCell className={'font-medium'}>{program.name}</TableCell>
              <TableCell className={'text-right'}>
                <div className={'flex items-center justify-end gap-1'}>
                  <ProgramEditDialog
                    id={program.id}
                    name={program.name}
                    preferredCategoryIds={program.preferredCategoryIds ?? []}
                  />
                  <ProgramDeleteDialog id={program.id} name={program.name} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className={'flex items-center justify-between'}>
        <span className={'text-sm text-muted-foreground'}>
          {totalElements} направлений
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
