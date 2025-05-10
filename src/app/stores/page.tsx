'use client';

import { Button, Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/errorPage';
import { PageHeader } from '@/libs/common/components/page-header';
import StoreSummaryCard from '@/libs/stores/components/summary-card';
import { useUserStoresQuery } from '@/libs/stores/hooks';

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
          <div className="mb-2 text-5xl text-gray-400">🏪</div>
          <p className="mb-4 text-gray-600">You don’t own any stores yet.</p>
          <Button size="lg" onPress={handleCreateStore}>
            Create Your First Store
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {stores!.map((store) => (
            <div key={store.id} onClick={() => handleOpenStore(+store.id)}>
              <StoreSummaryCard store={store} />
            </div>
          ))}

          <Button fullWidth variant="bordered" size="lg" onPress={handleCreateStore}>
            + New Store
          </Button>
        </div>
      )}
    </AppLayout>
  );
}
