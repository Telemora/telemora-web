import {
  generateMockReviewDetail,
  generateMockReviewPreviews,
  generateMockReviewReplyPreview,
  generateMockReviewReportPreview,
} from '@/libs/reviews/mocks';
import { CreateReviewDto, CreateReviewReplyDto, CreateReviewReportDto } from '@/libs/reviews/types';

export async function createReview(productId: number, data: CreateReviewDto) {
  return generateMockReviewDetail();
}

export async function getProductReviews(productId: number) {
  return generateMockReviewPreviews();
}

export async function getReviewsById(id: string | number) {
  return generateMockReviewDetail();
}

export async function replyToReview(reviewId: number, data: CreateReviewReplyDto) {
  return generateMockReviewReplyPreview();
}

export async function reportReview(reviewId: number, data: CreateReviewReportDto) {
  return generateMockReviewReportPreview();
}

export async function deleteReviews(id: string | number) {
  return;
}
