### file path: .eslintrc.json

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ]
}

```

### file path: .github/workflows/docker-publish.yml

```yml
name: Build & Publish Docker Image

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/telemora/telemora-web:latest

```

### file path: config/environment.ts

```ts
const NEXT_PUBLIC_TELEMORA_ADDRESS = process.env.NEXT_PUBLIC_TELEMORA_ADDRESS;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXT_PUBLIC_SMART_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;
const NEXT_PUBLIC_COMMISSION_PERCENTAGE = process.env.NEXT_PUBLIC_COMMISSION_PERCENTAGE ?? '2.5';

if (!NEXT_PUBLIC_API_URL) throw new Error('Missing NEXT_PUBLIC_API_URL env');

if (!NEXT_PUBLIC_TELEMORA_ADDRESS) throw new Error('Missing NEXT_PUBLIC_TELEMORA_ADDRESS env');

if (!NEXT_PUBLIC_SMART_CONTRACT_ADDRESS)
  throw new Error('Missing NEXT_PUBLIC_SMART_CONTRACT_ADDRESS env');

export const environment = {
  apiUrl: NEXT_PUBLIC_API_URL,
  marketplaceAddress: NEXT_PUBLIC_TELEMORA_ADDRESS,
  smartContractAddress: NEXT_PUBLIC_SMART_CONTRACT_ADDRESS,
  commissionPercent: parseFloat(NEXT_PUBLIC_COMMISSION_PERCENTAGE),
};

```

### file path: eslint.config.mjs

```mjs
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    settings: {
      next: {
        rootDir: './src/',
      },
    },
  }),
];

export default eslintConfig;

```

### file path: next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

### file path: next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'img.freepik.com',
      },
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'loremflickr.com',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
};
export default nextConfig;

```

### file path: package.json

```json
{
  "name": "telemora-web",
  "version": "1.1.2",
  "private": true,
  "author": {
    "name": "Hamed Arghavan",
    "email": "hamedaravane@gmail.com",
    "url": "https://github.com/hamedaravane"
  },
  "bugs": {
    "url": "https://github.com/hamedaravane/telemora-web/issues"
  },
  "packageManager": "npm@10.9.2",
  "repository": {
    "url": "https://github.com/hamedaravane/telemora-web"
  },
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "eslint --config eslint.config.mjs --fix",
      "prettier --write"
    ],
    "*.{json,css}": [
      "prettier --write"
    ]
  },
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier ./src --write",
    "prepare": "husky"
  },
  "dependencies": {
    "@heroui/react": "^2.8.2",
    "@hookform/resolvers": "^4.1.3",
    "@tailwindcss/postcss": "^4.1.12",
    "@tanstack/react-query": "^5.66.0",
    "@ton/core": "^0.60.1",
    "@tonconnect/ui-react": "^2.0.11",
    "@twa-dev/sdk": "^8.0.2",
    "@uidotdev/usehooks": "^2.4.1",
    "axios": "^1.7.9",
    "chroma-js": "^3.1.2",
    "date-fns": "^4.1.0",
    "decimal.js": "^10.5.0",
    "embla-carousel-autoplay": "^8.6.0",
    "embla-carousel-react": "^8.6.0",
    "eruda": "^3.4.1",
    "framer-motion": "^12.23.12",
    "next": "15.4.6",
    "next-themes": "^0.4.6",
    "react": "19.1.1",
    "react-dom": "19.1.1",
    "react-easy-crop": "^5.4.1",
    "react-hook-form": "^7.54.2",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.4.0",
    "use-immer": "^0.11.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@faker-js/faker": "^9.6.0",
    "@tanstack/eslint-plugin-query": "^5.66.1",
    "@types/chroma-js": "^3.1.1",
    "@types/node": "^20",
    "@types/react": "19.1.10",
    "@types/react-dom": "19.1.7",
    "eslint": "^9",
    "eslint-config-next": "15.4.6",
    "eslint-plugin-simple-import-sort": "^12.1.1",
    "husky": "^9.1.7",
    "lint-staged": "^15.5.2",
    "postcss": "^8.5.6",
    "prettier": "3.5.0",
    "prettier-plugin-tailwindcss": "^0.6.11",
    "tailwindcss": "^4.1.12",
    "typescript": "^5.9.2"
  },
  "overrides": {
    "@types/react": "19.1.10",
    "@types/react-dom": "19.1.7"
  }
}

```

### file path: postcss.config.mjs

```mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
export default config;

```

### file path: public/manifest.json

```json
{
  "name": "Telemora",
  "short_name": "Telemora",
  "icons": [
    {
      "src": "/web-app-manifest-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}

```

### file path: public/tonconnect-manifest.json

```json
{
  "url": "https://telemora-web.vercel.app",
  "name": "Telemora",
  "iconUrl": "./apple-icon.png"
}

```

### file path: src/app/(app)/layout.tsx

```tsx
import { PropsWithChildren } from 'react';
import { CustomNavbar } from '@/libs/common/components/CustomNavbar';
import { BottomTabs } from '@/libs/common/components/BottomTabs';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <CustomNavbar />
      <main className="container mt-8 mb-24 flex-1 space-y-4">{children}</main>
      <BottomTabs />
    </div>
  );
}

```

### file path: src/app/(app)/loading.tsx

```tsx
import { Skeleton } from '@heroui/skeleton';

export default function App() {
  return (
    <div className="space-y-5 p-4">
      <Skeleton className="rounded-lg">
        <div className="bg-default-300 h-24 rounded-lg" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="bg-default-200 h-4 w-3/5 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="bg-default-200 h-4 w-4/5 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="bg-default-300 h-4 w-2/5 rounded-lg" />
        </Skeleton>
      </div>
    </div>
  );
}

```

### file path: src/app/(app)/orders/[orderId]/page.tsx

```tsx
import { getOrderDetails } from '@/libs/orders/api';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { OrderStatusChip } from '@/libs/orders/components/OrderStatusChip';
import { PaymentStatusChip } from '@/libs/payments/components/PaymentStatusChip';
import { OrderInfoSummary } from '@/libs/orders/components/OrderInfoSummary';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Alert } from '@heroui/alert';
import { Divider } from '@heroui/divider';
import { TonPaymentButton } from '@/libs/payments/components/TonPaymentButton';
import { formatSafeDate } from '@/libs/common/utils/date';
import { OrderItemPreviewCard } from '@/libs/orders/components/OrderItemPreview';
import { OrderShipmentCard } from '@/libs/orders/components/OrderShipmentCard';
import { PaymentStatus } from '@/libs/payments/types';
import { OrderStatus } from '@/libs/orders/types';

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrderDetails(orderId);

  const isPendingPayment =
    order.status === OrderStatus.PENDING && order.payment?.status !== PaymentStatus.COMPLETED;

  return (
    <>
      <PageHeader title="Order Detail" subtitle={`Placed on ${formatSafeDate(order.createdAt)}`} />

      <div className="mb-4 grid grid-cols-2">
        <div className="space-x-1">
          <span className="text-sm">Order:</span>
          <OrderStatusChip status={order.status} />
        </div>

        {order.payment && (
          <div className="space-x-1">
            <span className="text-sm">Payment:</span>
            <PaymentStatusChip status={order.payment.status} />
          </div>
        )}
      </div>

      <OrderInfoSummary order={order} />

      {isPendingPayment && (
        <Card>
          <CardBody>
            <Alert
              color="warning"
              description="This order is pending payment. Complete it to avoid cancellation."
            />
          </CardBody>
          <CardFooter>
            <TonPaymentButton
              paymentAmount={order.totalAmount}
              recipientWalletAddress={order.store.paymentWalletAddress}
              orderId={orderId}
            />
          </CardFooter>
        </Card>
      )}

      <Divider className="my-4" />

      <div className="space-y-4">
        <PageHeader title="Items" />
        {order.items.map((item) => (
          <OrderItemPreviewCard orderItem={item} key={item.product.id} />
        ))}
      </div>

      <Divider className="my-4" />

      {order.shipment && <OrderShipmentCard shipment={order.shipment} />}
    </>
  );
}

```

### file path: src/app/(app)/orders/page.tsx

```tsx
import { OrdersTypesTabs } from '@/libs/orders/components/OrdersTypesTabs';
import { getMyOrders } from '@/libs/orders/api';

export default async function OrdersPage() {
  const sales = await getMyOrders();

  return <OrdersTypesTabs sales={sales} purchases={[]} />;
}

```

### file path: src/app/(app)/page.tsx

```tsx
import React from 'react';

import { Carousel } from '@/libs/common/components/Carousel';
import { ScrollStoresSection } from '@/libs/stores/components/ScrollStoresSection';
import { AutocompleteSearch } from '@/libs/products/components/AutocompleteSearch';
import { fetchDiscoverableStores, fetchFeaturedStores } from '@/libs/stores/api';

export default async function MarketPage() {
  const discoverStores = await fetchDiscoverableStores();
  const featuredStores = await fetchFeaturedStores();

  return (
    <>
      <AutocompleteSearch />
      <Carousel />
      <ScrollStoresSection title="Featured" stores={discoverStores} />
      <ScrollStoresSection title="New Openings" stores={featuredStores} />
    </>
  );
}

```

### file path: src/app/(app)/profile/edit/page.tsx

```tsx
'use client';

import { Form, Input } from '@heroui/react';
import { FaPen } from 'react-icons/fa';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { useTelegramLoginQuery } from '@/libs/users/hooks';
import React from 'react';

export default function EditProfilePage() {
  const { data, isLoading } = useTelegramLoginQuery();

  return (
    <>
      <Form>
        <PageHeader title="Edit Profile" />
        <Input
          endContent={<FaPen />}
          inputMode="text"
          type="text"
          label="First Name"
          disabled={isLoading}
          defaultValue={data?.firstName}
        ></Input>
        <Input
          endContent={<FaPen />}
          inputMode="text"
          type="text"
          label="Last Name"
          disabled={isLoading}
          defaultValue={data?.lastName}
        ></Input>
        <Input
          endContent={<FaPen />}
          inputMode="tel"
          type="tel"
          label="Phone Number"
          disabled={isLoading}
          defaultValue={data?.contactPhone}
        ></Input>
        <Input
          endContent={<FaPen />}
          inputMode="email"
          type="email"
          label="E-Mail"
          disabled={isLoading}
          defaultValue={data?.contactEmail}
        ></Input>
      </Form>
    </>
  );
}

```

### file path: src/app/(app)/profile/page.tsx

```tsx
import { Divider } from '@heroui/react';

import { OrderSummaries } from '@/libs/orders/components/OrderSummaries';
import ProfileCard from '@/libs/users/components/profile-card';
import { telegramLogin } from '@/libs/users/api';

export default async function ProfilePage() {
  const user = await telegramLogin();
  return (
    <>
      <main className="mx-auto space-y-10 py-6">
        <ProfileCard user={user} />
        <Divider />
        {user.orders && (
          <OrderSummaries
            orders={user.orders}
            title="Incoming Orders"
            subtitle="Prepare shipments which recieves to your stores"
          />
        )}
      </main>
    </>
  );
}

```

### file path: src/app/(app)/profile/preferences/page.tsx

```tsx
import { PageHeader } from '@/libs/common/components/PageHeader';
import { telegramLogin } from '@/libs/users/api';
import { ProfilePreferencesForm } from '@/libs/users/components/ProfilePreferencesForm';

const supportedLanguages = [
  { key: 'en', label: 'English' },
  { key: 'ar', label: 'Arabic' },
  { key: 'ch', label: 'Chinese' },
  { key: 'fa', label: 'Persian' },
  { key: 'ru', label: 'Russian' },
];

const localCurrencies = [
  { key: 'usd', label: 'USD' },
  { key: 'eur', label: 'EUR' },
  { key: 'cny', label: 'CNY' },
  { key: 'jpy', label: 'JPY' },
  { key: 'gbp', label: 'GBP' },
];

export default async function PreferencesPage() {
  const user = await telegramLogin();

  return (
    <>
      <PageHeader title="Preferences" />

      <ProfilePreferencesForm
        user={user}
        supportedLanguages={supportedLanguages}
        localCurrencies={localCurrencies}
      />
    </>
  );
}

```

### file path: src/app/(app)/stores/[storeId]/page.tsx

```tsx
import { Button } from '@heroui/button';
import { PromotionsList } from '@/libs/discount/components/PromotionsList';
import { StoreHeader } from '@/libs/stores/components/StoreHeader';
import { ProductsSection } from '@/libs/stores/components/ProductsSection';
import { faker } from '@faker-js/faker';
import { FaTrashAlt } from 'react-icons/fa';
import { fetchStoreDetails } from '@/libs/stores/api';
import { getStoreDiscounts } from '@/libs/discount/api';
import { telegramLogin } from '@/libs/users/api';

export default async function StoreDetailsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;
  const user = await telegramLogin();
  const store = await fetchStoreDetails(storeId);
  const discounts = await getStoreDiscounts(storeId);
  const isOwner =
    user && store && faker.datatype.boolean(); /* && store.vendor.userId === user.userId */

  return (
    <>
      {/* Store Header */}
      <StoreHeader store={store} isOwner={isOwner} />

      {/* Discounts Section */}
      {discounts && isOwner && <PromotionsList data={discounts} storeId={storeId} />}

      {/* Products Section */}
      <ProductsSection store={store} isOwner={isOwner} />

      {/* Danger Zone (Owner Only) */}
      {isOwner && (
        <div className="mt-4">
          <p className="text-danger my-1 text-sm">This action will permanently delete your store</p>
          <Button variant="bordered" color="danger" fullWidth startContent={<FaTrashAlt />}>
            Delete Store
          </Button>
        </div>
      )}
    </>
  );
}

```

### file path: src/app/(app)/stores/[storeId]/products/[productId]/edit/page.tsx

```tsx
'use client';

import { Button, Form, Input, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { ProductPhotosUploader } from '@/libs/products/components/ProductPhotosUploader';
import { ProductTypeSelector } from '@/libs/products/components/ProductTypeSelector';
import { useProductDetails, useUpdateProductMutation } from '@/libs/products/hooks';
import { UpdateProductDto } from '@/libs/products/types';
import { updateProductDtoSchema } from '@/libs/products/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';

export default function EditProductPage() {
  const { webApp } = useTelegramWebApp();
  const { storeId, productId } = useParams<{ storeId: string; productId: string }>();
  const { data: product } = useProductDetails(storeId, productId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProductDto>({
    resolver: zodResolver(updateProductDtoSchema),
  });

  const { mutateAsync } = useUpdateProductMutation(storeId, productId);
  const router = useRouter();

  const onSubmit = async (data: UpdateProductDto) => {
    try {
      const result = await mutateAsync(data);
      toast.success('Product updated successfully!');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.store.slug}/${result.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create components');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader title="Edit Product" />

        <ProductPhotosUploader />

        <Input
          label="Product Name"
          {...register('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <Input
          label="Price (TON)"
          type="number"
          {...register('basePrice', { valueAsNumber: true })}
          isInvalid={!!errors.basePrice}
          errorMessage={errors.basePrice?.message}
        />

        <Textarea
          label="Description"
          {...register('description')}
          placeholder="Write a short product description..."
        />

        <ProductTypeSelector name="productType" control={control} errors={errors} />

        <Button
          type="submit"
          color="primary"
          fullWidth
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Edit Product'}
        </Button>
      </Form>
    </>
  );
}

```

### file path: src/app/(app)/stores/[storeId]/products/[productId]/page.tsx

```tsx
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

```

### file path: src/app/(app)/stores/[storeId]/products/create/page.tsx

```tsx
'use client';

import { Button, Form, Input, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { ProductTypeSelector } from '@/libs/products/components/ProductTypeSelector';
import { useCreateProductMutation } from '@/libs/products/hooks';
import { CreateProductDto, ProductType, ProductVisibility } from '@/libs/products/types';
import { ProductPhotosUploader } from '@/libs/products/components/ProductPhotosUploader';
import { createProductDtoSchema } from '@/libs/products/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';

export default function CreateProductPage() {
  const { webApp } = useTelegramWebApp();
  const { storeId } = useParams<{ storeId: string }>();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductDto>({
    resolver: zodResolver(createProductDtoSchema),
    defaultValues: {
      productType: ProductType.PHYSICAL,
      attributes: [],
      variants: [],
      name: '',
      visibility: ProductVisibility.DRAFT,
      quantityAvailable: 0,
      currency: 'TON',
      basePrice: 0,
      description: '',
    },
  });

  const { mutateAsync } = useCreateProductMutation(storeId);
  const router = useRouter();

  const onSubmit = async (data: CreateProductDto) => {
    try {
      const result = await mutateAsync(data);
      toast.success('Product created successfully!');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.store.slug}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create components');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-20">
        <PageHeader title="Create New Product" />

        <ProductPhotosUploader />

        <Input
          label="Product Name"
          {...register('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <Input
          label="Price (TON)"
          type="number"
          {...register('basePrice', { valueAsNumber: true })}
          isInvalid={!!errors.basePrice}
          errorMessage={errors.basePrice?.message}
        />

        <Textarea
          label="Description"
          {...register('description')}
          placeholder="Write a short product description..."
        />

        <ProductTypeSelector name="productType" control={control} errors={errors} />

        <Button
          type="submit"
          color="primary"
          fullWidth
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </Button>
      </Form>
    </>
  );
}

```

### file path: src/app/(app)/stores/[storeId]/products/page.tsx

```tsx
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

```

### file path: src/app/(app)/stores/create/[storeId]/location/page.tsx

```tsx
'use client';

import { Progress } from '@heroui/react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { useSubmitStoreAddressMutation } from '@/libs/stores/hooks';
import { AddressDto } from '@/libs/location/types';
import { AddressForm } from '@/libs/location/components/AddressForm';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';

export default function CreateStoreLocation() {
  const { webApp } = useTelegramWebApp();
  const { storeId } = useParams<{ storeId: string }>();
  const router = useRouter();

  const { mutateAsync: updateLocation, isPending } = useSubmitStoreAddressMutation(storeId);

  const onSubmit = async (data: AddressDto) => {
    try {
      await updateLocation(data);
      toast.success('Store location updated!');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${storeId}/tags`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save location');
    }
  };

  return (
    <>
      <Progress label="Step 2 of 5" maxValue={5} value={2} size="sm" />

      <PageHeader
        title="Store Location"
        subtitle="Help customers find you by setting your store address."
      />
      <AddressForm onSubmit={onSubmit} isPending={isPending} />
    </>
  );
}

```

### file path: src/app/(app)/stores/create/[storeId]/logo-upload/page.tsx

```tsx
'use client';

import { Button, Form, Progress, Spinner } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { useSubmitStoreLogoMutation } from '@/libs/stores/hooks';
import { CreateStoreLogoDto } from '@/libs/stores/types';
import { createStoreLogoSchema } from '@/libs/stores/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { StoreCreationStepsNav } from '@/libs/stores/components/StoreCreationStepsNav';

