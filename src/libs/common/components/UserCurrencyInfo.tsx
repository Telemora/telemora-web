import Decimal from 'decimal.js';
import { useTelegramLoginQuery } from '@/libs/users/hooks';
import { Skeleton } from '@heroui/react';

export function UserCurrencyInfo() {
  const { data, isLoading } = useTelegramLoginQuery();

  if (isLoading) {
    return (
      <div className="space-x-2">
        <Skeleton className="h-3 w-3/5" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    );
  }

  if (!data?.currencyInfo) {
    return null;
  }

  const tonPriceInLocalCurrency = new Decimal(data.currencyInfo.tonToUsdRate || 0)
    .dividedBy(new Decimal(data.currencyInfo.localCurrencyToUsdRate || 0))
    .toFixed(2);

  return (
    <div className="space-x-2 text-xs">
      <span>{tonPriceInLocalCurrency}</span>
      <span>{data.currencyInfo.localCurrencyCode}</span>
    </div>
  );
}
