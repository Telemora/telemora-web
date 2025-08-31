import { Button } from '@heroui/react';
import React from 'react';

import { OrderSummaryCard } from '@/libs/orders/components/OrderSummaryCard';
import { OrderSummary } from '@/libs/orders/types';
import { PageHeader } from '@/libs/common/components/PageHeader';

export function OrderSummaries({ orders, title }: { orders: OrderSummary[]; title: string }) {
  return (
    <section className="space-y-4">
      <PageHeader title={title} />
      <div className="space-y-4">
        {orders.length === 0 ? (
          <Button as={'link'} href="/orders">
            Create your first order
          </Button>
        ) : (
          orders.map((order) => <OrderSummaryCard key={order.id} order={order} />)
        )}
      </div>
    </section>
  );
}
