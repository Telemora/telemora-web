'use client';

import { Card, CardBody, CardHeader, Skeleton } from '@heroui/react';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { PriceComponent } from '@/libs/common/components/PriceComponent';
import { DATE_FORMATS, formatSafeDate } from '@/libs/common/utils/date';
import { OrderSummary } from '@/libs/orders/types';

import { OrderStatusChip } from './OrderStatusChip';

interface OrderSummaryCardProps {
  order: OrderSummary;
  isLoading?: boolean;
}

const OrderSummaryCardSkeleton = () => (
  <Card className="w-full">
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

export function OrderSummaryCard({ order, isLoading = false }: OrderSummaryCardProps) {
  const { id, status, totalAmount, store, expectedDeliveryDate, createdAt } = order;

  const cardContent = useMemo(() => {
    return (
      <Link className="block" href={`/orders/${id}`}>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="max-w-4/5">
              <h3 className="truncate text-sm font-semibold">{id}</h3>
              <p className="text-default-500 text-xs">
                {formatSafeDate(createdAt, DATE_FORMATS.SHORT, 'Unknown date')} —{' '}
                <span className="text-default-500">{store.displayName}</span>
              </p>
            </div>
            <OrderStatusChip status={status} />
          </CardHeader>
          <CardBody className="text-default-500 text-sm">
            <div className="flex items-center justify-between">
              <PriceComponent amount={totalAmount} />
              <div className="text-default-500 text-right text-xs">
                <p className="font-medium">Est. Delivery</p>
                <p>{formatSafeDate(expectedDeliveryDate, DATE_FORMATS.SHORT, 'TBD')}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    );
  }, [id, createdAt, store.displayName, status, totalAmount, expectedDeliveryDate]);

  if (isLoading) {
    return <OrderSummaryCardSkeleton />;
  }

  return cardContent;
}
