'use client';

import { Alert, Card, CardBody, CardFooter, Divider, Spinner } from '@heroui/react';
import { useParams } from 'next/navigation';
import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/ErrorPage';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { formatSafeDate } from '@/libs/common/utils/date';
import { OrderItemPreviewCard } from '@/libs/orders/components/OrderItemPreview';
import { OrderShipmentCard } from '@/libs/orders/components/OrderShipmentCard';
import { OrderStatusChip } from '@/libs/orders/components/OrderStatusChip';
import { useOrderDetails } from '@/libs/orders/hooks';
import { OrderStatus } from '@/libs/orders/types';
import { PaymentStatusChip } from '@/libs/payments/components/payment-status-chip';
import { PaymentStatus } from '@/libs/payments/types';
import { OrderInfoSummary } from '@/libs/orders/components/OrderInfoSummary';

export default function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, error } = useOrderDetails(Number(orderId));

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-screen items-center justify-center">
          <Spinner label="Loading order..." />
        </div>
      </AppLayout>
    );
  }

  if (error || !order) return <ErrorPage error={new Error('Invalid Order')} />;
  if (!orderId || isNaN(Number(orderId)))
    return <ErrorPage error={new Error('Invalid order ID')} />;

  const isPendingPayment =
    order.status === OrderStatus.PENDING && order.payment?.status !== PaymentStatus.COMPLETED;

  return (
    <AppLayout>
      <PageHeader
        title={`Order #${order.id}`}
        subtitle={`Placed on ${formatSafeDate(order.createdAt)}`}
      />

      <div className="mb-4 grid grid-cols-2">
        <div className="space-x-1">
          <span className="text-sm">Order:</span>
          <OrderStatusChip status={order.status} />
        </div>

        {order.payment && (
          <div className="space-x-1">
            <span className="text-sm">Payment:</span>
            <PaymentStatusChip status={order.payment.status} />
          </div>
        )}
      </div>

      <OrderInfoSummary order={order} />

      {isPendingPayment && (
        <Card>
          <CardBody>
            <Alert
              color="warning"
              description="This order is pending payment. Complete it to avoid cancellation."
            />
          </CardBody>
          <CardFooter>
            {/* TODO: I must to edit this part, to access store's wallet address */}
            {/* <TonPaymentButton
              amountTon={order.totalAmount}
              sellerAddress={order.store.displayName}
            /> */}
          </CardFooter>
        </Card>
      )}

      <Divider className="my-4" />

      <div className="space-y-4">
        <PageHeader title="Items" />
        {order.items.map((item) => (
          <OrderItemPreviewCard orderItem={item} key={item.product.id} />
        ))}
      </div>

      <Divider className="my-4" />

      {order.shipment && <OrderShipmentCard shipment={order.shipment} />}
    </AppLayout>
  );
}
