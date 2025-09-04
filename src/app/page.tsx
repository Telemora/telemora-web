'use client';

import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import { useDiscoverableStoresQuery, useFeaturedStoresQuery } from '@/libs/stores/hooks';
import { Carousel } from '@/libs/common/components/Carousel';
import { ScrollStoresSection } from '@/libs/stores/components/ScrollStoresSection';
import { AutocompleteSearch } from '@/libs/common/components/AutocompleteSearch';

export default function MarketPage() {
  const { data: discoverStores, isLoading: isDiscoverStoresLoading } = useDiscoverableStoresQuery();
  const { data: featuredStores, isLoading: isFeaturedStoresLoading } = useFeaturedStoresQuery();

  return (
    <AppLayout>
      <AutocompleteSearch />
      <Carousel />
      <ScrollStoresSection
        title="Featured"
        stores={discoverStores}
        isLoading={isDiscoverStoresLoading}
      />
      <ScrollStoresSection
        title="New Openings"
        stores={featuredStores}
        isLoading={isFeaturedStoresLoading}
      />
    </AppLayout>
  );
}
