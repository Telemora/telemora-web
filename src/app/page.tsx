'use client';

import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import { useDiscoverableStoresQuery, useFeaturedStoresQuery } from '@/libs/stores/hooks';
import { AddressForm } from '@/libs/location/components/AddressForm';

export default function MarketPage() {
  const { data: discoverStores, isLoading: isDiscoverStoresLoading } = useDiscoverableStoresQuery();
  const { data: featuredStores, isLoading: isFeaturedStoresLoading } = useFeaturedStoresQuery();

  return (
    <AppLayout>
      {/* <Carousel />
      <ScrollStoresSection
        title="Featured"
        stores={discoverStores}
        isLoading={isDiscoverStoresLoading}
      />
      <ScrollStoresSection
        title="New Openings"
        stores={featuredStores}
        isLoading={isFeaturedStoresLoading}
      /> */}
      <AddressForm isPending={false} onSubmit={() => {}} />
    </AppLayout>
  );
}
