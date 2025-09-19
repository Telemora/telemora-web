import { z } from 'zod';
import {
  type BuildTxOpts,
  type CreatePaymentDto,
  PaymentStatus,
  type UpdatePaymentDto,
} from '@/libs/payments/types';

export const paymentStatusSchema = z.nativeEnum(PaymentStatus);

export const createPaymentDtoSchema = z.object({
  orderId: z.string(),
  amount: z.string(),
  fromWalletAddress: z.string().optional(),
  toWalletAddress: z.string().optional(),
  boc: z.string(),
}) satisfies z.ZodType<CreatePaymentDto>;

export const updatePaymentDtoSchema = z.object({
  status: paymentStatusSchema.optional(),
  transactionHash: z.string().optional(),
  gasFee: z.string().optional(),
  commission: z.string().optional(),
}) satisfies z.ZodType<UpdatePaymentDto>;

export const buildTxOptsSchema = z.object({
  nanoAmount: z.bigint().nonnegative(),
  recipientWalletAddress: z.string(),
  smartContractAddress: z.string(),
  opcode: z.number().int().optional(),
  orderId: z.string(),
}) satisfies z.ZodType<BuildTxOpts>;
