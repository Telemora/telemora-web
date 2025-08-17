import './globals.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { AppProvider } from '@/providers/AppProvider';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Telemora',
  description: 'Telegram mini app',
  applicationName: 'Telemora',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
        <Script src="https://telegram.org/js/telegram-web-app.js?59" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
