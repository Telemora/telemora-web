'use client';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { ProfilePreferencesForm } from '@/libs/users/components/ProfilePreferencesForm';
import { useTelegramLoginQuery } from '@/libs/users/hooks';

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

export default function PreferencesPage() {
  const { data: user } = useTelegramLoginQuery();
  if (!user) return null;

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
