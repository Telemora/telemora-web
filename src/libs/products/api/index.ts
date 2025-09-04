import {
  generateMockProductDetail,
  generateMockProductPhotos,
  generateMockProductPreviews,
} from '@/libs/products/mocks';
import { CreateProductDto, UpdateProductDto } from '@/libs/products/types';

export async function getStoreProducts(storeId: number) {
  /* httpClient.get<ProductPreviewDto[]>(`/products/${storeId}`); */
  return generateMockProductPreviews();
}

export async function getProductDetails(storeId: number, productId: number) {
  /* httpClient.get<ProductDetailDto>(`/products/store/${storeId}/${productId}`); */
  return generateMockProductDetail();
}

export async function uploadProductPhotos(data: File[]) {
  /* httpClient.post<ProductImageDto[]>(`/products/photo`); */
  const formData = new FormData();
  data.forEach((file) => {
    formData.append('photos', file);
  });

  return generateMockProductPhotos();
}

export async function createProduct(storeId: number, data: CreateProductDto) {
  /* httpClient.post<ProductDetailDto>(`/products/store/${storeId}/create`, data); */
  return generateMockProductDetail();
}

export async function updateProduct(storeId: number, productId: number, data: UpdateProductDto) {
  /* httpClient.patch<ProductDetailDto>(`/products/store/${storeId}/${productId}/update`, data); */
  return generateMockProductDetail();
}

export async function deleteProduct(storeId: number, productId: number) {
  /* httpClient.delete<void>(`/products/store/${storeId}/${productId}/delete`); */
  return;
}

export async function searchAllProducts(query: string) {
  /* httpClient.get<ProductPreviewDto[]>(`/products/store/${storeId}/search?query=${query}`); */
  return generateMockProductPreviews();
}
