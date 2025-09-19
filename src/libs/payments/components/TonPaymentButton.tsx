'use client';

import { environment } from '@environments';
import { Button } from '@heroui/react';
import { toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import toast from 'react-hot-toast';

import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { useCreatePayment } from '@/libs/payments/hooks';
import { buildMarketplaceTransaction } from '@/libs/payments/utils';
import PriceComponent from '@/libs/common/components/PriceComponent';

interface TonPaymentButtonProps {
  /** Payment amount in TON */
  paymentAmount: number;
  /** Seller's wallet address */
  recipientWalletAddress: string;
  /** Every payment related to an order so, we need the Order ID */
  orderId: string;
}

export function TonPaymentButton({
  paymentAmount,
  recipientWalletAddress,
  orderId,
}: TonPaymentButtonProps) {
  /** Telegram API; needed for Haptic Feedback after the transaction */
  const { webApp } = useTelegramWebApp();
  /** TON Connect UI instance for wallet connections and transactions */
  const [tonConnectUI] = useTonConnectUI();
  /** Returns current TON wallet or null if not connected.
   * Provides access to the wallet's address, provider, and other details */
  const wallet = useTonWallet();
  /** Gets raw TON wallet address (isUserFriendly=false). Returns empty string if the wallet is not connected. */
  const userAddress = useTonAddress(false);
  /** Creates a payment record in the database by storing transaction details */
  const { mutateAsync: createPayment } = useCreatePayment();
  const smartContractAddress = environment.smartContractAddress;

  const handlePay = async () => {
    /** If the wallet is not connected, open the wallet selection modal */
    if (wallet === null) {
      toast.error('Please connect your wallet');
      await tonConnectUI.openModal();
      return;
    }

    try {
      const nanoAmount = toNano(paymentAmount);

      const transactionRequest = buildMarketplaceTransaction({
        amountTon: paymentAmount,
        sellerAddress: recipientWalletAddress,
        smartContractAddress,
        orderId,
      });
      /**
       * Sends a transaction request to the user's connected TON wallet and returns the signed BoC.
       * The BoC (Bag of Cells) is a serialized data structure containing the transaction details
       * and cryptographic signature required for submitting the transaction to the TON blockchain.
       * This signed BoC will be stored in our database as proof of the transaction.
       */
      const { boc } = await tonConnectUI.sendTransaction(transactionRequest);

      await createPayment({
        orderId,
        amount: nanoAmount.toString(),
        fromWalletAddress: userAddress,
        toWalletAddress: recipientWalletAddress,
        boc,
      });
      toast.success('Payment sent & saved!');
    } catch (error) {
      console.error('TON payment failed:', error);
      toast.error('Payment failed or cancelled');
    } finally {
      webApp?.HapticFeedback.impactOccurred('light');
    }
  };

  return (
    <Button color="primary" variant="shadow" fullWidth onPress={handlePay}>
      {wallet ? `Pay ${(<PriceComponent amount={paymentAmount} />)}` : 'Connect Wallet to Pay'}
    </Button>
  );
}
