import { ReviewPreview } from '@/libs/reviews/types';
import { StorePreview } from '@/libs/stores/types';

import { Media } from '../../common/types';

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service',
}

export interface ProductPreview {
  id: number | string;
  name: string;
  slug?: string;
  price: number;
  primaryImage: Media;
  storeId: number | string;
}

export interface ProductSummary extends ProductPreview {
  productType: ProductType;
  store: StorePreview;
}

export interface ProductDetail extends ProductSummary {
  description?: string;
  images: Media[];
  attributes?: ProductAttributeDto[];
  variants?: ProductVariantDto[];
  categoryId: number;
  categoryPath?: ProductCategoryPath;
  reviews?: ReviewPreview[];
  createdAt: Date;
}

export interface CreateProductDto {
  name: string;
  basePrice: number;
  description?: string;
  productType: ProductType;
  attributes?: ProductAttributeDto[];
  variants?: ProductVariantDto[];
}

export interface ProductAttributeDto {
  name: string;
  value: string;
}

export interface ProductVariantDto {
  variantName: string;
  variantValue: string;
  priceOverride?: number;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface ProductCategoryNode {
  id: number;
  name: string;
  slug: string;
  level: number;
  parentId?: number;
  children?: ProductCategoryNode[];
}

export type ProductCategoryTree = ProductCategoryNode[];
export type ProductCategoryFlat = Omit<ProductCategoryNode, 'children'>;
export type ProductCategoryMap = Record<number, ProductCategoryNode>;

export type ProductCategoryPath = {
  id: number;
  name: string;
  slug: string;
}[];

export interface ProductCategoryFilter {
  categoryId?: number;
  includeDescendants?: boolean;
}
