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
    productId: faker.string.uuid(),
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
