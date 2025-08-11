import { z } from 'zod';

import {
  type CreateOrderDto,
  type CreateOrderShipmentDto,
  OrderStatus,
  type UpdateOrderDto,
} from '@/libs/orders/types';

export const createOrderItemDtoSchema = z.object({
  productId: z.number().int(),
  quantity: z.number().int().positive(),
});

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
