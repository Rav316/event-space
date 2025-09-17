import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '@/components/ui';
import { useState } from 'react';
import * as React from 'react';
import { cn } from '@/lib/utils.ts';

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        id={props.id || 'password'}
        type={showPassword ? 'text' : 'password'}
        placeholder="Введите пароль"
        className={cn('pl-10 pr-10', className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
};
