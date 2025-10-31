export const setupDevTelegram = () => {
  if (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV === 'development' &&
    !window.Telegram?.WebApp
  ) {
    console.warn('🛠️ Dev mode: Creating mock Telegram WebApp');

    window.Telegram = {
      WebApp: {
        initData: 'dev_mock_init_data',
        /* @ts-ignore */
        initDataUnsafe: {
          user: {
            id: 123456789,
            first_name: 'Dev',
            last_name: 'User',
            username: 'devuser',
          },
        },
        ready: () => console.log('Mock Telegram ready'),
        expand: () => console.log('Mock Telegram expand'),
        platform: 'web',
      },
    };
  }
};
