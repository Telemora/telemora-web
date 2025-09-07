import { FaChevronRight } from 'react-icons/fa';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ItemNotificationProps {
  text: string;
  icon: ReactNode;
  url?: string;
}

export function ItemNotification({ text, icon, url = '' }: ItemNotificationProps) {
  return (
    <div className="bg-background border-divider flex items-center justify-between rounded-md border p-2 shadow-xs">
      <div className="bg-default rounded-full p-2">{icon}</div>
      <div className="col-span-3 grow px-2 font-semibold">{text}</div>
      <div>
        <Link href={url}>
          <Button size="sm" className="bg-transparent" color="secondary" isIconOnly>
            <FaChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
