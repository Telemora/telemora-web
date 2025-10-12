import {
  CreateOrderDto,
  CreateOrderShipmentDto,
  OrderDetail,
  OrderSummary,
  UpdateOrderDto,
} from '@/libs/orders/types';
import httpClient from '@/libs/common/utils/httpClient';

export async function getMyOrders() {
  return httpClient.get<OrderSummary[]>('orders');
}

export async function getOrderDetails(id: string) {
  return httpClient.get<OrderDetail>(`/orders/${id}`);
}

export async function createOrder(data: CreateOrderDto) {
  return httpClient.post<OrderDetail>(`/orders`, data);
}

export async function updateOrder(id: string, data: UpdateOrderDto) {
  return httpClient.patch<OrderDetail>(`/orders/${id}`, data);
}

export async function addShipment(id: string, data: CreateOrderShipmentDto) {
  return httpClient.post<OrderDetail>(`/orders/${id}/shipment`, data);
}
