import { Divider } from '@heroui/divider';
import { User } from '@heroui/user';
import Image from 'next/image';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { PriceComponent } from '@/libs/common/components/PriceComponent';
import { StarRating } from '@/libs/common/components/StarRating';
import ReviewPreviewCard from '@/libs/reviews/components/preview-card';
import { HorizontalScroll } from '@/libs/common/components/HorizontalScroll';
import { AddToCardButton } from '@/libs/products/components/AddToCardButton';
import { getProductDetails } from '@/libs/products/api';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ storeId: string; productId: string }>;
}) {
  const { storeId, productId } = await params;
  const product = await getProductDetails(storeId, productId);

  return (
    <div className="space-y-6">
      {product.images?.length ? (
        <HorizontalScroll>
          {product.images.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              width={240}
              height={240}
              alt={product.name}
              priority
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

      <AddToCardButton />

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
    </div>
  );
}
