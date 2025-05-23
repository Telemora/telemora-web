'use client';

import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import { QueryContext } from '@/libs/common/context/queryContext';
import { UserProvider } from '@/libs/users/context/userContext';
import TonConnectClientProvider from '@/providers/TonConnectClientProvider';

const InitTelegram = dynamic(() => import('@/libs/common/components/init-telegram'), {
  ssr: false,
});

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <InitTelegram>
        <TonConnectClientProvider>
          <QueryContext>
            <UserProvider>{children}</UserProvider>
          </QueryContext>
        </TonConnectClientProvider>
      </InitTelegram>
    </>
  );
}
