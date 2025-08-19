import { generateMockPaymentDetail, generateMockPaymentSummaries } from '@/libs/payments/mocks';
import { CreatePaymentDto } from '@/libs/payments/types';

export async function getPayments() {
  return generateMockPaymentSummaries();
}

export async function getPaymentDetails(id: number) {
  return generateMockPaymentDetail();
}

export async function createPayment(data: CreatePaymentDto) {
  return generateMockPaymentDetail();
}
