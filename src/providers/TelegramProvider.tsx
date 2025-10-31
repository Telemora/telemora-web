'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { setupDevTelegram } from '@/libs/common/utils/dev-telegram';

interface TelegramContextValue {
  webApp: typeof window.Telegram.WebApp | null;
  initData: string | null;
  isReady: boolean;
}

const TelegramContext = createContext<TelegramContextValue>({
  webApp: null,
  initData: null,
  isReady: false,
});

export const useTelegram = () => useContext(TelegramContext);

export function TelegramProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [webApp, setWebApp] = useState<typeof window.Telegram.WebApp | null>(null);
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setupDevTelegram();
    }

    const checkTelegram = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tgWebApp = window.Telegram.WebApp;
        tgWebApp.ready();
        tgWebApp.expand();

        setWebApp(tgWebApp);
        setInitData(tgWebApp.initData || null);
        setIsReady(true);

        console.log('Telegram WebApp initialized:', {
          initData: tgWebApp.initData,
          platform: tgWebApp.platform,
        });
      } else {
        setTimeout(checkTelegram, 100);
      }
    };

    checkTelegram();
  }, []);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg">Loading Telegram...</div>
          <div className="text-sm text-gray-500">Please wait while we initialize</div>
        </div>
      </div>
    );
  }

  return (
    <TelegramContext.Provider value={{ webApp, initData, isReady }}>
      {children}
    </TelegramContext.Provider>
  );
}
