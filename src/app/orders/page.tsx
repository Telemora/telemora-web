'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { OrderSummaryCard } from '@/libs/orders/components/OrderSummaryCard';
import { EmptyState } from '@/libs/common/components/EmptyState';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { useMyOrders } from '@/libs/orders/hooks';

export default function OrdersPage() {
  const { data: orders } = useMyOrders();

  if (!orders || orders.length === 0) {
    return (
      <>
        <EmptyState text="You have no orders yet." />
        <Link href="/">
          <Button color="primary" fullWidth>
            Go to Marketplace
          </Button>
        </Link>
      </>
    );
  }

  return (
    <div>
      <Tabs fullWidth color="primary" radius="lg">
        <Tab key="sales" title="Sales">
          <PageHeader
            title="Order History"
            subtitle="View and manage your orders with detailed tracking information."
          />
          <div className="flex flex-col gap-y-2 pb-10">
            {orders.map((order) => (
              <OrderSummaryCard key={order.id} order={order} />
            ))}
          </div>
        </Tab>
        <Tab key="purchases" title="Purchases">
          <PageHeader
            title="Incoming Orders"
            subtitle="Prepare shipments which recieves to your stores"
          />
        </Tab>
      </Tabs>
    </div>
  );
}
