import './globals.css';

import type { Metadata, Viewport } from 'next';
import React, { PropsWithChildren } from 'react';

import { AppProvider } from '@/providers/AppProvider';
import Script from 'next/script';
import Eruda from '@/libs/common/components/Eruda';
import { CustomNavbar } from '@/libs/common/components/CustomNavbar';
import BottomTabs from '@/libs/common/components/BottomTabs';

export const metadata: Metadata = {
  title: 'Telemora',
  description: 'Telegram mini app',
  applicationName: 'Telemora',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AppProvider>
          <div className="relative flex min-h-screen flex-col">
            <CustomNavbar />
            <main className="container mt-8 mb-24 flex-1 space-y-4">{children}</main>
            <BottomTabs />
          </div>
        </AppProvider>
        <Script src="https://telegram.org/js/telegram-web-app.js?59" strategy="beforeInteractive" />
        <Eruda />
      </body>
    </html>
  );
}
