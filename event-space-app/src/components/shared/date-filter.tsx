import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { SortAsc } from 'lucide-react';
import { useState } from 'react';

const sortCategories = [
  { label: 'По дате', value: 'date' },
  { label: 'По популярности', value: 'popularity' },
  { label: 'По доступности', value: 'availability' },
  { label: 'По алфавиту', value: 'alphabetical' },
];

export const DateFilter = () => {
  const [sortBy, setSortBy] = useState(sortCategories[0].value);

  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="h-9 min-w-0 max-[563px]:flex-1">
        <SortAsc className="h-4 w-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortCategories.map(({ label, value }) => (
          <SelectItem key={value} value={value} >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

