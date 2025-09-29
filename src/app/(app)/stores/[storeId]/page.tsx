import { Button } from '@heroui/button';
import { PromotionsList } from '@/libs/discount/components/PromotionsList';
import { StoreHeader } from '@/libs/stores/components/StoreHeader';
import { ProductsSection } from '@/libs/stores/components/ProductsSection';
import { faker } from '@faker-js/faker';
import { FaTrashAlt } from 'react-icons/fa';
import { fetchStoreDetails } from '@/libs/stores/api';
import { getStoreDiscounts } from '@/libs/discount/api';
import { telegramLogin } from '@/libs/users/api';

export default async function StoreDetailsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;
  const user = await telegramLogin();
  const store = await fetchStoreDetails(storeId);
  const discounts = await getStoreDiscounts(storeId);
  const isOwner =
    user && store && faker.datatype.boolean(); /* && store.vendor.userId === user.userId */

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
