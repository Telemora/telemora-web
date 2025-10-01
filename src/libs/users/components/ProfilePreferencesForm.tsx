'use client';

import { Button, Form, Select, SelectItem } from '@heroui/react';
import React from 'react';
import { useUpdatePreferencesMutation } from '@/libs/users/hooks';
import { useForm } from 'react-hook-form';
import { UpdatePreferencesDto, UserPrivateProfile } from '@/libs/users/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePreferencesSchema } from '@/libs/users/schemas';

type KeyLabel = { key: string; label: string };

export function ProfilePreferencesForm({
  user,
  supportedLanguages,
  localCurrencies,
}: {
  user: UserPrivateProfile;
  supportedLanguages: KeyLabel[];
  localCurrencies: KeyLabel[];
}) {
  const { mutate } = useUpdatePreferencesMutation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdatePreferencesDto>({
    resolver: zodResolver(updatePreferencesSchema),
    defaultValues: {
      languageCode: 'en',
      fiatCurrencyCode: 'usd',
    },
  });
  const onSubmit = (data: UpdatePreferencesDto) => {
    mutate({ data });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Select {...register('languageCode')} description="Choose your language" label="Language">
        {supportedLanguages.map((language) => (
          <SelectItem key={language.key}>{language.label}</SelectItem>
        ))}
      </Select>

      <Select
        value={user.currencyInfo.localCurrencyCode}
        {...register('fiatCurrencyCode')}
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
  );
}
