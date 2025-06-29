import { Address, beginCell, toNano } from '@ton/core';

import { BuildTxOpts } from '@/libs/payments/types';

export function buildMarketplaceTransaction({
  amountTon,
  sellerAddress,
  smartContractAddress,
  orderId = '0',
}: BuildTxOpts) {
  const amountNano = toNano(amountTon);
  const orderIdBigInt = BigInt(orderId);

  const body = beginCell()
    .storeUint(orderIdBigInt, 64)
    .storeCoins(amountNano)
    .storeAddress(Address.parse(sellerAddress))
    .endCell();

  return {
    validUntil: Math.floor(Date.now() / 1000) + 300,
    messages: [
      {
        address: smartContractAddress,
        amount: amountNano.toString(),
        payload: body.toBoc().toString('base64'),
      },
    ],
  };
}
