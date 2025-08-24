import { Button } from '@heroui/react';
import ProductPreviewCard from '@/libs/products/components/preview-card';
import { FaPlus } from 'react-icons/fa6';
import { FaChevronRight, FaTrashAlt } from 'react-icons/fa';
import React from 'react';
import { useRouter } from 'next/navigation';
import { StoreDetail } from '@/libs/stores/types';
import { PageHeader } from '@/libs/common/components/PageHeader';
import Link from 'next/link';

export function ProductsSection({ store, isOwner }: { store: StoreDetail; isOwner?: boolean }) {
  const router = useRouter();

  const handleAddProduct = () => router.push(`/stores/${store?.id}/products/new`);
  const handleViewAll = () => router.push(`/stores/${store?.id}/products`);
  const handleDelete = () => router.push(`/stores/${store?.id}/delete`);
  return (
    <section>
      <div className="flex items-start justify-between">
        <PageHeader title="Products" />
        <Link className="flex items-center gap-x-2 text-sm" href={`/stores/${store?.id}/products`}>
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

      {/* Danger Zone (Owner Only) */}
      {isOwner && (
        <div className="mt-4">
          <p className="text-danger my-1 text-sm">be careful! this action cannot be undone</p>
          <Button color="danger" fullWidth onPress={handleDelete} startContent={<FaTrashAlt />}>
            Delete Store
          </Button>
        </div>
      )}
    </section>
  );
}
