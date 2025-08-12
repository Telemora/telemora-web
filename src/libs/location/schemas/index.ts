import { z } from 'zod';
import {
  AddressDto,
  AddressType,
  CanonicalLocationDto,
  CanonicalLocationType,
  GeoPoint,
} from '@/libs/location/types';

export const geoPointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
}) satisfies z.ZodType<GeoPoint>;

export const canonicalLocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.nativeEnum(CanonicalLocationType),
  parentId: z.number().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
}) satisfies z.ZodType<CanonicalLocationDto>;

export const createAddressSchema = z.object({
  id: z.number(),
  label: z.string().optional(),
  country: canonicalLocationSchema,
  state: canonicalLocationSchema.optional(),
  city: canonicalLocationSchema.optional(),
  streetLine1: z.string(),
  streetLine2: z.string().optional(),
  postalCode: z.string().optional(),
  geoPoint: geoPointSchema,
  type: z.nativeEnum(AddressType),
  isDefault: z.boolean().optional(),
}) satisfies z.ZodType<AddressDto>;
