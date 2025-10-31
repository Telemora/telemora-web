import { faker } from '@faker-js/faker';

import { generateMockUserPublicPreview } from '@/libs/users/mocks';

import {
  ReportReason,
  ReviewDetail,
  ReviewPreviewDto,
  ReviewReplyPreview,
  ReviewReportPreview,
} from '../types';

export async function generateMockReviewPreview(productId: string): Promise<ReviewPreviewDto> {
  return {
    reviewId: faker.string.uuid(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.sentence(),
    productId,
    customer: await generateMockUserPublicPreview(),
    createdAt: faker.date.recent(),
  };
}

export async function generateMockReviewDetail(): Promise<ReviewDetail> {
  return {
    ...(await generateMockReviewPreview(faker.string.uuid())),
    isFlagged: false,
    replies: [await generateMockReviewReplyPreview()],
    reports: [await generateMockReviewReportPreview()],
  };
}

export async function generateMockReviewReplyPreview(): Promise<ReviewReplyPreview> {
  return {
    reviewReplyId: faker.string.uuid(),
    vendor: await generateMockUserPublicPreview(),
    replyText: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
  };
}

export async function generateMockReviewReportPreview(): Promise<ReviewReportPreview> {
  return {
    reviewReportId: faker.string.uuid(),
    reportedBy: await generateMockUserPublicPreview(),
    reason: faker.helpers.arrayElement(Object.values(ReportReason)),
    comment: faker.lorem.sentence(),
    reportedAt: faker.date.recent(),
  };
}

export async function generateMockReviewPreviews(): Promise<ReviewPreviewDto[]> {
  return Promise.all(
    Array.from({ length: 5 }, () => generateMockReviewPreview(faker.string.uuid())),
  );
}
