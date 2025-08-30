'use client';

import { Button, Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/ErrorPage';
import { PageHeader } from '@/libs/common/components/PageHeader';
import StoreSummaryCard from '@/libs/stores/components/SummaryCard';
import { useUserStoresQuery } from '@/libs/stores/hooks';
import { EmptyState } from '@/libs/common/components/EmptyState';
import { FaPlus } from 'react-icons/fa6';

export default function StoreListPage() {
  const router = useRouter();
  const { data: stores, error, isLoading } = useUserStoresQuery();

  const handleCreateStore = () => router.push('/stores/create/basic-information');
  const handleOpenStore = (id: number) => router.push(`/stores/${id}`);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error) return <ErrorPage />;

  return (
    <AppLayout>
      <PageHeader title="My Stores" subtitle="Manage your business from here" />

      {stores && stores.length === 0 ? (
        <div className="mt-12 text-center">
          <EmptyState />
          <Button fullWidth color="primary" onPress={handleCreateStore} startContent={<FaPlus />}>
            Create A New Store
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {stores!.map((store) => (
            <div key={store.id} onClick={() => handleOpenStore(+store.id)}>
              <StoreSummaryCard store={store} />
            </div>
          ))}

          <Button fullWidth color="primary" onPress={handleCreateStore}>
            + New Store
          </Button>
        </div>
      )}
    </AppLayout>
  );
}
