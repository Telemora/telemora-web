'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Accordion, AccordionItem, Button, Chip, Spinner, Tooltip } from '@heroui/react';
import Image from 'next/image';
import { useUser } from '@/context/userContext';
import AppLayout from '@/libs/common/components/app-layout';
import { FaPlus } from 'react-icons/fa6';
import { FaEdit, FaShareAlt, FaTrashAlt } from 'react-icons/fa';
import StarRating from '@/libs/common/components/star-rating';
import ProductPreviewCard from '@/libs/products/components/preview-card';
import { useStoreDetailsQuery } from '@/libs/stores/hooks';
import ErrorPage from '@/libs/common/components/errorPage';
import { copyToClipboard } from '@/utils/clipboard';
import { hapticFeedback } from '@telegram-apps/sdk-react';

export default function StoreDetailsPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const router = useRouter();
  const user = useUser();
  const { data: store, isLoading, error } = useStoreDetailsQuery(storeId);
  const isOwner = user && store && store.owner.id === user.id;

  const handleShare = () => {
    copyToClipboard(window.location.href);
    hapticFeedback.impactOccurred('light');
  };

  const handleEdit = () => router.push(`/stores/${store?.id}/edit`);
  const handleAddProduct = () => router.push(`/stores/${store?.id}/products/new`);
  const handleViewAll = () => router.push(`/stores/${store?.id}/products`);
  const handleDelete = () => router.push(`/stores/${store?.id}/delete`);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error || !store) return <ErrorPage />;

  return (
    <AppLayout>
      {/* Store Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {store.logo?.url && (
            <Image
              src={store.logo.url}
              alt={store.name}
              width={48}
              height={48}
              className="rounded-full object-cover aspect-square"
            />
          )}
          <div>
            <h1 className="text-xl font-bold">{store.name}</h1>
            <div>{store.tags?.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
            <StarRating rating={store.reputation} />
          </div>
        </div>

        <div className="flex gap-2">
          <Tooltip content="Share store link">
            <Button isIconOnly size="sm" variant="flat" onPress={handleShare}>
              <FaShareAlt />
            </Button>
          </Tooltip>
          {isOwner && (
            <Tooltip content="Edit Store">
              <Button size="sm" variant="ghost" onPress={handleEdit}>
                <FaEdit />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Store Description */}
      {store.description && (
        <p className="text-gray-700 text-sm mb-4 leading-snug">{store.description}</p>
      )}

      {/* Contact & Working Hours */}
      <div className="mb-6 text-sm text-gray-600 space-y-1">
        {store.contactNumber && <p>📞 {store.contactNumber}</p>}
        {store.email && <p>✉️ {store.email}</p>}

        {store.workingHours && (
          <Accordion>
            <AccordionItem title="📅 Working Hours">
              <ul>
                {Object.entries(store.workingHours).map(([day, time]) => (
                  <li key={day}>
                    {day}: {time.open} - {time.close}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </Accordion>
        )}

        {store.socialMediaLinks && (
          <div className="pt-2">
            {Object.entries(store.socialMediaLinks).map(([platform, url]) => (
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

      {/* Products Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Featured Products</h2>
          <Button variant="ghost" size="sm" onPress={handleViewAll}>
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {user &&
            store.products
              .slice(0, 4)
              .map((product) => <ProductPreviewCard key={product.id} product={product} />)}
        </div>

        {isOwner && (
          <div className="text-center mt-4">
            <Button onPress={handleAddProduct} startContent={<FaPlus />}>
              Add Product
            </Button>
          </div>
        )}
      </div>

      {/* Danger Zone (Owner Only) */}
      {isOwner && (
        <div className="mt-6">
          <Button
            variant="bordered"
            color="danger"
            fullWidth
            onPress={handleDelete}
            startContent={<FaTrashAlt />}
          >
            Delete Store
          </Button>
        </div>
      )}
    </AppLayout>
  );
}
