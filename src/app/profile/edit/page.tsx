'use client';

import { Form, Input } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { FaPen } from 'react-icons/fa';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';
import { useUserState } from '@/libs/users/context/userContext';

export default function EditProfilePage() {
  const t = useTranslations('profile');
  const { data, isLoading } = useUserState();

  return (
    <AppLayout>
      <Form>
        <PageHeader title={t('title')} />

        <Input
          endContent={<FaPen />}
          inputMode="text"
          type="text"
          label={t('firstName')}
          disabled={isLoading}
          defaultValue={data?.firstName}
        />
        <Input
          endContent={<FaPen />}
          inputMode="text"
          type="text"
          label={t('lastName')}
          disabled={isLoading}
          defaultValue={data?.lastName}
        />
        <Input
          endContent={<FaPen />}
          inputMode="tel"
          type="tel"
          label={t('phoneNumber')}
          disabled={isLoading}
          defaultValue={data?.phoneNumber}
        />
        <Input
          endContent={<FaPen />}
          inputMode="email"
          type="email"
          label={t('email')}
          disabled={isLoading}
          defaultValue={data?.email}
        />
      </Form>
    </AppLayout>
  );
}
