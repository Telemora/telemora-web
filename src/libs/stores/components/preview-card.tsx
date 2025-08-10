import { Card, CardBody, cn } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import StarRating from '@/libs/common/components/star-rating';
import { StorePreviewDto, StoreStatusEnum } from '@/libs/stores/types';

export const StorePreviewCard = ({ store }: { store: StorePreviewDto }) => {
  return (
    <Link href={`/stores/${store.id}`} className="block" passHref>
      <Card
        className={cn(
          'rounded-xl p-4 transition hover:shadow-md',
          store.status !== StoreStatusEnum.ACTIVE && 'pointer-events-none opacity-50',
        )}
      >
        <CardBody className="flex flex-col items-center space-y-2 text-center">
          <Image
            placeholder="blur"
            src={store.logo?.url ?? '/fallback-store.png'}
            alt={store.displayName}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
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
