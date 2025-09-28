import { HorizontalScroll } from '@/libs/common/components/HorizontalScroll';
import { StorePreviewCard } from '@/libs/stores/components/PreviewCard';
import { StorePreviewDto } from '@/libs/stores/types';
import { EmptyState } from '@/libs/common/components/EmptyState';

interface ScrollStoresSectionProps {
  stores?: StorePreviewDto[];
  title: string;
}

export function ScrollStoresSection({ stores, title }: ScrollStoresSectionProps) {
  if (!stores || stores.length === 0) {
    return <EmptyState />;
  }

  return (
    <section>
      <h1 className="font-semibold">{title}</h1>
      <HorizontalScroll>
        {stores.map((store) => (
          <StorePreviewCard key={store.slug} store={store} />
        ))}
      </HorizontalScroll>
    </section>
  );
}
