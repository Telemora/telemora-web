'use client';

import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import { useDiscoverableStoresQuery, useFeaturedStoresQuery } from '@/libs/stores/hooks';
import { Carousel } from '@/libs/common/components/Carousel';
import { ScrollStoresSection } from '@/libs/stores/components/ScrollStoresSection';

export default function MarketPage() {
  const { data: discoverStores, isLoading: isDiscoverStoresLoading } = useDiscoverableStoresQuery();
  const { data: featuredStores, isLoading: isFeaturedStoresLoading } = useFeaturedStoresQuery();

  return (
    <AppLayout>
      <Carousel />
      <ScrollStoresSection stores={discoverStores} isLoading={isDiscoverStoresLoading} />
      <ScrollStoresSection stores={featuredStores} isLoading={isFeaturedStoresLoading} />
    </AppLayout>
  );
}
