import { Card, CardBody, Chip } from '@heroui/react';
import Image from 'next/image';
import PriceComponent from '@/libs/common/components/PriceComponent';
import { OrderItemPreviewDto } from '@/libs/orders/types';
import Link from 'next/link';

export default function OrderItemPreviewCard({ orderItem }: { orderItem: OrderItemPreviewDto }) {
  return (
    <Link
      className="block"
      href={`/stores/${orderItem.product.storeId}/products/${orderItem.product.id}}`}
    >
      <Card>
        <CardBody className="flex flex-row justify-between text-sm">
          <div className="flex gap-x-4">
            <Image
              src={orderItem.product.primaryImage.url || '/fallback-order.png'}
              alt="product photo"
              width={64}
              height={64}
              className="aspect-square rounded object-cover"
              loading="lazy"
            />
            <div className="space-y-4">
              <h3
                className="block max-w-40 truncate font-semibold"
                aria-label={orderItem.product.name}
              >
                {orderItem.product.name}
              </h3>
              <PriceComponent amount={orderItem.totalPrice} />
            </div>
          </div>
          <Chip color="primary" size="md">
            x{orderItem.quantity}
          </Chip>
        </CardBody>
      </Card>
    </Link>
  );
}
