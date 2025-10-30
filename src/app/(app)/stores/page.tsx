'use client';

import { FaPlus } from 'react-icons/fa6';
import { Button } from '@heroui/button';
import { StoreSummaryCard } from '@/libs/stores/components/SummaryCard';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { EmptyState } from '@/libs/common/components/EmptyState';
import Link from 'next/link';
import { useUserStoresQuery } from '@/libs/stores/hooks';

export default function StoreListPage() {
  const { data: stores } = useUserStoresQuery();

  return (
    <>
      <PageHeader
        title="Your Store Portfolio"
        subtitle="View and manage all your stores in one place"
      />

      {stores && stores.length === 0 ? (
        <div className="mt-12 text-center">
          <EmptyState text="Create your first store to begin your journey" />
          <Link href="/stores/create/basic-information">
            <Button fullWidth color="primary" startContent={<FaPlus />}>
              Create New Store
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {stores!.map((store) => (
            <StoreSummaryCard key={store.id} store={store} />
          ))}

          <Link href="/stores/create/basic-information">
            <Button fullWidth color="primary" startContent={<FaPlus />}>
              Create New Store
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
