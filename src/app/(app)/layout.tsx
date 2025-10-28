import { PropsWithChildren, Suspense } from 'react';
import { CustomNavbar } from '@/libs/common/components/CustomNavbar';
import { BottomTabs } from '@/libs/common/components/BottomTabs';
import { telegramLogin } from '@/libs/users/api';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppLayoutWrapper>{children}</AppLayoutWrapper>
    </Suspense>
  );
}

async function AppLayoutWrapper({ children }: PropsWithChildren) {
  const res = await telegramLogin();

  return (
    <div className="relative flex min-h-screen flex-col">
      <CustomNavbar />
      <main className="container mt-8 mb-24 flex-1 space-y-4">{children}</main>
      <BottomTabs />
    </div>
  );
}
