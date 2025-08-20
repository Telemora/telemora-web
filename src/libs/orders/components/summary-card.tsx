'use client';

import { Card, CardBody, CardHeader, Skeleton } from '@heroui/react';
import Link from 'next/link';

import PriceComponent from '@/libs/common/components/PriceComponent';
import { DATE_FORMATS, formatSafeDate } from '@/libs/common/utils/date';
import { OrderSummary } from '@/libs/orders/types';

import OrderStatusChip from './order-status-chip';

interface OrderSummaryCardProps {
  order: OrderSummary;
  href?: string;
  className?: string;
  isLoading?: boolean;
}

export default function OrderSummaryCard({
  order,
  href,
  className,
  isLoading = false,
}: OrderSummaryCardProps) {
  const { id, status, totalAmount, store, expectedDeliveryDate, createdAt } = order;

  if (isLoading) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader className="flex items-center justify-between">
          <div className="flex-1">
            <Skeleton className="mb-2 h-4 w-24 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-20 rounded" />
            <div className="text-right">
              <Skeleton className="mb-1 h-3 w-16 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const cardContent = (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Order #{id}</h3>
          <p className="text-xs text-gray-500">
            {formatSafeDate(createdAt, DATE_FORMATS.SHORT, 'Unknown date')} —{' '}
            <span className="text-default">{store.displayName}</span>
          </p>
        </div>
        <OrderStatusChip status={status} />
      </CardHeader>

      <CardBody className="text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <PriceComponent amount={totalAmount} />
          <div className="text-right text-xs text-gray-500">
            <p className="font-medium">Est. Delivery</p>
            <p>{formatSafeDate(expectedDeliveryDate, DATE_FORMATS.SHORT, 'TBD')}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
}
