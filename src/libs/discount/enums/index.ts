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
