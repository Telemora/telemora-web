import {
  generateMockReviewDetail,
  generateMockReviewPreviews,
  generateMockReviewReplyPreview,
  generateMockReviewReportPreview,
} from '@/libs/reviews/mocks';
import { CreateReviewDto, CreateReviewReplyDto, CreateReviewReportDto } from '@/libs/reviews/types';

export async function createReview(productId: string, data: CreateReviewDto) {
  /* httpClient.post<ReviewDetail>(`/products/${productId}/reviews`, data); */
  return generateMockReviewDetail();
}

export async function getProductReviews(productId: string) {
  /* httpClient.get<ReviewPreviewDto[]>(`/products/${productId}/reviews`); */
  return generateMockReviewPreviews();
}

export async function getReviewsById(id: string) {
  /* httpClient.get<ReviewDetail>(`/reviews/${id}`); */
  return generateMockReviewDetail();
}

export async function replyToReview(reviewId: string, data: CreateReviewReplyDto) {
  /* httpClient.post<ReviewReplyPreview>(`/reviews/${reviewId}/reply`, data); */
  return generateMockReviewReplyPreview();
}

export async function reportReview(reviewId: string, data: CreateReviewReportDto) {
  /* httpClient.post<ReviewReportPreview>(`/reviews/${reviewId}/report`, data); */
  return generateMockReviewReportPreview();
}

export async function deleteReviews(id: string) {
  /* httpClient.delete<void>(`/reviews/${id}`); */
  return;
}
