import { CreateOrderDto, CreateOrderShipmentDto, UpdateOrderDto } from '@/libs/orders/types';
import { generateMockOrderDetail, generateMockOrderSummaries } from '@/libs/orders/mocks';

export async function getMyOrders() {
  /* return httpClient.get<OrderSummary[]>('orders'); */
  return generateMockOrderSummaries();
}

export async function getOrderDetails(id: string) {
  /* return httpClient.get<OrderDetail>(`/orders/${id}`); */
  return generateMockOrderDetail();
}

export async function createOrder(data: CreateOrderDto) {
  /* return httpClient.post<OrderDetail>(`/orders`, data); */
  return generateMockOrderDetail();
}

export async function updateOrder(id: string, data: UpdateOrderDto) {
  /* return httpClient.patch<OrderDetail>(`/orders/${id}`, data); */
  return generateMockOrderDetail();
}

export async function addShipment(id: string, data: CreateOrderShipmentDto) {
  /* return httpClient.post<OrderDetail>(`/orders/${id}/shipment`, data); */
  return generateMockOrderDetail();
}
