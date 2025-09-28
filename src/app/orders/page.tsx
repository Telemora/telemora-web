import { Button, Tab, Tabs } from '@heroui/react';
import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { OrderSummaryCard } from '@/libs/orders/components/OrderSummaryCard';
import { EmptyState } from '@/libs/common/components/EmptyState';
import { getMyOrders } from '@/libs/orders/api';
import Link from 'next/link';

export default async function OrdersPage() {
  const orders = await getMyOrders();

  return (
    <AppLayout>
      <Tabs fullWidth color="primary" radius="lg">
        <Tab key="sales" title="Sales">
          <PageHeader
            title="Order History"
            subtitle="View and manage your orders with detailed tracking information."
          />
          {!orders || orders.length === 0 ? (
            <>
              <EmptyState text="You have no orders yet." />
              <Link href="/">
                <Button color="primary" fullWidth>
                  Go to Marketplace
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-y-2 pb-10">
              {orders.map((order) => (
                <OrderSummaryCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </Tab>
        <Tab key="purchases" title="Purchases">
          <PageHeader
            title="Incoming Orders"
            subtitle="Prepare shipments which recieves to your stores"
          />
        </Tab>
      </Tabs>
    </AppLayout>
  );
}
