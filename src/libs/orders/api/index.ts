import httpClient from '@/libs/common/utils/httpClient';
import {
  CreateOrderDto,
  CreateOrderShipmentDto,
  OrderDetail,
  OrderSummary,
  UpdateOrderDto,
} from '@/libs/orders/types';

export async function getMyOrders() {
  return httpClient.get<OrderSummary[]>('orders');
}

export async function getOrderDetails(id: number) {
  return httpClient.get<OrderDetail>(`/orders/${id}`);
}

export async function createOrder(data: CreateOrderDto) {
  return httpClient.post<OrderDetail>(`/orders/create`, data);
}

export async function updateOrder(id: number, data: UpdateOrderDto) {
  return httpClient.patch<OrderDetail>(`/orders/update/${id}`, data);
}

export async function addShipment(id: number, data: CreateOrderShipmentDto) {
  return httpClient.post<OrderDetail>(`/orders/${id}/shipment`, data);
}
