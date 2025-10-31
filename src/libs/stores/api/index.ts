import { AddressDto } from '@/libs/location/types';
import { generateMockStoreDetail } from '@/libs/stores/mocks';
import {
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  SetStoreServiceHoursDto,
  StoreDetail,
  StoreSummary,
  UpdateStoreDto,
} from '@/libs/stores/types';
import httpClient from '@/libs/common/utils/httpClient';

export async function fetchUserStores() {
  return httpClient.get<StoreSummary[]>('/stores');
}

export async function fetchStoreDetails(storeId: string) {
  return httpClient.get<StoreDetail>(`/stores/${storeId}`);
}

export async function fetchDiscoverableStores() {
  return httpClient.get<StoreSummary[]>('/stores/discover');
}

export async function fetchFeaturedStores() {
  return httpClient.get<StoreSummary[]>('/stores/featured');
}

export async function submitStoreBasicInfo(data: CreateStoreBasicDto) {
  return httpClient.post<StoreDetail>('/stores', data);
}

export async function submitStoreAddressUpdate(storeId: string, data: AddressDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}/address`, data);
}

export async function submitStoreTagsSelection(storeId: string, data: CreateStoreTagsDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}/tags`, data);
}

export async function submitStoreWorkingHours(storeId: string, data: SetStoreServiceHoursDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}/working-hours`, data);
}

export async function submitStoreLogoUpload(storeId: string, data: CreateStoreLogoDto) {
  const formData = new FormData();
  if (data.logoFile) {
    const fileBlob = new Blob([data.logoFile], { type: 'image/*' });
    formData.append('logo', fileBlob);
    return generateMockStoreDetail();
  } else throw new Error('No file provided');
}

export async function submitStoreUpdate(storeId: string, data: UpdateStoreDto) {
  return httpClient.patch<StoreDetail>(`/stores/${storeId}`, data);
}
