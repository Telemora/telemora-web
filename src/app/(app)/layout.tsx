'use client';

import { PropsWithChildren } from 'react';
import { CustomNavbar } from '@/libs/common/components/CustomNavbar';
import { BottomTabs } from '@/libs/common/components/BottomTabs';
import { useTelegramLoginQuery } from '@/libs/users/hooks';

export default function AppLayout({ children }: PropsWithChildren) {
  const { isLoading, isError } = useTelegramLoginQuery();

  if (isLoading) {
    return <pre>we are reading your telegram data...</pre>;
  }

  if (isError) {
    return <pre>we can&#39;t recognize your telegram data</pre>;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <CustomNavbar />
      <main className="container mt-8 mb-24 flex-1 space-y-4">{children}</main>
      <BottomTabs />
    </div>
  );
}
