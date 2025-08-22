import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { TelegramWebApp } from '@/telegram';

export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tgWebApp = window.Telegram.WebApp;

      setTheme(tgWebApp.colorScheme);

      setWebApp(tgWebApp);
      setIsLoaded(true);

      const handleThemeChange = () => {
        setTheme(tgWebApp.colorScheme);
      };
      tgWebApp.onEvent('themeChanged', handleThemeChange);

      return () => {
        tgWebApp.offEvent('themeChanged', handleThemeChange);
      };
    }
  }, [setTheme]);

  return { webApp, isLoaded };
}