export default function CreateStoreLogoUpload() {
  const { webApp } = useTelegramWebApp();
  const router = useRouter();
  const { storeId } = useParams<{ storeId: string }>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutateAsync, isPending } = useSubmitStoreLogoMutation(storeId);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MIN_RES = 300;
  const MAX_RES = 1000;

  const form = useForm<CreateStoreLogoDto>({
    resolver: zodResolver(createStoreLogoSchema),
    defaultValues: {
      logoFile: undefined,
    },
  });

  const processImage = async (file: File): Promise<File | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;

        img.onload = () => {
          if (img.width < MIN_RES || img.height < MIN_RES) {
            toast.error('Image resolution too low. Minimum is 300x300.');
            resolve(null);
            return;
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(null);

          const size = Math.min(img.width, img.height, MAX_RES);
          canvas.width = size;
          canvas.height = size;

          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;

          ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
          canvas.toBlob(
            (blob) => {
              if (!blob) return resolve(null);
              resolve(new File([blob], 'store-logo.png', { type: 'image/png' }));
            },
            'image/png',
            0.8,
          );
        };
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File must be under 5MB.');
      return;
    }

    setIsProcessing(true);
    const processed = await processImage(file);
    setIsProcessing(false);

    if (processed) {
      form.setValue('logoFile', processed);
      setPreviewUrl(URL.createObjectURL(processed));
    } else {
      toast.error('Image processing failed.');
    }
  };

  const handleRemoveImage = () => {
    form.setValue('logoFile', undefined);
    setPreviewUrl(null);
  };

  const onSubmit = async (data: CreateStoreLogoDto) => {
    if (!data.logoFile) {
      toast.error('Please upload a logo image.');
      return;
    }

    try {
      const result = await mutateAsync(data);
      toast.success('Store created successfully!');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.slug}`);
    } catch {
      toast.error('Store submission failed.');
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Progress label="Final Step" maxValue={5} value={5} size="sm" />
        <PageHeader title="Upload Store Logo" subtitle="blah blah" />
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />

        {isProcessing && (
          <div className="mt-4 flex justify-center">
            <Spinner size="lg" />
          </div>
        )}

        {previewUrl && (
          <div className="mt-4">
            <Image
              src={previewUrl}
              alt="Preview"
              width={150}
              height={150}
              className="rounded-lg border"
            />
            <Button variant="bordered" className="mt-2" onPress={handleRemoveImage}>
              Change Image
            </Button>
          </div>
        )}

        <StoreCreationStepsNav>
          <Button
            type="submit"
            className="mt-6"
            isDisabled={isProcessing || !form.watch('logoFile')}
            isLoading={isPending}
          >
            Submit Store
          </Button>
        </StoreCreationStepsNav>
      </Form>
    </>
  );
}

```

### file path: src/app/(app)/stores/create/[storeId]/service-hours/page.tsx

```tsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Time } from '@internationalized/date';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  TimeInput,
  useDisclosure,
} from '@heroui/react';
import { useSubmitStoreServiceHoursMutation } from '@/libs/stores/hooks';
import { ServiceHoursDto, SetStoreServiceHoursDto, Weekday } from '@/libs/stores/types';
import { serviceHoursDtoSchema, setStoreServiceHoursSchema } from '@/libs/stores/schemas';
import toast from 'react-hot-toast';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { StoreCreationStepsNav } from '@/libs/stores/components/StoreCreationStepsNav';

export default function ServiceHoursPage() {
  const { webApp } = useTelegramWebApp();
  const router = useRouter();
  const { storeId } = useParams<{ storeId: string }>();
  const { mutateAsync, isPending } = useSubmitStoreServiceHoursMutation(storeId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [serviceHours, setServiceHours] = useState<ServiceHoursDto[]>([]);
  const [newHour, setNewHour] = useState<ServiceHoursDto>({
    day: Weekday.MONDAY,
    open: '09:00',
    close: '17:00',
    interval: 30,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const weekdayOptions = Object.values(Weekday).map((day) => ({
    key: day,
    label: day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(),
  }));

  const parseTimeString = (timeStr: string): Time => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Time(hours, minutes);
  };

  const formatTimeString = (time: Time): string => {
    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
  };

  const handleAddOrUpdate = () => {
    try {
      serviceHoursDtoSchema.parse(newHour);

      if (serviceHours.some((hour, index) => hour.day === newHour.day && index !== editIndex)) {
        setError('This day already has service hours defined.');
        return;
      }

      if (editIndex !== null) {
        const updatedHours = [...serviceHours];
        updatedHours[editIndex] = newHour;
        setServiceHours(updatedHours);
      } else {
        setServiceHours([...serviceHours, newHour]);
      }
      onOpenChange();
      setNewHour({
        day: Weekday.MONDAY,
        open: '09:00',
        close: '17:00',
        interval: 30,
      });
      setEditIndex(null);
      setError(null);
    } catch (err) {
      setError('Invalid input. Please check the fields.');
    }
  };

  const handleEdit = (index: number) => {
    setNewHour(serviceHours[index]);
    setEditIndex(index);
    onOpen();
  };

  const handleDelete = (index: number) => {
    setServiceHours(serviceHours.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const payload: SetStoreServiceHoursDto = { serviceHours };
      setStoreServiceHoursSchema.parse(payload);
      await mutateAsync(payload);
      toast.success('Working hours saved');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${storeId}/logo-upload`);
    } catch (err) {
      setError('Failed to save service hours. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-5">
      <PageHeader title={editIndex !== null ? 'Edit' : 'Manage' + 'Store Service Hours'} />

      {error && <div className="text-danger-500 mb-3">{error}</div>}

      <div className="mb-5">
        <Button color="primary" onPress={onOpen}>
          Add Service Hours
        </Button>
      </div>

      <div className="mb-5">
        {serviceHours.length === 0 ? (
          <p>No service hours defined.</p>
        ) : (
          <ul className="list-none p-0">
            {serviceHours.map((hour, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-gray-200 p-3"
              >
                <span>
                  {hour.day.charAt(0).toUpperCase() + hour.day.slice(1).toLowerCase()}: {hour.open}{' '}
                  - {hour.close}, Interval: {hour.interval} min
                </span>
                <div className="flex gap-2">
                  <Button color="primary" variant="light" onPress={() => handleEdit(index)}>
                    Edit
                  </Button>
                  <Button color="danger" variant="light" onPress={() => handleDelete(index)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <StoreCreationStepsNav>
        <Button color="primary" onPress={handleSubmit} isDisabled={isPending} className="w-full">
          {isPending ? 'Saving...' : 'Save Service Hours'}
        </Button>
      </StoreCreationStepsNav>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                {editIndex !== null ? 'Edit Service Hours' : 'Add Service Hours'}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Select
                    label="Day"
                    selectedKeys={[newHour.day]}
                    onChange={(e) => setNewHour({ ...newHour, day: e.target.value as Weekday })}
                  >
                    {weekdayOptions.map((option) => (
                      <SelectItem key={option.key}>{option.label}</SelectItem>
                    ))}
                  </Select>
                  <TimeInput
                    label="Open Time"
                    value={parseTimeString(newHour.open)}
                    onChange={(time) => {
                      if (!time) return;
                      setNewHour({ ...newHour, open: formatTimeString(time) });
                    }}
                    hourCycle={24}
                    granularity="minute"
                  />
                  <TimeInput
                    label="Close Time"
                    value={parseTimeString(newHour.close)}
                    onChange={(time) => {
                      if (!time) return;
                      setNewHour({ ...newHour, close: formatTimeString(time) });
                    }}
                    hourCycle={24}
                    granularity="minute"
                  />
                  <Input
                    label="Interval (minutes)"
                    type="number"
                    value={newHour.interval.toString()}
                    onChange={(e) =>
                      setNewHour({ ...newHour, interval: parseInt(e.target.value) || 30 })
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onOpenChange}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleAddOrUpdate}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

```

### file path: src/app/(app)/stores/create/[storeId]/tags/page.tsx

```tsx
'use client';

import { Button, Form, Input, Progress } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { Tag } from '@/libs/common/components/Tag';
import { useSubmitStoreTagsMutation } from '@/libs/stores/hooks';
import { CreateStoreTagsDto } from '@/libs/stores/types';
import { createStoreTagsSchema } from '@/libs/stores/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { StoreCreationStepsNav } from '@/libs/stores/components/StoreCreationStepsNav';

const TAG_SUGGESTIONS = [
  'Clothing',
  'Electronics',
  'Beauty',
  'Handmade',
  'Groceries',
  'Home Decor',
  'Fitness',
  'Books',
  'Toys',
  'Pet Supplies',
  'Jewelry',
  'Digital Art',
  'Services',
];

export default function CreateStoreTags() {
  const { webApp } = useTelegramWebApp();
  const { storeId } = useParams<{ storeId: string }>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateStoreTagsDto>({
    resolver: zodResolver(createStoreTagsSchema),
    defaultValues: {
      tags: [],
    },
  });

  const selectedTags = watch('tags') || [];
  const [input, setInput] = useState('');
  const { mutateAsync, isPending } = useSubmitStoreTagsMutation(storeId);

  const toggleTag = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setValue('tags', updated, { shouldValidate: true });
  };

  const handleAddCustomTag = () => {
    const newTag = input.trim();
    if (newTag && !selectedTags.includes(newTag)) {
      setValue('tags', [...selectedTags, newTag], { shouldValidate: true });
    }
    setInput('');
  };

  const onSubmit = async (data: CreateStoreTagsDto) => {
    try {
      await mutateAsync(data);
      toast.success('Tags saved!');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${storeId}/working-hours`);
    } catch {
      toast.error('Failed to save tags');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Progress label="Step 3 of 5" maxValue={5} value={3} size="sm" />

        <PageHeader
          title="Tags"
          subtitle="Choose tags that describe your store. They help customers discover you!"
        />

        {/* Suggestions */}
        <div className="mt-4">
          <p className="text-default-600 mb-2 text-sm font-medium">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {TAG_SUGGESTIONS.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                isSelected={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </div>

        {/* Custom Tag Input */}
        <div className="mt-6">
          <Input
            label="Add Custom Tag"
            placeholder="e.g. Vintage"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomTag();
              }
            }}
          />
          {input.trim() && (
            <Button size="sm" variant="ghost" className="mt-2" onPress={handleAddCustomTag}>
              Add &#34;{input.trim()}&#34;
            </Button>
          )}
          {errors.tags && <p className="text-danger-500 mt-2 text-sm">{errors.tags.message}</p>}
        </div>

        {/* Navigation */}
        <StoreCreationStepsNav>
          <Button variant="flat" type="button" onPress={() => router.back()}>
            Back
          </Button>
          <Button
            variant="flat"
            type="button"
            onPress={() => router.push(`/stores/${storeId}/service-hours`)}
          >
            Skip
          </Button>
          <Button
            fullWidth
            type="submit"
            color="primary"
            isDisabled={selectedTags.length === 0 || isPending}
            isLoading={isPending}
          >
            Save & Next
          </Button>
        </StoreCreationStepsNav>
      </Form>
    </>
  );
}

```

### file path: src/app/(app)/stores/create/basic-information/page.tsx

```tsx
'use client';
import { Button, Form, Input, Progress, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { useSubmitStoreBasicInfoMutation } from '@/libs/stores/hooks';
import { CreateStoreBasicDto } from '@/libs/stores/types';
import { createStoreBasicSchema } from '@/libs/stores/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { StoreCreationStepsNav } from '@/libs/stores/components/StoreCreationStepsNav';

export default function CreateStoreBasicInformation() {
  const { webApp } = useTelegramWebApp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateStoreBasicDto>({
    resolver: zodResolver(createStoreBasicSchema),
    defaultValues: {
      displayName: '',
      storeBio: '',
      supportPhone: '',
      supportEmail: '',
    },
  });
  const { mutateAsync, isPending } = useSubmitStoreBasicInfoMutation();
  const router = useRouter();

  const onSubmit = async (formData: CreateStoreBasicDto) => {
    try {
      const result = await mutateAsync(formData);
      console.log('Store created:', result);
      toast.success('Store created successfully!');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${result.slug}/location`);
    } catch (err) {
      console.error('Create store error:', err);
      toast.error('Failed to create store');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Progress label="Step 1 of 5" maxValue={5} aria-label="Step 1 of 5" size="sm" value={1} />
        <PageHeader
          title="Basic Information"
          subtitle="Your store's name and description will be visible to customers. Choose a name that reflects your brand."
        />
        <Input
          label="Store Name"
          {...register('displayName')}
          isInvalid={!!errors.displayName}
          errorMessage={errors.displayName?.message}
        />
        <Textarea
          label="Description"
          {...register('storeBio')}
          isInvalid={!!errors.storeBio}
          errorMessage={errors.storeBio?.message}
        />
        <Input
          label="Contact Number"
          {...register('supportPhone')}
          isInvalid={!!errors.supportPhone}
          errorMessage={errors.supportPhone?.message}
        />
        <Input
          label="Email"
          {...register('supportEmail')}
          isInvalid={!!errors.supportEmail}
          errorMessage={errors.supportEmail?.message}
        />
        <StoreCreationStepsNav>
          <Button
            type="button"
            color="default"
            disabled={isSubmitting || isPending}
            onPress={() => router.back()}
          >
            Back
          </Button>
          <Button
            type="submit"
            color="primary"
            isDisabled={isSubmitting || isPending}
            isLoading={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? 'Creating...' : 'Next'}
          </Button>
        </StoreCreationStepsNav>
      </Form>
    </>
  );
}

```

### file path: src/app/(app)/stores/page.tsx

```tsx
import { FaPlus } from 'react-icons/fa6';
import { Button } from '@heroui/button';
import { StoreSummaryCard } from '@/libs/stores/components/SummaryCard';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { EmptyState } from '@/libs/common/components/EmptyState';
import { fetchUserStores } from '@/libs/stores/api';
import Link from 'next/link';

export default async function StoreListPage() {
  const stores = await fetchUserStores();

  return (
    <>
      <PageHeader
        title="Your Store Portfolio"
        subtitle="View and manage all your stores in one place"
      />

      {stores && stores.length === 0 ? (
        <div className="mt-12 text-center">
          <EmptyState text="Create your first store to begin your journey" />
          <Button
            as="link"
            href="/stores/create/basic-information"
            fullWidth
            color="primary"
            startContent={<FaPlus />}
          >
            Create New Store
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {stores!.map((store) => (
            <StoreSummaryCard key={store.id} store={store} />
          ))}

          <Link href="/stores/create/basic-information">
            <Button fullWidth color="primary" startContent={<FaPlus />}>
              Create New Store
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}

```

### file path: src/app/global-error.tsx

```tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

```

### file path: src/app/hero.ts

```ts
import { heroui } from '@heroui/react';

export default heroui();

```

### file path: src/app/layout.tsx

```tsx
import './globals.css';

import { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { AppProvider } from '@/providers/AppProvider';
import Script from 'next/script';
import Eruda from '@/libs/common/components/Eruda';

export const metadata: Metadata = {
  title: 'Telemora',
  description: 'Telegram mini app',
  applicationName: 'Telemora',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const vazirmatn = localFont({
  src: '../../public/fonts/Vazirmatn/Vazirmatn[wght].woff2',
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${vazirmatn.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
        <Script src="https://telegram.org/js/telegram-web-app.js?59" strategy="beforeInteractive" />
        <Eruda />
      </body>
    </html>
  );
}

```

### file path: src/app/loading.tsx

```tsx
import { SplashScreen } from '@/libs/common/components/SplashScreen';

export default function Loading() {
  return <SplashScreen />;
}

```

### file path: src/libs/common/api/query-keys.ts

```ts
export const queryKeys = {
  orders: {
    all: ['orders'] as const,
    detail: (id: string) => ['orders', id] as const,
  },
  stores: {
    all: ['stores'] as const,
    my: ['stores', 'my'] as const,
    detail: (id: string) => ['stores', id] as const,
    discover: ['stores', 'discover'] as const,
    featured: ['stores', 'featured'] as const,
  },
  products: {
    all: ['products'] as const,
    detail: (storeId: string, productId: string) => ['products', storeId, productId] as const,
    byStore: (storeId: string) => ['products', 'store', storeId] as const,
  },
  discounts: {
    all: ['discounts'] as const,
    detail: (id: string, discountId: string) => ['discounts', id, discountId] as const,
    byStore: (storeId: string) => ['discounts', 'store', storeId] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    detail: (id: string) => ['reviews', 'detail', id] as const,
    byProduct: (productId: string) => ['reviews', 'product', productId] as const,
  },
  location: {
    countries: ['countries'] as const,
    statesByCountry: (countryId: string) => ['states', countryId] as const,
    citiesByState: (stateId: string) => ['cities', stateId] as const,
    nearest: (lat: number, lng: number) => ['nearest-location', lat, lng] as const,
  },
};

```

### file path: src/libs/common/components/BottomTabs.tsx

```tsx
'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { usePathname, useRouter } from 'next/navigation';
import { FaClipboard, FaShoppingCart, FaStore, FaUser } from 'react-icons/fa';

const TAB_KEYS = {
  MARKET: '/',
  STORES: '/stores',
  ORDERS: '/orders',
  PROFILE: '/profile',
};

function getBaseTabKey(pathname: string): string | null {
  if (pathname === TAB_KEYS.MARKET) return TAB_KEYS.MARKET;
  if (pathname.startsWith(TAB_KEYS.STORES)) return TAB_KEYS.STORES;
  if (pathname.startsWith(TAB_KEYS.ORDERS)) return TAB_KEYS.ORDERS;
  if (pathname.startsWith(TAB_KEYS.PROFILE)) return TAB_KEYS.PROFILE;
  return null;
}

const tabList = [
  { key: TAB_KEYS.MARKET, label: 'Market', icon: <FaShoppingCart size={15} aria-label="Market" /> },
  { key: TAB_KEYS.STORES, label: 'Stores', icon: <FaStore size={15} aria-label="Stores" /> },
  { key: TAB_KEYS.ORDERS, label: 'Orders', icon: <FaClipboard size={15} aria-label="Orders" /> },
  { key: TAB_KEYS.PROFILE, label: 'Profile', icon: <FaUser size={15} aria-label="Profile" /> },
];

export function BottomTabs() {
  const pathname = usePathname();
  const route = useRouter();
  const resolvedTabKey = getBaseTabKey(pathname);

  return (
    <Tabs
      aria-label="Bottom Navigation"
      selectedKey={resolvedTabKey}
      size="lg"
      fullWidth
      placement="bottom"
      items={tabList}
      color="primary"
      classNames={{
        base: 'fixed bottom-0 z-50 bg-default-100 lg:bg-transparent lg:max-w-sm w-full translate-x-1/2 right-1/2',
        tabList: 'max-w-sm mx-auto',
        tab: 'h-16',
      }}
      style={{
        paddingBottom: 'var(--tg-safe-area-inset-bottom)',
      }}
      onSelectionChange={(key) => route.push(key as string)}
    >
      {({ key, label, icon }) => (
        <Tab
          key={key}
          title={
            <div className="flex flex-col items-center gap-1 text-sm">
              {icon} <span>{label}</span>
            </div>
          }
        />
      )}
    </Tabs>
  );
}

```

### file path: src/libs/common/components/Carousel.tsx

```tsx
'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@heroui/react';
import Image from 'next/image';

interface Props {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  position: 'end' | 'start';
}

export function Carousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      axis: 'x',
      duration: 20,
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ],
  );
  const banners: Props[] = [
    {
      title: 'Global trading',
      subtitle: 'with crypto-native simplicity',
      imageSrc: '/banners/banner-1.png',
      imageAlt: 'global',
      position: 'start',
    },
    {
      title: 'Telegram login',
      subtitle: 'no extra signups needed',
      imageSrc: '/banners/banner-2.png',
      imageAlt: 'login',
      position: 'end',
    },
    {
      title: 'Sell & Buy anything',
      subtitle: 'goods, services, or digital content',
      imageSrc: '/banners/banner-3.png',
      imageAlt: 'trade',
      position: 'start',
    },
  ];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {banners.map((item, i) => {
          return (
            <div className="min-w-0 px-2" style={{ flex: '0 0 100%' }} key={i}>
              <CarouselItem {...item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CarouselItem(item: Props) {
  const position = item.position === 'start' ? 'start-3' : 'start-1/2';
  return (
    <div className="min-w-0 px-2" style={{ flex: '0 0 100%' }}>
      <div className="relative">
        <span
          className={cn(
            'absolute top-1/3 max-w-1/2 text-sm font-semibold text-white drop-shadow-lg xl:text-3xl',
            position,
          )}
        >
          {item.title}
        </span>
        <p
          className={cn(
            'absolute top-1/2 max-w-1/2 text-xs font-semibold text-white drop-shadow-lg xl:text-xl',
            position,
          )}
        >
          {item.subtitle}
        </p>
        <Image
          priority
          src={item.imageSrc}
          className="overflow-clip rounded-lg"
          alt={item.imageAlt}
          width={768}
          height={384}
        />
      </div>
    </div>
  );
}

```

### file path: src/libs/common/components/CustomNavbar.tsx

```tsx
'use client';

import {
  Badge,
  Button,
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@heroui/react';
import Link from 'next/link';
import { FaBell, FaChevronLeft, FaShoppingCart } from 'react-icons/fa';
import { ItemNotification } from '@/libs/orders/components/ItemNotification';

export function CustomNavbar() {
  return (
    <Navbar
      classNames={{
        base: 'shadow-sm',
      }}
    >
      <NavbarBrand>
        <Link href="../">
          <FaChevronLeft />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Popover>
            <Badge content={3} color="danger">
              <PopoverTrigger>
                <Button isIconOnly radius="full" variant="solid">
                  <FaBell size={15} />
                </Button>
              </PopoverTrigger>
            </Badge>
            <PopoverContent className="w-64">
              <div className="w-full">
                <h3 style={{ fontSize: '1.2em' }} className="pt-2 pb-3 text-center font-semibold">
                  Inbox
                </h3>
                <Divider />
                <div className="my-2 space-y-2">
                  <ItemNotification text="Prepare Shipping" icon={<FaShoppingCart />} />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

```

### file path: src/libs/common/components/EmptyState.tsx

```tsx
import Image from 'next/image';

interface Props {
  text?: string;
}

export function EmptyState({ text }: Props) {
  return (
    <div className="bg-default-200 border-default-400 my-4 w-full space-y-4 rounded-lg border p-4 text-center">
      <Image
        src="/empty-state.svg"
        width={165}
        height={165}
        alt="empty"
        priority
        className="mx-auto w-1/5 drop-shadow-md"
      />
      <div className="text-default-600 text-sm">{text || 'No items found'}</div>
    </div>
  );
}

```

### file path: src/libs/common/components/ErrorBoundary.tsx

```tsx
import {
  Component,
  type ComponentType,
  type GetDerivedStateFromError,
  type PropsWithChildren,
} from 'react';

export interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: ComponentType<{ error: Error }>;
}

interface ErrorBoundaryState {
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError: GetDerivedStateFromError<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > = (error) => ({ error });

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const {
      state: { error },
      props: { fallback: Fallback, children },
    } = this;

    return error ? <Fallback error={error} /> : children;
  }
}

```

### file path: src/libs/common/components/ErrorPage.tsx

```tsx
'use client';

import { Button } from '@heroui/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { FaUndo } from 'react-icons/fa';

export default function ErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-4 text-center">
      <Image src="/server-error.webp" alt="failed to load" priority width={160} height={160} />
      <h3>Something went wrong!</h3>
      {reset && (
        <Button variant="shadow" onPress={reset}>
          <FaUndo />
          Reload
        </Button>
      )}
    </div>
  );
}

```

### file path: src/libs/common/components/Eruda.tsx

```tsx
'use client';

import { useEffect } from 'react';

const Eruda = () => {
  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient && process.env.NODE_ENV === 'development') {
      const eruda = require('eruda');
      eruda.init();
    }
  }, []);

  return null;
};

export default Eruda;

```

### file path: src/libs/common/components/HorizontalScroll.tsx

```tsx
'use client';

import { PropsWithChildren } from 'react';
import { ScrollShadow } from '@heroui/react';

export function HorizontalScroll({ children }: PropsWithChildren) {
  return (
    <ScrollShadow className="flex gap-x-4 p-4" hideScrollBar orientation="horizontal">
      {children}
    </ScrollShadow>
  );
}

```

### file path: src/libs/common/components/PageHeader.tsx

```tsx
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6 space-y-2">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-default-700 text-sm">{subtitle}</p>
    </header>
  );
}

```

### file path: src/libs/common/components/PriceComponent.tsx

```tsx
'use client';

import React from 'react';
import { TonCurrencyIcon } from '@/libs/common/components/TonCurrencyIcon';
import { UserCurrencyInfo } from '@/libs/common/components/UserCurrencyInfo';

export function PriceComponent({ amount }: { amount: number }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span>{amount}</span>
        <TonCurrencyIcon />
      </div>
      <UserCurrencyInfo />
    </div>
  );
}

```

### file path: src/libs/common/components/SplashScreen.tsx

```tsx
import Image from 'next/image';

export function SplashScreen() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-linear-to-b from-blue-300 to-blue-400">
      <Image
        src="/icon-logo.svg"
        alt="icon logo"
        priority
        className="aspect-square w-32 animate-pulse object-fill"
        width={236}
        height={379}
      />
    </main>
  );
}

```

### file path: src/libs/common/components/StarRating.tsx

```tsx
import clsx from 'clsx';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
  colorClass?: string;
}

const sizeMap = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

export function StarRating({
  rating,
  max = 5,
  size = 'sm',
  showNumber = true,
  className = '',
  colorClass = 'text-orange-400',
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  const starSizeClass = sizeMap[size];

  return (
    <div
      className={clsx('my-1 flex gap-1', starSizeClass, colorClass, className)}
      role="img"
      aria-label={`Rated ${rating} out of ${max} stars`}
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} aria-hidden="true" />
      ))}
      {hasHalfStar && <FaStarHalfAlt aria-hidden="true" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} aria-hidden="true" />
      ))}
      {showNumber && <span className="text-default-600 ml-1 text-xs">{rating.toFixed(1)}</span>}
    </div>
  );
}

```

### file path: src/libs/common/components/Tag.tsx

```tsx
'use client';

import { Button } from '@heroui/react';
import React from 'react';

interface Props {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
}

/* TODO: <Tag> keeps its own selected state and also receives isSelected as a prop, but the two never stay in sync
 *  If the parent re‑renders with a different isSelected, the badge can show the wrong colour
 *  Treat it as controlled (selected = isSelected) or make it fully uncontrolled and drop the prop
 */
export const Tag = ({ label, onClick, isSelected = false }: Props) => {
  return (
    <Button
      size="sm"
      color={isSelected ? 'primary' : 'secondary'}
      variant="solid"
      onPress={onClick}
      className="rounded-full"
    >
      {label}
    </Button>
  );
};

export const TagGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap gap-1">{children}</div>
);

```

### file path: src/libs/common/components/TonCurrencyIcon.tsx

```tsx
export function TonCurrencyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 56 56"
      style={{ display: 'inline-block' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#0098EA"
      />
      <path
        d="M37.5603 15.6277H18.4386C14.9228 15.6277 12.6944 19.4202 14.4632 22.4861L26.2644 42.9409C27.0345 44.2765 28.9644 44.2765 29.7345 42.9409L41.5381 22.4861C43.3045 19.4251 41.0761 15.6277 37.5627 15.6277H37.5603ZM26.2548 36.8068L23.6847 31.8327L17.4833 20.7414C17.0742 20.0315 17.5795 19.1218 18.4362 19.1218H26.2524V36.8092L26.2548 36.8068ZM38.5108 20.739L32.3118 31.8351L29.7417 36.8068V19.1194H37.5579C38.4146 19.1194 38.9199 20.0291 38.5108 20.739Z"
        fill="white"
      />
    </svg>
  );
}

```

### file path: src/libs/common/components/UserCurrencyInfo.tsx

```tsx
import Decimal from 'decimal.js';
import { useTelegramLoginQuery } from '@/libs/users/hooks';
import { Skeleton } from '@heroui/react';

export function UserCurrencyInfo() {
  const { data, isLoading } = useTelegramLoginQuery();

  if (isLoading) {
    return (
      <div className="space-x-2">
        <Skeleton className="h-3 w-3/5" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    );
  }

  if (!data?.currencyInfo) {
    return null;
  }

  const tonPriceInLocalCurrency = new Decimal(data.currencyInfo.tonToUsdRate || 0)
    .dividedBy(new Decimal(data.currencyInfo.localCurrencyToUsdRate || 0))
    .toFixed(2);

  return (
    <div className="space-x-2 text-xs">
      <span>{tonPriceInLocalCurrency}</span>
      <span>{data.currencyInfo.localCurrencyCode}</span>
    </div>
  );
}

```

### file path: src/libs/common/constants/colors.ts

```ts
export const light = {
  antiflashWhite: '#f1f1f1ff',
  battleshipGray: '#999999ff',
  black: '#000000ff',
  blueNcs: '#168acdff',
  indianRed: '#d14e4eff',
  pictonBlue: '#40a7e3ff',
  platinum: '#e7e7e7ff',
  amber: '#FFBF00',
  castletonGreen: '#00563B',
};

export const dark = {
  argentinianBlue: '#6ab2f2ff',
  argentinianBlue2: '#6ab3f3ff',
  gunmetal: '#232e3cff',
  imperialRed: '#ec3942ff',
  richBlack: '#17212bff',
  richBlack2: '#111921ff',
  silverLakeBlue: '#5288c1ff',
  slateGray: '#708499ff',
  white: '#ffffffff',
  whiteSmoke: '#f5f5f5ff',
  caramel: '#CC7F3B',
  midnightGreen: '#004953',
};

```

### file path: src/libs/common/context/queryContext.tsx

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useState } from 'react';

export function QueryContext({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

```

### file path: src/libs/common/hooks/useTelegramWebApp.ts

```ts
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { TelegramWebApp } from '@/telegram';

export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tgWebApp = window.Telegram.WebApp;
      setWebApp(tgWebApp);
      setTheme(tgWebApp.colorScheme);
    }
  }, [setTheme]);

  return { webApp };
}

```

### file path: src/libs/common/types/index.ts

```ts
export interface MediaDto {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

```

### file path: src/libs/common/utils/axios.ts

```ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    const initData = window.Telegram.WebApp.initData;

    if (initData) {
      config.headers['Authorization'] = `tma ${initData}`;
    }
  }
  return config;
});

export default axiosInstance;

```

### file path: src/libs/common/utils/clipboard.ts

```ts
import toast from 'react-hot-toast';

export async function copyToClipboard(text: string): Promise<void> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
      return;
    }

    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    toast.success('Link copied to clipboard!');
  } catch (err) {
    console.error('Clipboard operation failed', err);
    toast.error(`Unable to copy text. The content is: ${text}`);
  }
}

```

### file path: src/libs/common/utils/color.ts

