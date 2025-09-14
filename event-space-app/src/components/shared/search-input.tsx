import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import * as React from 'react';

interface Props {
  placeholder: string;
}

export const SearchInput: React.FC<Props> = ({ placeholder }) => {
  return (
    <div>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  );
};
