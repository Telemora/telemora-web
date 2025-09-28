'use client';

import { environment } from '@environments';
import { Button } from '@heroui/react';
import { toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import toast from 'react-hot-toast';

import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { useCreatePayment } from '@/libs/payments/hooks';
import { buildMarketplaceTransaction } from '@/libs/payments/utils';
import { PriceComponent } from '@/libs/common/components/PriceComponent';

interface TonPaymentButtonProps {
  /** Payment amount in TON */
  paymentAmount: number;
  /** The wallet address of the recipient (seller) who will receive the payment in TON. */
  recipientWalletAddress: string;
  /** Every payment related to an order so, we need the Order ID */
  orderId: string;
}

export function TonPaymentButton({
  paymentAmount,
  recipientWalletAddress,
  orderId,
}: TonPaymentButtonProps) {
  /* Telegram API; needed for Haptic Feedback after the transaction */
  const { webApp } = useTelegramWebApp();
  /* TON Connect UI instance for wallet connections and transactions */
  const [tonConnectUI] = useTonConnectUI();
  /* Returns current TON wallet or null if not connected.
     Provides access to the wallet's address, provider, and other details */
  const wallet = useTonWallet();
  /* Gets raw TON wallet address (isUserFriendly=false). Returns empty string if the wallet is not connected. */
  const userAddress = useTonAddress(false);
  /* Creates a payment record in the database by storing transaction details */
  const { mutateAsync: createPayment } = useCreatePayment();
  const smartContractAddress = environment.smartContractAddress;

  const handlePay = async () => {
    /* If the wallet is not connected, open the wallet selection modal */
    if (wallet === null) {
      toast.error(
        'Wallet not connected. Please connect your TON wallet to proceed with the payment.',
      );
      await tonConnectUI.openModal();
      return;
    }

    try {
      const nanoAmount = toNano(paymentAmount);

      /* Builds a transaction request for the marketplace smart contract */
      const transactionRequest = buildMarketplaceTransaction({
        nanoAmount,
        recipientWalletAddress,
        smartContractAddress,
        orderId,
      });

      /* Sends a transaction request to the wallet and returns the signed BoC (transaction data) */
      const { boc } = await tonConnectUI.sendTransaction(transactionRequest);

      await createPayment({
        orderId,
        amount: nanoAmount.toString(),
        fromWalletAddress: userAddress,
        toWalletAddress: recipientWalletAddress,
        boc,
      });
      toast.success('Payment successfully sent and recorded');
    } catch (error) {
      console.error('TON payment failed:', error);
      toast.error('Transaction was unsuccessful. Please check your wallet and try again.');
    } finally {
      webApp?.HapticFeedback.impactOccurred('light');
    }
  };

  return (
    <Button color="primary" variant="shadow" fullWidth onPress={handlePay}>
      {wallet ? (
        <>
          {`Pay `}
          <PriceComponent amount={paymentAmount} />
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
}
