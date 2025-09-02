'use client';

import { Button, Spinner, Tab, Tabs } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/ErrorPage';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { OrderSummaryCard } from '@/libs/orders/components/OrderSummaryCard';
import { useMyOrders } from '@/libs/orders/hooks';
import { EmptyState } from '@/libs/common/components/EmptyState';

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders, error, isLoading } = useMyOrders();

  const handleGoToMarket = useCallback(() => router.push('/'), [router]);

  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      );
    }

    if (error) {
      return <ErrorPage />;
    }

    if (!orders || orders.length === 0) {
      return (
        <>
          <EmptyState text="You have no orders yet." />
          <Button color="primary" fullWidth onPress={handleGoToMarket}>
            Go to Marketplace
          </Button>
        </>
      );
    }

    return (
      <div className="flex flex-col gap-y-2 pb-10">
        {orders.map((order) => (
          <OrderSummaryCard key={order.id} order={order} />
        ))}
      </div>
    );
  }, [orders, error, isLoading, handleGoToMarket]);

  if (isLoading || error) {
    return <AppLayout>{renderContent}</AppLayout>;
  }

  return (
    <AppLayout>
      <Tabs fullWidth color="primary" radius="lg">
        <Tab key="sales" title="Sales">
          <PageHeader
            title="Order History"
            subtitle="View and manage your orders with detailed tracking information."
          />
          {renderContent}
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
