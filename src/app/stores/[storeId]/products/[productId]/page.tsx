'use client';

import { Button, Divider, Skeleton, User } from '@heroui/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import ErrorPage from '@/libs/common/components/ErrorPage';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { PriceComponent } from '@/libs/common/components/PriceComponent';
import { StarRating } from '@/libs/common/components/StarRating';
import { useProductDetails } from '@/libs/products/hooks';
import ReviewPreviewCard from '@/libs/reviews/components/preview-card';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { HorizontalScroll } from '@/libs/common/components/HorizontalScroll';

export default function ProductDetailsPage() {
  const { webApp } = useTelegramWebApp();
  const { storeId, productId } = useParams();
  const storeIdNum = parseInt(storeId as string, 10);
  const productIdNum = parseInt(productId as string, 10);
  const { data: product, isLoading, error, refetch } = useProductDetails(storeIdNum, productIdNum);
  if (isNaN(storeIdNum) || isNaN(productIdNum)) {
    return <div>Error: Invalid store or product ID</div>;
  }

  if (isLoading) {
    return (
      <>
        <div className="space-y-4">
          <Skeleton className="h-52 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-6 w-1/2 rounded" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
      </>
    );
  }

  if (error || !product) return <ErrorPage reset={refetch} />;

  return (
    <>
      <main className="space-y-6">
        {product.images?.length ? (
          <HorizontalScroll>
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img.url}
                width={240}
                height={240}
                alt={product.name}
                className="aspect-square w-60 shrink-0 rounded-lg object-cover"
              />
            ))}
          </HorizontalScroll>
        ) : null}

        <div>
          <User
            name={product.store.displayName}
            avatarProps={{ src: product.store.logo?.url }}
            description={<StarRating rating={product.store.vendorScore} />}
          />
        </div>

        <div>
          <PageHeader title={product.name} />
          <PriceComponent amount={product.price} />
        </div>

        <Button
          fullWidth
          size="lg"
          className="mt-4"
          onPress={() => {
            webApp?.HapticFeedback.impactOccurred('light');
          }}
        >
          Add to Cart
        </Button>

        <Divider />

        {product.description && <PageHeader title={'Description'} subtitle={product.description} />}

        {product.totalQuantityAvailable !== undefined && (
          <p className=" ">In Stock: {product.totalQuantityAvailable}</p>
        )}

        {Array.isArray(product.attributes) && product.attributes.length > 0 && (
          <div>
            <h3 className="mb-2 font-semibold">Attributes</h3>
            <ul className="list-inside list-disc text-sm text-neutral-400">
              {product.attributes.map((attr, i) => (
                <li key={i}>
                  {attr.name}: {attr.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(product.variants) && product.variants.length > 0 && (
          <div>
            <h3 className="mb-2 font-semibold">Variants</h3>
            <ul className="list-inside list-disc text-sm text-neutral-400">
              {product.variants.map((variant, i) => (
                <li key={i}>{variant.priceOverride && ` (${variant.priceOverride})`}</li>
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
    </>
  );
}
