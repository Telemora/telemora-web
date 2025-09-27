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
