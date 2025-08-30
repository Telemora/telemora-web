import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  addShipment,
  createOrder,
  getMyOrders,
  getOrderDetails,
  updateOrder,
} from '@/libs/orders/api';
import {
  CreateOrderDto,
  CreateOrderShipmentDto,
  OrderDetail,
  OrderSummary,
  UpdateOrderDto,
} from '@/libs/orders/types';

export function useMyOrders() {
  return useQuery<OrderSummary[]>({
    queryKey: queryKeys.orders.all,
    queryFn: getMyOrders,
  });
}

export function useOrderDetails(id: number) {
  return useQuery<OrderDetail>({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => getOrderDetails(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, CreateOrderDto>({
    mutationFn: (data) => createOrder(data),
    onSuccess: async () => {
      await queryClient.prefetchQuery({
        queryKey: queryKeys.orders.all,
        queryFn: getMyOrders,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useUpdateOrder(id: number) {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, UpdateOrderDto>({
    mutationFn: (data) => updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
    },
  });
}

export function useAddShipment(id: number) {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, CreateOrderShipmentDto>({
    mutationFn: (data) => addShipment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
    },
  });
}
