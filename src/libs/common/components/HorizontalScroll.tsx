'use client';

import { PropsWithChildren } from 'react';
import { ScrollShadow } from '@heroui/react';

export function HorizontalScroll({ children }: PropsWithChildren) {
  return (
    <ScrollShadow className="flex gap-x-4 p-4" hideScrollBar orientation="horizontal">
      {children}
    </ScrollShadow>
  );
}
