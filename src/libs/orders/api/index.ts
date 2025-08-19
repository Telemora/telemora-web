import { CreateOrderDto, CreateOrderShipmentDto, UpdateOrderDto } from '@/libs/orders/types';
import { generateMockOrderDetail, generateMockOrderSummaries } from '@/libs/orders/mocks';

export async function getMyOrders() {
  return generateMockOrderSummaries();
}

export async function getOrderDetails(id: number) {
  return generateMockOrderDetail();
}

export async function createOrder(data: CreateOrderDto) {
  return generateMockOrderDetail();
}

export async function updateOrder(id: number, data: UpdateOrderDto) {
  return generateMockOrderDetail();
}

export async function addShipment(id: number, data: CreateOrderShipmentDto) {
  return generateMockOrderDetail();
}
