import Image from 'next/image';
import { Card, CardBody } from '@heroui/card';
import { CardFooter } from '@heroui/react';

interface Props {
  text?: string;
}

export function EmptyState({ text }: Props) {
  return (
    <Card>
      <CardBody>
        <Image
          src="/empty-state.svg"
          width={165}
          height={165}
          alt="empty"
          priority
          className="mx-auto w-1/5 drop-shadow-md"
        />
      </CardBody>
      <CardFooter className="text-default-600 text-sm">{text || 'No items found'}</CardFooter>
    </Card>
  );
}
