'use client';

import { OrdersTypesTabs } from '@/libs/orders/components/OrdersTypesTabs';
import { useMyOrders } from '@/libs/orders/hooks';

export default function OrdersPage() {
  const { data: sales } = useMyOrders();

  if (!sales) return null;

  return <OrdersTypesTabs sales={sales} purchases={[]} />;
}
