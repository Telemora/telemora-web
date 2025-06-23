'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import AppLayout from '@/libs/common/components/AppLayout';
import SummaryOrdersSection from '@/libs/orders/components/summary-orders-section';
import PreviewStoresSection from '@/libs/stores/components/preview-stores-section';
import ProfileCard from '@/libs/users/components/profile-card';
import { useUserState } from '@/libs/users/context/userContext';

export default function ProfilePage() {
  const tTabs = useTranslations('tabs');
  const tProfile = useTranslations('profile');

  const { data, isLoading } = useUserState();

  return (
    <AppLayout>
      <main className="mx-auto max-w-2xl space-y-10 px-4 py-6">
        <ProfileCard user={data} />
        {data.stores && <PreviewStoresSection stores={data.stores} title={tTabs('stores')} />}
        {data.orders && (
          <SummaryOrdersSection orders={data.orders} title={tProfile('recentOrders')} />
        )}
      </main>
    </AppLayout>
  );
}
