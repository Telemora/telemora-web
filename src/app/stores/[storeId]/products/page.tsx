'use client';

import AppLayout from '@/libs/common/components/AppLayout';
import { Button, Divider, Form, Input } from '@heroui/react';
import { FaFilter, FaSearch, FaSort } from 'react-icons/fa';
import { useStoreProducts } from '@/libs/products/hooks';
import ProductPreviewCard from '@/libs/products/components/preview-card';
import { useParams } from 'next/navigation';

export default function StoreProductsPage() {
  const params = useParams<{ storeId: string }>();
  const { data: products } = useStoreProducts(+params.storeId);
  return (
    <AppLayout>
      <Form>
        <Input
          label="Search in products"
          endContent={
            <Button isIconOnly color="secondary" variant="solid">
              <FaSearch />
            </Button>
          }
        />
      </Form>
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
    </AppLayout>
  );
}
