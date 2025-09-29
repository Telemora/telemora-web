'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { OrderSummary } from '@/libs/orders/types';
import { OrderSummaries } from '@/libs/orders/components/OrderSummaries';

export function OrdersTypesTabs({
  sales,
  purchases,
}: {
  sales: OrderSummary[];
  purchases: OrderSummary[];
}) {
  return (
    <Tabs fullWidth color="primary" radius="lg">
      <Tab key="sales" title="Sales">
        <OrderSummaries
          orders={sales}
          title="Order History"
          subtitle="View and manage your orders with detailed tracking information."
        />
      </Tab>
      <Tab key="purchases" title="Purchases">
        <OrderSummaries
          orders={purchases}
          title="Incoming Orders"
          subtitle="Prepare shipments which recieves to your stores"
        />
      </Tab>
    </Tabs>
  );
}
