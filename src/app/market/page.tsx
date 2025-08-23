'use client';

import { Skeleton } from '@heroui/react';
import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import { StorePreviewCard } from '@/libs/stores/components/preview-card';
import { useDiscoverableStoresQuery, useFeaturedStoresQuery } from '@/libs/stores/hooks';
import { HorizontalScroll } from '@/libs/common/components/HorizontalScroll';
import { Carousel } from '@/libs/common/components/Carousel';

export default function MarketPage() {
  const { data: discoverStores, isLoading: isDiscoverStoresLoading } = useDiscoverableStoresQuery();
  const { data: featuredStores, isLoading: isFeaturedStoresLoading } = useFeaturedStoresQuery();

  return (
    <AppLayout>
      <Carousel />
      {isDiscoverStoresLoading && (
        <section>
          <h1 className="font-semibold">New Openings</h1>
          <HorizontalScroll>
            {new Array<number>(4).map((_) => (
              <Skeleton key={_} />
            ))}
          </HorizontalScroll>
        </section>
      )}
      {discoverStores && (
        <section>
          <h1 className="font-semibold">New Openings</h1>
          <HorizontalScroll>
            {discoverStores.map((store) => (
              <StorePreviewCard key={store.id} store={store} />
            ))}
          </HorizontalScroll>
        </section>
      )}

      {isFeaturedStoresLoading && (
        <section>
          <h1 className="font-semibold">Top Selling Stores</h1>
          <HorizontalScroll>
            {new Array<number>(4).map((_) => (
              <Skeleton key={_} />
            ))}
          </HorizontalScroll>
        </section>
      )}
      {featuredStores && (
        <section>
          <h1 className="font-semibold">Top Selling Stores</h1>
          <HorizontalScroll>
            {featuredStores.map((store) => (
              <StorePreviewCard key={store.id} store={store} />
            ))}
          </HorizontalScroll>
        </section>
      )}
    </AppLayout>
  );
}
