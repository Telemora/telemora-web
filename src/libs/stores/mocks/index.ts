import { faker } from '@faker-js/faker';

import { generateMockAddress } from '@/libs/location/mocks';
import { generateMockProductPreviews } from '@/libs/products/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

import { StoreDetail, StorePreviewDto, StoreStatusEnum, StoreSummary } from '../types';

export async function generateMockStorePreview(): Promise<StorePreviewDto> {
  return {
    storeId: faker.string.uuid(),
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
