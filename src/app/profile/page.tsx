'use client';

import { Divider, Spinner } from '@heroui/react';
import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import { OrderSummaries } from '@/libs/orders/components/OrderSummaries';
import ProfileCard from '@/libs/users/components/profile-card';
import { useUserState } from '@/libs/users/context/userContext';

export default function ProfilePage() {
  const { data, isLoading } = useUserState();

  if (isLoading || !data) {
    return (
      <AppLayout>
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="mx-auto space-y-10 py-6">
        <ProfileCard user={data} />
        <Divider />
        {data.orders && (
          <OrderSummaries
            orders={data.orders}
            title="Incoming Orders"
            subtitle="Prepare shipments which recieves to your stores"
          />
        )}
      </main>
    </AppLayout>
  );
}
