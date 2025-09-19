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
    transactionHash: faker.string.hexadecimal({ length: 64 }),
    createdAt: faker.date.past(),
  };
}

export async function generateMockPaymentSummaries(): Promise<PaymentSummary[]> {
  return Promise.all(Array.from({ length: 5 }, () => generateMockPaymentSummary()));
}

export async function generateMockPaymentDetail(): Promise<PaymentDetail> {
  return {
    ...(await generateMockPaymentSummary()),
    gasFee: faker.finance.amount(),
    commission: faker.finance.amount(),
    fromWalletAddress: faker.finance.ethereumAddress(),
    toWalletAddress: faker.finance.ethereumAddress(),
    order: await generateMockOrderSummary(),
    user: await generateMockUserSummary(),
  };
}
