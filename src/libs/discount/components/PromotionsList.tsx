import { DiscountPreviewDto } from '@/libs/discount/type';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { DiscountPreview } from '@/libs/discount/components/DiscountPreview';
import { Button, Divider } from '@heroui/react';
import { FaPlus } from 'react-icons/fa6';

export function PromotionsList({
  data,
  storeId,
}: {
  data: DiscountPreviewDto[];
  storeId: number | string;
}) {
  return (
    <section>
      <PageHeader
        title="Promotions"
        subtitle="Manage your promotions, you can run at most four promotion for each store"
      />
      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => (
          <DiscountPreview key={item.id} data={item} storeId={storeId} />
        ))}
      </div>
      <Button
        color="primary"
        fullWidth
        className="my-4"
        startContent={<FaPlus />}
        isDisabled={data.length >= 4}
      >
        Create New promotion
      </Button>
      <Divider />
    </section>
  );
}
