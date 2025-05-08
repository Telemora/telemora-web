import React from 'react';

import OrderSummaryCard from '@/libs/orders/components/summary-card';
import { OrderSummary } from '@/libs/orders/types';

export default function SummaryOrdersSection({ orders, title }: { orders: OrderSummary[], title: string }) {
  if (orders.length === 0) {
    return (
      <section>
        <h1>{title}</h1>
        <div>
          <p>Create your first order</p>
        </div>
      </section>
    );
  }
  return (
    <section>
      <h1>{title}</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderSummaryCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
