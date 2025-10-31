'use client';

import { PropsWithChildren } from 'react';
import { CustomNavbar } from '@/libs/common/components/CustomNavbar';
import { BottomTabs } from '@/libs/common/components/BottomTabs';
import { useTelegramLoginQuery } from '@/libs/users/hooks';
import { useTelegram } from '@/providers/TelegramProvider';
import { Spinner } from '@heroui/react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { isReady, initData } = useTelegram();
  const { isLoading, isError } = useTelegramLoginQuery();

  if (!isReady || !initData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <pre>Initializing Telegram WebApp...</pre>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
        <pre>Reading your Telegram data...</pre>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <pre>We can&#39;t recognize your Telegram data</pre>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <CustomNavbar />
      <main className="container mt-8 mb-24 flex-1 space-y-4">{children}</main>
      <BottomTabs />
    </div>
  );
}
