import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  createReview,
  deleteReviews,
  getProductReviews,
  getReviewsById,
  replyToReview,
  reportReview,
} from '@/libs/reviews/api';
import {
  CreateReviewDto,
  CreateReviewReplyDto,
  CreateReviewReportDto,
  ReviewDetail,
  ReviewPreviewDto,
} from '@/libs/reviews/types';

export function useProductReviews(productId: string) {
  return useQuery<ReviewPreviewDto[]>({
    queryKey: queryKeys.reviews.byProduct(productId),
    queryFn: () => getProductReviews(productId),
  });
}

export function useReviewDetail(id: string) {
  return useQuery<ReviewDetail>({
    queryKey: queryKeys.reviews.detail(id),
    queryFn: () => getReviewsById(id),
  });
}

export function useCreateReviewMutation(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewDto) => createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.byProduct(productId) });
    },
  });
}

export function useReplyToReviewMutation(reviewId: string) {
  return useMutation({
    mutationFn: (data: CreateReviewReplyDto) => replyToReview(reviewId, data),
  });
}

export function useReportReviewMutation(reviewId: string) {
  return useMutation({
    mutationFn: (data: CreateReviewReportDto) => reportReview(reviewId, data),
  });
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteReviews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
  });
}
