'use client';

import React from 'react';
import { Carousel } from '@/libs/common/components/Carousel';
import { ScrollStoresSection } from '@/libs/stores/components/ScrollStoresSection';
import { AutocompleteSearch } from '@/libs/products/components/AutocompleteSearch';
import { useDiscoverableStoresQuery, useFeaturedStoresQuery } from '@/libs/stores/hooks';

export default function MarketPage() {
  const { data: discoverableStores } = useDiscoverableStoresQuery();
  const { data: featuredStores } = useFeaturedStoresQuery();
  return (
    <>
      <AutocompleteSearch />
      <Carousel />
      <ScrollStoresSection title="Featured" stores={discoverableStores} />
      <ScrollStoresSection title="New Openings" stores={featuredStores} />
    </>
  );
}
