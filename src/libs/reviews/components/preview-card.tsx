'use client';
import { Card, CardBody } from '@heroui/react';
import { User } from '@heroui/user';
import { formatDistanceToNow } from 'date-fns';
import escapeHtml from 'escape-html';

import StarRating from '@/libs/common/components/star-rating';
import { ReviewPreview } from '@/libs/reviews/types';

// Utility functions
const formatRelativeTime = (date: Date): string => {
  return formatDistanceToNow(date, {
    addSuffix: true,
  });
};

export default function CompactReviewCard({ content }: { content: ReviewPreview }) {
  // Validation functions
  const validateUsername = (username: string | undefined): string => {
    if (!username || username.trim() === '') {
      return 'Anonymous User';
    }
    return username;
  };

  const validateDate = (date: string | Date): Date => {
    if (typeof date === 'string') {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    }
    return date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  };

  const validateComment = (comment: string | undefined): string => {
    if (!comment || comment.trim() === '') {
      return '';
    }

    return escapeHtml(comment);
  };

  // Validated data
  const username = validateUsername(content?.buyer?.username);
  const createdAt = validateDate(content?.createdAt);
  const validatedComment = validateComment(content?.comment);
  const reviewId = `review-${content?.id || Date.now()}`;

  // Format time directly
  const formattedTime = formatRelativeTime(createdAt);

  return (
    <Card className="w-full" aria-label={`Review by ${username}`}>
      <CardBody>
        {/* Header with semantic HTML */}
        <header className="mb-3">
          <h3 id={reviewId} className="sr-only">
            Review by {username}
          </h3>

          {/* Responsive flex layout */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <User
                name={username}
                avatarProps={{
                  src: content.buyer.photo?.url,
                  alt: `${username}'s avatar`,
                  size: 'sm',
                }}
                description={
                  <time dateTime={createdAt.toISOString()} className="text-xs text-gray-500">
                    {formattedTime}
                  </time>
                }
              />
            </div>

            <div className="flex-shrink-0" aria-label={`Rating: ${content.rating} out of 5 stars`}>
              <StarRating rating={content.rating} size="sm" />
            </div>
          </div>
        </header>

        {/* Comment section with consistent height */}
        <section className="min-h-[2rem]">
          {validatedComment ? (
            <blockquote className="line-clamp-3 text-xs leading-relaxed text-gray-700">
              {validatedComment}
            </blockquote>
          ) : (
            <p className="text-xs italic text-gray-400">No comment provided</p>
          )}
        </section>
      </CardBody>
    </Card>
  );
}
