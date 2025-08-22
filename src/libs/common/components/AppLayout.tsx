'use client';

import React, { PropsWithChildren } from 'react';

import BottomTabs from '@/libs/common/components/BottomTabs';

import CustomNavbar from './CustomNavbar';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <CustomNavbar />
      <main className="container mt-8 mb-24 flex-1 space-y-4">{children}</main>
      <BottomTabs />
    </div>
  );
}
