import { PropsWithChildren } from 'react';

export function StoreCreationStepsNav({ children }: PropsWithChildren) {
  return <div className="mt-4 flex w-full justify-end gap-x-2">{children}</div>;
}
