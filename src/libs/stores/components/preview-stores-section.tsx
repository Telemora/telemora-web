import { Button, Divider } from '@heroui/react';
import React from 'react';

import { StorePreviewCard } from '@/libs/stores/components/preview-card';
import { StorePreviewDto } from '@/libs/stores/types';
import { PageHeader } from '@/libs/common/components/PageHeader';

export default function PreviewStoresSection({
  stores,
  title,
}: {
  stores: StorePreviewDto[];
  title: string;
}) {
  return (
    <section className="space-y-4" id="preview-stores-section">
      <Divider />
      <PageHeader title={title} />
      <div className="grid grid-cols-2 gap-3">
        {stores.length === 0 ? (
          <Button as={'link'} href="/stores/create">
            Create your first Store
          </Button>
        ) : (
          stores.map((store) => <StorePreviewCard key={store.id} store={store} />)
        )}
      </div>
    </section>
  );
}
