import * as React from "react";
import type { PropsWithChildren } from "react";

export const Wrapper: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={'w-full flex justify-center'}>
      <div className={'w-full max-w-[1720px] px-[20px]'}>
        {children}
      </div>
    </div>
  )
}