import { useEffect, useState } from 'react';
import { TelegramWebApp } from '@/libs/common/types/telegram';

/**
 * A custom hook to safely access the Telegram WebApp object.
 * It ensures the object is available and handles the app's lifecycle.
 */
export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tgWebApp = window.Telegram.WebApp;
      setWebApp(tgWebApp);
      setLoading(false);

      tgWebApp.ready();
    }
  }, []);

  return { webApp, loading };
}