```ts
import chroma from 'chroma-js';
import type { ColorScale } from '@heroui/theme';

export const SHADE_LABELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type ShadeLabel = (typeof SHADE_LABELS)[number];

/**
 * Normalizes a color string to a valid 6-digit hex format.
 * @param color The input color string (can be undefined, null, or invalid).
 * @param fallback The color to use if the input is invalid.
 * @returns A valid 6-digit hex color string (e.g., '#ffffff').
 */
function normalizeColor(color: string | undefined | null, fallback: string): string {
  const trimmedColor = (color ?? '').trim();
  return chroma.valid(trimmedColor) ? chroma(trimmedColor).hex() : chroma(fallback).hex();
}

/**
 * Options for configuring the color scale generation.
 */
interface GenerateShadesOptions {
  /** Overrides the main `color` parameter as the central color of the scale. */
  defaultColor?: string;
  /** The color interpolation mode used by chroma.js. Defaults to 'lab'. */
  mode?: 'lab' | 'lch';
  /** If true, automatically selects a black or white foreground if none is provided. */
  autoForegroundIfEmpty?: boolean;
  /** If true, inverts the scale for dark-themed UIs. */
  darkMode?: boolean;
}

/**
 * Generates a 10-step color scale (shades 50-900) from a single base color.
 *
 * @param color The primary color for generating the scale.
 * @param foreground The desired foreground color for text on the primary color.
 * @param options Configuration options for scale generation.
 * @returns A `ColorScale` object containing all shades, a `DEFAULT`, and a `foreground` color.
 */
export function generateShades(
  color: string,
  foreground: string,
  {
    defaultColor,
    mode = 'lab',
    autoForegroundIfEmpty = false,
    darkMode = false,
  }: GenerateShadesOptions = {},
): ColorScale {
  const baseColorHex = normalizeColor(defaultColor ?? color, '#000000');

  let finalForeground = foreground;
  if (!finalForeground?.trim() && autoForegroundIfEmpty) {
    const luminance = chroma(baseColorHex).luminance();
    finalForeground = luminance > 0.4 ? '#000000' : '#FFFFFF';
  }
  const foregroundHex = normalizeColor(finalForeground, '#000000');

  const colorSpectrum = chroma
    .scale(['#ffffff', baseColorHex, '#000000'])
    .mode(mode)
    .correctLightness(true)
    .colors(SHADE_LABELS.length);

  const shades = Object.fromEntries(
    SHADE_LABELS.map((label, index) => {
      const spectrumIndex = darkMode ? SHADE_LABELS.length - 1 - index : index;
      return [label, colorSpectrum[spectrumIndex]];
    }),
  ) as Record<ShadeLabel, string>;

  return {
    ...shades,
    DEFAULT: baseColorHex,
    foreground: foregroundHex,
  };
}

```

### file path: src/libs/common/utils/date.ts

```ts
import { format, isValid, parseISO } from 'date-fns';

function createSafeDate(dateInput: string | number | Date): Date | null {
  if (!dateInput) return null;

  let date: Date;

  if (typeof dateInput === 'string') {
    date = parseISO(dateInput);
    if (!isValid(date)) {
      date = new Date(dateInput);
    }
  } else {
    date = new Date(dateInput);
  }

  return isValid(date) ? date : null;
}

export function formatSafeDate(
  dateInput: string | number | Date,
  formatString: string = 'PP',
  fallback: string = 'Invalid Date',
): string {
  const date = createSafeDate(dateInput);

  if (!date) return fallback;

  try {
    return format(date, formatString);
  } catch (error) {
    console.warn('Date formatting error:', error);
    return fallback;
  }
}

export const DATE_FORMATS = {
  SHORT: 'PP',
  LONG: 'PPP',
  FULL: 'PPPP',
  TIME: 'p',
  DATETIME: 'PPp',
  ISO: 'yyyy-MM-dd',
} as const;

```

### file path: src/libs/common/utils/httpClient.ts

```ts
import { AxiosRequestConfig } from 'axios';

import axios from './axios';

export const httpClient = {
  get: <T>(url: string, config?: AxiosRequestConfig<unknown>) =>
    axios.get<T>(url, config).then((res) => res.data),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>) =>
    axios.post<T>(url, data, config).then((res) => res.data),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>) =>
    axios.patch<T>(url, data, config).then((res) => res.data),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>) =>
    axios.put<T>(url, data, config).then((res) => res.data),
  delete: <T>(url: string, config?: AxiosRequestConfig<unknown>) =>
    axios.delete<T>(url, config).then((res) => res.data),
};

export default httpClient;

```

### file path: src/libs/common/utils/imageCompressor.ts

```ts
export async function compressImage(blob: Blob, maxW = 800, quality = 0.7): Promise<File> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = URL.createObjectURL(blob);
  });

  const ratio = Math.min(1, maxW / img.width);
  const canvas = document.createElement('canvas');
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);

  return new Promise<File>((res, rej) =>
    canvas.toBlob(
      (b) => (b ? res(new File([b], 'upload.webp', { type: 'image/webp' })) : rej(Error())),
      'image/webp',
      quality,
    ),
  );
}

```

### file path: src/libs/common/utils/imageCropper.ts

```ts
import { Area } from 'react-easy-crop';

export async function getCroppedImg(
  imageSrc: string,
  areaPixels: Area,
  format: 'jpeg' | 'webp' = 'webp',
): Promise<Blob> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const image = new Image();
    image.onload = () => res(image);
    image.onerror = rej;
    image.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  canvas.width = areaPixels.width;
  canvas.height = areaPixels.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(
    img,
    areaPixels.x,
    areaPixels.y,
    areaPixels.width,
    areaPixels.height,
    0,
    0,
    areaPixels.width,
    areaPixels.height,
  );

  return new Promise<Blob>((res, rej) =>
    canvas.toBlob((b) => (b ? res(b) : rej(new Error('toBlob failed'))), `image/${format}`, 0.8),
  );
}

```

### file path: src/libs/common/utils/index.ts

```ts
export const isDev = process.env.NODE_ENV === 'development';

```

### file path: src/libs/discount/api/index.ts

```ts
import httpClient from '@/libs/common/utils/httpClient';
import {
  CreateDiscountDto,
  DiscountDetailDto,
  DiscountPreviewDto,
  UpdateDiscountDto,
} from '@/libs/discount/type';
import { generateMockDiscountDetails, generateMockStoreDiscounts } from '@/libs/discount/mocks';

export async function createDiscount(
  storeId: string,
  dto: CreateDiscountDto,
): Promise<DiscountDetailDto> {
  return httpClient.post(`/stores/${storeId}/discounts`, dto);
}

export async function getStoreDiscounts(storeId: string): Promise<DiscountPreviewDto[]> {
  /* return httpClient.get<DiscountPreviewDto[]>(`/stores/${storeId}/discounts`); */
  return generateMockStoreDiscounts();
}

export async function getDiscountDetails(
  storeId: string,
  discountId: string,
): Promise<DiscountDetailDto> {
  /* return httpClient.get<DiscountDetailDto>(`/stores/${storeId}/discounts/${discountId}`); */
  return generateMockDiscountDetails();
}

export async function updateDiscount(
  storeId: string,
  discountId: string,
  dto: UpdateDiscountDto,
): Promise<DiscountDetailDto> {
  return httpClient.patch<DiscountDetailDto>(`/stores/${storeId}/discounts/${discountId}`, dto);
}

export async function deleteDiscount(storeId: string, discountId: string): Promise<void> {
  return httpClient.delete<void>(`/stores/${storeId}/discounts/${discountId}`);
}

```

### file path: src/libs/discount/components/DiscountPreview.tsx

```tsx
import Link from 'next/link';
import { Badge } from '@heroui/badge';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { FaCheck, FaChevronRight, FaClock, FaFolderOpen, FaInfo } from 'react-icons/fa';
import { DiscountPreviewDto } from '@/libs/discount/type';
import { DiscountStatus } from '@/libs/discount/enums';

export function DiscountPreview({
  data,
  storeId,
}: {
  data: DiscountPreviewDto;
  storeId: number | string;
}) {
  return (
    <Badge isOneChar size="lg" content={DiscountStatusToIcon(data.status)} color="primary">
      <Link className="w-full" href={`/stores/${storeId}/discounts/${data.id}`}>
        <Card>
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <h4 className="text-sm">{data.name}</h4>
              <FaChevronRight size={12} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex items-center gap-x-1">
              <span className="text-sm font-semibold">{data.value.toFixed(2)}</span>
              <span className="text-default-600 font-mono text-xs">
                ({data.type.replace('_', ' ')})
              </span>
            </div>
          </CardBody>
        </Card>
      </Link>
    </Badge>
  );
}

function DiscountStatusToIcon(status: DiscountStatus) {
  switch (status) {
    case DiscountStatus.ACTIVE:
      return <FaCheck />;
    case DiscountStatus.DRAFT:
      return <FaFolderOpen />;
    case DiscountStatus.EXPIRED:
      return <FaInfo />;
    case DiscountStatus.SCHEDULED:
      return <FaClock />;
  }
}

```

### file path: src/libs/discount/components/PromotionsList.tsx

```tsx
import { DiscountPreviewDto } from '@/libs/discount/type';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { DiscountPreview } from '@/libs/discount/components/DiscountPreview';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { FaPlus } from 'react-icons/fa6';

export function PromotionsList({
  data,
  storeId,
}: {
  data: DiscountPreviewDto[];
  storeId: number | string;
}) {
  return (
    <section>
      <PageHeader
        title="Promotions"
        subtitle="Manage your promotions, you can run at most four promotion for each store"
      />
      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => (
          <DiscountPreview key={item.id} data={item} storeId={storeId} />
        ))}
      </div>
      <Button
        color="primary"
        fullWidth
        className="my-4"
        startContent={<FaPlus />}
        isDisabled={data.length >= 4}
      >
        Create New promotion
      </Button>
      <Divider />
    </section>
  );
}

```

### file path: src/libs/discount/enums/index.ts

```ts
export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_SHIPPING = 'free_shipping',
}

export enum DiscountStatus {
  ACTIVE = 'active',
  SCHEDULED = 'scheduled',
  EXPIRED = 'expired',
  DRAFT = 'draft',
}

export enum DiscountApplicabilityEntityType {
  PRODUCT = 'product',
  CATEGORY = 'category',
}

```

### file path: src/libs/discount/hooks/index.ts

```ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDiscount,
  deleteDiscount,
  getDiscountDetails,
  getStoreDiscounts,
  updateDiscount,
} from '@/libs/discount/api';
import { CreateDiscountDto, UpdateDiscountDto } from '@/libs/discount/type';
import { queryKeys } from '@/libs/common/api/query-keys';

export function useCreateDiscountMutation(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateDiscountDto) => createDiscount(storeId, dto),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.discounts.byStore(storeId),
      }),
  });
}

export function useGetStoreDiscounts(storeId: string) {
  return useQuery({
    queryKey: queryKeys.discounts.byStore(storeId),
    queryFn: () => getStoreDiscounts(storeId),
    enabled: !!storeId,
  });
}

export function useGetDiscountDetails(storeId: string, discountId: string) {
  return useQuery({
    queryKey: queryKeys.discounts.detail(storeId, discountId),
    queryFn: () => getDiscountDetails(storeId, discountId),
    enabled: !!storeId && !!discountId,
  });
}

export function useUpdateDiscountMutation(storeId: string, discountId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateDiscountDto) => updateDiscount(storeId, discountId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.discounts.detail(storeId, discountId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.discounts.byStore(storeId) });
    },
  });
}

export function useDeleteDiscount(storeId: string, discountId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteDiscount(storeId, discountId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.discounts.byStore(storeId) }),
  });
}

```

### file path: src/libs/discount/mocks/index.ts

```ts
import { DiscountDetailDto, DiscountPreviewDto } from '@/libs/discount/type';
import { faker } from '@faker-js/faker';
import {
  DiscountApplicabilityEntityType,
  DiscountStatus,
  DiscountType,
} from '@/libs/discount/enums';

async function generateMockStoreDiscount(): Promise<DiscountPreviewDto> {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productMaterial(),
    code: faker.string.alphanumeric(),
    status: faker.helpers.enumValue(DiscountStatus),
    type: faker.helpers.enumValue(DiscountType),
    value: faker.number.int({ min: 1, max: 100 }),
  };
}

export async function generateMockStoreDiscounts(): Promise<DiscountPreviewDto[]> {
  return Promise.all(Array.from({ length: 3 }, () => generateMockStoreDiscount()));
}

export async function generateMockDiscountDetails(): Promise<DiscountDetailDto> {
  return {
    ...(await generateMockStoreDiscount()),
    minValue: faker.number.int(),
    usageLimit: faker.number.int(),
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    appliesTo: [
      {
        entityId: faker.string.alphanumeric(),
        entityType: faker.helpers.enumValue(DiscountApplicabilityEntityType),
      },
    ],
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
}

```

### file path: src/libs/discount/schemas/index.ts

```ts
import { z } from 'zod';
import { CreateDiscountDto, DiscountApplicability, UpdateDiscountDto } from '@/libs/discount/type';
import { DiscountApplicabilityEntityType, DiscountType } from '@/libs/discount/enums';

export const discountTypeSchema = z.nativeEnum(DiscountType) satisfies z.ZodType<DiscountType>;
export const discountApplicabilityEntityTypeSchema = z.nativeEnum(
  DiscountApplicabilityEntityType,
) satisfies z.ZodType<DiscountApplicabilityEntityType>;
export const discountApplicabilitySchema = z.object({
  entityId: z.string(),
  entityType: discountApplicabilityEntityTypeSchema,
}) satisfies z.ZodType<DiscountApplicability>;

export const createDiscountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().optional(),
  type: discountTypeSchema,
  value: z.number().positive('Value must be a positive number'),
  minValue: z.number().positive('Minimum value must be positive').optional(),
  usageLimit: z.number().int().positive('Usage limit must be a positive integer').optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  appliesTo: z.array(discountApplicabilitySchema).optional(),
  isActive: z.boolean().default(true).optional(),
}) satisfies z.ZodType<CreateDiscountDto>;

export const updateDiscountSchema = createDiscountSchema.partial().extend({
  id: z.string(),
}) satisfies z.ZodType<UpdateDiscountDto>;

```

### file path: src/libs/discount/type/index.ts

```ts
import {
  DiscountApplicabilityEntityType,
  DiscountStatus,
  DiscountType,
} from '@/libs/discount/enums';

/**
 * Interface for a quick, at-a-glance view of a promotion.
 * Used for the seller's dashboard list.
 */
export interface DiscountPreviewDto {
  id: string;
  name: string;
  code?: string;
  status: DiscountStatus;
  type: DiscountType;
  value: number;
  totalUsage?: number;
}

/**
 * Interface for the detailed view of a single promotion.
 * Includes all rules, metrics, and applicability.
 */
export interface DiscountDetailDto extends DiscountPreviewDto {
  minValue?: number;
  usageLimit?: number;
  startDate: Date;
  endDate: Date;
  appliesTo: DiscountApplicability[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for the detailed view of a single promotion.
 * Used in the step-by-step promotion creation wizard.
 */
export interface CreateDiscountDto {
  name: string;
  code?: string;
  type: DiscountType;
  value: number;
  minValue?: number;
  usageLimit?: number;
  startDate: Date;
  endDate: Date;
  appliesTo?: DiscountApplicability[];
  isActive?: boolean;
}

/**
 * Interface for updating an existing discount.
 * This is a partial type of ICreateDiscount.
 */
export interface UpdateDiscountDto extends Partial<CreateDiscountDto> {
  id: string;
}

/**
 * Interface for a discount applicability rule.
 */
export interface DiscountApplicability {
  entityId: string;
  entityType: DiscountApplicabilityEntityType;
}

```

### file path: src/libs/location/api/index.ts

```ts
import {
  generateMockCities,
  generateMockCountries,
  generateMockNearestLocation,
  generateMockStates,
} from '@/libs/location/mocks';

export async function getCountries() {
  return generateMockCountries(); /* httpClient.get<CanonicalLocationDto[]>(`/locations/countries`); */
}

export async function getStatesByCountry(countryId: string) {
  return generateMockStates(); /* httpClient.get<CanonicalLocationDto[]>(`/locations/countries/${countryId}/states`); */
}

export async function getCitiesByState(stateId: string) {
  return generateMockCities(); /* httpClient.get<CanonicalLocationDto[]>(`/locations/states/${stateId}/cities`); */
}

export async function getNearestLocation(lat: number, lng: number) {
  return generateMockNearestLocation(); /* httpClient.get<NearestLocationResponseDto>(`/locations/nearest?lat=${lat}&lng=${lng}`); */
}

```

### file path: src/libs/location/components/AddressForm.tsx

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Button, Form, Input, Select, SelectItem, Switch } from '@heroui/react';
import {
  useCitiesByState,
  useCountries,
  useNearestLocation,
  useStatesByCountry,
} from '@/libs/location/hooks';
import { CanonicalLocationForm } from '@/libs/location/components/CanonicalLocationForm';
import { GeoPointForm } from '@/libs/location/components/GeoPointForm';
import { AddressDto, AddressType, CanonicalLocationType } from '@/libs/location/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAddressSchema } from '@/libs/location/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { StoreCreationStepsNav } from '@/libs/stores/components/StoreCreationStepsNav';
import toast from 'react-hot-toast';

interface Props {
  isPending: boolean;
  onSubmit: (data: AddressDto) => void;
}

export function AddressForm({ isPending, onSubmit }: Props) {
  const { webApp } = useTelegramWebApp();
  const addressForm = useForm<AddressDto>({
    resolver: zodResolver(createAddressSchema),
  });
  const { register, watch, setValue } = addressForm;
  const router = useRouter();

  const countryId = watch('country.id');
  const stateId = watch('state.id');
  const longitude = watch('geoPoint.longitude');
  const latitude = watch('geoPoint.latitude');

  const { data: countries = [], isLoading: loadingCountries } = useCountries();
  const { data: states = [], isLoading: loadingStates } = useStatesByCountry(countryId);
  const { data: cities = [], isLoading: loadingCities } = useCitiesByState(stateId);
  const { data: nearest, isFetching: nearestLoading } = useNearestLocation(latitude, longitude);

  useEffect(() => {
    if (webApp && webApp.LocationManager) {
      webApp.LocationManager.init(() => {
        if (webApp.LocationManager.isLocationAvailable && webApp.LocationManager.isAccessGranted) {
          detectLocation();
        }
      });
    }
    if (nearest) {
      setValue('country.id', nearest.country.id);
      if (nearest.state) setValue('state.id', nearest.state.id);
      if (nearest.city) setValue('city.id', nearest.city.id);
    }
  }, [webApp, setValue, nearest]);

  const detectLocation = () => {
    webApp?.LocationManager.getLocation((data) => {
      if (!data) {
        toast.error('Location access denied. Please enable it in settings.');
        openSettings();
        return;
      }
      setValue('geoPoint.latitude', data.latitude);
      setValue('geoPoint.longitude', data.longitude);
    });
  };

  const openSettings = () => {
    webApp?.LocationManager.openSettings();
  };

  return (
    <FormProvider {...addressForm}>
      {!latitude && !longitude && (
        <Alert
          color="primary"
          description="Allow location access to help fill out this form"
          endContent={
            <Button size="sm" color="primary" onPress={detectLocation}>
              Allow Access
            </Button>
          }
        />
      )}
      <Form onSubmit={addressForm.handleSubmit(onSubmit)}>
        <Input {...register('label')} label="Label" />
        <CanonicalLocationForm data={countries} type={CanonicalLocationType.COUNTRY} />
        <CanonicalLocationForm data={states} type={CanonicalLocationType.STATE} />
        <CanonicalLocationForm data={cities} type={CanonicalLocationType.CITY} />
        <Input {...register('streetLine1')} label="Street Line 1" />
        <Input {...register('streetLine2')} label="Street Line 2" />
        <Input {...register('postalCode')} label="Postal Code" />
        <Select {...register('type')} label="Type">
          {Object.values<string>(AddressType).map((type) => (
            <SelectItem key={type}>{type}</SelectItem>
          ))}
        </Select>
        <GeoPointForm />
        <div className="my-2 flex w-full items-center justify-between">
          <label className="text-xs">Save as Default location</label>
          <Switch {...register('isDefault')} />
        </div>

        {/* Buttons */}
        <StoreCreationStepsNav>
          <Button type="button" onPress={() => router.back()}>
            Back
          </Button>
          <Button type="submit" color="primary" isLoading={isPending}>
            Save & Continue
          </Button>
        </StoreCreationStepsNav>
      </Form>
    </FormProvider>
  );
}

```

### file path: src/libs/location/components/CanonicalLocationForm.tsx

```tsx
import { Select, SelectItem } from '@heroui/react';
import { useFormContext } from 'react-hook-form';
import { AddressDto, CanonicalLocationDto, CanonicalLocationType } from '@/libs/location/types';

interface Props {
  data: CanonicalLocationDto[];
  type: CanonicalLocationType;
}

export function CanonicalLocationForm({ data, type }: Props) {
  const { getValues } = useFormContext<AddressDto>();
  return (
    <Select value={getValues(`${type}.id`)} label={type}>
      {data.map((item) => (
        <SelectItem key={item.id}>{item.name}</SelectItem>
      ))}
    </Select>
  );
}

```

### file path: src/libs/location/components/GeoPointForm.tsx

```tsx
import { Input } from '@heroui/react';
import { useFormContext } from 'react-hook-form';
import { AddressDto } from '@/libs/location/types';

export function GeoPointForm() {
  const { getValues } = useFormContext<AddressDto>();
  return (
    <div className="flex w-full gap-x-3">
      <Input
        disabled
        type="number"
        value={getValues('geoPoint.latitude')?.toString()}
        label="Latitude"
      ></Input>
      <Input
        disabled
        type="number"
        value={getValues('geoPoint.longitude')?.toString()}
        label="Longitude"
      ></Input>
    </div>
  );
}

```

### file path: src/libs/location/hooks/index.ts

```ts
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  getCitiesByState,
  getCountries,
  getNearestLocation,
  getStatesByCountry,
} from '@/libs/location/api';
import { CanonicalLocationDto, NearestLocationResponseDto } from '@/libs/location/types';

export function useCountries() {
  return useQuery<CanonicalLocationDto[]>({
    queryKey: queryKeys.location.countries,
    queryFn: getCountries,
  });
}

export function useStatesByCountry(countryId?: string) {
  return useQuery<CanonicalLocationDto[]>({
    queryKey: queryKeys.location.statesByCountry(countryId!),
    queryFn: () => getStatesByCountry(countryId!),
    enabled: !!countryId,
  });
}

export function useCitiesByState(stateId?: string) {
  return useQuery<CanonicalLocationDto[]>({
    queryKey: queryKeys.location.citiesByState(stateId!),
    queryFn: () => getCitiesByState(stateId!),
    enabled: !!stateId,
  });
}

export function useNearestLocation(lat?: number, lng?: number) {
  return useQuery<NearestLocationResponseDto>({
    queryKey: queryKeys.location.nearest(lat!, lng!),
    queryFn: () => getNearestLocation(lat!, lng!),
    enabled: !!lat && !!lng,
  });
}

```

### file path: src/libs/location/mocks/index.ts

```ts
import { faker } from '@faker-js/faker';

import {
  AddressDto,
  AddressType,
  CanonicalLocationDto,
  CanonicalLocationType,
  NearestLocationResponseDto,
} from '../types';

function generateMockCanonicalLocation(type: CanonicalLocationDto['type']): CanonicalLocationDto {
  return {
    id: faker.string.uuid(),
    name:
      type === 'city'
        ? faker.location.city()
        : type === 'state'
          ? faker.location.state()
          : faker.location.country(),
    type,
    parentId: faker.number.int(),
    postalCode: faker.location.zipCode(),
    latitude: Number(faker.location.latitude()),
    longitude: Number(faker.location.longitude()),
  };
}

export function generateMockAddress(): AddressDto {
  return {
    geoPoint: {
      latitude: Number(faker.location.latitude()),
      longitude: Number(faker.location.longitude()),
    },
    id: faker.string.uuid(),
    label: 'Home',
    country: generateMockCanonicalLocation(CanonicalLocationType.COUNTRY),
    state: generateMockCanonicalLocation(CanonicalLocationType.STATE),
    city: generateMockCanonicalLocation(CanonicalLocationType.CITY),
    streetLine1: faker.location.streetAddress(),
    streetLine2: faker.location.secondaryAddress(),
    postalCode: faker.location.zipCode(),
    type: AddressType.SHIPPING,
    isDefault: true,
  };
}

export const generateMockCountries = (): CanonicalLocationDto[] => {
  return Array.from({ length: 5 }, () =>
    generateMockCanonicalLocation(CanonicalLocationType.COUNTRY),
  );
};

export const generateMockStates = (): CanonicalLocationDto[] => {
  return Array.from({ length: 5 }, () =>
    generateMockCanonicalLocation(CanonicalLocationType.STATE),
  );
};

export const generateMockCities = (): CanonicalLocationDto[] => {
  return Array.from({ length: 5 }, () => generateMockCanonicalLocation(CanonicalLocationType.CITY));
};

export const generateMockNearestLocation = (): NearestLocationResponseDto => {
  return {
    country: generateMockCanonicalLocation(CanonicalLocationType.COUNTRY),
    state: generateMockCanonicalLocation(CanonicalLocationType.STATE),
    city: generateMockCanonicalLocation(CanonicalLocationType.CITY),
  };
};

```

### file path: src/libs/location/schemas/index.ts

```ts
import { z } from 'zod';
import {
  AddressDto,
  AddressType,
  CanonicalLocationDto,
  CanonicalLocationType,
  GeoPoint,
} from '@/libs/location/types';

