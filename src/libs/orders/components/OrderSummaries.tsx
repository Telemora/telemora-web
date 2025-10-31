import { Button } from '@heroui/button';
import { OrderSummaryCard } from '@/libs/orders/components/OrderSummaryCard';
import { OrderSummary } from '@/libs/orders/types';
import { PageHeader } from '@/libs/common/components/PageHeader';
import Link from 'next/link';

export function OrderSummaries({
  orders,
  title,
  subtitle,
}: {
  orders: OrderSummary[];
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="space-y-4">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="space-y-4">
        {orders.length === 0 ? (
          <Link href="/orders">
            <Button fullWidth color="primary">
              Create your first order
            </Button>
          </Link>
        ) : (
          orders.map((order) => <OrderSummaryCard key={order.orderId} order={order} />)
        )}
      </div>
    </section>
  );
}
