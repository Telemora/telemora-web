'use client';

import { Card, CardBody, CardFooter } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

import PriceComponent from '@/libs/common/components/PriceComponent';
import { ProductPreviewDto } from '@/libs/products/types';

interface ProductPreviewCard {
  product: ProductPreviewDto;
}

export default function ProductPreviewCard({ product }: ProductPreviewCard) {
  return (
    <Link className="block" href={`/stores/${product.storeId}/products/${product.id}`}>
      <Card>
        <CardBody className="h-32">
          <Image
            src={product.primaryImage.url || '/fallback-product.png'}
            alt={product.primaryImage.alt ?? product.name}
            priority={true}
            width={100}
            height={100}
            className="relative aspect-square size-full rounded object-cover"
          />
        </CardBody>
        <CardFooter className="block space-y-2">
          <h3 className="line-clamp-2 truncate text-sm font-medium">{product.name}</h3>
          <PriceComponent amount={product.price} />
        </CardFooter>
      </Card>
    </Link>
  );
}
