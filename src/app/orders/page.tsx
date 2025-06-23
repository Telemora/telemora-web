'use client';

import { Button, Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBoxOpen } from 'react-icons/fa6';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/errorPage';
import { PageHeader } from '@/libs/common/components/page-header';
import OrderSummaryCard from '@/libs/orders/components/summary-card';
import { useMyOrders } from '@/libs/orders/hooks';
import { useTranslations } from 'next-intl';

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders, error, isLoading } = useMyOrders();
  const t = useTranslations('orders');

  const goToMarket = () => router.push('/market');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error || !orders) return <ErrorPage />;

  return (
    <AppLayout>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {orders?.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <FaBoxOpen className="mb-4 h-16 w-16" />
          <p className="mb-4">{t('none')}</p>
          <Button onPress={goToMarket}>{t('gotoMarket')}</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 pb-10">
          {orders.map((order) => (
            <OrderSummaryCard
              key={order.id}
              order={order}
              href={`/orders/${order.id}`}
              isLoading={false}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
