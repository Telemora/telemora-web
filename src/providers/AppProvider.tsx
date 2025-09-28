'use client';

import { PropsWithChildren } from 'react';

import { QueryContext } from '@/libs/common/context/queryContext';
import { TonConnectClientProvider } from '@/providers/TonConnectClientProvider';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <TonConnectClientProvider>
            <QueryContext>{children}</QueryContext>
          </TonConnectClientProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  );
}
