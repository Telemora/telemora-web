'use client';

import React from 'react';
import { TonCurrencyIcon } from '@/libs/common/components/TonCurrencyIcon';
import { UserCurrencyInfo } from '@/libs/common/components/UserCurrencyInfo';

export function PriceComponent({ amount }: { amount: number }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span>{amount}</span>
        <TonCurrencyIcon />
      </div>
      <UserCurrencyInfo />
    </div>
  );
}
