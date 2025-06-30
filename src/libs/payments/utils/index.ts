import { Address, beginCell, toNano } from '@ton/core';

import { BuildTxOpts } from '@/libs/payments/types';

export function buildMarketplaceTransaction({
  amountTon,
  sellerAddress,
  smartContractAddress,
  opcode = 0,
  orderId,
}: BuildTxOpts) {
  if (amountTon <= 0) {
    throw new Error('Amount must be greater than zero');
  }

  const amountNano = toNano(amountTon);

  let parsedSeller: Address;
  try {
    parsedSeller = Address.parse(sellerAddress);
  } catch {
    throw new Error('Invalid seller address');
  }

  const body = beginCell()
    .storeUint(opcode, 32)
    .storeUint(BigInt(orderId), 64)
    .storeCoins(amountNano)
    .storeAddress(parsedSeller)
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
