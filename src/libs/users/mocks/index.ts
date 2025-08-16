import { faker } from '@faker-js/faker';

import { generateMockAddress } from '@/libs/location/mocks';
import { generateMockOrderSummary } from '@/libs/orders/mocks';
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
    userId: faker.number.int(),
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
    orders: await Promise.all(Array.from({ length: 5 }, generateMockOrderSummary)),
    currencyInfo: await generateMockCurrencyInfo(),
  };
}
