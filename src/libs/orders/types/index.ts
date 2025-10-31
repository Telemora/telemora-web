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
  orderId: string;
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
  customer: UserSummary;
}

export interface OrderShipment {
  orderShipmentId: string;
  trackingNumber: string;
  carrierTrackingUrl?: string;
  status?: 'created' | 'in_transit' | 'delivered' | 'failed';
  courierService: string;
  expectedDeliveryDate?: Date;
  shippedAt: Date;
}

export interface CreateOrderDto {
  items: CreateOrderItemDto[];
  shippingAddress?: string;
}

export interface CreateOrderItemDto {
  productId: string;
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
