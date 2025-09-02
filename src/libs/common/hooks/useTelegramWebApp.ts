import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { TelegramWebApp } from '@/telegram';

export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tgWebApp = window.Telegram.WebApp;
      setWebApp(tgWebApp);
      setTheme(tgWebApp.colorScheme);
    }
  }, [setTheme]);

  if (!webApp) {
    throw new Error(
      'Telegram WebApp is not available. Ensure you are in a Telegram context and a parent component is handling the loading state.',
    );
  }

  return { webApp };
}
