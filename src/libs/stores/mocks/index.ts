import { faker } from '@faker-js/faker';

import { generateMockAddress } from '@/libs/location/mocks';
import { generateMockProductPreviews } from '@/libs/products/mocks';
import { generateMockUserSummary } from '@/libs/users/mocks';

import { StoreDetail, StorePreview, StoreStatusEnum, StoreSummary } from '../types';

export async function generateMockStorePreview(): Promise<StorePreview> {
  return {
    id: faker.number.int(),
    displayName: faker.company.name(),
    slug: faker.helpers.slugify(faker.company.name()),
    logo: {
      url: faker.image.url(),
      alt: faker.company.name(),
    },
    vendorScore: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    status: StoreStatusEnum.ACTIVE,
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
    serviceHours: {
      mon: { open: '09:00', close: '17:00' },
      tue: { open: '09:00', close: '17:00' },
    },
    createdAt: faker.date.past(),
  };
}

export async function generateMockStoreSummaries(): Promise<StoreSummary[]> {
  return Promise.all(Array.from({ length: 5 }, () => generateMockStoreSummary()));
}

export async function generateMockStorePreviews(): Promise<StorePreview[]> {
  return Promise.all(Array.from({ length: 5 }, () => generateMockStorePreview()));
}
