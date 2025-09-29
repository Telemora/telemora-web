export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_SHIPPING = 'free_shipping',
}

export enum DiscountStatus {
  ACTIVE = 'active',
  SCHEDULED = 'scheduled',
  EXPIRED = 'expired',
  DRAFT = 'draft',
}

export enum DiscountApplicabilityEntityType {
  PRODUCT = 'product',
  CATEGORY = 'category',
}

/**
 * Interface for a quick, at-a-glance view of a promotion.
 * Used for the seller's dashboard list.
 */
export interface DiscountPreviewDto {
  id: string;
  name: string;
  code?: string;
  status: DiscountStatus;
  type: DiscountType;
  value: number;
  totalUsage?: number;
}

/**
 * Interface for the detailed view of a single promotion.
 * Includes all rules, metrics, and applicability.
 */
export interface DiscountDetailDto extends DiscountPreviewDto {
  minValue?: number;
  usageLimit?: number;
  startDate: Date;
  endDate: Date;
  appliesTo: DiscountApplicability[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for the detailed view of a single promotion.
 * Used in the step-by-step promotion creation wizard.
 */
export interface CreateDiscountDto {
  name: string;
  code?: string;
  type: DiscountType;
  value: number;
  minValue?: number;
  usageLimit?: number;
  startDate: Date;
  endDate: Date;
  appliesTo?: DiscountApplicability[];
  isActive?: boolean;
}

/**
 * Interface for updating an existing discount.
 * This is a partial type of ICreateDiscount.
 */
export interface UpdateDiscountDto extends Partial<CreateDiscountDto> {
  id: string;
}

/**
 * Interface for a discount applicability rule.
 */
export interface DiscountApplicability {
  entityId: string;
  entityType: DiscountApplicabilityEntityType;
}
