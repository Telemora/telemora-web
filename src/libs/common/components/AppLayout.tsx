'use client';

import React, { PropsWithChildren } from 'react';

import BottomTabs from '@/libs/common/components/BottomTabs';

import CustomNavbar from './CustomNavbar';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { cn } from '@heroui/react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { webApp, loading } = useTelegramWebApp();
  const theme = webApp?.colorScheme;
  return (
    <div className={cn('relative flex min-h-screen flex-col', theme)}>
      <CustomNavbar />
      <main className="container mt-8 mb-24 flex-1 space-y-4">{children}</main>
      <BottomTabs />
    </div>
  );
}
