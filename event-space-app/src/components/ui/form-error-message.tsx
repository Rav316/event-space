import * as React from 'react';
import type { PropsWithChildren } from 'react';

export const FormErrorMessage: React.FC<PropsWithChildren> = ({ children }) => {
  return <p className={'text-sm text-red-500'}>{children}</p>;
};