export const geoPointSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
}) satisfies z.ZodType<GeoPoint>;

export const canonicalLocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(CanonicalLocationType),
  parentId: z.number().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
}) satisfies z.ZodType<CanonicalLocationDto>;

export const createAddressSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  country: canonicalLocationSchema,
  state: canonicalLocationSchema.optional(),
  city: canonicalLocationSchema.optional(),
  streetLine1: z.string(),
  streetLine2: z.string().optional(),
  postalCode: z.string().optional(),
  geoPoint: geoPointSchema,
  type: z.nativeEnum(AddressType),
  isDefault: z.boolean().optional(),
}) satisfies z.ZodType<AddressDto>;

```

### file path: src/libs/location/types/index.ts

```ts
/**
 * Defines the type of canonical location entity.
 * Used for categorizing countries, states, and cities.
 */
export enum CanonicalLocationType {
  COUNTRY = 'country',
  STATE = 'state',
  CITY = 'city',
}

/**
 * Enum to distinguish different address use cases in the system.
 */
export enum AddressType {
  USER = 'user',
  STORE = 'store',
  SHIPPING = 'shipping',
  BILLING = 'billing',
  PICKUP = 'pickup',
}

export interface GeoPoint {
  latitude?: number;
  longitude?: number;
}

export interface CanonicalLocationDto {
  id: string;
  name: string;
  type: CanonicalLocationType;
  parentId?: number;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressDto {
  id: string;
  label?: string;
  country: CanonicalLocationDto;
  state?: CanonicalLocationDto;
  city?: CanonicalLocationDto;
  streetLine1: string;
  streetLine2?: string;
  postalCode?: string;
  geoPoint: GeoPoint;
  type: AddressType;
  isDefault?: boolean;
}

export interface RegionFilterDto {
  countryId?: string;
  stateId?: string;
  cityId?: string;
}

export interface GeoFilterDto {
  center: GeoPoint;
  radiusKm: number;
}

export interface NearestLocationResponseDto {
  country: CanonicalLocationDto;
  state?: CanonicalLocationDto;
  city?: CanonicalLocationDto;
}

export interface GetNearestLocationQuery extends GeoPoint {
  radius?: number;
  limit?: number;
}

```

### file path: src/libs/orders/api/index.ts

```ts
import { CreateOrderDto, CreateOrderShipmentDto, UpdateOrderDto } from '@/libs/orders/types';
import { generateMockOrderDetail, generateMockOrderSummaries } from '@/libs/orders/mocks';

export async function getMyOrders() {
  /* return httpClient.get<OrderSummary[]>('orders'); */
  return generateMockOrderSummaries();
}

export async function getOrderDetails(id: string) {
  /* return httpClient.get<OrderDetail>(`/orders/${id}`); */
  return generateMockOrderDetail();
}

export async function createOrder(data: CreateOrderDto) {
  /* return httpClient.post<OrderDetail>(`/orders`, data); */
  return generateMockOrderDetail();
}

export async function updateOrder(id: string, data: UpdateOrderDto) {
  /* return httpClient.patch<OrderDetail>(`/orders/${id}`, data); */
  return generateMockOrderDetail();
}

export async function addShipment(id: string, data: CreateOrderShipmentDto) {
  /* return httpClient.post<OrderDetail>(`/orders/${id}/shipment`, data); */
  return generateMockOrderDetail();
}

```

### file path: src/libs/orders/components/ItemNotification.tsx

```tsx
import { FaChevronRight } from 'react-icons/fa';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ItemNotificationProps {
  text: string;
  icon: ReactNode;
  url?: string;
}

export function ItemNotification({ text, icon, url = '' }: ItemNotificationProps) {
  return (
    <div className="bg-background border-divider flex items-center justify-between rounded-md border p-2 shadow-xs">
      <div className="bg-default rounded-full p-2">{icon}</div>
      <div className="col-span-3 grow px-2 font-semibold">{text}</div>
      <div>
        <Link href={url}>
          <Button size="sm" className="bg-transparent" color="secondary" isIconOnly>
            <FaChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}

```

### file path: src/libs/orders/components/OrderInfoSummary.tsx

```tsx
import { PriceComponent } from '@/libs/common/components/PriceComponent';
import { formatSafeDate } from '@/libs/common/utils/date';
import React from 'react';
import { OrderDetail } from '@/libs/orders/types';

export function OrderInfoSummary({ order }: { order: OrderDetail }) {
  return (
    <>
      <div className="bg-content1 grid grid-cols-2 gap-3 rounded-lg p-4 text-sm shadow">
        <span className="text-default-600">Total Amount</span>
        <span>
          <PriceComponent amount={order.totalAmount} />
        </span>
        <span className="text-default-600">Delivery Date</span>
        <span>{formatSafeDate(order.expectedDeliveryDate)}</span>
        <span className="text-default-600">Estimated Delivery</span>
        <span>{formatSafeDate(order.shipment?.expectedDeliveryDate ?? '-')}</span>
      </div>
    </>
  );
}

```

### file path: src/libs/orders/components/OrderItemPreview.tsx

```tsx
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import Image from 'next/image';
import { PriceComponent } from '@/libs/common/components/PriceComponent';
import { OrderItemPreviewDto } from '@/libs/orders/types';
import Link from 'next/link';

export function OrderItemPreviewCard({ orderItem }: { orderItem: OrderItemPreviewDto }) {
  return (
    <Link
      className="block"
      href={`/stores/${orderItem.product.storeId}/products/${orderItem.product.id}}`}
    >
      <Card>
        <CardBody className="flex flex-row justify-between text-sm">
          <div className="flex gap-x-4">
            <div className="relative h-16 w-16">
              <Image
                src={orderItem.product.primaryImage.url || '/fallback-order.png'}
                alt="product photo"
                fill
                sizes="4rem"
                className="rounded object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-4">
              <h3
                className="block max-w-40 truncate font-semibold"
                aria-label={orderItem.product.name}
              >
                {orderItem.product.name}
              </h3>
              <PriceComponent amount={orderItem.totalPrice} />
            </div>
          </div>
          <Chip color="primary" size="md">
            x{orderItem.quantity}
          </Chip>
        </CardBody>
      </Card>
    </Link>
  );
}

```

### file path: src/libs/orders/components/OrderShipmentCard.tsx

```tsx
import { OrderShipment } from '@/libs/orders/types';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { formatSafeDate } from '@/libs/common/utils/date';

export function OrderShipmentCard({ shipment }: { shipment: OrderShipment }) {
  if (!shipment) {
    return null;
  }

  return (
    <>
      <PageHeader title="Shipment Details" />

      <div className="bg-content1 grid grid-cols-2 gap-3 rounded-lg p-4 text-sm shadow">
        <span className="text-default-600">Tracking Number</span>
        <span className="truncate">{shipment.trackingNumber}</span>

        <span className="text-default-600">Courier Service</span>
        <span>{shipment.courierService}</span>

        <span className="text-default-600">Status</span>
        <span>{shipment.status || 'unknown'}</span>

        {shipment.expectedDeliveryDate && (
          <>
            <span className="text-default-600">Expected Delivery</span>
            <span>{formatSafeDate(shipment.expectedDeliveryDate)}</span>
          </>
        )}

        <span className="text-default-600">Shipped At</span>
        <span>{formatSafeDate(shipment.shippedAt)}</span>

        {shipment.carrierTrackingUrl && (
          <div className="flex flex-col">
            <span className="text-default-600">Track Shipment</span>
            <a
              href={shipment.carrierTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Click here to track
            </a>
          </div>
        )}
      </div>
    </>
  );
}

```

### file path: src/libs/orders/components/OrderStatusChip.tsx

```tsx
'use client';

import { Chip } from '@heroui/react';
import { useMemo } from 'react';

import { OrderStatus } from '@/libs/orders/types';

interface OrderStatusChipProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

const ORDER_STATUS_CONFIG: Record<OrderStatus, { color: ChipColor; label: string }> = {
  [OrderStatus.PENDING]: { color: 'default', label: 'Pending' },
  [OrderStatus.CONFIRMED]: { color: 'default', label: 'Confirmed' },
  [OrderStatus.PROCESSING]: { color: 'primary', label: 'Processing' },
  [OrderStatus.SHIPPED]: { color: 'primary', label: 'Shipped' },
  [OrderStatus.DELIVERED]: { color: 'success', label: 'Delivered' },
  [OrderStatus.COMPLETED]: { color: 'success', label: 'Completed' },
  [OrderStatus.CANCELED]: { color: 'danger', label: 'Canceled' },
  [OrderStatus.REFUNDED]: { color: 'danger', label: 'Refunded' },
};

const DEFAULT_STATUS_CONFIG = { color: 'default', label: 'Unknown' };

export const getOrderStatusConfig = (status: OrderStatus) => {
  return ORDER_STATUS_CONFIG[status] || DEFAULT_STATUS_CONFIG;
};

export function OrderStatusChip({ status, size = 'sm', className }: OrderStatusChipProps) {
  const { color, label } = useMemo(() => getOrderStatusConfig(status), [status]);

  return (
    <Chip color={color} size={size} className={className}>
      {label}
    </Chip>
  );
}

```

### file path: src/libs/orders/components/OrderSummaries.tsx

```tsx
import { Button } from '@heroui/button';
import { OrderSummaryCard } from '@/libs/orders/components/OrderSummaryCard';
import { OrderSummary } from '@/libs/orders/types';
import { PageHeader } from '@/libs/common/components/PageHeader';

export function OrderSummaries({
  orders,
  title,
  subtitle,
}: {
  orders: OrderSummary[];
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="space-y-4">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="space-y-4">
        {orders.length === 0 ? (
          <Button as="link" href="/orders">
            Create your first order
          </Button>
        ) : (
          orders.map((order) => <OrderSummaryCard key={order.id} order={order} />)
        )}
      </div>
    </section>
  );
}

```

### file path: src/libs/orders/components/OrderSummaryCard.tsx

```tsx
'use client';

import { Card, CardBody, CardHeader, Skeleton } from '@heroui/react';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { PriceComponent } from '@/libs/common/components/PriceComponent';
import { DATE_FORMATS, formatSafeDate } from '@/libs/common/utils/date';
import { OrderSummary } from '@/libs/orders/types';

import { OrderStatusChip } from './OrderStatusChip';

interface OrderSummaryCardProps {
  order: OrderSummary;
  isLoading?: boolean;
}

const OrderSummaryCardSkeleton = () => (
  <Card className="w-full">
    <CardHeader className="flex items-center justify-between">
      <div className="flex-1">
        <Skeleton className="mb-2 h-4 w-24 rounded" />
        <Skeleton className="h-3 w-32 rounded" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </CardHeader>
    <CardBody>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-20 rounded" />
        <div className="text-right">
          <Skeleton className="mb-1 h-3 w-16 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </div>
    </CardBody>
  </Card>
);

export function OrderSummaryCard({ order, isLoading = false }: OrderSummaryCardProps) {
  const { id, status, totalAmount, store, expectedDeliveryDate, createdAt } = order;

  const cardContent = useMemo(() => {
    return (
      <Link className="block" href={`/orders/${id}`}>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="max-w-4/5">
              <h3 className="truncate text-sm font-semibold">{id}</h3>
              <p className="text-default-500 text-xs">
                {formatSafeDate(createdAt, DATE_FORMATS.SHORT, 'Unknown date')} —{' '}
                <span className="text-default-500">{store.displayName}</span>
              </p>
            </div>
            <OrderStatusChip status={status} />
          </CardHeader>
          <CardBody className="text-default-500 text-sm">
            <div className="flex items-center justify-between">
              <PriceComponent amount={totalAmount} />
              <div className="text-default-500 text-right text-xs">
                <p className="font-medium">Est. Delivery</p>
                <p>{formatSafeDate(expectedDeliveryDate, DATE_FORMATS.SHORT, 'TBD')}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    );
  }, [id, createdAt, store.displayName, status, totalAmount, expectedDeliveryDate]);

  if (isLoading) {
    return <OrderSummaryCardSkeleton />;
  }

  return cardContent;
}

```

### file path: src/libs/orders/components/OrdersTypesTabs.tsx

```tsx
'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { OrderSummary } from '@/libs/orders/types';
import { OrderSummaries } from '@/libs/orders/components/OrderSummaries';

export function OrdersTypesTabs({
  sales,
  purchases,
}: {
  sales: OrderSummary[];
  purchases: OrderSummary[];
}) {
  return (
    <Tabs fullWidth color="primary" radius="lg">
      <Tab key="sales" title="Sales">
        <OrderSummaries
          orders={sales}
          title="Order History"
          subtitle="View and manage your orders with detailed tracking information."
        />
      </Tab>
      <Tab key="purchases" title="Purchases">
        <OrderSummaries
          orders={purchases}
          title="Incoming Orders"
          subtitle="Prepare shipments which recieves to your stores"
        />
      </Tab>
    </Tabs>
  );
}

```

### file path: src/libs/orders/hooks/index.ts

```ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  addShipment,
  createOrder,
  getMyOrders,
  getOrderDetails,
  updateOrder,
} from '@/libs/orders/api';
import {
  CreateOrderDto,
  CreateOrderShipmentDto,
  OrderDetail,
  OrderSummary,
  UpdateOrderDto,
} from '@/libs/orders/types';

export function useMyOrders() {
  return useQuery<OrderSummary[]>({
    queryKey: queryKeys.orders.all,
    queryFn: getMyOrders,
  });
}

export function useOrderDetails(id: string) {
  return useQuery<OrderDetail>({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => getOrderDetails(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, CreateOrderDto>({
    mutationFn: (data) => createOrder(data),
    onSuccess: async () => {
      await queryClient.prefetchQuery({
        queryKey: queryKeys.orders.all,
        queryFn: getMyOrders,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useUpdateOrder(id: string) {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, UpdateOrderDto>({
    mutationFn: (data) => updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
    },
  });
}

export function useAddShipment(id: string) {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, CreateOrderShipmentDto>({
    mutationFn: (data) => addShipment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
    },
  });
}

```

### file path: src/libs/orders/mocks/index.ts

```ts
import { faker } from '@faker-js/faker';

import { generateMockPaymentSummary } from '@/libs/payments/mocks';
import { generateMockProductPreview } from '@/libs/products/mocks';
import { generateMockStorePreview } from '@/libs/stores/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

import { OrderDetail, OrderItemPreviewDto, OrderStatus, OrderSummary } from '../types';

export async function generateMockOrderItemPreview(): Promise<OrderItemPreviewDto> {
  return {
    product: await generateMockProductPreview(),
    unitPrice: Number(faker.commerce.price({ min: 10, max: 300 })),
    quantity: faker.number.int({ min: 1, max: 5 }),
    totalPrice: Number(faker.commerce.price({ min: 10, max: 300 })),
  };
}

export async function generateMockOrderSummary(): Promise<OrderSummary> {
  return {
    id: faker.string.uuid(),
    status: OrderStatus.PENDING,
    totalAmount: Number(faker.commerce.price({ min: 50, max: 500 })),
    store: await generateMockStorePreview(),
    expectedDeliveryDate: faker.date.soon(),
    createdAt: faker.date.past(),
  };
}

export async function generateMockOrderDetail(): Promise<OrderDetail> {
  return {
    ...(await generateMockOrderSummary()),
    items: await generateMockOrderItemPreviews(),
    shipment: {
      id: faker.string.uuid(),
      trackingNumber: faker.string.uuid(),
      courierService: faker.company.name(),
      expectedDeliveryDate: faker.date.future(),
      shippedAt: faker.date.past(),
    },
    payment: await generateMockPaymentSummary(),
    customer: await generateMockUserSummary(),
  };
}

export async function generateMockOrderSummaries(): Promise<OrderSummary[]> {
  return Promise.all(Array.from({ length: 2 }, () => generateMockOrderSummary()));
}

export async function generateMockOrderItemPreviews(): Promise<OrderItemPreviewDto[]> {
  return Promise.all(Array.from({ length: 3 }, () => generateMockOrderItemPreview()));
}

```

### file path: src/libs/orders/schemas/index.ts

```ts
import { z } from 'zod';

import {
  type CreateOrderDto,
  CreateOrderItemDto,
  type CreateOrderShipmentDto,
  OrderStatus,
  type UpdateOrderDto,
} from '@/libs/orders/types';

export const createOrderItemDtoSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
}) satisfies z.ZodType<CreateOrderItemDto>;

export const createOrderDtoSchema = z.object({
  items: z.array(createOrderItemDtoSchema).min(1),
  shippingAddress: z.string().optional(),
}) satisfies z.ZodType<CreateOrderDto>;

export const createOrderShipmentDtoSchema = z.object({
  trackingNumber: z.string().optional(),
  courierService: z.string().optional(),
  expectedDeliveryDate: z.string().optional(),
}) satisfies z.ZodType<CreateOrderShipmentDto>;

export const updateOrderDtoSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  shippingAddress: z.string().optional(),
  items: z.array(createOrderItemDtoSchema).optional(),
}) satisfies z.ZodType<UpdateOrderDto>;

```

### file path: src/libs/orders/types/index.ts

```ts
import { PaymentSummary } from '@/libs/payments/types';
import { ProductPreviewDto } from '@/libs/products/types';
import { StorePreviewDto } from '@/libs/stores/types';
import { UserSummary } from '@/libs/users/types';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

export interface OrderItemPreviewDto {
  product: ProductPreviewDto;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  store: StorePreviewDto;
  expectedDeliveryDate: Date;
  createdAt: Date;
}

export interface OrderDetail extends OrderSummary {
  items: OrderItemPreviewDto[];
  shipment?: OrderShipment;
  payment?: PaymentSummary;
  customer: UserSummary;
}

export interface OrderShipment {
  id: string;
  trackingNumber: string;
  carrierTrackingUrl?: string;
  status?: 'created' | 'in_transit' | 'delivered' | 'failed';
  courierService: string;
  expectedDeliveryDate?: Date;
  shippedAt: Date;
}

export interface CreateOrderDto {
  items: CreateOrderItemDto[];
  shippingAddress?: string;
}

export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderShipmentDto {
  trackingNumber?: string;
  courierService?: string;
  expectedDeliveryDate?: string;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: string;
  items?: CreateOrderItemDto[];
}

```

### file path: src/libs/payments/api/index.ts

```ts
import { generateMockPaymentDetail, generateMockPaymentSummaries } from '@/libs/payments/mocks';
import { CreatePaymentDto } from '@/libs/payments/types';

export async function getPayments() {
  return generateMockPaymentSummaries(); /* httpClient.get<PaymentSummary[]>('/payments'); */
}

export async function getPaymentDetails(id: number) {
  return generateMockPaymentDetail(); /* httpClient.get<PaymentDetail>(`/payments/${id}`); */
}

export async function createPayment(data: CreatePaymentDto) {
  return generateMockPaymentDetail(); /* httpClient.post<PaymentDetail>('/payments', data); */
}

```

### file path: src/libs/payments/components/PaymentStatusChip.tsx

```tsx
import { PaymentStatus } from '@/libs/payments/types';
import { Chip } from '@heroui/chip';

type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { color: ChipColor; label: string }> = {
  [PaymentStatus.PENDING]: { color: 'default', label: 'Pending' },
  [PaymentStatus.PROCESSING]: { color: 'primary', label: 'Processing' },
  [PaymentStatus.COMPLETED]: { color: 'success', label: 'Completed' },
  [PaymentStatus.REFUNDED]: { color: 'danger', label: 'Refunded' },
  [PaymentStatus.FAILED]: { color: 'danger', label: 'Failed' },
};

const DEFAULT_STATUS_CONFIG = { color: 'default', label: 'Unknown' };

export const getPaymentStatusConfig = (status: PaymentStatus) => {
  return PAYMENT_STATUS_CONFIG[status] || DEFAULT_STATUS_CONFIG;
};

export function PaymentStatusChip({ status }: { status: PaymentStatus }) {
  const { color, label } = getPaymentStatusConfig(status);

  return (
    <Chip color={color} size="sm">
      {label}
    </Chip>
  );
}

```

### file path: src/libs/payments/components/TonPaymentButton.tsx

```tsx
'use client';

import { environment } from '@environments';
import { Button } from '@heroui/react';
import { toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import toast from 'react-hot-toast';

import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { useCreatePayment } from '@/libs/payments/hooks';
import { buildMarketplaceTransaction } from '@/libs/payments/utils';
import { PriceComponent } from '@/libs/common/components/PriceComponent';

interface TonPaymentButtonProps {
  /** Payment amount in TON */
  paymentAmount: number;
  /** The wallet address of the recipient (seller) who will receive the payment in TON. */
  recipientWalletAddress?: string;
  /** Every payment related to an order so, we need the Order ID */
  orderId: string;
}

export function TonPaymentButton({
  paymentAmount,
  recipientWalletAddress,
  orderId,
}: TonPaymentButtonProps) {
  /* Telegram API; needed for Haptic Feedback after the transaction */
  const { webApp } = useTelegramWebApp();
  /* TON Connect UI instance for wallet connections and transactions */
  const [tonConnectUI] = useTonConnectUI();
  /* Returns current TON wallet or null if not connected.
     Provides access to the wallet's address, provider, and other details */
  const wallet = useTonWallet();
  /* Gets raw TON wallet address (isUserFriendly=false). Returns empty string if the wallet is not connected. */
  const userAddress = useTonAddress(false);
  /* Creates a payment record in the database by storing transaction details */
  const { mutateAsync: createPayment } = useCreatePayment();
  const smartContractAddress = environment.smartContractAddress;

  const handlePay = async () => {
    /* If the wallet is not connected, open the wallet selection modal */
    if (wallet === null || !recipientWalletAddress) {
      toast.error(
        'Wallet not connected. Please connect your TON wallet to proceed with the payment.',
      );
      await tonConnectUI.openModal();
      return;
    }

    try {
      const nanoAmount = toNano(paymentAmount);

      /* Builds a transaction request for the marketplace smart contract */
      const transactionRequest = buildMarketplaceTransaction({
        nanoAmount,
        recipientWalletAddress,
        smartContractAddress,
        orderId,
      });

      /* Sends a transaction request to the wallet and returns the signed BoC (transaction data) */
      const { boc } = await tonConnectUI.sendTransaction(transactionRequest);

      await createPayment({
        orderId,
        amount: nanoAmount.toString(),
        fromWalletAddress: userAddress,
        toWalletAddress: recipientWalletAddress,
        boc,
      });
      toast.success('Payment successfully sent and recorded');
    } catch (error) {
      console.error('TON payment failed:', error);
      toast.error('Transaction was unsuccessful. Please check your wallet and try again.');
    } finally {
      webApp?.HapticFeedback.impactOccurred('light');
    }
  };

  return (
    <Button color="primary" variant="shadow" fullWidth onPress={handlePay}>
      {wallet ? (
        <>
          {`Pay `}
          <PriceComponent amount={paymentAmount} />
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
}

```

### file path: src/libs/payments/hooks/index.ts

```ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createPayment, getPaymentDetails, getPayments } from '@/libs/payments/api';
import { CreatePaymentDto } from '@/libs/payments/types';

export function usePayments() {
  return useQuery({
    queryKey: ['components'],
    queryFn: getPayments,
  });
}

export function usePaymentDetails(id: number) {
  return useQuery({
    queryKey: ['payment-detail', id],
    queryFn: () => getPaymentDetails(id),
    enabled: !!id,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentDto) => createPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
    },
  });
}

```

### file path: src/libs/payments/mocks/index.ts

```ts
import { faker } from '@faker-js/faker';

import { generateMockOrderSummary } from '@/libs/orders/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

import { PaymentDetail, PaymentStatus, PaymentSummary, TokenSymbol } from '../types';

export async function generateMockPaymentSummary(): Promise<PaymentSummary> {
  return {
    id: faker.string.uuid(),
    tokenSymbol: faker.helpers.arrayElement(['USDC', 'ETH']) as TokenSymbol,
    status: PaymentStatus.PENDING,
    amount: faker.finance.amount(),
    txHash: faker.string.hexadecimal({ length: 64 }),
    createdAt: faker.date.past(),
  };
}

export async function generateMockPaymentSummaries(): Promise<PaymentSummary[]> {
  return Promise.all(Array.from({ length: 5 }, () => generateMockPaymentSummary()));
}

export async function generateMockPaymentDetail(): Promise<PaymentDetail> {
  return {
    ...(await generateMockPaymentSummary()),
    totalFees: faker.finance.amount(),
    commission: faker.finance.amount(),
    fromWalletAddress: faker.finance.ethereumAddress(),
    toWalletAddress: faker.finance.ethereumAddress(),
    order: await generateMockOrderSummary(),
    user: await generateMockUserSummary(),
  };
}

```

### file path: src/libs/payments/schemas/index.ts

```ts
import { z } from 'zod';
import { type BuildTxOpts, type CreatePaymentDto, PaymentStatus } from '@/libs/payments/types';

export const paymentStatusSchema = z.nativeEnum(PaymentStatus);

export const createPaymentDtoSchema = z.object({
  orderId: z.string(),
  amount: z.string(),
  fromWalletAddress: z.string().optional(),
  toWalletAddress: z.string().optional(),
  boc: z.string(),
}) satisfies z.ZodType<CreatePaymentDto>;

export const buildTxOptsSchema = z.object({
  nanoAmount: z.bigint().nonnegative(),
  recipientWalletAddress: z.string(),
  smartContractAddress: z.string(),
  opcode: z.number().int().optional(),
  orderId: z.string(),
}) satisfies z.ZodType<BuildTxOpts>;

```

### file path: src/libs/payments/types/index.ts

```ts
import { OrderSummary } from '@/libs/orders/types';
import { UserSummary } from '@/libs/users/types';

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum TokenSymbol {
  TON = 'TON',
  ETH = 'ETH',
  USDT = 'USDT',
}

export interface PaymentSummary {
  id: string;
  status: PaymentStatus;
  amount: string;
  tokenSymbol: TokenSymbol;
  txHash?: string;
  createdAt: Date;
}

export interface PaymentDetail extends PaymentSummary {
  totalFees?: string;
  commission?: string;
  fromWalletAddress?: string;
  toWalletAddress?: string;
  order: OrderSummary;
  user: UserSummary;
}

export interface CreatePaymentDto {
  orderId: string;
  amount: string;
  fromWalletAddress?: string;
  toWalletAddress?: string;
  boc: string;
}

export interface BuildTxOpts {
  nanoAmount: bigint;
  recipientWalletAddress: string;
  smartContractAddress: string;
  opcode?: number;
  orderId: string;
}

```

### file path: src/libs/payments/utils/index.ts

```ts
import { Address, beginCell } from '@ton/core';

import { BuildTxOpts } from '@/libs/payments/types';

export function buildMarketplaceTransaction({
  nanoAmount,
  recipientWalletAddress,
  smartContractAddress,
  opcode = 0,
  orderId,
}: BuildTxOpts) {
  if (nanoAmount <= 0) {
    throw new Error(`Payment amount must be greater than zero, received: ${nanoAmount}`);
  }

  let parsedSeller: Address;
  try {
    parsedSeller = Address.parse(recipientWalletAddress);
  } catch {
    throw new Error(`Invalid seller address: ${recipientWalletAddress}`);
  }

  const body = beginCell()
    .storeUint(opcode, 32)
    .storeUint(BigInt(orderId), 64)
    .storeCoins(nanoAmount)
    .storeAddress(parsedSeller)
    .endCell();

  return {
    validUntil: Math.floor(Date.now() / 1000) + 300,
    messages: [
      {
        address: smartContractAddress,
        amount: nanoAmount.toString(),
        payload: body.toBoc().toString('base64'),
      },
    ],
  };
}

```

### file path: src/libs/products/api/index.ts

```ts
import {
  generateMockProductDetail,
  generateMockProductPhotos,
  generateMockProductPreviews,
} from '@/libs/products/mocks';
import { CreateProductDto, UpdateProductDto } from '@/libs/products/types';

export async function getStoreProducts(storeId: string) {
  /* httpClient.get<ProductPreviewDto[]>(`/stores/${storeId}`); */
  return generateMockProductPreviews();
}

export async function getProductDetails(storeId: string, productId: string) {
  /* httpClient.get<ProductDetailDto>(`/stores/${storeId}/products/${productId}`); */
  return generateMockProductDetail();
}

export async function uploadProductPhotos(data: File[]) {
  /* httpClient.post<ProductImageDto[]>(`/stores/products/photo`); */
  const formData = new FormData();
  data.forEach((file) => {
    formData.append('photos', file);
  });

  return generateMockProductPhotos();
}

export async function createProduct(storeId: string, data: CreateProductDto) {
  /* httpClient.post<ProductDetailDto>(`/stores/${storeId}`, data); */
  return generateMockProductDetail();
}

export async function updateProduct(storeId: string, productId: string, data: UpdateProductDto) {
  /* httpClient.patch<ProductDetailDto>(`/stores/${storeId}/products/${productId}`, data); */
  return generateMockProductDetail();
}

export async function deleteProduct(storeId: string, productId: string) {
  /* httpClient.delete<void>(`/stores/${storeId}/products/${productId}`); */
  return;
}

export async function searchAllProducts(query: string, storeId?: string) {
  /* httpClient.get<ProductPreviewDto[]>(`/stores/products?q=${query}`); */
  return generateMockProductPreviews();
}

```

### file path: src/libs/products/components/AddToCardButton.tsx

```tsx
'use client';

import { Button } from '@heroui/button';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';

export function AddToCardButton() {
  const { webApp } = useTelegramWebApp();

  return (
    <Button
      fullWidth
      size="lg"
      className="mt-4"
      color="primary"
      variant="shadow"
      onPress={() => {
        webApp?.HapticFeedback.impactOccurred('light');
      }}
    >
      Add to Cart
    </Button>
  );
}

```

### file path: src/libs/products/components/AutocompleteSearch.tsx

```tsx
'use client';

import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { FaSearch } from 'react-icons/fa';
import { useProductSearch } from '@/libs/products/hooks';

export function AutocompleteSearch() {
  const { products, query, setQuery, isLoading } = useProductSearch();
  return (
    <Autocomplete
      inputValue={query}
      onInputChange={setQuery}
      isLoading={isLoading}
      listboxProps={{
        emptyContent: 'No matching products found',
      }}
      aria-label="search input"
      placeholder="Shoe, Lingrie, Glassess, etc."
      startContent={<FaSearch />}
    >
      {products.map((product) => (
        <AutocompleteItem key={product.id} textValue={product.name}>
          {product.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}

```

### file path: src/libs/products/components/ProductAttributesField.tsx

```tsx
import { Button, Input } from '@heroui/react';
import {
  ArrayPath,
  FieldArray,
  FieldArrayWithId,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa6';

interface ProductAttributeFieldsProps<TFieldValues extends Record<string, unknown>> {
  fields: FieldArrayWithId<TFieldValues, ArrayPath<TFieldValues>, 'id'>[];
  register: UseFormRegister<TFieldValues>;
  append: UseFieldArrayAppend<TFieldValues, ArrayPath<TFieldValues>>;
  remove: UseFieldArrayRemove;
  name: Path<TFieldValues>;
}

export function ProductAttributeFields<TFieldValues extends Record<string, unknown>>({
  fields,
  register,
  append,
  remove,
  name,
}: ProductAttributeFieldsProps<TFieldValues>) {
  return (
    <section>
      <h2 className="mb-2 font-semibold">Attributes</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex items-center gap-2">
          <Input {...register(`${name}.${index}.name` as Path<TFieldValues>)} placeholder="Name" />
          <Input
            {...register(`${name}.${index}.value` as Path<TFieldValues>)}
            placeholder="Value"
          />
          <Button variant="light" size="sm" onPress={() => remove(index)}>
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        startContent={<FaPlus />}
        onPress={() =>
          append({
            name: '',
            value: '',
          } as FieldArray<TFieldValues, ArrayPath<TFieldValues>>)
        }
      >
        Add Attribute
      </Button>
    </section>
  );
}

```

### file path: src/libs/products/components/ProductPhotosUploader.tsx

```tsx
'use client';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { FaPaperclip, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useUploadProductPhotosMutation } from '@/libs/products/hooks';
import { useForm } from 'react-hook-form';
import { ProductImageDto } from '@/libs/products/types';
import { HorizontalScroll } from '@/libs/common/components/HorizontalScroll';

const DEFAULT_ACCEPT = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heic-sequence',
];
const MAX_FILES = 4;

export function ProductPhotosUploader() {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<ProductImageDto[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { setValue, getValues } = useForm();
  const { mutateAsync: uploadImages, isPending } = useUploadProductPhotosMutation();

  useEffect(() => {
    const initial = getValues('imageUrls') || [];
    setUploadedImageUrls(initial);
  }, [getValues]);

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const total = selectedImages.length + selected.length;

    if (total > MAX_FILES) {
      toast.error(`You can upload up to ${MAX_FILES} images.`);
      return;
    }

    const valid = selected.filter((file) => DEFAULT_ACCEPT.includes(file.type));
    if (valid.length !== selected.length) {
      toast.error('Some files were rejected due to unsupported types.');
    }

    const previews = valid.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...valid]);
    setPreviews((prev) => [...prev, ...previews]);
    setModalOpen(true);
  };

  const handleRemove = (index: number) => {
    const newFiles = [...selectedImages];
    const newPreviews = [...previews];
    newFiles.splice(index, 1);
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);

    setSelectedImages(newFiles);
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    try {
      const result = await uploadImages(selectedImages);
      setUploadedImageUrls(result);
      setValue('imageUrls', result);
      toast.success('Images uploaded!');
    } catch (err) {
      toast.error('Image upload failed');
    }
  };

  return (
    <div>
      <input
        ref={imageInputRef}
        hidden
        type="file"
        multiple
        accept={DEFAULT_ACCEPT.join(',')}
        aria-label="Choose images"
        onChange={handleSelectFiles}
      />

      <Button
        type="button"
        fullWidth
        isDisabled={selectedImages.length >= MAX_FILES}
        isLoading={isPending}
        onPress={() => imageInputRef.current?.click()}
        startContent={<FaPaperclip />}
      >
        Choose Product Photos
      </Button>

      {uploadedImageUrls.length > 0 && (
        <HorizontalScroll>
          {uploadedImageUrls.map((src, i) => (
            <Image
              key={`preview-${i}`}
              src={src.url}
              alt={`Preview ${i + 1}`}
              width={100}
              height={100}
              className="rounded border"
            />
          ))}
        </HorizontalScroll>
      )}

      <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
        <ModalContent>
          <ModalHeader>Preview Selected Images</ModalHeader>

          <ModalBody>
            {previews.length > 0 ? (
              <HorizontalScroll>
                {previews.map((src, i) => (
                  <div key={src} className="relative">
                    <Image
                      src={src}
                      alt={`Preview ${i + 1}`}
                      width={100}
                      height={100}
                      className="rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(i)}
                      className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-xs text-white"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </HorizontalScroll>
            ) : (
              <p className="text-default-500 text-sm">No images selected</p>
            )}
          </ModalBody>

          <ModalFooter className="flex justify-between">
            <Button
              variant="light"
              onPress={() => {
                selectedImages.forEach((_, i) => URL.revokeObjectURL(uploadedImageUrls[i].url));
                setSelectedImages([]);
                setUploadedImageUrls([]);
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              onPress={handleUpload}
              isLoading={isPending}
              isDisabled={selectedImages.length === 0}
            >
              Upload Images
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

```

### file path: src/libs/products/components/ProductPreviewCard.tsx

```tsx
'use client';

import { Card, CardBody, CardFooter } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

import { PriceComponent } from '@/libs/common/components/PriceComponent';
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

```

### file path: src/libs/products/components/ProductSummaryCard.tsx

```tsx
'use client';

import { Badge } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStore } from 'react-icons/fa6';

import { PriceComponent } from '@/libs/common/components/PriceComponent';
import { ProductSummaryDto, ProductType } from '@/libs/products/types';

interface ProductSummaryCardProps {
  product: ProductSummaryDto;
  className?: string;
}

export default function ProductSummaryCard({ product, className }: ProductSummaryCardProps) {
  const { id, slug, name, price, primaryImage, productType, store } = product;

  const href = `/products/${slug ?? id}`;

  const productTypeLabel: Record<ProductType, string> = {
    [ProductType.PHYSICAL]: 'Physical',
    [ProductType.DIGITAL]: 'Digital',
    [ProductType.SERVICE]: 'Service',
  };

  const typeColor: Record<ProductType, 'primary' | 'success' | 'warning'> = {
    [ProductType.PHYSICAL]: 'primary',
    [ProductType.DIGITAL]: 'success',
    [ProductType.SERVICE]: 'warning',
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:shadow-sm ${className}`}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt ?? name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-sm font-semibold">{name}</h3>
          <PriceComponent amount={price} />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-default-500 flex items-center gap-1 text-xs">
            <FaStore className="text-default" />
            <span className="line-clamp-1">{store.displayName}</span>
          </div>
          <Badge size="sm" color={typeColor[productType]}>
            {productTypeLabel[productType]}
          </Badge>
        </div>
      </div>
    </Link>
  );
}

```

### file path: src/libs/products/components/ProductTypeSelector.tsx

```tsx
'use client';

import { Select, SelectItem } from '@heroui/react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

import { ProductType } from '@/libs/products/types';

type ProductTypeSelectorProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
};

export function ProductTypeSelector<T extends FieldValues>({
  control,
  errors,
  name,
}: ProductTypeSelectorProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          label="Product Type"
          selectedKeys={new Set([field.value])}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as ProductType;
            field.onChange(selected);
          }}
          isInvalid={!!errors?.[name]}
          errorMessage={(errors?.[name] as Error)?.message}
        >
          {Object.entries(ProductType).map(([key, value]) => (
            <SelectItem key={value} aria-label={key}>
              {value}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
}

```

### file path: src/libs/products/components/ProductVariantField.tsx

```tsx
import { Button, Input } from '@heroui/react';
import {
  ArrayPath,
  FieldArray,
  FieldArrayWithId,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa6';

interface ProductVariantFieldsProps<TFieldValues extends Record<string, unknown>> {
  fields: FieldArrayWithId<TFieldValues, ArrayPath<TFieldValues>, 'id'>[];
  register: UseFormRegister<TFieldValues>;
  append: UseFieldArrayAppend<TFieldValues, ArrayPath<TFieldValues>>;
  remove: UseFieldArrayRemove;
  name: Path<TFieldValues>;
}

export function ProductVariantFields<TFieldValues extends Record<string, unknown>>({
  fields,
  register,
  append,
  remove,
  name,
}: ProductVariantFieldsProps<TFieldValues>) {
  return (
    <section>
      <h2 className="mb-2 font-semibold">Variants</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex items-center gap-2">
          <Input
            {...register(`${name}.${index}.variantName` as Path<TFieldValues>)}
            placeholder="Name"
          />
          <Input
            {...register(`${name}.${index}.variantValue` as Path<TFieldValues>)}
            placeholder="Value"
          />
          <Input
            type="number"
            {...register(`${name}.${index}.additionalPrice` as Path<TFieldValues>, {
              valueAsNumber: true,
            })}
            placeholder="Extra Price"
          />
          <Button variant="light" size="sm" onPress={() => remove(index)}>
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        startContent={<FaPlus />}
        onPress={() =>
          append({
            variantName: '',
            variantValue: '',
            additionalPrice: 0,
          } as FieldArray<TFieldValues, ArrayPath<TFieldValues>>)
        }
      >
        Add Variant
      </Button>
    </section>
  );
}

```

### file path: src/libs/products/components/SearchInput.tsx

```tsx
import { Form, Input } from '@heroui/react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

export function SearchInput({ query, setQuery }: SearchInputProps) {
  return (
    <Form>
      <Input value={query} onValueChange={setQuery} startContent={<FaSearch />} isClearable />
    </Form>
  );
}

```

### file path: src/libs/products/hooks/index.ts

```ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  createProduct,
  deleteProduct,
  getProductDetails,
  getStoreProducts,
  searchAllProducts,
  updateProduct,
  uploadProductPhotos,
} from '@/libs/products/api';
import { CreateProductDto, UpdateProductDto } from '@/libs/products/types';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

export function useStoreProducts(storeId: string) {
  return useQuery({
    queryKey: queryKeys.products.byStore(storeId),
    queryFn: () => getStoreProducts(storeId),
    enabled: !!storeId,
  });
}

export function useProductDetails(storeId: string, productId: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(storeId, productId),
    queryFn: () => getProductDetails(storeId, productId),
    enabled: !storeId && !productId,
  });
}

export function useUploadProductPhotosMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: File[]) => uploadProductPhotos(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

export function useCreateProductMutation(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => createProduct(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}

export function useUpdateProductMutation(storeId: string, productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductDto) => updateProduct(storeId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(storeId, productId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}

export function useDeleteProductMutation(storeId: string, productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(storeId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}

export const useProductSearch = (debounceDelay: number = 2000) => {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, debounceDelay);

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [debouncedQuery],
    queryFn: () => searchAllProducts(debouncedQuery),
    staleTime: 1000 * 60,
  });

  return {
    query,
    setQuery,
    products,
    isLoading,
    error,
  };
};

```

### file path: src/libs/products/mocks/index.ts

```ts
import { faker } from '@faker-js/faker';

import { generateMockReviewPreviews } from '@/libs/reviews/mocks';
import { generateMockStorePreview } from '@/libs/stores/mocks';
import {
  ProductDetailDto,
  ProductImageDto,
  ProductPreviewDto,
  ProductStatus,
  ProductSummaryDto,
  ProductType,
  ProductVisibility,
} from '@/libs/products/types';

export async function generateMockProductPreview(): Promise<ProductPreviewDto> {
  return {
    averageRating: 0,
    currency: '',
    numberOfReviews: 0,
    storeName: '',
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    slug: faker.helpers.slugify(faker.commerce.productName()),
    price: Number(faker.commerce.price({ min: 10, max: 500 })),
    primaryImage: await generateMockProductPhoto(),
    storeId: faker.string.uuid(),
  };
}

export async function generateMockProductSummary(): Promise<ProductSummaryDto> {
  return {
    ...(await generateMockProductPreview()),
    productType: faker.helpers.arrayElement(Object.values(ProductType)),
    store: await generateMockStorePreview(),
  };
}

export async function generateMockProductDetail(): Promise<ProductDetailDto> {
  return {
    ...(await generateMockProductSummary()),
    description: faker.commerce.productDescription(),
    status: ProductStatus.PENDING,
    visibility: ProductVisibility.PUBLISHED,
    attributes: [],
    variants: [],
    categoryId: 0,
    images: await generateMockProductPhotos(),
    totalQuantityAvailable: faker.number.int(),
    reviews: await generateMockReviewPreviews(),
    updatedAt: faker.date.recent(),
    createdAt: faker.date.past(),
  };
}

export async function generateMockProductPhoto(): Promise<ProductImageDto> {
  return {
    url: faker.image.personPortrait(),
    alt: faker.commerce.productAdjective(),
    width: 600,
    height: 400,
    isPrimary: true,
    sortOrder: 1,
  };
}

export async function generateMockProductPhotos(): Promise<ProductImageDto[]> {
  return Promise.all(Array.from({ length: 4 }, () => generateMockProductPhoto()));
}

export async function generateMockProductPreviews(): Promise<ProductPreviewDto[]> {
  return Promise.all(Array.from({ length: 10 }, () => generateMockProductPreview()));
}

```

### file path: src/libs/products/schemas/index.ts

```ts
import { z } from 'zod';

import {
  type CreateProductAttributeValueInputDto,
  type CreateProductDto,
  type CreateProductVariantInputDto,
  ProductType,
  ProductVisibility,
  type UpdateProductDto,
} from '@/libs/products/types';

export const productTypeSchema = z.nativeEnum(ProductType);
export const productVisibilitySchema = z.nativeEnum(ProductVisibility);

export const createProductAttributeValueInputSchema = z.object({
  attributeId: z.string(),
  value: z.string(),
}) satisfies z.ZodType<CreateProductAttributeValueInputDto>;

export const createProductVariantInputSchema = z.object({
  sku: z.string().optional(),
  priceOverride: z.number().nonnegative().optional(),
  initialQuantity: z.number().int().nonnegative(),
  attributeValueIds: z.array(z.string()),
  attributes: z.array(createProductAttributeValueInputSchema),
}) satisfies z.ZodType<CreateProductVariantInputDto>;

export const createProductDtoSchema = z.object({
  name: z.string(),
  basePrice: z.number().nonnegative(),
  currency: z.string().min(1),
  description: z.string().optional(),
  productType: productTypeSchema,
  attributes: z.array(createProductAttributeValueInputSchema).optional(),
  variants: z.array(createProductVariantInputSchema).optional(),
  visibility: productVisibilitySchema.optional(),
  quantityAvailable: z.number().int().nonnegative().optional(),
}) satisfies z.ZodType<CreateProductDto>;

export const updateProductDtoSchema =
  createProductDtoSchema.partial() satisfies z.ZodType<UpdateProductDto>;

```

### file path: src/libs/products/types/index.ts

```ts
import { MediaDto } from '@/libs/common/types';
import { ReviewPreviewDto } from '@/libs/reviews/types';
import { StorePreviewDto } from '@/libs/stores/types';

export enum InventoryEventType {
  INITIAL = 'initial',
  MANUAL_ADJUSTMENT = 'manual',
  SALE = 'sale',
  RETURN = 'return',
  RESTOCK = 'restock',
  CANCELLED = 'cancelled',
}

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service',
}

export enum ProductVisibility {
  PUBLISHED = 'published',
  HIDDEN = 'hidden',
  DRAFT = 'draft',
}

export enum ProductStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface ProductImageDto extends MediaDto {
  isPrimary: boolean;
  sortOrder: number;
}

export interface AttributeDto {
  id: string;
  name: string;
}

export interface ProductAttributeValueDto {
  id: string;
  name: string;
  value: string;
}

export interface VariantAttributeValueDto {
  id: string;
  name: string;
  value: string;
}

export interface ProductVariantDto {
  id: string;
  sku?: string;
  priceOverride?: number;
  quantityAvailable: number;
  isActive: boolean;
  images?: ProductImageDto[];
  attributes: VariantAttributeValueDto[];
}

export interface ProductPreviewDto {
  id: string;
  name: string;
  slug?: string;
  primaryImage: ProductImageDto;
  price: number;
  currency: string;
  storeId: string;
  storeName: string;
  averageRating?: number;
  numberOfReviews?: number;
}

export interface ProductSummaryDto extends ProductPreviewDto {
  productType: ProductType;
  store: StorePreviewDto;
}

export interface ProductDetailDto extends ProductSummaryDto {
  description?: string;
  images: ProductImageDto[];
  attributes?: ProductAttributeValueDto[];
  variants?: ProductVariantDto[];
  reviews?: ReviewPreviewDto[];
  visibility: ProductVisibility;
  status: ProductStatus;
  totalQuantityAvailable?: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductAttributeValueInputDto {
  attributeId: string;
  value: string;
}

export interface CreateProductVariantInputDto {
  sku?: string;
  priceOverride?: number;
  initialQuantity: number;
  attributeValueIds: string[];
  attributes: CreateProductAttributeValueInputDto[];
}

export interface CreateProductDto {
  name: string;
  basePrice: number;
  currency: string;
  description?: string;
  productType: ProductType;
  attributes?: CreateProductAttributeValueInputDto[];
  variants?: CreateProductVariantInputDto[];
  visibility?: ProductVisibility;
  quantityAvailable?: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

```

### file path: src/libs/reviews/api/index.ts

```ts
import {
  generateMockReviewDetail,
  generateMockReviewPreviews,
  generateMockReviewReplyPreview,
  generateMockReviewReportPreview,
} from '@/libs/reviews/mocks';
import { CreateReviewDto, CreateReviewReplyDto, CreateReviewReportDto } from '@/libs/reviews/types';

export async function createReview(productId: string, data: CreateReviewDto) {
  /* httpClient.post<ReviewDetail>(`/products/${productId}/reviews`, data); */
  return generateMockReviewDetail();
}

export async function getProductReviews(productId: string) {
  /* httpClient.get<ReviewPreviewDto[]>(`/products/${productId}/reviews`); */
  return generateMockReviewPreviews();
}

export async function getReviewsById(id: string) {
  /* httpClient.get<ReviewDetail>(`/reviews/${id}`); */
  return generateMockReviewDetail();
}

export async function replyToReview(reviewId: string, data: CreateReviewReplyDto) {
  /* httpClient.post<ReviewReplyPreview>(`/reviews/${reviewId}/reply`, data); */
  return generateMockReviewReplyPreview();
}

export async function reportReview(reviewId: string, data: CreateReviewReportDto) {
  /* httpClient.post<ReviewReportPreview>(`/reviews/${reviewId}/report`, data); */
  return generateMockReviewReportPreview();
}

export async function deleteReviews(id: string) {
  /* httpClient.delete<void>(`/reviews/${id}`); */
  return;
}

```

### file path: src/libs/reviews/components/preview-card.tsx

```tsx
'use client';

import { Card, CardBody, User } from '@heroui/react';
import { formatDistanceToNow } from 'date-fns';

import { StarRating } from '@/libs/common/components/StarRating';
import { ReviewPreviewDto } from '@/libs/reviews/types';

export default function ReviewPreviewCard({ content }: { content: ReviewPreviewDto }) {
  return (
    <Card>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <User
              name={`${content.customer.username}`}
              avatarProps={{ src: content.customer.photo?.url }}
              description={formatDistanceToNow(new Date(content.createdAt), { addSuffix: true })}
            />
          </div>
          <StarRating rating={content.rating} />
        </div>
        {content.comment && <p className="text-xs leading-relaxed">{content.comment}</p>}
      </CardBody>
    </Card>
  );
}

```

### file path: src/libs/reviews/hooks/index.ts

```ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  createReview,
  deleteReviews,
  getProductReviews,
  getReviewsById,
  replyToReview,
  reportReview,
} from '@/libs/reviews/api';
import {
  CreateReviewDto,
  CreateReviewReplyDto,
  CreateReviewReportDto,
  ReviewDetail,
  ReviewPreviewDto,
} from '@/libs/reviews/types';

export function useProductReviews(productId: string) {
  return useQuery<ReviewPreviewDto[]>({
    queryKey: queryKeys.reviews.byProduct(productId),
    queryFn: () => getProductReviews(productId),
  });
}

export function useReviewDetail(id: string) {
  return useQuery<ReviewDetail>({
    queryKey: queryKeys.reviews.detail(id),
    queryFn: () => getReviewsById(id),
  });
}

export function useCreateReviewMutation(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewDto) => createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.byProduct(productId) });
    },
  });
}

export function useReplyToReviewMutation(reviewId: string) {
  return useMutation({
    mutationFn: (data: CreateReviewReplyDto) => replyToReview(reviewId, data),
  });
}

export function useReportReviewMutation(reviewId: string) {
  return useMutation({
    mutationFn: (data: CreateReviewReportDto) => reportReview(reviewId, data),
  });
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteReviews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
  });
}

```

### file path: src/libs/reviews/mocks/index.ts

```ts
import { faker } from '@faker-js/faker';

import { generateMockUserPublicPreview } from '@/libs/users/mocks';

import {
  ReportReason,
  ReviewDetail,
  ReviewPreviewDto,
  ReviewReplyPreview,
  ReviewReportPreview,
} from '../types';

export async function generateMockReviewPreview(productId: number): Promise<ReviewPreviewDto> {
  return {
    id: faker.string.uuid(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.sentence(),
    productId,
    customer: await generateMockUserPublicPreview(),
    createdAt: faker.date.recent(),
  };
}

export async function generateMockReviewDetail(): Promise<ReviewDetail> {
  return {
    ...(await generateMockReviewPreview(1)),
    isFlagged: false,
    replies: [await generateMockReviewReplyPreview()],
    reports: [await generateMockReviewReportPreview()],
  };
}

export async function generateMockReviewReplyPreview(): Promise<ReviewReplyPreview> {
  return {
    id: faker.string.uuid(),
    vendor: await generateMockUserPublicPreview(),
    replyText: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
  };
}

export async function generateMockReviewReportPreview(): Promise<ReviewReportPreview> {
  return {
    id: faker.string.uuid(),
    reportedBy: await generateMockUserPublicPreview(),
    reason: faker.helpers.arrayElement(Object.values(ReportReason)),
    comment: faker.lorem.sentence(),
    reportedAt: faker.date.recent(),
  };
}

export async function generateMockReviewPreviews(): Promise<ReviewPreviewDto[]> {
  return Promise.all(
    Array.from({ length: 5 }, () => generateMockReviewPreview(faker.number.int())),
  );
}

```

### file path: src/libs/reviews/schemas/index.ts

```ts
import { z } from 'zod';
import {
  type CreateReviewDto,
  type CreateReviewReplyDto,
  type CreateReviewReportDto,
  ReportReason,
} from '@/libs/reviews/types';

export const reportReasonSchema = z.nativeEnum(ReportReason);

export const createReviewDtoSchema = z.object({
  rating: z.number().min(0),
  comment: z.string().optional(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
}) satisfies z.ZodType<CreateReviewDto>;

export const createReviewReplyDtoSchema = z.object({
  replyText: z.string().min(1),
}) satisfies z.ZodType<CreateReviewReplyDto>;

export const createReviewReportDtoSchema = z.object({
  reason: reportReasonSchema,
  comment: z.string().optional(),
}) satisfies z.ZodType<CreateReviewReportDto>;

```

### file path: src/libs/reviews/types/index.ts

```ts
import { UserPublicPreview } from '@/libs/users/types';

export enum ReportReason {
  SPAM = 'Spam',
  INAPPROPRIATE = 'Inappropriate Content',
  FAKE_REVIEW = 'Fake Review',
  HARASSMENT = 'Harassment or Hate Speech',
  OFFENSIVE_LANGUAGE = 'Offensive or Abusive Language',
  MISLEADING_INFORMATION = 'Misleading or False Information',
  PRIVACY_VIOLATION = 'Privacy Violation (Personal Information)',
  COPYRIGHT_INFRINGEMENT = 'Copyright or Trademark Violation',
  SCAM = 'Scam or Fraudulent Activity',
  UNAUTHORIZED_ADVERTISING = 'Unauthorized Advertising or Promotion',
  IRRELEVANT_CONTENT = 'Irrelevant or Off-Topic Content',
  BULLYING = 'Bullying or Threats',
  VIOLENCE = 'Violence or Dangerous Content',
  SELF_PROMOTION = 'Excessive Self-Promotion',
  ILLEGAL_ACTIVITY = 'Illegal or Unlawful Content',
  OTHER = 'Other',
}

export interface ReviewPreviewDto {
  id: string;
  rating: number;
  comment?: string;
  productId: number | string;
  customer: UserPublicPreview;
  createdAt: Date;
}

export interface ReviewDetail extends ReviewPreviewDto {
  replies: ReviewReplyPreview[];
  reports: ReviewReportPreview[];
  isFlagged: boolean;
}

export interface ReviewReplyPreview {
  id: string;
  vendor: UserPublicPreview;
  replyText: string;
  createdAt: Date;
}

export interface ReviewReportPreview {
  id: string;
  reportedBy: UserPublicPreview;
  reason: ReportReason;
  comment?: string;
  reportedAt: Date;
}

export interface CreateReviewDto {
  rating: number;
  comment?: string;
}

export interface CreateReviewReplyDto {
  replyText: string;
}

export interface CreateReviewReportDto {
  reason: ReportReason;
  comment?: string;
}

```

### file path: src/libs/stores/api/index.ts

```ts
import { AddressDto } from '@/libs/location/types';
import {
  generateMockStoreDetail,
  generateMockStorePreviews,
  generateMockStoreSummaries,
} from '@/libs/stores/mocks';
import {
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  SetStoreServiceHoursDto,
  UpdateStoreDto,
} from '@/libs/stores/types';

export async function fetchUserStores() {
  /* httpClient.get<StoreSummary[]>('/stores') */
  return generateMockStoreSummaries();
}

export async function fetchStoreDetails(storeId: string) {
  /* httpClient.get<StoreDetail>(`/stores/${storeId}`) */
  return generateMockStoreDetail();
}

export async function fetchDiscoverableStores() {
  /* httpClient.get<StoreSummary[]>('/stores/discover') */
  return generateMockStorePreviews();
}

export async function fetchFeaturedStores() {
  /* httpClient.get<StoreSummary[]>('/stores/featured') */
  return generateMockStorePreviews();
}

export async function submitStoreBasicInfo(data: CreateStoreBasicDto) {
  /* httpClient.post<StoreDetail>('/stores/create/basic', data) */
  return generateMockStoreDetail();
}

export async function submitStoreAddressUpdate(storeId: string, data: AddressDto) {
  /* httpClient.patch<StoreDetail>(`/stores/${storeId}/address`, data) */
  return generateMockStoreDetail();
}

export async function submitStoreTagsSelection(storeId: string, data: CreateStoreTagsDto) {
  /* httpClient.patch<StoreDetail>(`/stores/${storeId}/tags`, data) */
  return generateMockStoreDetail();
}

export async function submitStoreWorkingHours(storeId: string, data: SetStoreServiceHoursDto) {
  /* httpClient.patch<StoreDetail>(`/stores/${storeId}/working-hours`, data) */
  return generateMockStoreDetail();
}

export async function submitStoreLogoUpload(storeId: string, data: CreateStoreLogoDto) {
  const formData = new FormData();
  if (data.logoFile) {
    const fileBlob = new Blob([data.logoFile], { type: 'image/*' });
    formData.append('logo', fileBlob);
    return generateMockStoreDetail();
  } else throw new Error('No file provided');
}

export async function submitStoreUpdate(storeId: string, data: UpdateStoreDto) {
  /* httpClient.patch<StoreDetail>(`/stores/${storeId}/update`, data) */
  return generateMockStoreDetail();
}

```

### file path: src/libs/stores/components/PreviewCard.tsx

```tsx
'use client';

import { Card, CardBody } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { StarRating } from '@/libs/common/components/StarRating';
import { StorePreviewDto } from '@/libs/stores/types';

export const StorePreviewCard = ({ store }: { store: StorePreviewDto }) => {
  return (
    <Link href={`/stores/${store.id}`} className="block">
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

```

### file path: src/libs/stores/components/PreviewStoresSection.tsx

```tsx
import { Button, Divider } from '@heroui/react';
import React from 'react';

import { StorePreviewCard } from '@/libs/stores/components/PreviewCard';
import { StorePreviewDto } from '@/libs/stores/types';
import { PageHeader } from '@/libs/common/components/PageHeader';

export default function PreviewStoresSection({
  stores,
  title,
}: {
  stores: StorePreviewDto[];
  title: string;
}) {
  return (
    <section className="space-y-4" id="preview-stores-section">
      <Divider />
      <PageHeader title={title} />
      <div className="grid grid-cols-2 gap-3">
        {stores.length === 0 ? (
          <Button as={'link'} href="/stores/create">
            Create your first Store
          </Button>
        ) : (
          stores.map((store) => <StorePreviewCard key={store.slug} store={store} />)
        )}
      </div>
    </section>
  );
}

```

### file path: src/libs/stores/components/ProductsSection.tsx

```tsx
import { Button } from '@heroui/button';
import ProductPreviewCard from '@/libs/products/components/ProductPreviewCard';
import { FaPlus } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa';
import React from 'react';
import { StoreDetail } from '@/libs/stores/types';
import { PageHeader } from '@/libs/common/components/PageHeader';
import Link from 'next/link';

export function ProductsSection({
  store,
  isOwner = false,
}: {
  store: StoreDetail;
  isOwner: boolean;
}) {
  return (
    <section>
      <div className="flex items-start justify-between">
        <PageHeader title="Products" />
        <Link className="flex items-center gap-x-2 text-sm" href={`/stores/${store.id}/products`}>
          <span>View All</span>
          <FaChevronRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {store.products.slice(0, 4).map((product) => (
          <ProductPreviewCard key={product.id} product={product} />
        ))}
      </div>

      {isOwner && (
        <div className="mt-4 text-center">
          <Link href={`/stores/${store.id}/products/new`}>
            <Button fullWidth color="primary" startContent={<FaPlus />}>
              Add Product
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}

```

### file path: src/libs/stores/components/ScrollStoresSection.tsx

```tsx
import { HorizontalScroll } from '@/libs/common/components/HorizontalScroll';
import { StorePreviewCard } from '@/libs/stores/components/PreviewCard';
import { StorePreviewDto } from '@/libs/stores/types';
import { EmptyState } from '@/libs/common/components/EmptyState';

interface ScrollStoresSectionProps {
  stores?: StorePreviewDto[];
  title: string;
}

export function ScrollStoresSection({ stores, title }: ScrollStoresSectionProps) {
  if (!stores || stores.length === 0) {
    return <EmptyState />;
  }

  return (
    <section>
      <h1 className="font-semibold">{title}</h1>
      <HorizontalScroll>
        {stores.map((store) => (
          <StorePreviewCard key={store.id} store={store} />
        ))}
      </HorizontalScroll>
    </section>
  );
}

```

### file path: src/libs/stores/components/StoreCreationStepsNav.tsx

```tsx
import { PropsWithChildren } from 'react';

export function StoreCreationStepsNav({ children }: PropsWithChildren) {
  return <div className="mt-4 flex w-full justify-end gap-x-2">{children}</div>;
}

```

### file path: src/libs/stores/components/StoreHeader.tsx

```tsx
'use client';

import Image from 'next/image';
import { Accordion, AccordionItem, Chip, Divider } from '@heroui/react';
import { StarRating } from '@/libs/common/components/StarRating';
import { FaPen, FaShare } from 'react-icons/fa';
import React from 'react';
import { copyToClipboard } from '@/libs/common/utils/clipboard';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { useRouter } from 'next/navigation';
import { StoreDetail } from '@/libs/stores/types';

export function StoreHeader({ store, isOwner }: { store: StoreDetail; isOwner?: boolean }) {
  const { webApp } = useTelegramWebApp();

  const router = useRouter();

  const handleShare = () => {
    copyToClipboard(window.location.href);
    webApp?.HapticFeedback.impactOccurred('light');
  };

  const handleEdit = () => router.push(`/stores/${store?.slug}/edit`);

  return (
    <section>
      <div className="grid grid-cols-12 grid-rows-2 items-start gap-x-2">
        {store.logo?.url && (
          <Image
            src={store.logo.url}
            alt={store.displayName}
            width={48}
            height={48}
            className="col-span-3 row-span-2 aspect-square w-full rounded-full object-cover"
          />
        )}
        <div className="col-span-7 row-span-1">
          <strong>{store.displayName}</strong>
          <StarRating rating={store.vendorScore} />
        </div>
        {isOwner && <FaPen size={14} className="col-span-1 row-span-1" onClick={handleEdit} />}
        <FaShare size={14} className="col-span-1 row-span-1" onClick={handleShare} />
        <div className="col-span-9 row-span-1 h-8 w-full overflow-y-hidden">
          {store.categories?.map((tag) => (
            <Chip size="sm" className="m-0.5" key={tag}>
              {tag}
            </Chip>
          ))}
        </div>
      </div>
      {/* Store Description */}
      {store.storeBio && (
        <p className="text-default-700 mb-4 text-sm leading-snug">{store.storeBio} </p>
      )}

      {/* Contact & Working Hours */}
      <div className="text-default-600 col-span-12 row-span-1 mb-6 space-y-1 text-sm">
        {store.supportPhone && <p>📞 {store.supportPhone}</p>}
        {store.supportEmail && <p>✉️ {store.supportEmail}</p>}

        {store.serviceHours && (
          <Accordion>
            <AccordionItem title="📅 Working Hours">
              <ul>
                {Object.entries(store.serviceHours).map(([day, time]) => (
                  <li key={day}>
                    {day}: {time.open} - {time.close}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </Accordion>
        )}

        {store.socialProfiles && (
          <div className="pt-2">
            {Object.entries(store.socialProfiles).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 underline"
              >
                {platform}
              </a>
            ))}
          </div>
        )}
      </div>
      <Divider />
    </section>
  );
}

```

### file path: src/libs/stores/components/SummaryCard.tsx

```tsx
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import Image from 'next/image';
import { StarRating } from '@/libs/common/components/StarRating';
import { AddressDto } from '@/libs/location/types';
import { StoreSummary } from '@/libs/stores/types';
import Link from 'next/link';

export function StoreSummaryCard({ store }: { store: StoreSummary }) {
  return (
    <Link href={`/stores/${store.id}`} className="block">
      <Card>
        <CardHeader>
          <div className="flex items-end gap-x-4">
            <Image
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
}

const formatAddresses = (address: AddressDto[]) => {
  return [address[0].city?.name, address[0].state?.name, address[0].country.name]
    .filter(Boolean)
    .join(', ');
};

```

### file path: src/libs/stores/hooks/index.ts

```ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import { AddressDto } from '@/libs/location/types';
import {
  fetchDiscoverableStores,
  fetchFeaturedStores,
  fetchStoreDetails,
  fetchUserStores,
  submitStoreAddressUpdate,
  submitStoreBasicInfo,
  submitStoreLogoUpload,
  submitStoreTagsSelection,
  submitStoreWorkingHours,
} from '@/libs/stores/api';
import {
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  SetStoreServiceHoursDto,
  StoreDetail,
  StorePreviewDto,
  StoreSummary,
} from '@/libs/stores/types';

export function useUserStoresQuery() {
  return useQuery<StoreSummary[]>({
    queryKey: queryKeys.stores.my,
    queryFn: fetchUserStores,
  });
}

export function useStoreDetailsQuery(storeId: string) {
  return useQuery<StoreDetail>({
    queryKey: queryKeys.stores.detail(storeId),
    queryFn: () => fetchStoreDetails(storeId),
  });
}

export function useDiscoverableStoresQuery() {
  return useQuery<StorePreviewDto[]>({
    queryKey: queryKeys.stores.discover,
    queryFn: fetchDiscoverableStores,
  });
}

export function useFeaturedStoresQuery() {
  return useQuery<StorePreviewDto[]>({
    queryKey: queryKeys.stores.featured,
    queryFn: fetchFeaturedStores,
  });
}

export function useSubmitStoreBasicInfoMutation() {
  const queryClient = useQueryClient();
  return useMutation<StoreDetail, Error, CreateStoreBasicDto>({
    mutationFn: (data) => submitStoreBasicInfo(data),
    onSuccess: async () => {
      await queryClient.prefetchQuery({ queryKey: queryKeys.stores.my, queryFn: fetchUserStores });
    },
  });
}

export function useSubmitStoreAddressMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: AddressDto) => submitStoreAddressUpdate(storeId, data),
  });
}

export function useSubmitStoreTagsMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreTagsDto) => submitStoreTagsSelection(storeId, data),
  });
}

export function useSubmitStoreServiceHoursMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: SetStoreServiceHoursDto) => submitStoreWorkingHours(storeId, data),
  });
}

export function useSubmitStoreLogoMutation(storeId: string) {
  return useMutation({
    mutationFn: (data: CreateStoreLogoDto) => submitStoreLogoUpload(storeId, data),
  });
}

```

### file path: src/libs/stores/mocks/index.ts

```ts
import { faker } from '@faker-js/faker';

import { generateMockAddress } from '@/libs/location/mocks';
import { generateMockProductPreviews } from '@/libs/products/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

import { StoreDetail, StorePreviewDto, StoreStatusEnum, StoreSummary } from '../types';

export async function generateMockStorePreview(): Promise<StorePreviewDto> {
  return {
    id: faker.string.uuid(),
    displayName: faker.company.name(),
    slug: faker.helpers.slugify(faker.company.name()),
    logo: {
      url: faker.image.personPortrait(),
      alt: faker.company.name(),
    },
    vendorScore: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    status: StoreStatusEnum.ACTIVE,
    paymentWalletAddress: faker.finance.bitcoinAddress(),
  };
}

export async function generateMockStoreSummary(): Promise<StoreSummary> {
  return {
    ...(await generateMockStorePreview()),
    businessLocations: Array.from({ length: 5 }, () => generateMockAddress()),
    storeBio: faker.lorem.paragraph(),
    categories: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.lorem.word(),
    ),
  };
}

export async function generateMockStoreDetail(): Promise<StoreDetail> {
  return {
    ...(await generateMockStoreSummary()),
    vendor: await generateMockUserSummary(),
    products: await generateMockProductPreviews(),
    supportPhone: faker.phone.number(),
    supportEmail: faker.internet.email(),
    socialProfiles: {
      instagram: faker.internet.url(),
      twitter: faker.internet.url(),
    },
    createdAt: faker.date.past(),
  };
}

export async function generateMockStoreSummaries(): Promise<StoreSummary[]> {
  return Promise.all(Array.from({ length: 1 }, () => generateMockStoreSummary()));
}

export async function generateMockStorePreviews(): Promise<StorePreviewDto[]> {
  return Promise.all(Array.from({ length: 3 }, () => generateMockStorePreview()));
}

```

### file path: src/libs/stores/schemas/index.ts

```ts
import { z } from 'zod';

import {
  type CreateStoreBasicDto,
  type CreateStoreLogoDto,
  type CreateStoreTagsDto,
  type ServiceHoursDto,
  type SetStoreServiceHoursDto,
  type UpdateStoreDto,
  Weekday,
} from '@/libs/stores/types';

export const weekdaySchema = z.nativeEnum(Weekday);

export const serviceHoursDtoSchema = z.object({
  day: weekdaySchema,
  open: z.string(),
  close: z.string(),
  interval: z.number().int().positive(),
}) satisfies z.ZodType<ServiceHoursDto>;

export const createStoreBasicSchema = z.object({
  displayName: z.string().min(1),
  storeBio: z.string().min(1),
  supportPhone: z.string().min(1).optional(),
  supportEmail: z.string().email().optional(),
}) satisfies z.ZodType<CreateStoreBasicDto>;

export const createStoreTagsSchema = z.object({
  tags: z.array(z.string().min(1)).optional(),
}) satisfies z.ZodType<CreateStoreTagsDto>;

export const setStoreServiceHoursSchema = z.object({
  serviceHours: z.array(serviceHoursDtoSchema).optional(),
}) satisfies z.ZodType<SetStoreServiceHoursDto>;

export const createStoreLogoSchema = z.object({
  logoFile: z.any().optional(),
}) satisfies z.ZodType<CreateStoreLogoDto>;

export const updateStoreSchema = z.object({
  displayName: z.string().min(1).optional(),
  storeBio: z.string().min(1).optional(),
  supportPhone: z.string().min(1).optional(),
  supportEmail: z.string().email().optional(),
  categories: z.array(z.string().min(1)).optional(),
  logoUrl: z.string().url().optional(),
  serviceHours: z.array(serviceHoursDtoSchema).optional(),
}) satisfies z.ZodType<UpdateStoreDto>;

```

### file path: src/libs/stores/types/index.ts

```ts
import { AddressDto } from '@/libs/location/types';
import { ProductPreviewDto } from '@/libs/products/types';
import { UserSummary } from '@/libs/users/types';

import { MediaDto } from '../../common/types';

export enum StoreStatusEnum {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

export enum Weekday {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export enum SocialMediaPlatform {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  X = 'x',
  TIKTOK = 'tiktok',
  YOUTUBE = 'youtube',
  TELEGRAM = 'telegram',
  WEBSITE = 'website',
  OTHER = 'other',
}

export interface StorePreviewDto {
  id: string;
  displayName: string;
  slug?: string;
  logo?: MediaDto;
  vendorScore: number;
  status: StoreStatusEnum;
  paymentWalletAddress?: string;
}

export interface StoreSummary extends StorePreviewDto {
  categories?: string[];
  businessLocations: AddressDto[];
  storeBio?: string;
}

export interface StoreDetail extends StoreSummary {
  vendor: UserSummary;
  supportPhone?: string;
  supportEmail?: string;
  socialProfiles?: Record<string, string>;
  serviceHours?: Record<string, ServiceHoursDto>;
  products: ProductPreviewDto[];
  createdAt: Date;
}

export interface ServiceHoursDto {
  day: Weekday;
  open: string;
  close: string;
  interval: number;
}

export interface CreateStoreBasicDto {
  displayName: string;
  storeBio: string;
  supportPhone?: string;
  supportEmail?: string;
}

export interface CreateStoreTagsDto {
  tags?: string[];
}

export interface SetStoreServiceHoursDto {
  serviceHours?: ServiceHoursDto[];
}

export interface CreateStoreLogoDto {
  logoFile?: any;
}

export interface UpdateStoreDto {
  displayName?: string;
  storeBio?: string;
  supportPhone?: string;
  supportEmail?: string;
  categories?: string[];
  logoUrl?: string;
  serviceHours?: ServiceHoursDto[];
}

```

### file path: src/libs/users/api/index.ts

```ts
import { generateMockUserPrivateProfile } from '@/libs/users/mocks';
import {
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
} from '@/libs/users/types';

export async function telegramLogin() {
  /* httpClient.get<UserPrivateProfile>('/users/me') */
  return generateMockUserPrivateProfile();
}

export async function updateProfile(data: UpdateProfileDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/me`, data) */
  return generateMockUserPrivateProfile();
}

export async function updateLanguage(data: UpdateLanguageDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/me/language`, data) */
  return generateMockUserPrivateProfile();
}

export async function updateContactLocation(data: UpdateContactLocationDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/me/contact-location`, data) */
  return generateMockUserPrivateProfile();
}

export async function updateUserPreferences(data: UpdatePreferencesDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/me/preferences`, data) */
  return generateMockUserPrivateProfile();
}

```

### file path: src/libs/users/components/ProfilePreferencesForm.tsx

```tsx
'use client';

import { Button, Form, Select, SelectItem } from '@heroui/react';
import React from 'react';
import { useUpdatePreferencesMutation } from '@/libs/users/hooks';
import { useForm } from 'react-hook-form';
import { UpdatePreferencesDto, UserPrivateProfile } from '@/libs/users/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePreferencesSchema } from '@/libs/users/schemas';

type KeyLabel = { key: string; label: string };

export function ProfilePreferencesForm({
  user,
  supportedLanguages,
  localCurrencies,
}: {
  user: UserPrivateProfile;
  supportedLanguages: KeyLabel[];
  localCurrencies: KeyLabel[];
}) {
  const { mutate } = useUpdatePreferencesMutation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdatePreferencesDto>({
    resolver: zodResolver(updatePreferencesSchema),
    defaultValues: {
      languageCode: 'en',
      fiatCurrencyCode: 'usd',
    },
  });
  const onSubmit = (data: UpdatePreferencesDto) => {
    mutate({ data });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Select {...register('languageCode')} description="Choose your language" label="Language">
        {supportedLanguages.map((language) => (
          <SelectItem key={language.key}>{language.label}</SelectItem>
        ))}
      </Select>

      <Select
        value={user.currencyInfo.localCurrencyCode}
        {...register('fiatCurrencyCode')}
        description="We will show you the equal value as hint"
        label="Local Currency"
      >
        {localCurrencies.map((currency) => (
          <SelectItem key={currency.key}>{currency.label}</SelectItem>
        ))}
      </Select>

      <Button fullWidth disabled={isSubmitting} type="submit">
        Save
      </Button>
    </Form>
  );
}

```

### file path: src/libs/users/components/language-selector.tsx

```tsx
'use client';

import { Button, Form, Select, SelectItem } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { useUpdateLanguageMutation } from '@/libs/users/hooks';
import { UpdateLanguageDto } from '@/libs/users/types';
import { updateLanguageSchema } from '@/libs/users/schemas';

const availableLanguages = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'ru', label: 'Russian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'ch', label: 'Chinese' },
];

interface LanguageSelectorProps {
  telegramUserId: string;
  onClose?: () => void;
  defaultLanguage?: string;
}

export default function LanguageSelector({
  onClose,
  defaultLanguage = 'en',
}: LanguageSelectorProps) {
  const { mutateAsync, isPending } = useUpdateLanguageMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateLanguageDto>({
    resolver: zodResolver(updateLanguageSchema),
    defaultValues: {
      preferredLanguage: defaultLanguage,
    },
  });

  const onSubmit = async (formData: UpdateLanguageDto) => {
    try {
      await mutateAsync({ data: formData });
      toast.success('Language updated successfully');
      onClose?.();
    } catch {
      toast.error('Failed to update language');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PageHeader title="Select your preferred language" />

      <Controller
        name="preferredLanguage"
        control={control}
        render={({ field }) => (
          <Select
            label="Language"
            selectedKeys={new Set([field.value])}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (typeof selected === 'string') field.onChange(selected);
            }}
            isInvalid={!!errors.preferredLanguage}
            errorMessage={errors.preferredLanguage?.message}
          >
            {availableLanguages.map(({ value, label }) => (
              <SelectItem key={value}>{label}</SelectItem>
            ))}
          </Select>
        )}
      />

      <div className="mt-6 flex justify-end gap-x-4">
        {onClose && (
          <Button type="button" variant="ghost" onPress={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" isDisabled={isPending} isLoading={isPending}>
          Save
        </Button>
      </div>
    </Form>
  );
}

```

### file path: src/libs/users/components/profile-card.tsx

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@heroui/button';
import { FaPen } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { UserPrivateProfile } from '@/libs/users/types';

export default function UserProfileCard({ user }: { user: UserPrivateProfile }) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  const displayName = `${firstName} ${lastName}`;

  return (
    <section aria-labelledby="profile-heading" role="region" className="space-y-4">
      <div className="text-center">
        <figure className="mx-auto">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full sm:h-32 sm:w-32">
            <Image
              key={user.photo?.url}
              src={user.photo?.url || '/default-profile.png'}
              alt={`Photo of ${displayName}`}
              width={128}
              height={128}
              className="aspect-square object-cover"
              priority
            />
          </div>
          <figcaption className="mt-3 sm:mt-4">
            <h2 id="profile-heading" className="text-base font-semibold sm:text-lg">
              {displayName}
            </h2>
            {user.username && (
              <p className="text-default-500 text-xs sm:text-sm">
                <span className="sr-only">Username: </span>@{user.username}
              </p>
            )}
          </figcaption>
        </figure>
      </div>
      <nav className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
        <Link href="/profile/edit" className="w-full">
          <Button
            fullWidth
            size="sm"
            color="secondary"
            variant="solid"
            className="flex items-center justify-center gap-2"
          >
            <FaPen className="text-xs sm:text-sm" aria-hidden="true" />
            <span>Edit Profile</span>
          </Button>
        </Link>
        <Link href="/profile/preferences" className="w-full">
          <Button
            fullWidth
            size="sm"
            color="secondary"
            variant="solid"
            className="flex items-center justify-center gap-2"
          >
            <FaGear className="text-xs sm:text-sm" aria-hidden="true" />
            <span>Preferences</span>
          </Button>
        </Link>
      </nav>
    </section>
  );
}

```

### file path: src/libs/users/context/userContext.tsx

```tsx
'use client';

import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { useTelegramLoginQuery } from '@/libs/users/hooks';
import { UserPrivateProfile } from '@/libs/users/types';

interface UserContext {
  data: UserPrivateProfile;
  isLoading: boolean;
}

const UserContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: PropsWithChildren) {
  const { data, isLoading, error } = useTelegramLoginQuery();

  if (error || !data) {
    return null;
  }

  return <UserContext.Provider value={{ data, isLoading }}>{children}</UserContext.Provider>;
}

export const useUserState = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within <UserProvider>');
  return context;
};

```

### file path: src/libs/users/hooks/index.ts

```ts
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  telegramLogin,
  updateContactLocation,
  updateLanguage,
  updateProfile,
  updateUserPreferences,
} from '@/libs/users/api';
import {
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
} from '@/libs/users/types';

export function useTelegramLoginQuery() {
  return useQuery({
    queryKey: ['me'],
    queryFn: telegramLogin,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdateProfileDto }) => updateProfile(data),
  });
}

export function useUpdateLanguageMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdateLanguageDto }) => updateLanguage(data),
  });
}

export function useUpdateContactLocationMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdateContactLocationDto }) => updateContactLocation(data),
  });
}

