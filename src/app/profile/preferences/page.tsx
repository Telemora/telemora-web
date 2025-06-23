'use client';

import { Button, Form, Select, SelectItem } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';
import { useUserState } from '@/libs/users/context/userContext';
import { useUpdatePreferencesMutation } from '@/libs/users/hooks';
import { UpdatePreferencesFormData, updatePreferencesSchema } from '@/libs/users/schemas';

const supportedLanguages = [
  { key: 'en', label: 'English' },
  { key: 'ar', label: 'Arabic' },
  { key: 'zh-CN', label: 'Chinese' },
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
  const tPrefs = useTranslations('preferences');
  const tCommon = useTranslations('common');

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
      <PageHeader title={tPrefs('title')} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Select
          {...register('languageCode')}
          label={tPrefs('language.label')}
          description={tPrefs('language.description')}
        >
          {supportedLanguages.map((language) => (
            <SelectItem key={language.key}>{language.label}</SelectItem>
          ))}
        </Select>

        <Select
          {...register('currencyCode')}
          label={tPrefs('currency.label')}
          description={tPrefs('currency.description')}
        >
          {localCurrencies.map((currency) => (
            <SelectItem key={currency.key}>{currency.label}</SelectItem>
          ))}
        </Select>

        <Button fullWidth disabled={isSubmitting} type="submit">
          {tCommon('save')}
        </Button>
      </Form>
    </AppLayout>
  );
}
