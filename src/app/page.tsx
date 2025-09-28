import React from 'react';

import { Carousel } from '@/libs/common/components/Carousel';
import { ScrollStoresSection } from '@/libs/stores/components/ScrollStoresSection';
import { AutocompleteSearch } from '@/libs/products/components/AutocompleteSearch';
import { fetchDiscoverableStores, fetchFeaturedStores } from '@/libs/stores/api';

export default async function MarketPage() {
  const discoverStores = await fetchDiscoverableStores();
  const featuredStores = await fetchFeaturedStores();

  return (
    <>
      <AutocompleteSearch />
      <Carousel />
      <ScrollStoresSection title="Featured" stores={discoverStores} />
      <ScrollStoresSection title="New Openings" stores={featuredStores} />
    </>
  );
}
