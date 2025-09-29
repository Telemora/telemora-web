import { z } from 'zod';

import {
  type CreateOrderDto,
  CreateOrderItemDto,
  type CreateOrderShipmentDto,
  OrderStatus,
  type UpdateOrderDto,
} from '@/libs/orders/types';

export const createOrderItemDtoSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
}) satisfies z.ZodType<CreateOrderItemDto>;

export const createOrderDtoSchema = z.object({
  items: z.array(createOrderItemDtoSchema).min(1),
  shippingAddress: z.string().optional(),
}) satisfies z.ZodType<CreateOrderDto>;

export const createOrderShipmentDtoSchema = z.object({
  trackingNumber: z.string().optional(),
  courierService: z.string().optional(),
  expectedDeliveryDate: z.string().optional(),
}) satisfies z.ZodType<CreateOrderShipmentDto>;

export const updateOrderDtoSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  shippingAddress: z.string().optional(),
  items: z.array(createOrderItemDtoSchema).optional(),
}) satisfies z.ZodType<UpdateOrderDto>;
