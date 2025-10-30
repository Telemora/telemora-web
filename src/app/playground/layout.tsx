import { CustomNavbar } from '@/libs/common/components/CustomNavbar';
import { BottomTabs } from '@/libs/common/components/BottomTabs';
import { PropsWithChildren } from 'react';

export default function PlaygroundLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <CustomNavbar />
      <main className="container mt-8 mb-24 flex-1 space-y-4">{children}</main>
      <BottomTabs />
    </div>
  );
}
