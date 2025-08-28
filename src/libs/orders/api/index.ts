import { CreateOrderDto, CreateOrderShipmentDto, UpdateOrderDto } from '@/libs/orders/types';
import { generateMockOrderDetail, generateMockOrderSummaries } from '@/libs/orders/mocks';

export async function getMyOrders() {
  /* return httpClient.get<OrderSummary[]>('orders'); */
  return generateMockOrderSummaries();
}

export async function getOrderDetails(id: number) {
  /* return httpClient.get<OrderDetail>(`/orders/${id}`); */
  return generateMockOrderDetail();
}

export async function createOrder(data: CreateOrderDto) {
  /* return httpClient.post<OrderDetail>(`/orders/create`, data); */
  return generateMockOrderDetail();
}

export async function updateOrder(id: number, data: UpdateOrderDto) {
  /* return httpClient.patch<OrderDetail>(`/orders/update/${id}`, data); */
  return generateMockOrderDetail();
}

export async function addShipment(id: number, data: CreateOrderShipmentDto) {
  /* return httpClient.post<OrderDetail>(`/orders/${id}/shipment`, data); */
  return generateMockOrderDetail();
}
