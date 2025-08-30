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
  id: string;
  status: PaymentStatus;
  amount: string;
  tokenSymbol: TokenSymbol;
  transactionHash: string;
  createdAt: Date;
}

export interface PaymentDetail extends PaymentSummary {
  gasFee?: string;
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
}

export class UpdatePaymentDto {
  status?: PaymentStatus;
  transactionHash?: string;
  gasFee?: string;
  commission?: string;
}

export interface BuildTxOpts {
  amountTon: number;
  sellerAddress: string;
  smartContractAddress: string;
  opcode?: number;
  orderId: string;
}