export function useUpdatePreferencesMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdatePreferencesDto }) => updateUserPreferences(data),
  });
}

```

### file path: src/libs/users/mocks/index.ts

```ts
import { faker } from '@faker-js/faker';

import { generateMockAddress } from '@/libs/location/mocks';
import { generateMockOrderSummaries } from '@/libs/orders/mocks';
import { generateMockStorePreviews } from '@/libs/stores/mocks';

import {
  CurrencyInfo,
  UserPrivateProfile,
  UserPublicPreview,
  UserRole,
  UserSummary,
} from '../types';

export async function generateMockUserPublicPreview(): Promise<UserPublicPreview> {
  return {
    userId: faker.string.ulid(),
    username: faker.internet.username(),
    photo: {
      url: faker.image.personPortrait(),
    },
  };
}

export async function generateMockUserSummary(): Promise<UserSummary> {
  return {
    ...(await generateMockUserPublicPreview()),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    role: faker.helpers.arrayElement(Object.values(UserRole)),
  };
}

export async function generateMockCurrencyInfo(): Promise<CurrencyInfo> {
  return {
    tonToUsdRate: faker.finance.amount({ min: 0.1, max: 10, dec: 2 }),
    localCurrencyToUsdRate: faker.finance.amount({ min: 0.1, max: 100, dec: 2 }),
    localCurrencyCode: faker.finance.currencyCode(),
  };
}

