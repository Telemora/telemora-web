'use client';

import { Button, Form, Select, SelectItem } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';
import { useUserState } from '@/libs/users/context/userContext';
import { useUpdatePreferencesMutation } from '@/libs/users/hooks';
import { UpdatePreferencesFormData, updatePreferencesSchema } from '@/libs/users/schemas';

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
  const { data: user } = useUserState();
  const { mutate } = useUpdatePreferencesMutation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdatePreferencesFormData>({
    resolver: zodResolver(updatePreferencesSchema),
  });

  const onSubmit = (data: UpdatePreferencesFormData) => {
    const telegramId = user.telegramId;
    mutate({ telegramId, data });
  };

  return (
    <AppLayout>
      <PageHeader title="Preferences" />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Select {...register('languageCode')} description="Choose your language" label="Language">
          {supportedLanguages.map((language) => (
            <SelectItem key={language.key}>{language.label}</SelectItem>
          ))}
        </Select>

        <Select
          {...register('currencyCode')}
          description="We will show you the equal value as hint"
          label="Local Currency"
        >
          {localCurrencies.map((currency) => (
            <SelectItem key={currency.key}>{currency.label}</SelectItem>
          ))}
        </Select>

        <Button fullWidth disabled={isSubmitting} type="submit">
          Save
        </Button>
      </Form>
    </AppLayout>
  );
}
