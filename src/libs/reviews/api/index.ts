import {
  CreateReviewDto,
  CreateReviewReplyDto,
  CreateReviewReportDto,
  ReviewDetail,
  ReviewPreviewDto,
  ReviewReplyPreview,
  ReviewReportPreview,
} from '@/libs/reviews/types';
import httpClient from '@/libs/common/utils/httpClient';

export async function createReview(productId: string, data: CreateReviewDto) {
  return httpClient.post<ReviewDetail>(`/products/${productId}/reviews`, data);
}

export async function getProductReviews(productId: string) {
  return httpClient.get<ReviewPreviewDto[]>(`/products/${productId}/reviews`);
}

export async function getReviewsById(id: string) {
  return httpClient.get<ReviewDetail>(`/reviews/${id}`);
}

export async function replyToReview(reviewId: string, data: CreateReviewReplyDto) {
  return httpClient.post<ReviewReplyPreview>(`/reviews/${reviewId}/reply`, data);
}

export async function reportReview(reviewId: string, data: CreateReviewReportDto) {
  return httpClient.post<ReviewReportPreview>(`/reviews/${reviewId}/report`, data);
}

export async function deleteReviews(id: string) {
  return httpClient.delete<void>(`/reviews/${id}`);
}