export async function generateMockUserPrivateProfile(): Promise<UserPrivateProfile> {
  return {
    ...(await generateMockUserSummary()),
    telegramUserId: faker.string.alphanumeric(),
    contactPhone: faker.phone.number(),
    contactEmail: faker.internet.email(),
    cryptoWalletAddress: faker.finance.ethereumAddress(),
    addresses: [generateMockAddress()],
    stores: await generateMockStorePreviews(),
    orders: await generateMockOrderSummaries(),
    currencyInfo: await generateMockCurrencyInfo(),
  };
}

```

### file path: src/libs/users/schemas/index.ts

```ts
import { z } from 'zod';

import {
  CurrencyInfo,
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
} from '@/libs/users/types';

export const currencyInfoSchema = z.object({
  tonToUsdRate: z.string(),
  localCurrencyToUsdRate: z.string(),
  localCurrencyCode: z.string(),
}) satisfies z.ZodType<CurrencyInfo>;

export const updateContactLocationSchema = z.object({
  contactPhone: z.string().min(1),
  contactEmail: z.string().email(),
  addressId: z.number().int().positive(),
  countryId: z.number().int().positive(),
  stateId: z.number().int().positive(),
  cityId: z.number().int().positive(),
}) satisfies z.ZodType<UpdateContactLocationDto>;

