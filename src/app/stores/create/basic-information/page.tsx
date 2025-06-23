'use client';

import { Button, Form, Input, Progress, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { hapticFeedback } from '@telegram-apps/sdk';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';
import { useSubmitStoreBasicInfoMutation } from '@/libs/stores/hooks';
import { CreateStoreBasicDto, storeBasicFormSchema } from '@/libs/stores/schemas';

export default function CreateStoreBasicInformation() {
  const t = useTranslations('store.basicInfo');
  const tCommon = useTranslations('common');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateStoreBasicDto>({
    resolver: zodResolver(storeBasicFormSchema),
    defaultValues: {
      name: '',
      description: '',
      contactNumber: '',
      email: '',
      walletAddress: '',
    },
  });
  const { mutateAsync, isPending } = useSubmitStoreBasicInfoMutation();
  const router = useRouter();

  const onSubmit = async (formData: CreateStoreBasicDto) => {
    try {
      const result = await mutateAsync(formData);
      toast.success(t('creating'));
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${result.id}/location`);
    } catch (err) {
      console.error('Create store error:', err);
      toast.error(t('creationFailed'));
    }
  };

  return (
    <AppLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Progress label="Step 1 of 5" maxValue={5} aria-label="Step 1 of 5" size="sm" value={1} />
        <PageHeader title={t('title')} subtitle={t('subtitle')} />
        <Input
          label={t('name')}
          {...register('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Textarea
          label={t('description')}
          {...register('description')}
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
        />
        <Input
          label={t('contactNumber')}
          {...register('contactNumber')}
          isInvalid={!!errors.contactNumber}
          errorMessage={errors.contactNumber?.message}
        />
        <Input
          label={t('email')}
          {...register('email')}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <div className="flex justify-between">
          <Button
            type="submit"
            color="primary"
            isDisabled={isSubmitting || isPending}
            isLoading={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? t('creating') : tCommon('continue')}
          </Button>

          <Button
            type="button"
            color="default"
            disabled={isSubmitting || isPending}
            onPress={() => router.back()}
          >
            {tCommon('back')}
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
}
