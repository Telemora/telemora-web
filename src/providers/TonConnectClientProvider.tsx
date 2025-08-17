'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type PropsWithChildren } from 'react';

export function TonConnectClientProvider({ children }: PropsWithChildren) {
  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">{children}</TonConnectUIProvider>
  );
}
