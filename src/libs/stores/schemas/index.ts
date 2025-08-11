import { z } from 'zod';

import {
  type CreateStoreBasicDto,
  type CreateStoreLogoDto,
  type CreateStoreTagsDto,
  type ServiceHoursDto,
  type SetStoreServiceHoursDto,
  type UpdateStoreDto,
  Weekday,
} from '@/libs/stores/types';

export const weekdaySchema = z.nativeEnum(Weekday);

export const serviceHoursDtoSchema = z.object({
  day: weekdaySchema,
  open: z.string(),
  close: z.string(),
  interval: z.number().int().positive(),
}) satisfies z.ZodType<ServiceHoursDto>;

export const createStoreBasicSchema = z.object({
  displayName: z.string().min(1),
  storeBio: z.string().min(1),
  supportPhone: z.string().min(1).optional(),
  supportEmail: z.string().email().optional(),
}) satisfies z.ZodType<CreateStoreBasicDto>;

export const createStoreTagsSchema = z.object({
  tags: z.array(z.string().min(1)).optional(),
}) satisfies z.ZodType<CreateStoreTagsDto>;

export const setStoreServiceHoursSchema = z.object({
  serviceHours: z.array(serviceHoursDtoSchema).optional(),
}) satisfies z.ZodType<SetStoreServiceHoursDto>;

export const createStoreLogoSchema = z.object({
  logoFile: z.any().optional(),
}) satisfies z.ZodType<CreateStoreLogoDto>;

export const updateStoreSchema = z.object({
  displayName: z.string().min(1).optional(),
  storeBio: z.string().min(1).optional(),
  supportPhone: z.string().min(1).optional(),
  supportEmail: z.string().email().optional(),
  categories: z.array(z.string().min(1)).optional(),
  logoUrl: z.string().url().optional(),
  serviceHours: z.array(serviceHoursDtoSchema).optional(),
}) satisfies z.ZodType<UpdateStoreDto>;
