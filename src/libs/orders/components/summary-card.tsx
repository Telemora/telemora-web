'use client';

import { Card, CardBody, CardHeader, Skeleton } from '@heroui/react';
import { format, isValid } from 'date-fns';
import Link from 'next/link';

import PriceComponent from '@/libs/common/components/PriceComponent';
import { OrderStatus, OrderSummary } from '@/libs/orders/types';
import OrderStatusChip from '@/libs/orders/components/OrderStatusChip';

interface OrderSummaryCardProps {
  order: {
    store?: {
      name?: string;
    };
  } & OrderSummary;
  href?: string;
  className?: string;
  isLoading?: boolean;
}

export default function OrderSummaryCard({
  order,
  href,
  className,
  isLoading,
}: OrderSummaryCardProps) {
  const { id, status, totalAmount, store, deliveryDate, createdAt } = order;

  const formattedCreatedAt = isValid(new Date(createdAt))
    ? format(new Date(createdAt), 'PP')
    : 'N/A';
  const formattedDeliveryDate = isValid(new Date(deliveryDate))
    ? format(new Date(deliveryDate), 'PP')
    : 'N/A';

  const cardContent = (
    <Card
      className={`w-full ${className} transition-all ${href ? 'cursor-pointer hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200' : ''}`}
      role={href ? 'link' : undefined}
      tabIndex={href ? 0 : undefined}
    >
      <CardHeader
        className="flex items-center justify-between"
        aria-label={isLoading ? 'Loading order details' : `Order ${id} details`}
      >
        <div role="region" aria-labelledby={`order-${id}-heading`}>
          {isLoading ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            <h3
              id={`order-${id}-heading`}
              className="text-sm font-semibold"
              role="heading"
              aria-level={3}
            >
              Order #{id}
            </h3>
          )}
          <p className="text-muted-foreground text-xs">
            {isLoading ? (
              <Skeleton className="mt-1 h-4 w-32" />
            ) : (
              <>
                {formattedCreatedAt} —{' '}
                {store?.name ? (
                  <span className="text-muted-foreground/80">{store.name}</span>
                ) : (
                  <span className="text-muted-foreground/60 italic">Unknown Store</span>
                )}
              </>
            )}
          </p>
        </div>
        {isLoading ? (
          <Skeleton className="h-6 w-20 rounded-full" />
        ) : (
          <OrderStatusChip
            status={status}
            size="sm"
            formatOrderStatus={formatOrderStatus}
            aria-label={`Order status: ${formatOrderStatus(status)}`}
          />
        )}
      </CardHeader>

      <CardBody className="text-sm text-foreground">
        <div className="flex items-center justify-between">
          {isLoading ? <Skeleton className="h-5 w-20" /> : <PriceComponent amount={totalAmount} />}
          <div
            className="text-muted-foreground text-right text-xs"
            role="region"
            aria-label="Delivery information"
          >
            {isLoading ? (
              <div className="space-y-1">
                <Skeleton className="ml-auto h-4 w-16" />
                <Skeleton className="ml-auto h-4 w-24" />
              </div>
            ) : (
              <>
                <p className="font-medium" aria-hidden="true">
                  Est. Delivery
                </p>
                <p aria-label={`Estimated delivery date: ${formattedDeliveryDate}`}>
                  {formattedDeliveryDate}
                </p>
              </>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return href ? (
    <Link href={href} className="block hover:no-underline focus:outline-none">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}

export function formatOrderStatus(status: OrderStatus): string {
  return status
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
