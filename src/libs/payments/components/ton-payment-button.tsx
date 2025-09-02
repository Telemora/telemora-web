'use client';

import { environment } from '@environments';
import { Button } from '@heroui/react';
import { toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import toast from 'react-hot-toast';

import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { useCreatePayment } from '@/libs/payments/hooks';
import { buildMarketplaceTransaction } from '@/libs/payments/utils';

interface TonPaymentButtonProps {
  amountTon: number;
  sellerAddress: string;
  orderId?: string;
}

export function TonPaymentButton({
  amountTon,
  sellerAddress,
  orderId = '0',
}: TonPaymentButtonProps) {
  const { webApp } = useTelegramWebApp();
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
      await tonConnectUI.sendTransaction(transactionRequest);

      await createPayment({
        orderId,
        amount: nanoAmount.toString(),
        fromWalletAddress: userAddress,
        toWalletAddress: sellerAddress,
      });
      toast.success('Payment sent & saved!');
      webApp?.HapticFeedback.impactOccurred('light');
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
