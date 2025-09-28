'use client';

import { Form, Input } from '@heroui/react';
import { FaPen } from 'react-icons/fa';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { useTelegramLoginQuery } from '@/libs/users/hooks';
import React from 'react';

export default function EditProfilePage() {
  const { data, isLoading } = useTelegramLoginQuery();

  return (
    <>
      <Form>
        <PageHeader title="Edit Profile" />
        <Input
          endContent={<FaPen />}
          inputMode="text"
          type="text"
          label="First Name"
          disabled={isLoading}
          defaultValue={data?.firstName}
        ></Input>
        <Input
          endContent={<FaPen />}
          inputMode="text"
          type="text"
          label="Last Name"
          disabled={isLoading}
          defaultValue={data?.lastName}
        ></Input>
        <Input
          endContent={<FaPen />}
          inputMode="tel"
          type="tel"
          label="Phone Number"
          disabled={isLoading}
          defaultValue={data?.contactPhone}
        ></Input>
        <Input
          endContent={<FaPen />}
          inputMode="email"
          type="email"
          label="E-Mail"
          disabled={isLoading}
          defaultValue={data?.contactEmail}
        ></Input>
      </Form>
    </>
  );
}
