import { Button, Divider } from '@heroui/react';
import React from 'react';

import { StorePreviewCard } from '@/libs/stores/components/PreviewCard';
import { StorePreviewDto } from '@/libs/stores/types';
import { PageHeader } from '@/libs/common/components/PageHeader';
import Link from 'next/link';

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
      {stores.length === 0 ? (
        <Link href="/stores/create">
          <Button fullWidth color="primary">
            Create your first Store
          </Button>
        </Link>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {stores.map((store) => (
            <StorePreviewCard key={store.slug} store={store} />
          ))}
        </div>
      )}
    </section>
  );
}
