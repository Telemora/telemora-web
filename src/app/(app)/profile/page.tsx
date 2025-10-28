'use client';

import { Divider } from '@heroui/react';
import { OrderSummaries } from '@/libs/orders/components/OrderSummaries';
import ProfileCard from '@/libs/users/components/profile-card';
import { useTelegramLoginQuery } from '@/libs/users/hooks';

export default function ProfilePage() {
  const { data: user } = useTelegramLoginQuery();
  if (!user) return null;

  return (
    <>
      <main className="mx-auto space-y-10 py-6">
        <ProfileCard user={user} />
        <Divider />
        {user.orders && (
          <OrderSummaries
            orders={user.orders}
            title="Incoming Orders"
            subtitle="Prepare shipments which recieves to your stores"
          />
        )}
      </main>
    </>
  );
}
