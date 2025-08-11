import { z } from 'zod';
import { mediaDtoSchema } from '@/libs/common/schemas';
import { UserRole } from '@/libs/users/types';

export const userRoleSchema = z.nativeEnum(UserRole);

export const userPublicPreviewSchema = z.object({
  userId: z.union([z.number(), z.string().min(1)]),
  username: z.string().min(1).optional(),
  photo: mediaDtoSchema.optional(),
});

export const userSummarySchema = userPublicPreviewSchema.extend({
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional(),
  role: userRoleSchema,
});

export const currencyInfoSchema = z.object({
  tonToUsdRate: z.string(),
  localCurrencyToUsdRate: z.string(),
  localCurrencyCode: z.string(),
});

export const updateContactLocationSchema = z.object({
  contactPhone: z.string().min(1),
  contactEmail: z.string().email(),
  addressId: z.number().int().positive(),
  countryId: z.number().int().positive(),
  stateId: z.number().int().positive(),
  cityId: z.number().int().positive(),
});

export const updateLanguageSchema = z.object({
  preferredLanguage: z.string().min(1),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

export const updatePreferencesSchema = z.object({
  languageCode: z.string().min(1),
  fiatCurrencyCode: z.string().min(1),
});
