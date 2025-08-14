'use client';

import { Progress } from '@heroui/react';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';
import { useSubmitStoreAddressMutation } from '@/libs/stores/hooks';
import { AddressDto } from '@/libs/location/types';
import { AddressForm } from '@/libs/location/components/AddressForm';

export default function CreateStoreLocation() {
  const { storeId } = useParams<{ storeId: string }>();
  const router = useRouter();

  const { mutateAsync: updateLocation, isPending } = useSubmitStoreAddressMutation(storeId);

  const onSubmit = async (data: AddressDto) => {
    try {
      await updateLocation(data);
      toast.success('Store location updated!');
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${storeId}/tags`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save location');
    }
  };

  return (
    <AppLayout>
      <Progress label="Step 2 of 5" maxValue={5} value={2} size="sm" />

      <PageHeader
        title="Store Location"
        subtitle="Help customers find you by setting your store address."
      />
      <AddressForm onSubmit={onSubmit} isPending={isPending} />
    </AppLayout>
  );
}
