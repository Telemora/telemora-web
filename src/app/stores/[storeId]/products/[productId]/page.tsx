'use client';

import { useParams } from 'next/navigation';
import { Button, Divider, ScrollShadow, Skeleton } from '@heroui/react';
import AppLayout from '@/components/shared/app-layout';
import Price from '@/components/shared/price';
import Image from 'next/image';
import ReviewPreviewCard from '@/components/reviews/preview-card';
import { PageHeader } from '@/components/shared/page-header';
import { User } from '@heroui/user';
import StarRating from '@/components/shared/star-rating';
import { useProductDetails } from '@/libs/products/hooks';
import ErrorPage from '@/components/shared/errorPage';
import { useUser } from '@/context/userContext';
import Decimal from 'decimal.js';

export default function ProductDetailsPage() {
  const { storeId, productId } = useParams();
  const user = useUser();
  const currencyInfo = user?.currencyInfo;
  const { data: product, isLoading, error, refetch } = useProductDetails(+storeId, +productId);

  const tonPriceInLocalCurrency = new Decimal(currencyInfo?.tonToUsdRate || 0)
  .dividedBy(new Decimal(currencyInfo?.localCurrencyToUsdRate || 0))
  .toNumber();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-4">
          <Skeleton className="w-full h-52 rounded-xl" />
          <Skeleton className="w-3/4 h-6 rounded" />
          <Skeleton className="w-1/2 h-6 rounded" />
          <Skeleton className="w-full h-10 rounded" />
        </div>
      </AppLayout>
    );
  }

  if (error || !product) return <ErrorPage reset={refetch} />;

  return (
    <AppLayout>
      <main className="space-y-6 px-2 py-4">
        {product.image?.length ? (
          <ScrollShadow orientation="horizontal" className="flex gap-x-4 overflow-x-auto pb-2">
            {product.image.map((img, index) => (
              <Image
                key={index}
                src={img.url}
                width={240}
                height={240}
                alt={product.name}
                className="rounded-xl aspect-square object-cover w-60 shrink-0"
              />
            ))}
          </ScrollShadow>
        ) : null}

        <div>
          <User
            name={product.store.name}
            avatarProps={{ src: product.store.logo?.url }}
            description={<StarRating rating={product.store.reputation} />}
          />
        </div>

        <div>
          <h1 className="text-lg font-bold">{product.name}</h1>
          <Price fontSize={16} amount={product.price} />
          <Price fontSize={16} amount={tonPriceInLocalCurrency} localCurrencyCode={currencyInfo?.localCurrencyCode} />
        </div>

        <Button fullWidth size="lg" className="mt-4">
          Add to Cart
        </Button>

        <Divider />

        {product.description && <PageHeader title={'Description'} subtitle={product.description} />}

        {product.stock !== undefined && <p className=" ">In Stock: {product.stock}</p>}

        {Array.isArray(product.attributes) && product.attributes.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Attributes</h3>
            <ul className="text-sm text-neutral-400 list-disc list-inside">
              {product.attributes.map((attr, i) => (
                <li key={i}>
                  {attr.attributeName}: {attr.attributeValue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(product.variants) && product.variants.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Variants</h3>
            <ul className="text-sm text-neutral-400 list-disc list-inside">
              {product.variants.map((variant, i) => (
                <li key={i}>
                  {variant.variantName}: {variant.variantValue}
                  {variant.additionalPrice && ` (+${variant.additionalPrice})`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Divider />

        {product.reviews && product.reviews.length > 0 && (
          <div className="space-y-2">
            {product.reviews.map((review) => (
              <ReviewPreviewCard key={review.id} content={review} />
            ))}
          </div>
        )}
      </main>
    </AppLayout>
  );
}
