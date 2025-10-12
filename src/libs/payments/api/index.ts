import httpClient from '@/libs/common/utils/httpClient';
import { CreatePaymentDto, PaymentDetail, PaymentSummary } from '@/libs/payments/types';

export async function getPayments() {
  return httpClient.get<PaymentSummary[]>('/payments');
}

export async function getPaymentDetails(id: number) {
  return httpClient.get<PaymentDetail>(`/payments/${id}`);
}

export async function createPayment(data: CreatePaymentDto) {
  return httpClient.post<PaymentDetail>('/payments', data);
}
