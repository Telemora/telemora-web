'use client';
import { Button, Form, Input, Progress, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { useSubmitStoreBasicInfoMutation } from '@/libs/stores/hooks';
import { CreateStoreBasicDto } from '@/libs/stores/types';
import { createStoreBasicSchema } from '@/libs/stores/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';

export default function CreateStoreBasicInformation() {
  const { webApp, loading } = useTelegramWebApp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateStoreBasicDto>({
    resolver: zodResolver(createStoreBasicSchema),
    defaultValues: {
      displayName: '',
      storeBio: '',
      supportPhone: '',
      supportEmail: '',
    },
  });
  const { mutateAsync, isPending } = useSubmitStoreBasicInfoMutation();
  const router = useRouter();

  const onSubmit = async (formData: CreateStoreBasicDto) => {
    try {
      const result = await mutateAsync(formData);
      console.log('Store created:', result);
      toast.success('Store created successfully!');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${result.id}/location`);
    } catch (err) {
      console.error('Create store error:', err);
      toast.error('Failed to create store');
    }
  };

  return (
    <AppLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Progress label="Step 1 of 5" maxValue={5} aria-label="Step 1 of 5" size="sm" value={1} />
        <PageHeader
          title="Basic Information"
          subtitle="Your store's name and description will be visible to customers. Choose a name that reflects your brand."
        />
        <Input
          label="Store Name"
          {...register('displayName')}
          isInvalid={!!errors.displayName}
          errorMessage={errors.displayName?.message}
        />
        <Textarea
          label="Description"
          {...register('storeBio')}
          isInvalid={!!errors.storeBio}
          errorMessage={errors.storeBio?.message}
        />
        <Input
          label="Contact Number"
          {...register('supportPhone')}
          isInvalid={!!errors.supportPhone}
          errorMessage={errors.supportPhone?.message}
        />
        <Input
          label="Email"
          {...register('supportEmail')}
          isInvalid={!!errors.supportEmail}
          errorMessage={errors.supportEmail?.message}
        />
        <div className="flex justify-between">
          <Button
            type="submit"
            color="primary"
            isDisabled={isSubmitting || isPending}
            isLoading={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? 'Creating...' : 'Next'}
          </Button>

          <Button
            type="button"
            color="default"
            disabled={isSubmitting || isPending}
            onPress={() => router.back()}
          >
            Back
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
}
