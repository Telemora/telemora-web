import { PageHeader } from '@/libs/common/components/PageHeader';
import { telegramLogin } from '@/libs/users/api';
import { ProfilePreferencesForm } from '@/libs/users/components/ProfilePreferencesForm';

const supportedLanguages = [
  { key: 'en', label: 'English' },
  { key: 'ar', label: 'Arabic' },
  { key: 'ch', label: 'Chinese' },
  { key: 'fa', label: 'Persian' },
  { key: 'ru', label: 'Russian' },
];

const localCurrencies = [
  { key: 'usd', label: 'USD' },
  { key: 'eur', label: 'EUR' },
  { key: 'cny', label: 'CNY' },
  { key: 'jpy', label: 'JPY' },
  { key: 'gbp', label: 'GBP' },
];

export default async function PreferencesPage() {
  const user = await telegramLogin();

  return (
    <>
      <PageHeader title="Preferences" />

      <ProfilePreferencesForm
        user={user}
        supportedLanguages={supportedLanguages}
        localCurrencies={localCurrencies}
      />
    </>
  );
}
