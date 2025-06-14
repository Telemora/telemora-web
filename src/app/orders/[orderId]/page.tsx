'use client';

import { Alert, Button, Card, CardBody, CardFooter, Divider, Spinner } from '@heroui/react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/errorPage';
import { PageHeader } from '@/libs/common/components/page-header';
import PriceComponent from '@/libs/common/components/PriceComponent';
import { formatDate, formatRelative } from '@/libs/common/utils/date';
import OrderItemPreviewCard from '@/libs/orders/components/order-item-preview';
import { OrderShipmentCard } from '@/libs/orders/components/order-shipment-card';
import { OrderStatusChip } from '@/libs/orders/components/order-status-chip';
import { useOrderDetails } from '@/libs/orders/hooks';
import { OrderStatus } from '@/libs/orders/types';
import { PaymentStatusChip } from '@/libs/payments/components/payment-status-chip';
import { TonPaymentButton } from '@/libs/payments/components/ton-payment-button';
import { PaymentStatus } from '@/libs/payments/types';

export default function OrderDetailsPage() {
  const t = useTranslations('orders');
  const tError = useTranslations('error');
  const tCommon = useTranslations('common');

  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();

  const { data: order, isLoading, error } = useOrderDetails(Number(orderId));

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-screen items-center justify-center">
          <Spinner label={t('loadingOrder')} />
        </div>
      </AppLayout>
    );
  }

  if (error || !order) return <ErrorPage error={new Error(tError('invalidOrder'))} />;
  if (!orderId || isNaN(Number(orderId)))
    return <ErrorPage error={new Error(tError('invalidOrderId'))} />;

  const isPendingPayment =
    order.status === OrderStatus.PENDING && order.payment?.status !== PaymentStatus.COMPLETED;

  return (
    <AppLayout>
      <PageHeader
        title={`${t('title')} #${order.id}`}
        subtitle={`${t('summary')}: ${formatDate(order.createdAt)}`}
      />

      <div className="mb-4 flex items-center justify-between">
        <OrderStatusChip status={order.status} />

        {order.payment && <PaymentStatusChip status={order.payment.status} />}
      </div>

      {isPendingPayment && (
        <Card>
          <CardBody>
            <Alert color="warning" description={t('pendingPayment')} />
          </CardBody>
          <CardFooter>
            <TonPaymentButton
              amountTon={order.totalAmount}
              sellerAddress={order.store.walletAddress}
            />
          </CardFooter>
        </Card>
      )}

      <Divider className="my-4" />

      {/* Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{t('items')}</h2>
        {order.items.map((item) => (
          <OrderItemPreviewCard orderItem={item} key={item.product.id} />
        ))}
      </div>

      <Divider className="my-4" />

      {/* Shipping Info */}
      {order.shipment && <OrderShipmentCard shipment={order.shipment} />}

      <Divider className="my-4" />

      {/* Order Summary */}
      <div className="mb-12">
        <h2 className="mb-2 text-lg font-semibold">{t('summary')}</h2>
        <div className="space-y-1 text-sm">
          <div className="flex gap-x-2">
            <span>{t('totalAmount')}: </span>
            <PriceComponent amount={order.totalAmount} />
          </div>
          <p>
            {t('deliveryDate')}: {formatDate(order.deliveryDate)}
          </p>
          <p className="text-sm">
            {t('estimatedDelivery')} {formatRelative(order.shipment?.deliveryEstimate ?? '-')}
          </p>
        </div>
      </div>

      <Button variant="bordered" fullWidth onPress={() => router.push('/orders')}>
        {t('backToOrders')}
      </Button>
    </AppLayout>
  );
}
