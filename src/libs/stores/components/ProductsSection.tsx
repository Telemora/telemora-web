import { Button } from '@heroui/react';
import ProductPreviewCard from '@/libs/products/components/ProductPreviewCard';
import { FaPlus } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa';
import React from 'react';
import { useRouter } from 'next/navigation';
import { StoreDetail } from '@/libs/stores/types';
import { PageHeader } from '@/libs/common/components/PageHeader';
import Link from 'next/link';

export function ProductsSection({ store, isOwner }: { store: StoreDetail; isOwner?: boolean }) {
  const router = useRouter();

  const handleAddProduct = () => router.push(`/stores/${store?.slug}/products/new`);

  return (
    <section>
      <div className="flex items-start justify-between">
        <PageHeader title="Products" />
        <Link
          className="flex items-center gap-x-2 text-sm"
          href={`/stores/${store?.slug}/products`}
        >
          <span>View All</span>
          <FaChevronRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {store.products.slice(0, 4).map((product) => (
          <ProductPreviewCard key={product.id} product={product} />
        ))}
      </div>

      {isOwner && (
        <div className="mt-4 text-center">
          <Button fullWidth color="primary" onPress={handleAddProduct} startContent={<FaPlus />}>
            Add Product
          </Button>
        </div>
      )}
    </section>
  );
}
