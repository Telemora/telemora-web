import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import Image from 'next/image';
import { PriceComponent } from '@/libs/common/components/PriceComponent';
import { OrderItemPreviewDto } from '@/libs/orders/types';
import Link from 'next/link';

export function OrderItemPreviewCard({ orderItem }: { orderItem: OrderItemPreviewDto }) {
  return (
    <Link
      className="block"
      href={`/stores/${orderItem.product.storeId}/products/${orderItem.product.id}}`}
    >
      <Card>
        <CardBody className="flex flex-row justify-between text-sm">
          <div className="flex gap-x-4">
            <div className="relative h-16 w-16">
              <Image
                src={orderItem.product.primaryImage.url || '/fallback-order.png'}
                alt="product photo"
                fill
                sizes="4rem"
                className="rounded object-cover"
                loading="lazy"
              />
            </div>
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
