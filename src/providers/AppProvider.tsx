'use client';

import { PropsWithChildren } from 'react';

import { QueryContext } from '@/libs/common/context/queryContext';
import { UserProvider } from '@/libs/users/context/userContext';
import { TonConnectClientProvider } from '@/providers/TonConnectClientProvider';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <TonConnectClientProvider>
            <QueryContext>
              <UserProvider>{children}</UserProvider>
            </QueryContext>
          </TonConnectClientProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  );
}
