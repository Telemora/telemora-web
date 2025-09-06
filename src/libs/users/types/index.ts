import { AddressDto } from '@/libs/location/types';
import { OrderSummary } from '@/libs/orders/types';
import { StorePreviewDto } from '@/libs/stores/types';

import { MediaDto } from '../../common/types';

export enum UserRole {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export interface UserPublicPreview {
  userId: string;
  username?: string;
  photo?: MediaDto;
}

export interface UserSummary extends UserPublicPreview {
  firstName: string;
  lastName?: string;
  role: UserRole;
}

export interface CurrencyInfo {
  tonToUsdRate: string;
  localCurrencyToUsdRate: string;
  localCurrencyCode: string;
}

export interface UserPrivateProfile extends UserSummary {
  telegramUserId: string;
  contactPhone?: string;
  contactEmail?: string;
  cryptoWalletAddress?: string;
  addresses: AddressDto[];
  stores?: StorePreviewDto[];
  orders?: OrderSummary[];
  currencyInfo: CurrencyInfo;
}

export interface UpdateContactLocationDto {
  contactPhone: string;
  contactEmail: string;
  addressId: number;
  countryId: number;
  stateId: number;
  cityId: number;
}

export interface UpdateLanguageDto {
  preferredLanguage: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
}

export interface UpdatePreferencesDto {
  languageCode: string;
  fiatCurrencyCode: string;
}
