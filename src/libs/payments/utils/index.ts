import { Address, beginCell } from '@ton/core';

import { BuildTxOpts } from '@/libs/payments/types';

export function buildMarketplaceTransaction({
  nanoAmount,
  recipientWalletAddress,
  smartContractAddress,
  opcode = 0,
  orderId,
}: BuildTxOpts) {
  if (nanoAmount <= 0) {
    throw new Error(`Payment amount must be greater than zero, received: ${nanoAmount}`);
  }

  let parsedSeller: Address;
  try {
    parsedSeller = Address.parse(recipientWalletAddress);
  } catch {
    throw new Error(`Invalid seller address: ${recipientWalletAddress}`);
  }

  const body = beginCell()
    .storeUint(opcode, 32)
    .storeUint(BigInt(orderId), 64)
    .storeCoins(nanoAmount)
    .storeAddress(parsedSeller)
    .endCell();

  return {
    validUntil: Math.floor(Date.now() / 1000) + 300,
    messages: [
      {
        address: smartContractAddress,
        amount: nanoAmount.toString(),
        payload: body.toBoc().toString('base64'),
      },
    ],
  };
}
