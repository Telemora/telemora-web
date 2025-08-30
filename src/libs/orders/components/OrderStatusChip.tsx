'use client';

import { Chip } from '@heroui/react';
import { useMemo } from 'react';

import { OrderStatus } from '@/libs/orders/types';

interface OrderStatusChipProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

const ORDER_STATUS_CONFIG: Record<OrderStatus, { color: ChipColor; label: string }> = {
  [OrderStatus.PENDING]: { color: 'default', label: 'Pending' },
  [OrderStatus.CONFIRMED]: { color: 'default', label: 'Confirmed' },
  [OrderStatus.PROCESSING]: { color: 'primary', label: 'Processing' },
  [OrderStatus.SHIPPED]: { color: 'primary', label: 'Shipped' },
  [OrderStatus.DELIVERED]: { color: 'success', label: 'Delivered' },
  [OrderStatus.COMPLETED]: { color: 'success', label: 'Completed' },
  [OrderStatus.CANCELED]: { color: 'danger', label: 'Canceled' },
  [OrderStatus.REFUNDED]: { color: 'danger', label: 'Refunded' },
};

const DEFAULT_STATUS_CONFIG = { color: 'default', label: 'Unknown' };

export const getOrderStatusConfig = (status: OrderStatus) => {
  return ORDER_STATUS_CONFIG[status] || DEFAULT_STATUS_CONFIG;
};

export function OrderStatusChip({ status, size = 'sm', className }: OrderStatusChipProps) {
  const { color, label } = useMemo(() => getOrderStatusConfig(status), [status]);

  return (
    <Chip color={color} size={size} className={className}>
      {label}
    </Chip>
  );
}
