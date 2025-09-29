import {
  generateMockProductDetail,
  generateMockProductPhotos,
  generateMockProductPreviews,
} from '@/libs/products/mocks';
import { CreateProductDto, UpdateProductDto } from '@/libs/products/types';

export async function getStoreProducts(storeId: string) {
  /* httpClient.get<ProductPreviewDto[]>(`/stores/${storeId}`); */
  return generateMockProductPreviews();
}

export async function getProductDetails(storeId: string, productId: string) {
  /* httpClient.get<ProductDetailDto>(`/stores/${storeId}/products/${productId}`); */
  return generateMockProductDetail();
}

export async function uploadProductPhotos(data: File[]) {
  /* httpClient.post<ProductImageDto[]>(`/stores/products/photo`); */
  const formData = new FormData();
  data.forEach((file) => {
    formData.append('photos', file);
  });

  return generateMockProductPhotos();
}

export async function createProduct(storeId: string, data: CreateProductDto) {
  /* httpClient.post<ProductDetailDto>(`/stores/${storeId}`, data); */
  return generateMockProductDetail();
}

export async function updateProduct(storeId: string, productId: string, data: UpdateProductDto) {
  /* httpClient.patch<ProductDetailDto>(`/stores/${storeId}/products/${productId}`, data); */
  return generateMockProductDetail();
}

export async function deleteProduct(storeId: string, productId: string) {
  /* httpClient.delete<void>(`/stores/${storeId}/products/${productId}`); */
  return;
}

export async function searchAllProducts(query: string, storeId?: string) {
  /* httpClient.get<ProductPreviewDto[]>(`/stores/products?q=${query}`); */
  return generateMockProductPreviews();
}
