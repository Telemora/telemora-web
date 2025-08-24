import { z } from 'zod';
import {
  CreateDiscountDto,
  DiscountApplicability,
  DiscountApplicabilityEntityType,
  DiscountType,
  UpdateDiscountDto,
} from '@/libs/discount/type';

export const discountTypeSchema = z.nativeEnum(DiscountType) satisfies z.ZodType<DiscountType>;
export const discountApplicabilityEntityTypeSchema = z.nativeEnum(
  DiscountApplicabilityEntityType,
) satisfies z.ZodType<DiscountApplicabilityEntityType>;
export const discountApplicabilitySchema = z.object({
  entityId: z.string(),
  entityType: discountApplicabilityEntityTypeSchema,
}) satisfies z.ZodType<DiscountApplicability>;

export const createDiscountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().optional(),
  type: discountTypeSchema,
  value: z.number().positive('Value must be a positive number'),
  minValue: z.number().positive('Minimum value must be positive').optional(),
  usageLimit: z.number().int().positive('Usage limit must be a positive integer').optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  appliesTo: z.array(discountApplicabilitySchema).optional(),
  isActive: z.boolean().default(true).optional(),
}) satisfies z.ZodType<CreateDiscountDto>;

export const updateDiscountSchema = createDiscountSchema.partial().extend({
  id: z.number(),
}) satisfies z.ZodType<UpdateDiscountDto>;