export const updateLanguageSchema = z.object({
  preferredLanguage: z.string().min(1),
}) satisfies z.ZodType<UpdateLanguageDto>;

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
}) satisfies z.ZodType<UpdateProfileDto>;

export const updatePreferencesSchema = z.object({
  languageCode: z.string().min(1),
  fiatCurrencyCode: z.string().min(1),
}) satisfies z.ZodType<UpdatePreferencesDto>;

```

### file path: src/libs/users/types/index.ts

```ts
import { AddressDto } from '@/libs/location/types';
import { OrderSummary } from '@/libs/orders/types';
import { StorePreviewDto } from '@/libs/stores/types';

import { MediaDto } from '../../common/types';

export enum UserRole {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export interface UserPublicPreview {
  userId: string;
  username?: string;
  photo?: MediaDto;
}

export interface UserSummary extends UserPublicPreview {
  firstName: string;
  lastName?: string;
  role: UserRole;
}

export interface CurrencyInfo {
  tonToUsdRate: string;
  localCurrencyToUsdRate: string;
  localCurrencyCode: string;
}

export interface UserPrivateProfile extends UserSummary {
  telegramUserId: string;
  contactPhone?: string;
  contactEmail?: string;
  cryptoWalletAddress?: string;
  addresses: AddressDto[];
  stores?: StorePreviewDto[];
  orders?: OrderSummary[];
  currencyInfo: CurrencyInfo;
}

export interface UpdateContactLocationDto {
  contactPhone: string;
  contactEmail: string;
  /* TODO: updating address location with just an ID? might have mistake */
  addressId: number;
  countryId: number;
  stateId: number;
  cityId: number;
}

export interface UpdateLanguageDto {
  preferredLanguage: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
}

export interface UpdatePreferencesDto {
  /* TODO: this is duplication why we have update language dto and this? */
  languageCode: string;
  fiatCurrencyCode: string;
}

```

### file path: src/providers/AppProvider.tsx

```tsx
'use client';

import { PropsWithChildren } from 'react';

import { QueryContext } from '@/libs/common/context/queryContext';
import { TonConnectClientProvider } from '@/providers/TonConnectClientProvider';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <TonConnectClientProvider>
            <QueryContext>{children}</QueryContext>
          </TonConnectClientProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  );
}

```

### file path: src/providers/TonConnectClientProvider.tsx

```tsx
'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type PropsWithChildren } from 'react';

export function TonConnectClientProvider({ children }: PropsWithChildren) {
  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">{children}</TonConnectUIProvider>
  );
}

```

### file path: src/telegram.d.ts

```ts
type CssColorKey = 'bg_color' | 'bottom_bar_bg_color' | 'secondary_bg_color';
type ChooseChatType = 'bots' | 'channels' | 'groups' | 'users';
type ColorScheme = 'dark' | 'light';

type WebAppChatType = 'channel' | 'group' | 'supergroup';

/** This object represents a chat. */
export interface WebAppChat {
  /** Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  id: number;
  /** Optional. URL of the chat’s photo. The photo can be in .jpeg or .svg formats. Only returned for Mini Apps launched from the attachment menu. */
  photo_url?: string;
  /** Title of the chat */
  title: string;
  /** Type of chat can be either “group,” “supergroup” or “channel” */
  type: WebAppChatType;
  /** Optional. Username of the chat */
  username?: string;
}

/** This object contains the data of the Mini App user. */
export interface WebAppUser {
  /** Optional. True, if this user added the bot to the attachment menu. */
  added_to_attachment_menu?: boolean;
  /** Optional. True, if this user allowed the bot to message them. */
  allows_write_to_pm?: boolean;
  /** First name of the user or bot. */
  first_name: string;
  /** A unique identifier for the user or bot. This number may have more than 32 significant bits, and some programming languages may have difficulty/silent defects in interpreting it. It has at most 52 significant bits, so a 64-bit integer or a double-precision float type is safe for storing this identifier. */
  id: number;
  /** Optional. True, if this user is a bot. Returns in the receiver field only. */
  is_bot?: boolean;
  /** Optional. True, if this user is a Telegram Premium user. */
  is_premium?: boolean;
  /** Optional. IETF language tag of the user's language. Returns in the user field only. */
  language_code?: string;
  /** Optional. Last name of the user or bot. */
  last_name?: string;
  /** Optional. URL of the user’s profile photo. The photo can be in .jpeg or .svg formats. */
  photo_url?: string;
  /** Optional. Username of the user or bot. */
  username?: string;
}

/** This object contains data transferred to the Mini App when it is opened. It is empty if the Mini App was launched from a keyboard button or from inline mode. */
export interface WebAppInitData {
  /** Unix time when the form was opened. */
  auth_date: number;
  /** Optional. Time in seconds, after which a message can be sent via the answerWebAppQuery method. */
  can_send_after?: number;
  /** Optional. An object containing data about the chat where the bot was launched via the attachment menu. Returned for supergroups, channels, and group chats – only for Mini Apps launched via the attachment menu. */
  chat?: WebAppChat;
  /** Optional. Global identifier, uniquely corresponding to the chat from which the Mini App was opened. Returned only for Mini Apps launched from a direct link. */
  chat_instance?: string;
  /** Optional. Type of the chat from which the Mini App was opened. Can be either “sender” for a private chat with the user opening the link, “private,” “group,” “supergroup,” or “channel.” Returned only for Mini Apps launched from direct links. */
  chat_type?: string;
  /** A hash of all passed parameters, which the bot server can use to check their validity. */
  hash: string;
  /** Optional. A unique identifier for the Mini App session, required for sending messages via the answerWebAppQuery method. */
  query_id?: string;
  /** Optional. An object containing data about the chat partner of the current user in the chat where the bot was launched via the attachment menu. Returned only for private chats and only for Mini Apps launched via the attachment menu. */
  receiver?: WebAppUser;
  /** A signature of all passed parameters (except hash), which the third party can use to check their validity. */
  signature: string;
  /** Optional. The value of the `startattach` parameter, passed via a link. Only returned for Mini Apps when launched from the attachment menu via a link. The value of the start_param parameter will also, be passed in the GET-parameter tgWebAppStartParam, so the Mini App can load the correct interface right away. */
  start_param?: string;
  /** Optional. An object containing data about the current user. */
  user?: WebAppUser;
}

type ErrorFirstCallback<T = unknown> = (error: string | null, result?: T, extra?: unknown) => void;
type BiometricCallback = (isAuthenticated: boolean, biometricToken?: string | null) => void;

/**
 * This object provides access to a secure storage on the user’s device for sensitive data. On **iOS**, it uses the system **Keychain**; on **Android**, it uses the **Keystore**. This ensures that all stored values are encrypted at rest and inaccessible to unauthorized applications.
 * **Secure storage** is suitable for storing tokens, secrets, authentication state, and other sensitive user-specific information. Each bot can store up to 10 items per user.
 */
export interface SecureStorage {
  /** A method that clears all keys previously stored by the bot in the device's secure storage. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether all values were removed. */
  clear(callback?: ErrorFirstCallback<boolean>): this;

  /** A method that receives a value from the device's secure storage using the specified key. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the value will be passed as the second argument. If the key was not found, the second argument will be null, and the third argument will be a boolean indicating whether the key can be restored from the current device. */
  getItem(key: string, callback?: ErrorFirstCallback<string | null | boolean>): this;

  /** A method that removes a value from the device's secure storage using the specified key. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was removed. */
  removeItem(key: string, callback?: ErrorFirstCallback<boolean>): this;

  /** Attempts to restore a key that previously existed on the current device. When called, the user will be asked for permission to restore the value. If the user declines or an error occurs, the first argument in the callback will contain the error. If restored successfully, the first argument will be null and the second argument will contain the restored value. */
  restoreItem(key: string, callback?: ErrorFirstCallback<string | null>): this;

  /** A method that stores a value in the device's secure storage using the specified key. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was stored. */
  setItem(key: string, value: string, callback?: ErrorFirstCallback<boolean>): this;
}

interface DeviceStorage {
  /** A method that clears all keys previously stored by the bot in the device's local storage. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether all values were removed. */
  clear(callback?: ErrorFirstCallback<boolean>): this;

  /** A method that receives a value from the device's local storage using the specified key. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the value will be passed as the second argument. */
  getItem(key: string, callback?: ErrorFirstCallback<string | null>): this;

  /** A method that removes a value from the device's local storage using the specified key. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was removed. */
  removeItem(key: string, callback?: ErrorFirstCallback<boolean>): this;

  /** A method that stores a value in the device's local storage using the specified key. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was stored. */
  setItem(key: string, value: string, callback?: ErrorFirstCallback<boolean>): this;
}

export interface LocationData {
  /** Altitude above sea level in meters. null if altitude data is not available on the device. */
  altitude: number;
  /** The direction the device is moving in degrees (0 = North, 90 = East, 180 = South, 270 = West). null if course data is not available on the device. */
  course: number;
  /** Accuracy of the course value in degrees. null if course accuracy data is not available on the device. */
  course_accuracy: number;
  /** Accuracy of the latitude and longitude values in meters. null if horizontal accuracy data is not available on the device. */
  horizontal_accuracy: number;
  /** Latitude in degrees. */
  latitude: number;
  /** Longitude in degrees. */
  longitude: number;
  /** The speed of the device in m/s. null if speed data is not available on the device. */
  speed: number;
  /** Accuracy of the speed value in m/s. null if speed accuracy data is not available on the device. */
  speed_accuracy: number;
  /** Accuracy of the altitude value in meters. null if vertical accuracy data is not available on the device. */
  vertical_accuracy: number;
}

export interface LocationManager {
  /** Shows whether permission to use a location has been requested. */
  readonly isAccessGranted: boolean;
  /** Shows whether permission to use a location has been granted. */
  readonly isAccessRequested: boolean;
  /** Shows whether the LocationManager object has been initialized. */
  readonly isInited: boolean;
  /** Shows whether location services are available on the current device. */
  readonly isLocationAvailable: boolean;

  /** A method that requests location data. The callback function will be called with null as the first argument if access to location was not granted, or an object of type LocationData as the first argument if access was successful. */
  getLocation(callback: (data: LocationData | null) => void): this;

  /**
   * A method that initializes the LocationManager object.
   * It should be called before the object's first use.
   * If an optional callback parameter is provided, the callback function will be called when the object is initialized.
   */
  init(callback?: () => void): this;

  /** A method that opens the location access settings for bots. Useful when you need to request location access from users who haven't granted it yet.
   * Note that this method can be called only in response to user interaction with the Mini App interface (e.g., a click inside the Mini App or on the main button). */
  openSettings(): this;
}

/** This object defines the parameters for starting gyroscope tracking. */
export interface GyroscopeStartParameters {
  /** Optional. The refresh rate in milliseconds, with acceptable values ranging from 20 to 1000. Set to 1000 by default. Note that refresh_rate may not be supported on all platforms, so the actual tracking frequency may differ from the specified value. */
  refresh_rate?: number;
}

/** This object provides access to gyroscope data on the device. */
export interface Gyroscope {
  /** Indicates whether gyroscope tracking is currently active. */
  readonly isStarted: boolean;
  /** The current rotation rate around the X-axis, measured in rad/s. */
  readonly x: number | null;
  /** The current rotation rate around the Y-axis, measured in rad/s. */
  readonly y: number | null;
  /** The current rotation rate around the Z-axis, measured in rad/s. */
  readonly z: number | null;

  /** Starts tracking gyroscope data using params of type GyroscopeStartParams. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully started. */
  start(parameters?: GyroscopeStartParameters, callback?: (started: boolean) => void): this;

  /** Stops tracking gyroscope data. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully stopped. */
  stop(callback?: (stopped: boolean) => void): this;
}

/** This object defines the parameters for starting device orientation tracking.
 * **Note**: Keep in mind that some devices may not support absolute orientation data. In such cases, you will receive relative data even if need_absolute=true is passed. Check the DeviceOrientation.absolute parameter to determine whether the data provided is absolute or relative.
 */
export interface DeviceOrientationStartParameters {
  /** Optional. Pass true to receive absolute orientation data, allowing you to determine the device's attitude relative to magnetic north. Use this option if implementing features like a compass in your app. If relative data is sufficient, pass false. Set to false by default. */
  need_absolute?: boolean;
  /** Optional. The refresh rate in milliseconds, with acceptable values ranging from 20 to 1000. Set to 1000 by default. Note that refresh_rate may not be supported on all platforms, so the actual tracking frequency may differ from the specified value. */
  refresh_rate?: number;
}

/** This object provides access to orientation data on the device. */
export interface DeviceOrientation {
  /** A boolean that indicates whether the device is providing orientation data in absolute values. */
  absolute: boolean;
  /** The rotation around the Z-axis, measured in radians. */
  alpha: number;
  /** The rotation around the X-axis, measured in radians. */
  beta: number;
  /** The rotation around the Y-axis, measured in radians. */
  gamma: number;
  /** Indicates whether device orientation tracking is currently active. */
  isStarted: boolean;

  /** Starts tracking device orientation data using params of type DeviceOrientationStartParams. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully started. */
  start(parameters?: DeviceOrientationStartParameters, callback?: (started: boolean) => void): this;

  /** Stops tracking device orientation data. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully stopped. */
  stop(callback?: (stopped: boolean) => void): this;
}

/** This object defines the parameters for starting accelerometer tracking. */
export interface AccelerometerStartParameters {
  /** Optional. The refresh rate in milliseconds, with acceptable values ranging from 20 to 1000. Set to 1000 by default. Note that refresh_rate may not be supported on all platforms, so the actual tracking frequency may differ from the specified value. */
  refresh_rate?: number;
}

/**
 * All these methods return the Accelerometer object so they can be chained.
 * This object provides access to accelerometer data on the device. */
export interface Accelerometer {
  /** Indicates whether accelerometer tracking is currently active. */
  isStarted: boolean;
  /** The current acceleration in the X-axis, measured in m/s². */
  x: number;
  /** The current acceleration in the Y-axis, measured in m/s². */
  y: number;
  /** The current acceleration in the Z-axis, measured in m/s². */
  z: number;

  /** Starts tracking accelerometer data using params of type AccelerometerStartParams. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully started. */
  start(parameters?: AccelerometerStartParameters, callback?: (started: boolean) => void): this;

  /** Stops tracking accelerometer data. If an optional callback parameter is provided, the callback function will be called with a boolean indicating whether tracking was successfully stopped. */
  stop(callback?: (stopped: boolean) => void): this;
}

/**
 * - finger, fingerprint-based biometrics,
 * - face, face-based biometrics,
 * - unknown, biometrics of an unknown type
 */
type BiometricType = 'face' | 'finger' | 'unknown';

/** This object controls biometrics on the device. Before the first use of this object, it needs to be initialized using the init method. */
interface BiometricManager {
  /** The type of biometrics currently available on the device */
  readonly biometricType: BiometricType;
  /** A unique device identifier that can be used to match the token to the device. */
  readonly deviceId: string;
  /** Shows whether permission to use biometrics has been granted. */
  readonly isAccessGranted: boolean;
  /** Shows whether permission to use biometrics has been requested. */
  readonly isAccessRequested: boolean;
  /** Shows whether biometrics is available on the current device. */
  readonly isBiometricAvailable: boolean;
  /** Shows whether the token is saved in secure storage on the device. */
  readonly isBiometricTokenSaved: boolean;
  /** Shows whether biometrics object is initialized. */
  readonly isInited: boolean;

  /** A method that authenticates the user using biometrics according to the params argument of type BiometricAuthenticateParams. If an optional callback parameter was passed, the callback function will be called and the first argument will be a boolean indicating whether the user authenticated successfully. If so, the second argument will be a biometric token. */
  authenticate(parameters: { reason?: string }, callback?: BiometricCallback): this;

  /** A method that initializes the BiometricManager object. It should be called before the object's first use. If an optional callback parameter was passed, the callback function will be called when the object is initialized. */
  init(callback?: () => void): this;

  /** A method that opens the biometric access settings for bots. Useful when you need to request biometrics access to users who haven't granted it yet.
   Note that this method can be called only in response to user interaction with the Mini App interface (e.g. a click inside the Mini App or on the main button) */
  openSettings(): this;

  /** A method that requests permission to use biometrics according to the params argument of type BiometricRequestAccessParams. If an optional callback parameter was passed, the callback function will be called and the first argument will be a boolean indicating whether the user granted access. */
  requestAccess(parameters: { reason?: string }, callback?: (granted: boolean) => void): this;

  /** A method that updates the biometric token in secure storage on the device. To remove the token, pass an empty string. If an optional callback parameter was passed, the callback function will be called and the first argument will be a boolean indicating whether the token was updated. */
  updateBiometricToken(token: string, callback?: (applied: boolean) => void): this;
}

/** This object controls the cloud storage. Each bot can store up to 1024 items per user in the cloud storage. */
export interface CloudStorage {
  /** A method that stores a value in the cloud storage using the specified key. The key should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. The value should contain 0-4096 characters. You can store up to 1024 keys in the cloud storage. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was stored. */
  setItem(key: string, value: string, callback?: ErrorFirstCallback<boolean>): this;

  /** A method that receives a value from the cloud storage using the specified key. The key should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the value will be passed as the second argument. */
  getItem(key: string, callback: ErrorFirstCallback<string | null>): this;

  /** A method that receives values from the cloud storage using the specified keys. The keys should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the values will be passed as the second argument. */
  getItems(keys: string[], callback: ErrorFirstCallback<Record<string, string>>): this;

  /** A method that removes a value from the cloud storage using the specified key. The key should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the value was removed. */
  removeItem(key: string, callback?: ErrorFirstCallback<boolean>): this;

