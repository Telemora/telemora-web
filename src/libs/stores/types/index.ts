import { AddressDto } from '@/libs/location/types';
import { ProductPreviewDto } from '@/libs/products/types';
import { UserSummary } from '@/libs/users/types';

import { MediaDto } from '../../common/types';

export enum StoreStatusEnum {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

export enum Weekday {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export enum SocialMediaPlatform {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  X = 'x',
  TIKTOK = 'tiktok',
  YOUTUBE = 'youtube',
  TELEGRAM = 'telegram',
  WEBSITE = 'website',
  OTHER = 'other',
}

export interface StorePreviewDto {
  id: string;
  displayName: string;
  slug?: string;
  logo?: MediaDto;
  vendorScore: number;
  status: StoreStatusEnum;
  paymentWalletAddress?: string;
}

export interface StoreSummary extends StorePreviewDto {
  categories?: string[];
  businessLocations: AddressDto[];
  storeBio?: string;
}

export interface StoreDetail extends StoreSummary {
  vendor: UserSummary;
  supportPhone?: string;
  supportEmail?: string;
  socialProfiles?: Record<string, string>;
  serviceHours?: Record<string, ServiceHoursDto>;
  products: ProductPreviewDto[];
  createdAt: Date;
}

export interface ServiceHoursDto {
  day: Weekday;
  open: string;
  close: string;
  interval: number;
}

export interface CreateStoreBasicDto {
  displayName: string;
  storeBio: string;
  supportPhone?: string;
  supportEmail?: string;
}

export interface CreateStoreTagsDto {
  tags?: string[];
}

export interface SetStoreServiceHoursDto {
  serviceHours?: ServiceHoursDto[];
}

export interface CreateStoreLogoDto {
  logoFile?: any;
}

export interface UpdateStoreDto {
  displayName?: string;
  storeBio?: string;
  supportPhone?: string;
  supportEmail?: string;
  categories?: string[];
  logoUrl?: string;
  serviceHours?: ServiceHoursDto[];
}
