'use client';

import { Card, CardBody, CardFooter, CardHeader, Chip } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

import StarRating from '@/libs/common/components/star-rating';
import { Address } from '@/libs/location/types';
import { StoreSummary } from '@/libs/stores/types';

const StoreSummaryCard = ({ store }: { store: StoreSummary }) => {
  const storeUrl = `/stores/${store.id}`;

  return (
    <Link href={storeUrl} className="block">
      <Card>
        <CardHeader>
          <div className="flex items-end gap-x-4">
            <Image
              placeholder="blur"
              src={store.logo?.url ?? '/fallback-store.png'}
              alt={store.displayName}
              width={48}
              height={48}
              className="inline-block h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h3 className="truncate font-semibold">{store.displayName}</h3>
              <StarRating rating={store.vendorScore} />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <p className="truncate text-xs">{store.storeBio}</p>
        </CardBody>
        <CardFooter className="block space-y-2">
          <p className="truncate text-xs">{formatAddresses(store.businessLocations)}</p>
          <div className="flex gap-2">
            {store.categories?.slice(0, 3).map((tag) => (
              <Chip key={tag} size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

const formatAddresses = (address: Address[]) => {
  return [address[0].city?.name, address[0].state?.name, address[0].country.name]
    .filter(Boolean)
    .join(', ');
};

export default StoreSummaryCard;
