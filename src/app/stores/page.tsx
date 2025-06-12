'use client';

import { Button, Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/errorPage';
import { PageHeader } from '@/libs/common/components/page-header';
import StoreSummaryCard from '@/libs/stores/components/summary-card';
import { useUserStoresQuery } from '@/libs/stores/hooks';

export default function StoreListPage() {
  const t = useTranslations('store');
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
      <PageHeader
        title={t('actions.edit')}
        subtitle="Manage your business from here" {/* TODO: add intl */}
      />

      {stores && stores.length === 0 ? (
        <div className="mt-12 text-center">
          <div className="mb-2 text-5xl text-gray-400">🏪</div>
          <p className="mb-4 text-gray-600">{t('creationFailed')}</p>
          <Button size="lg" onPress={handleCreateStore}>
            {t('create')}
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
            + {t('create')}
          </Button>
        </div>
      )}
    </AppLayout>
  );
}
