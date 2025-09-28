'use client';

import { Card, CardBody } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { StarRating } from '@/libs/common/components/StarRating';
import { StorePreviewDto } from '@/libs/stores/types';

export const StorePreviewCard = ({ store }: { store: StorePreviewDto }) => {
  return (
    <Link href={`/stores/${store.slug}`} className="block">
      <Card>
        <CardBody className="flex flex-col items-center space-y-2 text-center">
          <Image
            src={store.logo?.url ?? '/fallback-store.png'}
            alt={store.displayName}
            width={64}
            height={64}
            className="size-16 rounded-full object-cover"
          />
          <div className="w-full">
            <h3 className="truncate text-sm font-medium">{store.displayName}</h3>
            <StarRating rating={store.vendorScore} />
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};
