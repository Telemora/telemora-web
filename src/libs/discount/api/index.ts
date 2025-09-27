import httpClient from '@/libs/common/utils/httpClient';
import {
  CreateDiscountDto,
  DiscountDetailDto,
  DiscountPreviewDto,
  UpdateDiscountDto,
} from '@/libs/discount/type';
import { generateMockDiscountDetails, generateMockStoreDiscounts } from '@/libs/discount/mocks';

export async function createDiscount(
  storeId: string,
  dto: CreateDiscountDto,
): Promise<DiscountDetailDto> {
  return httpClient.post(`/stores/${storeId}/discounts`, dto);
}

export async function getStoreDiscounts(storeId: string): Promise<DiscountPreviewDto[]> {
  /* return httpClient.get<DiscountPreviewDto[]>(`/stores/${storeId}/discounts`); */
  return generateMockStoreDiscounts();
}

export async function getDiscountDetails(
  storeId: string,
  discountId: number,
): Promise<DiscountDetailDto> {
  /* return httpClient.get<DiscountDetailDto>(`/stores/${storeId}/discounts/${discountId}`); */
  return generateMockDiscountDetails();
}

export async function updateDiscount(
  storeId: string,
  discountId: number,
  dto: UpdateDiscountDto,
): Promise<DiscountDetailDto> {
  return httpClient.patch<DiscountDetailDto>(`/stores/${storeId}/discounts/${discountId}`, dto);
}

export async function deleteDiscount(storeId: string, discountId: number): Promise<void> {
  return httpClient.delete<void>(`/stores/${storeId}/discounts/${discountId}`);
}
