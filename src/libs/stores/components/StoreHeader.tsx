import Image from 'next/image';
import { Accordion, AccordionItem, Chip, Divider } from '@heroui/react';
import StarRating from '@/libs/common/components/StarRating';
import { FaPen, FaShare } from 'react-icons/fa';
import React from 'react';
import { copyToClipboard } from '@/libs/common/utils/clipboard';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { useRouter } from 'next/navigation';
import { StoreDetail } from '@/libs/stores/types';

export function StoreHeader({ store, isOwner }: { store: StoreDetail; isOwner?: boolean }) {
  const { webApp } = useTelegramWebApp();

  const router = useRouter();

  const handleShare = () => {
    copyToClipboard(window.location.href);
    webApp?.HapticFeedback.impactOccurred('light');
  };

  const handleEdit = () => router.push(`/stores/${store?.id}/edit`);

  return (
    <section>
      <div className="grid grid-cols-12 grid-rows-2 items-start gap-x-2">
        {store.logo?.url && (
          <Image
            src={store.logo.url}
            alt={store.displayName}
            width={48}
            height={48}
            className="col-span-3 row-span-2 aspect-square w-full rounded-full object-cover"
          />
        )}
        <div className="col-span-7 row-span-1">
          <strong>{store.displayName}</strong>
          <StarRating rating={store.vendorScore} />
        </div>
        {isOwner && <FaPen size={14} className="col-span-1 row-span-1" onClick={handleEdit} />}
        <FaShare size={14} className="col-span-1 row-span-1" onClick={handleShare} />
        <div className="col-span-9 row-span-1 h-8 w-full overflow-y-hidden">
          {store.categories?.map((tag) => (
            <Chip size="sm" className="m-0.5" key={tag}>
              {tag}
            </Chip>
          ))}
        </div>
      </div>
      {/* Store Description */}
      {store.storeBio && (
        <p className="text-default-700 mb-4 text-sm leading-snug">{store.storeBio} </p>
      )}

      {/* Contact & Working Hours */}
      <div className="text-default-600 col-span-12 row-span-1 mb-6 space-y-1 text-sm">
        {store.supportPhone && <p>📞 {store.supportPhone}</p>}
        {store.supportEmail && <p>✉️ {store.supportEmail}</p>}

        {store.serviceHours && (
          <Accordion>
            <AccordionItem title="📅 Working Hours">
              <ul>
                {Object.entries(store.serviceHours).map(([day, time]) => (
                  <li key={day}>
                    {day}: {time.open} - {time.close}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </Accordion>
        )}

        {store.socialProfiles && (
          <div className="pt-2">
            {Object.entries(store.socialProfiles).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 underline"
              >
                {platform}
              </a>
            ))}
          </div>
        )}
      </div>
      <Divider />
    </section>
  );
}
