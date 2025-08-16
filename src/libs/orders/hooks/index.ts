import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  addShipment,
  createOrder,
  getMyOrders,
  getOrderDetails,
  updateOrder,
} from '@/libs/orders/api';
import { generateMockOrderDetail, generateMockOrderSummaries } from '@/libs/orders/mocks';
import {
  CreateOrderDto,
  CreateOrderShipmentDto,
  OrderDetail,
  OrderSummary,
  UpdateOrderDto,
} from '@/libs/orders/types';
import { isDev } from '../../common/utils';

export function useMyOrders() {
  return useQuery<OrderSummary[]>({
    queryKey: queryKeys.orders.all,
    queryFn: isDev ? generateMockOrderSummaries : getMyOrders,
  });
}

export function useOrderDetails(id: number) {
  return useQuery<OrderDetail>({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => (isDev ? generateMockOrderDetail() : getOrderDetails(id)),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, CreateOrderDto>({
    mutationFn: (data) => (isDev ? generateMockOrderDetail() : createOrder(data)),
    onSuccess: async () => {
      await queryClient.prefetchQuery({
        queryKey: queryKeys.orders.all,
        queryFn: isDev ? generateMockOrderSummaries : getMyOrders,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useUpdateOrder(id: number) {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, UpdateOrderDto>({
    mutationFn: (data) => (isDev ? generateMockOrderDetail() : updateOrder(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
    },
  });
}

export function useAddShipment(id: number) {
  const queryClient = useQueryClient();

  return useMutation<OrderDetail, Error, CreateOrderShipmentDto>({
    mutationFn: (data) => (isDev ? generateMockOrderDetail() : addShipment(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
    },
  });
}
