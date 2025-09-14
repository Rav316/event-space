import * as React from "react";
import type { PropsWithChildren } from "react";

export const Wrapper: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={'w-full flex justify-center px-[20px]'}>
      <div className={'w-full max-w-[1720px]'}>
        {children}
      </div>
    </div>
  )
}