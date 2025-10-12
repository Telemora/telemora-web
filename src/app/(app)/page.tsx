import React, { Suspense } from 'react';
import { Carousel } from '@/libs/common/components/Carousel';
import { ScrollStoresSection } from '@/libs/stores/components/ScrollStoresSection';
import { AutocompleteSearch } from '@/libs/products/components/AutocompleteSearch';
import { fetchDiscoverableStores, fetchFeaturedStores } from '@/libs/stores/api';

export default function MarketPage() {
  return (
    <>
      <AutocompleteSearch />
      <Carousel />
      <Suspense fallback={<StoresSkeleton />}>
        <FeaturedStores />
      </Suspense>
      <Suspense fallback={<StoresSkeleton />}>
        <NewStores />
      </Suspense>
    </>
  );
}

async function FeaturedStores() {
  const stores = await fetchDiscoverableStores();
  return <ScrollStoresSection title="Featured" stores={stores} />;
}

async function NewStores() {
  const stores = await fetchFeaturedStores();
  return <ScrollStoresSection title="New Openings" stores={stores} />;
}

function StoresSkeleton() {
  return <div>loading...</div>;
}
