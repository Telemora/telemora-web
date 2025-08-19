import {
  generateMockProductDetail,
  generateMockProductPhotos,
  generateMockProductPreviews,
} from '@/libs/products/mocks';
import { CreateProductDto, UpdateProductDto } from '@/libs/products/types';

export async function getStoreProducts(storeId: number) {
  return generateMockProductPreviews();
}

export async function getProductDetails(storeId: number, productId: number) {
  return generateMockProductDetail();
}

export async function uploadProductPhotos(data: File[]) {
  const formData = new FormData();
  data.forEach((file) => {
    formData.append('photos', file);
  });

  return generateMockProductPhotos();
}

export async function createProduct(storeId: number, data: CreateProductDto) {
  return generateMockProductDetail();
}

export async function updateProduct(storeId: number, productId: number, data: UpdateProductDto) {
  return generateMockProductDetail();
}

export async function deleteProduct(storeId: number, productId: number) {
  return;
}
