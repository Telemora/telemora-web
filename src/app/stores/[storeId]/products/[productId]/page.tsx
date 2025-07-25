'use client';

import { Button, Divider, ScrollShadow, Skeleton } from '@heroui/react';
import { User } from '@heroui/user';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/errorPage';
import { PageHeader } from '@/libs/common/components/page-header';
import PriceComponent from '@/libs/common/components/PriceComponent';
import StarRating from '@/libs/common/components/star-rating';
import { useProductDetails } from '@/libs/products/hooks';
import ReviewPreviewCard from '@/libs/reviews/components/preview-card';

export default function ProductDetailsPage() {
  const { storeId, productId } = useParams();
  const storeIdNum = parseInt(storeId as string, 10);
  const productIdNum = parseInt(productId as string, 10);
  const { data: product, isLoading, error, refetch } = useProductDetails(storeIdNum, productIdNum);
  if (isNaN(storeIdNum) || isNaN(productIdNum)) {
    return <div>Error: Invalid store or product ID</div>;
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-4">
          <Skeleton className="h-52 w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-6 w-1/2 rounded" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
      </AppLayout>
    );
  }

  if (error || !product) return <ErrorPage reset={refetch} />;

  return (
    <AppLayout>
      <main className="space-y-6 px-2 py-4">
        {product.primaryImage?.length ? (
          <ScrollShadow orientation="horizontal" className="flex gap-x-4 overflow-x-auto pb-2">
            {product.primaryImage.map((img, index) => (
              <Image
                placeholder="blur"
                key={index}
                src={img.url}
                width={240}
                height={240}
                alt={product.name}
                className="aspect-square w-60 shrink-0 rounded-xl object-cover"
              />
            ))}
          </ScrollShadow>
        ) : null}

        <div>
          <User
            name={product.store.displayName}
            avatarProps={{ src: product.store.logo?.url }}
            description={<StarRating rating={product.store.vendorScore} />}
          />
        </div>

        <div>
          <h1 className="text-lg font-bold">{product.name}</h1>
          <PriceComponent amount={product.price} />
        </div>

        <Button
          fullWidth
          size="lg"
          className="mt-4"
          onPress={() => {
            hapticFeedback.impactOccurred('light');
          }}
        >
          Add to Cart
        </Button>

        <Divider />

        {product.description && <PageHeader title={'Description'} subtitle={product.description} />}

        {product.stock !== undefined && <p className=" ">In Stock: {product.stock}</p>}

        {Array.isArray(product.attributes) && product.attributes.length > 0 && (
          <div>
            <h3 className="mb-2 font-semibold">Attributes</h3>
            <ul className="list-inside list-disc text-sm text-neutral-400">
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
            <h3 className="mb-2 font-semibold">Variants</h3>
            <ul className="list-inside list-disc text-sm text-neutral-400">
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
