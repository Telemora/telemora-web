'use client';

import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { format } from 'date-fns';
import Link from 'next/link';

import PriceComponent from '@/libs/common/components/PriceComponent';
import { OrderStatus, OrderSummary } from '@/libs/orders/types';

interface OrderSummaryCardProps {
  order: OrderSummary;
  href?: string;
  className?: string;
}

export default function OrderSummaryCard({ order, href, className }: OrderSummaryCardProps) {
  const { id, status, totalAmount, store, deliveryDate, createdAt } = order;

  const cardContent = (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Order #{id}</h3>
          <p className="text-xs text-gray-500">
            {format(new Date(createdAt), 'PP')} —{' '}
            <span className="text-gray-400">{store.name}</span>
          </p>
        </div>
        <Chip color={getOrderStatusColor(status)} size="sm">
          {status}
        </Chip>
      </CardHeader>

      <CardBody className="text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <PriceComponent amount={totalAmount} />
          <div className="text-right text-xs text-gray-500">
            <p className="font-medium">Est. Delivery</p>
            <p>{format(new Date(deliveryDate), 'PP')}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
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
