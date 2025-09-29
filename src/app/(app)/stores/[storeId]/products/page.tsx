'use client';

import { Button, Divider } from '@heroui/react';
import { FaFilter, FaSort } from 'react-icons/fa';
import { useProductSearch } from '@/libs/products/hooks';
import ProductPreviewCard from '@/libs/products/components/ProductPreviewCard';
import { useParams } from 'next/navigation';
import { SearchInput } from '@/libs/products/components/SearchInput';

export default function StoreProductsPage() {
  const params = useParams<{ storeId: string }>();
  const { products, query, setQuery } = useProductSearch();
  return (
    <>
      <SearchInput query={query} setQuery={setQuery} />
      <Divider />
      <div className="flex gap-x-2 overflow-x-scroll">
        <Button radius="full" size="sm" startContent={<FaFilter />}>
          Filter
        </Button>
        <Button radius="full" size="sm" startContent={<FaSort />}>
          Sort
        </Button>
      </div>
      <main className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {products?.map((product) => <ProductPreviewCard key={product.id} product={product} />)}
      </main>
    </>
  );
}
