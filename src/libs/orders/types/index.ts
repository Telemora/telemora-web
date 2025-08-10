import { PaymentSummary } from '@/libs/payments/types';
import { ProductPreviewDto } from '@/libs/products/types';
import { StorePreviewDto } from '@/libs/stores/types';
import { UserSummary } from '@/libs/users/types';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

export interface OrderItemPreviewDto {
  product: ProductPreviewDto;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderSummary {
  id: number | string;
  status: OrderStatus;
  totalAmount: number;
  store: StorePreviewDto;
  expectedDeliveryDate: Date;
  createdAt: Date;
}

export interface OrderDetail extends OrderSummary {
  items: OrderItemPreviewDto[];
  shipment?: OrderShipment;
  payment?: PaymentSummary;
  buyer: UserSummary;
}

export interface OrderShipment {
  id: number;
  trackingNumber: string;
  carrierTrackingUrl?: string;
  status?: 'created' | 'in_transit' | 'delivered' | 'failed';
  courierService: string;
  expectedDeliveryDate: Date;
  shippedAt: Date;
}

export interface CreateOrderDto {
  items: CreateOrderItemDto[];
  shippingAddress?: string;
}

interface CreateOrderItemDto {
  productId: number;
  quantity: number;
}

export interface CreateOrderShipmentDto {
  trackingNumber?: string;
  courierService?: string;
  expectedDeliveryDate?: string;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: string;
  items?: CreateOrderItemDto[];
}