  /** A method that removes values from the cloud storage using the specified keys. The keys should contain 1-128 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. If an optional callback parameter was passed, the callback function will be called. In case of an error, the first argument will contain the error. In case of success, the first argument will be null and the second argument will be a boolean indicating whether the values were removed. */
  removeItems(keys: string[], callback?: ErrorFirstCallback<boolean>): this;

  /** A method that receives the list of all keys stored in the cloud storage. In case of an error, the callback function will be called and the first argument will contain the error. In case of success, the first argument will be null and the list of keys will be passed as the second argument. */
  getKeys(callback: ErrorFirstCallback<string[]>): this;
}

/**
 * - light, indicates a collision between small or lightweight UI objects,
 * - medium, indicates a collision between medium-sized or medium-weight UI objects,
 * - heavy, indicates a collision between large or heavyweight UI objects,
 * - rigid, indicates a collision between hard or inflexible UI objects,
 * - soft, indicates a collision between soft or flexible UI objects.
 */
type ImpactStyle = 'heavy' | 'light' | 'medium' | 'rigid' | 'soft';

/**
 * - error, indicates that a task or action has failed,
 * - success, indicates that a task or action has completed successfully,
 * - warning, indicates that a task or action produced a warning.
 */
type NotificationType = 'error' | 'success' | 'warning';

interface HapticFeedback {
  /** A method tells that an impact occurred. The Telegram app may play the appropriate haptics based on style value passed. */
  impactOccurred(style: ImpactStyle): this;

  /** A method tells that a task or action has succeeded, failed, or produced a warning. The Telegram app may play the appropriate haptics based on type value passed. */
  notificationOccurred(type: NotificationType): this;

  /**
   * A method tells that the user has changed a selection. The Telegram app may play the appropriate haptics.
   * Do not use this feedback when the user makes or confirms a selection; use it only when the selection changes.
   */
  selectionChanged(): this;
}

/** This object controls the Settings item in the context menu of the Mini App in the Telegram interface. */
export interface SettingsButton {
  /** Shows whether the context menu item is visible. Set to false by default. */
  isVisible: boolean;

  /** A method to hide the Settings item in the context menu. */
  hide(): this;

  /** A method that removes the press event handler from the Settings item in the context menu. An alias for `Telegram.WebApp.offEvent('settingsButtonClicked', callback)` */
  offClick(callback: () => void): this;

  /** A method that sets the press event handler for the Settings item in the context menu. An alias for `Telegram.WebApp.onEvent('settingsButtonClicked', callback)` */
  onClick(callback: () => void): this;

  /** A method to make the Settings item in the context menu visible. */
  show(): this;
}

/**
 * left, displayed to the left of the main button,
 * right, displayed to the right of the main button,
 * top, displayed above the main button,
 * bottom, displayed below the main button.
 */
type BottomButtonPosition = 'bottom' | 'left' | 'right' | 'top';

/** This object controls the button that is displayed at the bottom of the Mini App in the Telegram interface. */
interface BottomButton {
  /** Current button color. Set to themeParams.button_color for the main button and themeParams.bottom_bar_bg_color for the secondary button by default. */
  readonly color: string;
  /** Shows whether the button has a shine effect. Set to false by default. */
  hasShineEffect: boolean;
  /** Shows whether the button is active. Set to true by default. */
  isActive: boolean;
  /** Readonly. Shows whether the button is displaying a loading indicator. */
  readonly isProgressVisible: boolean;
  /** Shows whether the button is visible. Set to false by default. */
  isVisible: boolean;
  /**
   * Position of the secondary button. Not defined for the main button. It applies only if both the main and secondary buttons are visible. Set to left by default.
   */
  position?: BottomButtonPosition;
  /** Current button text. Set to Continue for the main button and Cancel for the secondary button by default. */
  text: string;
  /** Current button text color. Set to themeParams.button_text_color for the main button and themeParams.button_color for the secondary button by default. */
  readonly textColor: string;
  /** Readonly. Type of the button. It can be either main for the main button or secondary for the secondary button. */
  readonly type: 'main' | 'secondary';

  /** A method to disable the button. */
  disable(): this;

  /** A method to enable the button. */
  enable(): this;

  /** A method to hide the button. */
  hide(): this;

  /** A method to hide the loading indicator. */
  hideProgress(): this;

  /** A method that removes the button's press event handler. An alias for `Telegram.WebApp.offEvent('mainButtonClicked', callback)` */
  offClick(callback: () => void): this;

  /** A method that sets the button's press event handler. An alias for `Telegram.WebApp.onEvent('mainButtonClicked', callback)` */
  onClick(callback: () => void): this;

  /**
   * A method to set the button parameters. The params parameter is an object containing one or several fields that need to be changed:
   * text - button text;
   * color - button color;
   * text_color - button text color;
   * has_shine_effect - Bot API 7.10+ enable shine effect;
   * position - position of the secondary button;
   * is_active - enable the button;
   * is_visible - show the button.
   * @param parameters
   */
  setParams(parameters: {
    color?: string | false | CssColorKey | null;
    has_shine_effect?: boolean;
    is_active?: boolean;
    is_visible?: boolean;
    position?: BottomButtonPosition;
    text?: string;
    text_color?: string | false | null;
  }): this;

  /** A method to set the button text. */
  setText(text: string): this;

  /**
   * A method to make the button visible.
   * Note that opening the Mini App from the attachment menu hides the main button until the user interacts with the Mini App interface.
   */
  show(): this;

  /**
   * A method to show a loading indicator on the button.
   * It is recommended to display loading progress if the action tied to the button may take a long time. By default, the button is disabled while the action is in progress. If the parameter leaveActive=true is passed, the button remains enabled.
   * @param leaveActive
   */
  showProgress(leaveActive?: boolean): this;
}

/** This object controls the back button, which can be displayed in the header of the Mini App in the Telegram interface. */
export interface BackButton {
  /** Shows whether the button is visible. Set to false by default. */
  isVisible: boolean;

  /** A method that sets the button press event handler. An alias for `Telegram.WebApp.onEvent('backButtonClicked', callback)` */
  onClick(callback: () => void): this;

  /** A method to make the button active and visible. */
  show(): this;

  /** A method to hide the button. */
  hide(): this;

  /** A method that removes the button press event handler. An alias for `Telegram.WebApp.offEvent('backButtonClicked', callback)` */
  offClick(callback: () => void): this;
}

/** This object represents the system-defined safe area insets, providing padding values to ensure content remains within visible boundaries, avoiding overlap with system UI elements like notches or navigation bars. */
interface SafeAreaInset {
  /** The bottom inset in pixels, representing the space to avoid at the bottom of the screen. also, available as the CSS variable `var(--tg-safe-area-inset-bottom)`. */
  bottom: number;
  /** The left inset in pixels, representing the space to avoid on the left side of the screen. also, available as the CSS variable `var(--tg-safe-area-inset-left)`. */
  left: number;
  /** The right inset in pixels, representing the space to avoid on the right side of the screen. also, available as the CSS variable `var(--tg-safe-area-inset-right)`. */
  right: number;
  /** The top inset in pixels, representing the space to avoid at the top of the screen. also, available as the CSS variable `var(--tg-safe-area-inset-top)`. */
  top: number;
}

/** This object represents the content-defined safe area insets, providing padding values to ensure content remains within visible boundaries, avoiding overlap with Telegram UI elements. */
type ContentSafeAreaInset = SafeAreaInset;

/** This object describes additional settings for setting an emoji status. */
interface EmojiStatusParameters {
  /** Optional. The duration for which the status will remain set, in seconds. */
  duration?: number;
}

/** This object describes the parameters for the file download request. */
interface DownloadFileParameters {
  /** The suggested name for the downloaded file. */
  file_name: string;
  /** The HTTPS URL of the file to be downloaded. */
  url: string;
}

/**
 * - default, a button with the default style,
 * - ok, a button with the localized text “OK”,
 * - close, a button with the localized text “Close”,
 * - cancel, a button with the localized text “Cancel”,
 * - destructive, a button with a style that indicates a destructive action (e.g. “Remove,” “Delete,” etc.).
 */
type PopupButtonType = 'cancel' | 'close' | 'default' | 'destructive' | 'ok';

/** This object describes the native popup button. */
interface PopupButton {
  /** Optional. Identifier of the button, 0-64 characters. Set to empty string by default.
   If the button is pressed, its id is returned in the callback and the popupClosed event. */
  id?: string;
  /** Optional. The text to be displayed on the button, 0-64 characters. Required if type is default or destructive. Irrelevant for other types. */
  text?: string;
  /** Optional. Type of the button. Set to default by default. */
  type?: PopupButtonType;
}

/** This object describes the native popup for scanning QR codes. */
export interface ScanQrPopupParameters {
  /** Optional. The text to be displayed under the 'Scan QR' heading, 0-64 characters. */
  text?: string;
}

/** This object describes a widget link to be included in the story. */
export interface StoryWidgetLink {
  /** Optional. The name to be displayed for the widget link, 0-48 characters. */
  name?: string;
  /** The URL to be included in the story. */
  url: string;
}

/** This object describes additional sharing settings for the native story editor. */
export interface StoryShareParameters {
  /** Optional. The caption to be added to the media, 0-200 characters for regular users and 0-2048 characters for premium subscribers. */
  text?: string;
  /** Optional. An object that describes a widget link to be included in the story. Note that only premium subscribers can post stories with links. */
  widget_link?: StoryWidgetLink;
}

export interface ThemeParameters {
  /** Optional. Bot API 7.0+ Accent text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-accent-text-color). */
  accent_text_color?: string;
  /** Optional. Background color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-bg-color). */
  bg_color?: string;
  /** Optional. Bot API 7.10+ Bottom background color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-bottom-bar-bg-color). */
  bottom_bar_bg_color?: string;
  /** Optional. Button color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-button-color). */
  button_color?: string;
  /** Optional. Button text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-button-text-color). */
  button_text_color?: string;
  /** Optional. Bot API 7.0+ Text color for destructive actions in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-destructive-text-color). */
  destructive_text_color?: string;
  /** Optional. Bot API 7.0+ Header background color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-header-bg-color). */
  header_bg_color?: string;
  /** Optional. Hint text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-hint-color). */
  hint_color?: string;
  /** Optional. Link color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-link-color). */
  link_color?: string;
  /** Optional. Bot API 6.1+ Secondary background color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-secondary-bg-color). */
  secondary_bg_color?: string;
  /** Optional. Bot API 7.0+ Background color for the section in the #RRGGBB format. It is recommended to use this in conjunction with secondary_bg_color. also, available as the CSS variable var(--tg-theme-section-bg-color). */
  section_bg_color?: string;
  /** Optional. Bot API 7.0+ Header text color for the section in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-section-header-text-color). */
  section_header_text_color?: string;
  /** Optional. Bot API 7.6+ Section separator color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-section-separator-color). */
  section_separator_color?: string;
  /** Optional. Bot API 7.0+ Subtitle text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-subtitle-text-color). */
  subtitle_text_color?: string;
  /** Optional. Main text color in the #RRGGBB format. also, available as the CSS variable var(--tg-theme-text-color). */
  text_color?: string;
}

export interface TelegramWebApp {
  /** An object for accessing accelerometer data on the device. */
  readonly Accelerometer: Accelerometer;
  /** An object for controlling the back button which can be displayed in the header of the Mini App in the Telegram interface. */
  readonly BackButton: BackButton;
  /** Current background color in the `#RRGGBB` format. */
  readonly backgroundColor: string;
  /** An object for controlling biometrics on the device. */
  readonly BiometricManager: BiometricManager;
  /** Current bottom bar color in the `#RRGGBB` format. */
  readonly bottomBarColor: string;
  /** An object for controlling cloud storage. */
  readonly CloudStorage: CloudStorage;
  /** The color scheme currently used in the Telegram app. Either “light” or “dark”. Also, available as the CSS variable `var(--tg-color-scheme)`. */
  readonly colorScheme: ColorScheme;
  /** An object representing the safe area for displaying content within the app, free from overlapping Telegram UI elements. */
  readonly contentSafeAreaInset: ContentSafeAreaInset;
  /** An object for accessing device orientation data on the device. */
  readonly DeviceOrientation: DeviceOrientation;
  /** An object for storing and retrieving data from the device's local storage. */
  readonly DeviceStorage: DeviceStorage;
  /** An object for accessing gyroscope data on the device. */
  readonly Gyroscope: Gyroscope;
  /** An object for controlling haptic feedback. */
  readonly HapticFeedback: HapticFeedback;
  /** Current header color in the `#RRGGBB` format. */
  readonly headerColor: string;
  /** A string with raw data transferred to the Mini App, convenient for validating data. WARNING: Validate data from this field before using it on the bot's server. */
  readonly initData: string;
  /** An object with input data transferred to the Mini App. WARNING: Data from this field should not be trusted. You should only use data from `initData` on the bot's server and only after it has been validated. */
  readonly initDataUnsafe: WebAppInitData;
  /** Bot API 8.0+ True, if the Mini App is currently active. False, if the Mini App is minimized. */
  readonly isActive: boolean;
  /** True, if the confirmation dialog is enabled while the user is trying to close the Mini App. False, if the confirmation dialog is disabled. */
  isClosingConfirmationEnabled: boolean;
  /** True, if the Mini App is expanded to the maximum available height. False, if the Mini App occupies part of the screen and can be expanded to the full height using the expand() method. */
  readonly isExpanded: boolean;
  /** True, if the Mini App is currently being displayed in fullscreen mode. */
  readonly isFullscreen: boolean;
  /** True, if the Mini App’s orientation is currently locked. False, if orientation changes freely based on the device’s rotation. */
  isOrientationLocked: boolean;
  /** True, if vertical swipes to close or minimize the Mini App are enabled. False, if vertical swipes to close or minimize the Mini App are disabled. In any case, the user will still be able to minimize and close the Mini App by swiping the Mini App's header. */
  isVerticalSwipesEnabled: boolean;
  /** An object for controlling location on the device. */
  readonly LocationManager: LocationManager;
  /** An object for controlling the main button, which is displayed at the bottom of the Mini App in the Telegram interface. */
  readonly MainButton: BottomButton;
  /** The name of the platform of the user's Telegram app. */
  readonly platform: string;
  /** An object representing the device's safe area insets, accounting for system UI elements like notches or navigation bars. */
  readonly safeAreaInset: SafeAreaInset;
  /** An object for controlling the secondary button, which is displayed at the bottom of the Mini App in the Telegram interface. */
  readonly SecondaryButton: BottomButton;
  /** An object for storing and retrieving data from the device's secure storage. */
  readonly SecureStorage: SecureStorage;
  /** An object for controlling the Settings item in the context menu of the Mini App in the Telegram interface. */
  readonly SettingsButton: SettingsButton;
  /** An object containing the current theme settings used in the Telegram app. */
  readonly themeParams: ThemeParameters;
  /** The version of the Bot API available in the user's Telegram app. */
  readonly version: string;
  /** The current height of the visible area of the Mini App. Also available in CSS as the variable `var(--tg-viewport-height)`. */
  readonly viewportHeight: number;
  /** The height of the visible area of the Mini App in its last stable state. Also available in CSS as a variable `var(--tg-viewport-stable-height)`. */
  readonly viewportStableHeight: number;

  /** Bot API 8.0+ A method that prompts the user to add the Mini App to the home screen. */
  addToHomeScreen(): void;

  /** Bot API 8.0+ A method that checks if adding to the home screen is supported and if the Mini App has already been added. */
  checkHomeScreenStatus(
    callback?: (status: 'added' | 'missed' | 'unknown' | 'unsupported') => void,
  ): void;

  /** A method that closes the Mini App. */
  close(): void;

  /** Bot API 6.4+ A method that closes the native popup for scanning a QR code opened with the `showScanQrPopup` method. */
  closeScanQrPopup(): void;

  /** Bot API 6.2+ A method that disables the confirmation dialog while the user is trying to close the Mini App. */
  disableClosingConfirmation(): void;

  /** Bot API 7.7+ A method that disables vertical swipes to close or minimize the Mini App. */
  disableVerticalSwipes(): void;

  /** Bot API 8.0+ A method that displays a native popup prompting the user to download a file specified by the `params` argument. */
  downloadFile(parameters: DownloadFileParameters, callback?: (accepted: boolean) => void): void;

  /** Bot API 6.2+ A method that enables a confirmation dialog while the user is trying to close the Mini App. */
  enableClosingConfirmation(): void;

  /** Bot API 7.7+ A method that enables vertical swipes to close or minimize the Mini App. */
  enableVerticalSwipes(): void;

  /** Bot API 8.0+ A method that requests exiting fullscreen mode. */
  exitFullscreen(): void;

  /** A method that expands the Mini App to the maximum available height. */
  expand(): void;

  /** Bot API 9.1+ A method that hides the on-screen keyboard, if it is currently visible. Does nothing if the keyboard is not active. */
  hideKeyboard(): void;

  /** Returns true if the user's app supports a version of the Bot API that is equal to or higher than the version passed as the parameter. */
  isVersionAtLeast(version: string): boolean;

  /** Bot API 8.0+ A method that locks the Mini App’s orientation to its current mode (either portrait or landscape). */
  lockOrientation(): void;

  /** A method that deletes a previously set event handler. */
  offEvent(eventType: string, handler: (...arguments_: any[]) => void): void;

  /** A method that sets the app event handler. */
  onEvent(eventType: string, handler: (...arguments_: any[]) => void): void;

  /** Bot API 6.1+ A method that opens an invoice using the link `url`. */
  openInvoice(
    url: string,
    callback?: (status: 'cancelled' | 'failed' | 'paid' | 'pending') => void,
  ): this;

  /** A method that opens a link in an external browser. The Mini App will not be closed. */
  openLink(url: string): this;

  /** A method that opens a telegram link inside the Telegram app. The Mini App will not be closed after this method is called. Up to Bot API 7.0 The Mini App will be closed after this method is called. */
  openTelegramLink(url: string): this;

  /** Bot API 6.4+ A method that requests text from the clipboard. */
  readTextFromClipboard(callback?: (text: string | null) => void): void;

  /** A method that informs the Telegram app that the Mini App is ready to be displayed. */
  ready(): void;

  /** Bot API 8.0+ A method that shows a native popup requesting permission for the bot to manage user's emoji status. */
  requestEmojiStatusAccess(callback?: (allowed: boolean) => void): void;

  /** Bot API 6.9+ A method that shows a native popup prompting the user for their phone number. */
  requestContact(callback?: (granted: boolean) => void): void;

  /** Bot API 6.9+ A method that shows a native popup requesting permission for the bot to send messages to the user. */
  requestWriteAccess(callback?: (granted: boolean) => void): void;

  /** Bot API 8.0+ A method that requests opening the Mini App in fullscreen mode. */
  requestFullscreen(): void;

  /** A method used to send data to the bot. */
  sendData(data: string): void;

  /** Bot API 6.1+ A method that sets the app background color in the `#RRGGBB` format. */
  setBackgroundColor(color: Extract<CssColorKey, 'bg_color' | 'secondary_bg_color'> | string): void;

  /** Bot API 7.10+ A method that sets the app's bottom bar color in the `#RRGGBB` format. */
  setBottomBarColor(color: CssColorKey | string): void;

  /** Bot API 8.0+ A method that opens a dialog allowing the user to set the specified custom emoji as their status. */
  setEmojiStatus(
    custom_emoji_id: string,
    parameters?: EmojiStatusParameters,
    callback?: (ok: boolean) => void,
  ): void;

  /** Bot API 6.1+ A method that sets the app header color in the `#RRGGBB` format. */
  setHeaderColor(color: Extract<CssColorKey, 'bg_color' | 'secondary_bg_color'> | string): void;

  /** Bot API 8.0+ A method that opens a dialog allowing the user to share a message provided by the bot. */
  shareMessage(message_id: number | string, callback?: (sent: boolean) => void): void;

  /** Bot API 7.8+ A method that opens the native story editor with the media specified in the `media_url` parameter. */
  shareToStory(media_url: string, parameters?: StoryShareParameters): void;

  /** Bot API 6.2+ A method that shows `message` in a simple alert with a 'Close' button. */
  showAlert(message: string, callback?: () => void): void;

  /** Bot API 6.2+ A method that shows `message` in a simple confirmation window with 'OK' and 'Cancel' buttons. */
  showConfirm(message: string, callback?: (ok: boolean) => void): void;

  /** Bot API 6.2+ A method that shows a native popup described by the `params` argument. */
  showPopup(
    parameters: { buttons?: PopupButton[]; message: string; title?: string },
    callback?: (buttonId: string | null) => void,
  ): void;

  /** Bot API 6.4+ A method that shows a native popup for scanning a QR code described by the `params` argument. */
  showScanQrPopup(
    parameters: ScanQrPopupParameters,
    callback?: (data: string | null) => boolean,
  ): void;

  /** Bot API 6.7+ A method that inserts the bot's username and the specified inline `query` in the current chat's input field. */
  switchInlineQuery(query?: string, choose_chat_types?: ChooseChatType[]): void;

  /** Bot API 8.0+ A method that unlocks the Mini App’s orientation, allowing it to follow the device's rotation freely. */
  unlockOrientation(): void;
}

interface TelegramWebView {
  initParams: Record<string, string>;
  isIframe: boolean;

  callEventCallbacks(
    eventType: string,
    function_: (callback: (et: string, ed?: any) => void) => void,
  ): void;

  offEvent(eventType: string, callback: (eventType: string, eventData?: any) => void): void;

  onEvent(eventType: string, callback: (eventType: string, eventData?: any) => void): void;

  postEvent(eventType: string, callback?: (error?: any) => void, eventData?: any): void;

  receiveEvent(eventType: string, eventData?: any): void;
}

interface TelegramUtils {
  sessionStorageGet<T = any>(key: string): T | null;

  sessionStorageSet(key: string, value: any): boolean;

  urlAppendHashParams(url: string, addHash: string): string;

  urlParseHashParams(hash: string): Record<string, string>;

  urlParseQueryString(qs: string): Record<string, string | null>;

  urlSafeDecode(s: string): string;
}

declare global {
  interface Window {
    Telegram: {
      TelegramGameProxy?: {
        receiveEvent: (eventType: string, eventData?: any) => void;
      };
      TelegramGameProxy_receiveEvent?: (eventType: string, eventData?: any) => void;
      Utils: TelegramUtils;

      WebApp: TelegramWebApp;
      WebView: TelegramWebView;
    };
    TelegramWebviewProxy?: {
      postEvent: (eventType: string, data: string) => void;
    };
  }
}

export {};

```

### file path: tailwind.config.ts

```ts
import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';
import { dark, light } from './src/libs/common/constants/colors';
import { generateShades } from './src/libs/common/utils/color';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    borderRadius: {
      DEFAULT: '0.25rem',
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
    },
    extend: {
      fontSize: {
        tiny: '0.65rem',
        small: '0.75rem',
        medium: '1rem',
        large: '1.125rem',
      },
    },
    screens: {
      sm: '320px',
      md: '375px',
      lg: '435px',
      xl: '768px',
    },
    container: {
      screens: {
        sm: '320px',
        md: '375px',
        lg: '435px',
        xl: '768px',
      },
      center: true,
      padding: {
        DEFAULT: '0',
        sm: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
    },
  },
  plugins: [
    heroui({
      layout: {
        lineHeight: {
          small: '1rem',
        },
        radius: {
          small: '0.25rem',
          medium: '0.75rem',
          large: '1rem',
        },
      },
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: generateShades(light.blueNcs, light.antiflashWhite),
            secondary: generateShades(light.antiflashWhite, light.black),
            success: generateShades(light.castletonGreen, light.antiflashWhite),
            warning: generateShades(light.amber, light.antiflashWhite),
            danger: generateShades(light.indianRed, light.antiflashWhite),
            content1: {
              DEFAULT: light.antiflashWhite,
            },
            content2: {
              DEFAULT: light.antiflashWhite,
            },
            content3: {
              DEFAULT: light.antiflashWhite,
            },
            content4: {
              DEFAULT: light.antiflashWhite,
            },
            background: light.platinum,
            foreground: dark.richBlack2,
            focus: light.blueNcs,
            overlay: dark.richBlack2,
          },
        },
        dark: {
          colors: {
            primary: generateShades(light.blueNcs, dark.whiteSmoke, { darkMode: true }),
            default: generateShades(dark.gunmetal, dark.whiteSmoke, { darkMode: true }),
            secondary: generateShades(dark.richBlack, dark.whiteSmoke, { darkMode: true }),
            success: generateShades(dark.midnightGreen, dark.whiteSmoke, { darkMode: true }),
            warning: generateShades(dark.caramel, dark.whiteSmoke, { darkMode: true }),
            danger: generateShades(dark.imperialRed, dark.whiteSmoke, { darkMode: true }),
            content1: {
              DEFAULT: dark.richBlack,
            },
            content2: {
              DEFAULT: dark.richBlack,
            },
            content3: {
              DEFAULT: dark.richBlack,
            },
            content4: {
              DEFAULT: dark.richBlack,
            },
            background: dark.richBlack2,
            foreground: dark.whiteSmoke,
            focus: dark.silverLakeBlue,
            overlay: dark.whiteSmoke,
          },
        },
      },
      defaultTheme: 'dark',
    }),
  ],
} satisfies Config;

```

### file path: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "@environments": [
        "./config/environment.ts"
      ]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```
