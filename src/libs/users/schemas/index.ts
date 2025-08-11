import { z } from 'zod';

import {
  CurrencyInfo,
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
} from '@/libs/users/types';

export const currencyInfoSchema = z.object({
  tonToUsdRate: z.string(),
  localCurrencyToUsdRate: z.string(),
  localCurrencyCode: z.string(),
}) satisfies z.ZodType<CurrencyInfo>;

export const updateContactLocationSchema = z.object({
  contactPhone: z.string().min(1),
  contactEmail: z.string().email(),
  addressId: z.number().int().positive(),
  countryId: z.number().int().positive(),
  stateId: z.number().int().positive(),
  cityId: z.number().int().positive(),
}) satisfies z.ZodType<UpdateContactLocationDto>;

export const updateLanguageSchema = z.object({
  preferredLanguage: z.string().min(1),
}) satisfies z.ZodType<UpdateLanguageDto>;

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
}) satisfies z.ZodType<UpdateProfileDto>;

export const updatePreferencesSchema = z.object({
  languageCode: z.string().min(1),
  fiatCurrencyCode: z.string().min(1),
}) satisfies z.ZodType<UpdatePreferencesDto>;
