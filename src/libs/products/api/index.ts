import {
  generateMockProductDetail,
  generateMockProductPhotos,
  generateMockProductPreviews,
} from '@/libs/products/mocks';
import { CreateProductDto, UpdateProductDto } from '@/libs/products/types';

export async function getStoreProducts(storeId: number) {
  /* httpClient.get<ProductPreviewDto[]>(`/stores/${storeId}`); */
  return generateMockProductPreviews();
}

export async function getProductDetails(storeId: number, productId: number) {
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

export async function createProduct(storeId: number, data: CreateProductDto) {
  /* httpClient.post<ProductDetailDto>(`/stores/${storeId}`, data); */
  return generateMockProductDetail();
}

export async function updateProduct(storeId: number, productId: number, data: UpdateProductDto) {
  /* httpClient.patch<ProductDetailDto>(`/stores/${storeId}/products/${productId}`, data); */
  return generateMockProductDetail();
}

export async function deleteProduct(storeId: number, productId: number) {
  /* httpClient.delete<void>(`/stores/${storeId}/products/${productId}`); */
  return;
}

export async function searchAllProducts(query: string, storeId?: number) {
  /* httpClient.get<ProductPreviewDto[]>(`/stores/products?q=${query}`); */
  return generateMockProductPreviews();
}
