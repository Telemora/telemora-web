import { z } from 'zod';
import {
  type CreateReviewDto,
  type CreateReviewReplyDto,
  type CreateReviewReportDto,
  ReportReason,
} from '@/libs/reviews/types';

export const reportReasonSchema = z.nativeEnum(ReportReason);

export const createReviewDtoSchema = z.object({
  rating: z.number().min(0),
  comment: z.string().optional(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
}) satisfies z.ZodType<CreateReviewDto>;

export const createReviewReplyDtoSchema = z.object({
  replyText: z.string().min(1),
}) satisfies z.ZodType<CreateReviewReplyDto>;

export const createReviewReportDtoSchema = z.object({
  reason: reportReasonSchema,
  comment: z.string().optional(),
}) satisfies z.ZodType<CreateReviewReportDto>;
