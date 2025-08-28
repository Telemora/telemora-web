'use client';

import { Spinner } from '@heroui/react';
import { useParams } from 'next/navigation';
import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/ErrorPage';
import { useStoreDetailsQuery } from '@/libs/stores/hooks';
import { useUserState } from '@/libs/users/context/userContext';
import { PromotionsList } from '@/libs/discount/components/PromotionsList';
import { useGetStoreDiscounts } from '@/libs/discount/hooks';
import { StoreHeader } from '@/libs/stores/components/StoreHeader';
import { ProductsSection } from '@/libs/stores/components/ProductsSection';
import { faker } from '@faker-js/faker';

export default function StoreDetailsPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const { data: user } = useUserState();
  const { data: store, isLoading, error } = useStoreDetailsQuery(storeId);
  const { data: discounts } = useGetStoreDiscounts(storeId);
  const isOwner =
    user && store && faker.datatype.boolean(); /* && store.vendor.userId === user.userId */

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error || !store) return <ErrorPage />;

  return (
    <AppLayout>
      {/* Store Header */}
      <StoreHeader store={store} isOwner={isOwner} />

      {/* Discounts Section */}
      {discounts && isOwner && <PromotionsList data={discounts} storeId={storeId} />}

      {/* Products Section */}
      <ProductsSection store={store} isOwner={isOwner} />
    </AppLayout>
  );
}
