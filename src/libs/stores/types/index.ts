import { Address } from '@/libs/location/types';
import { ProductPreview } from '@/libs/products/types';
import { UserSummary } from '@/libs/users/types';

import { Media } from '../../common/types';

export enum StoreStatusEnum {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

export interface StorePreview {
  id: number | string;
  displayName: string;
  slug?: string;
  logo?: Media;
  vendorScore: number;
  status: StoreStatusEnum;
}

export interface StoreSummary extends StorePreview {
  categories?: string[];
  businessLocations: Address[];
  storeBio?: string;
}

export interface StoreDetail extends StoreSummary {
  vendor: UserSummary;
  supportPhone?: string;
  supportEmail?: string;
  socialProfiles?: Record<string, string>;
  serviceHours?: Record<string, DailyWorkingHours>;
  products: ProductPreview[];
  createdAt: Date;
}

export interface DailyWorkingHours {
  open: string;
  close: string;
}
