'use client';

import { Chip } from '@heroui/react';
import { OrderStatus } from '@/libs/orders/types';

export interface OrderStatusChipProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
  formatOrderStatus: (status: OrderStatus) => string;
}

export default function OrderStatusChip({
  status,
  formatOrderStatus,
  size = 'md',
}: OrderStatusChipProps) {
  return (
    <Chip color={getOrderStatusColor(status)} size={size}>
      {formatOrderStatus(status)}
    </Chip>
  );
}

export function getOrderStatusColor(
  status: OrderStatus,
): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' {
  switch (status) {
    case OrderStatus.PENDING:
      return 'warning';
    case OrderStatus.CONFIRMED:
    case OrderStatus.PROCESSING:
      return 'secondary';
    case OrderStatus.SHIPPED:
      return 'primary';
    case OrderStatus.DELIVERED:
    case OrderStatus.COMPLETED:
      return 'success';
    case OrderStatus.CANCELED:
    case OrderStatus.REFUNDED:
      return 'danger';
    default:
      return 'default';
  }
}
