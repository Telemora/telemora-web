'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Spinner } from '@heroui/react';
import AppLayout from '@/components/shared/app-layout';
import StoreSummaryCard from '@/components/stores/summary-card';
import { PageHeader } from '@/components/shared/page-header';
import { useUserStoresQuery } from '@/libs/stores/hooks';
import ErrorPage from '@/components/shared/errorPage';

export default function StoreListPage() {
  const router = useRouter();
  const { data: stores, error, isLoading } = useUserStoresQuery();

  const handleCreateStore = () => router.push('/stores/create/basic-information');
  const handleOpenStore = (id: number) => router.push(`/stores/${id}`);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
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
        <div className="text-center mt-12">
          <div className="text-gray-400 text-5xl mb-2">🏪</div>
          <p className="text-gray-600 mb-4">You don’t own any stores yet.</p>
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
