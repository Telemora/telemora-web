'use client';

import { Chip } from '@heroui/react';

import { OrderStatus } from '@/libs/orders/types';

interface OrderStatusChipProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

const ORDER_STATUS_CONFIG = {
  [OrderStatus.PENDING]: {
    color: 'warning' as ChipColor,
    label: 'Pending',
  },
  [OrderStatus.CONFIRMED]: {
    color: 'secondary' as ChipColor,
    label: 'Confirmed',
  },
  [OrderStatus.PROCESSING]: {
    color: 'secondary' as ChipColor,
    label: 'Processing',
  },
  [OrderStatus.SHIPPED]: {
    color: 'primary' as ChipColor,
    label: 'Shipped',
  },
  [OrderStatus.DELIVERED]: {
    color: 'success' as ChipColor,
    label: 'Delivered',
  },
  [OrderStatus.COMPLETED]: {
    color: 'success' as ChipColor,
    label: 'Completed',
  },
  [OrderStatus.CANCELED]: {
    color: 'danger' as ChipColor,
    label: 'Canceled',
  },
  [OrderStatus.REFUNDED]: {
    color: 'danger' as ChipColor,
    label: 'Refunded',
  },
} as const;

const DEFAULT_STATUS_CONFIG = {
  color: 'default' as ChipColor,
  label: 'Unknown',
} as const;

export default function OrderStatusChip({ status, size = 'sm', className }: OrderStatusChipProps) {
  const config = ORDER_STATUS_CONFIG[status] || DEFAULT_STATUS_CONFIG;

  return (
    <Chip color={config.color} size={size} className={className}>
      {config.label}
    </Chip>
  );
}

export function getOrderStatusColor(status: OrderStatus): ChipColor {
  return ORDER_STATUS_CONFIG[status]?.color || DEFAULT_STATUS_CONFIG.color;
}

export function getOrderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_CONFIG[status]?.label || DEFAULT_STATUS_CONFIG.label;
}
