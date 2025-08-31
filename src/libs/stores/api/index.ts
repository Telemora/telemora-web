import { AddressDto } from '@/libs/location/types';
import {
  generateMockStoreDetail,
  generateMockStorePreviews,
  generateMockStoreSummaries,
} from '@/libs/stores/mocks';
import {
  CreateStoreBasicDto,
  CreateStoreLogoDto,
  CreateStoreTagsDto,
  SetStoreServiceHoursDto,
  UpdateStoreDto,
} from '@/libs/stores/types';

export async function fetchUserStores() {
  /* httpClient.get<StoreSummary[]>('/stores') */
  return generateMockStoreSummaries();
}

export async function fetchStoreDetails(storeId: string) {
  /* httpClient.get<StoreDetail>(`/stores/${storeId}`) */
  return generateMockStoreDetail();
}

export async function fetchDiscoverableStores() {
  /* httpClient.get<StoreSummary[]>('/stores/discover') */
  return generateMockStorePreviews();
}

export async function fetchFeaturedStores() {
  /* httpClient.get<StoreSummary[]>('/stores/featured') */
  return generateMockStorePreviews();
}

export async function submitStoreBasicInfo(data: CreateStoreBasicDto) {
  /* httpClient.post<StoreDetail>('/stores/create/basic', data) */
  return generateMockStoreDetail();
}

export async function submitStoreAddressUpdate(storeId: string, data: AddressDto) {
  /* httpClient.patch<StoreDetail>(`/stores/${storeId}/address`, data) */
  return generateMockStoreDetail();
}

export async function submitStoreTagsSelection(storeId: string, data: CreateStoreTagsDto) {
  /*  */
  return generateMockStoreDetail();
}

export async function submitStoreWorkingHours(storeId: string, data: SetStoreServiceHoursDto) {
  return generateMockStoreDetail();
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
  return generateMockStoreDetail();
}
