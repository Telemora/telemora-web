import { FaPlus } from 'react-icons/fa6';
import { Button } from '@heroui/button';
import { StoreSummaryCard } from '@/libs/stores/components/SummaryCard';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { EmptyState } from '@/libs/common/components/EmptyState';
import { fetchUserStores } from '@/libs/stores/api';
import Link from 'next/link';

export default async function StoreListPage() {
  const stores = await fetchUserStores();

  return (
    <>
      <PageHeader
        title="Your Store Portfolio"
        subtitle="View and manage all your stores in one place"
      />

      {stores && stores.length === 0 ? (
        <div className="mt-12 text-center">
          <EmptyState text="Create your first store to begin your journey" />
          <Button
            as="link"
            href="/stores/create/basic-information"
            fullWidth
            color="primary"
            startContent={<FaPlus />}
          >
            Create New Store
          </Button>
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
