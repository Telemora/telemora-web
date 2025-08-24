import {
  DiscountApplicabilityEntityType,
  DiscountDetailDto,
  DiscountPreviewDto,
  DiscountStatus,
  DiscountType,
} from '@/libs/discount/type';
import { faker } from '@faker-js/faker';

async function generateMockStoreDiscount(): Promise<DiscountPreviewDto> {
  return {
    id: faker.number.int(),
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
