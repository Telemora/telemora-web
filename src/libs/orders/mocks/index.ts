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
