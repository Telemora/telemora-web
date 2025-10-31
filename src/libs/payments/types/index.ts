import { OrderSummary } from '@/libs/orders/types';
import { UserSummary } from '@/libs/users/types';

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum TokenSymbol {
  TON = 'TON',
  ETH = 'ETH',
  USDT = 'USDT',
}

export interface PaymentSummary {
  paymentId: string;
  status: PaymentStatus;
  amount: string;
  tokenSymbol: TokenSymbol;
  txHash?: string;
  createdAt: Date;
}

export interface PaymentDetail extends PaymentSummary {
  totalFees?: string;
  commission?: string;
  fromWalletAddress?: string;
  toWalletAddress?: string;
  order: OrderSummary;
  user: UserSummary;
}

export interface CreatePaymentDto {
  orderId: string;
  amount: string;
  fromWalletAddress?: string;
  toWalletAddress?: string;
  boc: string;
}

export interface BuildTxOpts {
  nanoAmount: bigint;
  recipientWalletAddress: string;
  smartContractAddress: string;
  opcode?: number;
  orderId: string;
}
