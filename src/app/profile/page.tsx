import { Divider } from '@heroui/react';
import AppLayout from '@/libs/common/components/AppLayout';
import { OrderSummaries } from '@/libs/orders/components/OrderSummaries';
import ProfileCard from '@/libs/users/components/profile-card';
import { telegramLogin } from '@/libs/users/api';

export default async function ProfilePage() {
  const user = await telegramLogin();
  return (
    <AppLayout>
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
    </AppLayout>
  );
}
