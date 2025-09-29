import { MediaDto } from '@/libs/common/types';
import { ReviewPreviewDto } from '@/libs/reviews/types';
import { StorePreviewDto } from '@/libs/stores/types';

export enum InventoryEventType {
  INITIAL = 'initial',
  MANUAL_ADJUSTMENT = 'manual',
  SALE = 'sale',
  RETURN = 'return',
  RESTOCK = 'restock',
  CANCELLED = 'cancelled',
}

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service',
}

export enum ProductVisibility {
  PUBLISHED = 'published',
  HIDDEN = 'hidden',
  DRAFT = 'draft',
}

export enum ProductStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface ProductImageDto extends MediaDto {
  isPrimary: boolean;
  sortOrder: number;
}

export interface AttributeDto {
  id: string;
  name: string;
}

export interface ProductAttributeValueDto {
  id: string;
  name: string;
  value: string;
}

export interface VariantAttributeValueDto {
  id: string;
  name: string;
  value: string;
}

export interface ProductVariantDto {
  id: string;
  sku?: string;
  priceOverride?: number;
  quantityAvailable: number;
  isActive: boolean;
  images?: ProductImageDto[];
  attributes: VariantAttributeValueDto[];
}

export interface ProductPreviewDto {
  id: string;
  name: string;
  slug?: string;
  primaryImage: ProductImageDto;
  price: number;
  currency: string;
  storeId: string;
  storeName: string;
  averageRating?: number;
  numberOfReviews?: number;
}

export interface ProductSummaryDto extends ProductPreviewDto {
  productType: ProductType;
  store: StorePreviewDto;
}

export interface ProductDetailDto extends ProductSummaryDto {
  description?: string;
  images: ProductImageDto[];
  attributes?: ProductAttributeValueDto[];
  variants?: ProductVariantDto[];
  reviews?: ReviewPreviewDto[];
  visibility: ProductVisibility;
  status: ProductStatus;
  totalQuantityAvailable?: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductAttributeValueInputDto {
  attributeId: string;
  value: string;
}

export interface CreateProductVariantInputDto {
  sku?: string;
  priceOverride?: number;
  initialQuantity: number;
  attributeValueIds: string[];
  attributes: CreateProductAttributeValueInputDto[];
}

export interface CreateProductDto {
  name: string;
  basePrice: number;
  currency: string;
  description?: string;
  productType: ProductType;
  attributes?: CreateProductAttributeValueInputDto[];
  variants?: CreateProductVariantInputDto[];
  visibility?: ProductVisibility;
  quantityAvailable?: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
