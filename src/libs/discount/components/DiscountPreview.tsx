import { DiscountPreviewDto, DiscountStatus } from '@/libs/discount/type';
import { Badge, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { FaCheck, FaChevronRight, FaClock, FaFolderOpen, FaInfo } from 'react-icons/fa';
import Link from 'next/link';

export function DiscountPreview({
  data,
  storeId,
}: {
  data: DiscountPreviewDto;
  storeId: number | string;
}) {
  return (
    <Badge
      isOneChar
      size="lg"
      content={DiscountStatusToIcon(data.status)}
      color={DiscountStatusToColor(data.status)}
    >
      <Link className="w-full" href={`/stores/${storeId}/discounts/${data.id}`}>
        <Card>
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <h4 className="text-sm">{data.name}</h4>
              <FaChevronRight size={12} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex items-center gap-x-1">
              <span className="text-sm font-semibold">{data.value.toFixed(2)}</span>
              <span className="text-default-600 font-mono text-xs">
                ({data.type.replace('_', ' ')})
              </span>
            </div>
          </CardBody>
        </Card>
      </Link>
    </Badge>
  );
}

type StatusColors = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

function DiscountStatusToIcon(status: DiscountStatus) {
  switch (status) {
    case DiscountStatus.ACTIVE:
      return <FaCheck />;
    case DiscountStatus.DRAFT:
      return <FaFolderOpen />;
    case DiscountStatus.EXPIRED:
      return <FaInfo />;
    case DiscountStatus.SCHEDULED:
      return <FaClock />;
  }
}

function DiscountStatusToColor(status: DiscountStatus): StatusColors {
  switch (status) {
    case DiscountStatus.ACTIVE:
      return 'success';
    case DiscountStatus.DRAFT:
      return 'warning';
    case DiscountStatus.EXPIRED:
      return 'danger';
    case DiscountStatus.SCHEDULED:
      return 'secondary';
  }
}
