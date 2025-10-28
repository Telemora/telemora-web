'use client';

import { Button } from '@heroui/button';
import { PromotionsList } from '@/libs/discount/components/PromotionsList';
import { StoreHeader } from '@/libs/stores/components/StoreHeader';
import { ProductsSection } from '@/libs/stores/components/ProductsSection';
import { FaTrashAlt } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useTelegramLoginQuery } from '@/libs/users/hooks';
import { useStoreDetailsQuery } from '@/libs/stores/hooks';
import { useGetStoreDiscounts } from '@/libs/discount/hooks';

export default function StoreDetailsPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const { data: user } = useTelegramLoginQuery();
  const { data: store } = useStoreDetailsQuery(storeId);
  const { data: discounts } = useGetStoreDiscounts(storeId);

  if (!store) return null;
  if (!user) return null;
  const isOwner = user && store && store.vendor.userId === user.userId;

  return (
    <>
      {/* Store Header */}
      <StoreHeader store={store} isOwner={isOwner} />

      {/* Discounts Section */}
      {discounts && isOwner && <PromotionsList data={discounts} storeId={storeId} />}

      {/* Products Section */}
      <ProductsSection store={store} isOwner={isOwner} />

      {/* Danger Zone (Owner Only) */}
      {isOwner && (
        <div className="mt-4">
          <p className="text-danger my-1 text-sm">This action will permanently delete your store</p>
          <Button variant="bordered" color="danger" fullWidth startContent={<FaTrashAlt />}>
            Delete Store
          </Button>
        </div>
      )}
    </>
  );
}
