'use client';

import { environment } from '@environments';
import { Button } from '@heroui/react';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import { Cell, toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import toast from 'react-hot-toast';

import { useCreatePayment } from '@/libs/payments/hooks';
import { buildMarketplaceTransaction } from '@/libs/payments/utils';

interface TonPaymentButtonProps {
  amountTon: number;
  sellerAddress: string;
  orderId?: string;
}

export function TonPaymentButton({ amountTon, sellerAddress, orderId }: TonPaymentButtonProps) {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const userAddress = useTonAddress(false);
  const { mutateAsync: createPayment } = useCreatePayment();
  const smartContractAddress = environment.smartContractAddress;

  const handlePay = async () => {
    if (!wallet) {
      toast.error('Please connect your wallet');
      await tonConnectUI.openModal();
      return;
    }

    try {
      const nanoAmount = toNano(amountTon);

      const transactionRequest = buildMarketplaceTransaction({
        amountTon,
        sellerAddress,
        smartContractAddress,
        orderId,
      });
      const { boc } = await tonConnectUI.sendTransaction(transactionRequest);

      const hash = Cell.fromBoc(Buffer.from(boc, 'base64'))[0].hash().toString('hex');

      await createPayment({
        orderId,
        amount: nanoAmount.toString(),
        fromWalletAddress: userAddress,
        toWalletAddress: sellerAddress,
        transactionHash: hash,
      });
      toast.success('Payment sent & saved!');
      hapticFeedback.impactOccurred('light');
    } catch (error) {
      console.error('TON payment failed:', error);
      toast.error('Payment failed or cancelled');
    }
  };

  return (
    <Button color="primary" fullWidth onPress={handlePay}>
      {wallet ? `Pay ${amountTon} TON` : 'Connect Wallet to Pay'}
    </Button>
  );
}
