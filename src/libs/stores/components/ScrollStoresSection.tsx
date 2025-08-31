import { HorizontalScroll } from '@/libs/common/components/HorizontalScroll';
import { Skeleton } from '@heroui/react';
import { StorePreviewCard } from '@/libs/stores/components/PreviewCard';
import React, { useMemo } from 'react';
import { StorePreviewDto } from '@/libs/stores/types';
import { EmptyState } from '@/libs/common/components/EmptyState';

interface ScrollStoresSectionProps {
  stores?: StorePreviewDto[];
  isLoading: boolean;
  title: string;
}

export function ScrollStoresSection({ stores, isLoading, title }: ScrollStoresSectionProps) {
  const content = useMemo(() => {
    if (isLoading) {
      return new Array<number>(4).fill(0).map((_, index) => <Skeleton key={index} />);
    }

    if (!stores || stores.length === 0) {
      return <EmptyState />;
    }

    return stores.map((store) => <StorePreviewCard key={store.id} store={store} />);
  }, [isLoading, stores]);

  return (
    <section>
      <h1 className="font-semibold">{title}</h1>
      <HorizontalScroll>{content}</HorizontalScroll>
    </section>
  );
}
