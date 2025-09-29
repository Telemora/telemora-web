import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDiscount,
  deleteDiscount,
  getDiscountDetails,
  getStoreDiscounts,
  updateDiscount,
} from '@/libs/discount/api';
import { CreateDiscountDto, UpdateDiscountDto } from '@/libs/discount/type';
import { queryKeys } from '@/libs/common/api/query-keys';

export function useCreateDiscountMutation(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateDiscountDto) => createDiscount(storeId, dto),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.discounts.byStore(storeId),
      }),
  });
}

export function useGetStoreDiscounts(storeId: string) {
  return useQuery({
    queryKey: queryKeys.discounts.byStore(storeId),
    queryFn: () => getStoreDiscounts(storeId),
    enabled: !!storeId,
  });
}

export function useGetDiscountDetails(storeId: string, discountId: string) {
  return useQuery({
    queryKey: queryKeys.discounts.detail(storeId, discountId),
    queryFn: () => getDiscountDetails(storeId, discountId),
    enabled: !!storeId && !!discountId,
  });
}

export function useUpdateDiscountMutation(storeId: string, discountId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateDiscountDto) => updateDiscount(storeId, discountId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.discounts.detail(storeId, discountId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.discounts.byStore(storeId) });
    },
  });
}

export function useDeleteDiscount(storeId: string, discountId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteDiscount(storeId, discountId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.discounts.byStore(storeId) }),
  });
}
