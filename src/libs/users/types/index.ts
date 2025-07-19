import { Address } from '@/libs/location/types';
import { OrderSummary } from '@/libs/orders/types';
import { StorePreview } from '@/libs/stores/types';

import { Media } from '../../common/types';

export enum UserRole {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export interface UserPublicPreview {
  userId: number | string;
  username?: string;
  handle?: string;
  photo?: Media;
}

export interface UserSummary extends UserPublicPreview {
  firstName: string;
  lastName?: string;
  role: UserRole;
  addresses: Address[];
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
  stores?: StorePreview[];
  orders?: OrderSummary[];
  currencyInfo: CurrencyInfo;
}

export interface UpdateContactLocationDto {
  contactPhone: string;
  contactEmail: string;
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
