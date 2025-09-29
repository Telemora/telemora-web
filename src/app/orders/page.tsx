import { OrdersTypesTabs } from '@/libs/orders/components/OrdersTypesTabs';
import { getMyOrders } from '@/libs/orders/api';

export default async function OrdersPage() {
  const sales = await getMyOrders();

  return <OrdersTypesTabs sales={sales} purchases={[]} />;
}
