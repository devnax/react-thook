import { ReactElement } from "react";

export type MethodType = (...args: any[]) => any;

export type ThookOption = {
   state?: {
      [key: string]: any
   };
   template: () => ReactElement
   actions?: {
      [name: string]: MethodType
   }
}

export type StateHook<IT> = {
   set: <T extends keyof IT>(key: T, value: IT[T]) => void;
   get: <T extends keyof IT>(key: T) => IT[T];
   delete: <T extends keyof IT>(key: T) => void;
   clear: () => void;
   getState: () => IT;
   setState: (state: Partial<IT>) => void;
   isChange: <T extends keyof IT>(key: T) => boolean | undefined;
   getChanges: () => string[];
   clearChanges: () => void;
}

export type useState = <IT>() => StateHook<IT>