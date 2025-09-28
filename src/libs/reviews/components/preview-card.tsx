'use client';

import { Card, CardBody, User } from '@heroui/react';
import { formatDistanceToNow } from 'date-fns';

import { StarRating } from '@/libs/common/components/StarRating';
import { ReviewPreviewDto } from '@/libs/reviews/types';

export default function ReviewPreviewCard({ content }: { content: ReviewPreviewDto }) {
  return (
    <Card>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <User
              name={`${content.customer.username}`}
              avatarProps={{ src: content.customer.photo?.url }}
              description={formatDistanceToNow(new Date(content.createdAt), { addSuffix: true })}
            />
          </div>
          <StarRating rating={content.rating} />
        </div>
        {content.comment && <p className="text-xs leading-relaxed">{content.comment}</p>}
      </CardBody>
    </Card>
  );
}
