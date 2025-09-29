import { z } from 'zod';

import {
  type CreateProductAttributeValueInputDto,
  type CreateProductDto,
  type CreateProductVariantInputDto,
  ProductType,
  ProductVisibility,
  type UpdateProductDto,
} from '@/libs/products/types';

export const productTypeSchema = z.nativeEnum(ProductType);
export const productVisibilitySchema = z.nativeEnum(ProductVisibility);

export const createProductAttributeValueInputSchema = z.object({
  attributeId: z.string(),
  value: z.string(),
}) satisfies z.ZodType<CreateProductAttributeValueInputDto>;

export const createProductVariantInputSchema = z.object({
  sku: z.string().optional(),
  priceOverride: z.number().nonnegative().optional(),
  initialQuantity: z.number().int().nonnegative(),
  attributeValueIds: z.array(z.string()),
  attributes: z.array(createProductAttributeValueInputSchema),
}) satisfies z.ZodType<CreateProductVariantInputDto>;

export const createProductDtoSchema = z.object({
  name: z.string(),
  basePrice: z.number().nonnegative(),
  currency: z.string().min(1),
  description: z.string().optional(),
  productType: productTypeSchema,
  attributes: z.array(createProductAttributeValueInputSchema).optional(),
  variants: z.array(createProductVariantInputSchema).optional(),
  visibility: productVisibilitySchema.optional(),
  quantityAvailable: z.number().int().nonnegative().optional(),
}) satisfies z.ZodType<CreateProductDto>;

export const updateProductDtoSchema =
  createProductDtoSchema.partial() satisfies z.ZodType<UpdateProductDto>;
