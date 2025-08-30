import { HorizontalScroll } from '@/libs/common/components/HorizontalScroll';
import { Skeleton } from '@heroui/react';
import { StorePreviewCard } from '@/libs/stores/components/PreviewCard';
import React from 'react';
import { StoreSummary } from '@/libs/stores/types';
import { EmptyState } from '@/libs/common/components/EmptyState';

export function ScrollStoresSection({
  stores,
  isLoading,
  title,
}: {
  stores?: StoreSummary[];
  isLoading: boolean;
  title: string;
}) {
  return (
    <>
      {isLoading && (
        <section>
          <h1 className="font-semibold">{title}</h1>
          <HorizontalScroll>
            {new Array<number>(4).map((_) => (
              <Skeleton key={_} />
            ))}
          </HorizontalScroll>
        </section>
      )}
      {stores && stores.length === 0 && (
        <section>
          <h1 className="font-semibold">New Openings</h1>
          <EmptyState />
        </section>
      )}
      {stores && stores.length > 0 && (
        <section>
          <h1 className="font-semibold">New Openings</h1>
          <HorizontalScroll>
            {stores.map((store) => (
              <StorePreviewCard key={store.id} store={store} />
            ))}
          </HorizontalScroll>
        </section>
      )}
    </>
  );
}
