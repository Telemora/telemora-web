import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  createProduct,
  deleteProduct,
  getProductDetails,
  getStoreProducts,
  searchAllProducts,
  updateProduct,
  uploadProductPhotos,
} from '@/libs/products/api';
import { CreateProductDto, UpdateProductDto } from '@/libs/products/types';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

export function useStoreProducts(storeId: number) {
  return useQuery({
    queryKey: queryKeys.products.byStore(storeId),
    queryFn: () => getStoreProducts(storeId),
    enabled: !!storeId,
  });
}

export function useProductDetails(storeId: number, productId: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(storeId, productId),
    queryFn: () => getProductDetails(storeId, productId),
    enabled: !isNaN(storeId) && !isNaN(productId),
  });
}

export function useUploadProductPhotosMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: File[]) => uploadProductPhotos(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

export function useCreateProductMutation(storeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => createProduct(storeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}

export function useUpdateProductMutation(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductDto) => updateProduct(storeId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(storeId, productId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}

export function useDeleteProductMutation(storeId: number, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(storeId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byStore(storeId) });
    },
  });
}

export const useProductSearch = (debounceDelay: number = 2000) => {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, debounceDelay);

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [debouncedQuery],
    queryFn: () => searchAllProducts(debouncedQuery),
    staleTime: 1000 * 60,
  });

  return {
    query,
    setQuery,
    products,
    isLoading,
    error,
  };
};
