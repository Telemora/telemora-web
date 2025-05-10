'use client';

import React from 'react';

import AppLayout from '@/libs/common/components/AppLayout';
import SummaryOrdersSection from '@/libs/orders/components/summary-orders-section';
import PreviewStoresSection from '@/libs/stores/components/preview-stores-section';
import ProfileCard from '@/libs/users/components/profile-card';
import { useUserState } from '@/libs/users/context/userContext';

export default function ProfilePage() {
  const { data, isLoading } = useUserState();

  return (
    <AppLayout>
      <main className="mx-auto max-w-2xl space-y-10 px-4 py-6">
        <ProfileCard user={data} />
        {data.stores && <PreviewStoresSection stores={data.stores} title="My Stores" />}
        {data.orders && <SummaryOrdersSection orders={data.orders} title="Recent Orders" />}
      </main>
    </AppLayout>
  );
}
