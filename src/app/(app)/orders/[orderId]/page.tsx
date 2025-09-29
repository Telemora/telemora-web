import { Alert, Card, CardBody, CardFooter, Divider } from '@heroui/react';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { formatSafeDate } from '@/libs/common/utils/date';
import { OrderItemPreviewCard } from '@/libs/orders/components/OrderItemPreview';
import { OrderShipmentCard } from '@/libs/orders/components/OrderShipmentCard';
import { OrderStatusChip } from '@/libs/orders/components/OrderStatusChip';
import { OrderStatus } from '@/libs/orders/types';
import { PaymentStatusChip } from '@/libs/payments/components/PaymentStatusChip';
import { PaymentStatus } from '@/libs/payments/types';
import { OrderInfoSummary } from '@/libs/orders/components/OrderInfoSummary';
import { TonPaymentButton } from '@/libs/payments/components/TonPaymentButton';
import { getOrderDetails } from '@/libs/orders/api';

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrderDetails(orderId);

  const isPendingPayment =
    order.status === OrderStatus.PENDING && order.payment?.status !== PaymentStatus.COMPLETED;

  return (
    <>
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
            <TonPaymentButton
              paymentAmount={order.totalAmount}
              recipientWalletAddress={order.store.paymentWalletAddress}
              orderId={orderId}
            />
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
    </>
  );
}
