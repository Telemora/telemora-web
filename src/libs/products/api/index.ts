import httpClient from '@/libs/common/utils/httpClient';
import {
  CreateProductDto,
  ProductDetailDto,
  ProductImageDto,
  ProductPreviewDto,
  UpdateProductDto,
} from '@/libs/products/types';

export async function getStoreProducts(storeId: string) {
  return httpClient.get<ProductPreviewDto[]>(`/stores/${storeId}/products`);
}

export async function getProductDetails(storeId: string, productId: string) {
  return httpClient.get<ProductDetailDto>(`/stores/${storeId}/products/${productId}`);
}

export async function uploadProductPhotos(data: File[]) {
  const formData = new FormData();
  data.forEach((file) => {
    formData.append('photos', file);
  });
  return httpClient.post<ProductImageDto[]>(`/stores/products/photo`);
}

export async function createProduct(storeId: string, data: CreateProductDto) {
  return httpClient.post<ProductDetailDto>(`/stores/${storeId}/products`, data);
}

export async function updateProduct(storeId: string, productId: string, data: UpdateProductDto) {
  return httpClient.patch<ProductDetailDto>(`/stores/${storeId}/products/${productId}`, data);
}

export async function deleteProduct(storeId: string, productId: string) {
  return httpClient.delete<void>(`/stores/${storeId}/products/${productId}`);
}

export async function searchAllProducts(query: string = '', storeId: string = '') {
  return httpClient.get<ProductPreviewDto[]>(`/stores/${storeId}/products/search?q=${query}`);
}
