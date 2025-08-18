'use client';

import { Accordion, AccordionItem, Button, Chip, Spinner, Tooltip } from '@heroui/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit, FaShareAlt, FaTrashAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

import AppLayout from '@/libs/common/components/AppLayout';
import ErrorPage from '@/libs/common/components/ErrorPage';
import StarRating from '@/libs/common/components/StarRating';
import { copyToClipboard } from '@/libs/common/utils/clipboard';
import ProductPreviewCard from '@/libs/products/components/preview-card';
import { useStoreDetailsQuery } from '@/libs/stores/hooks';
import { useUserState } from '@/libs/users/context/userContext';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';

export default function StoreDetailsPage() {
  const { webApp, loading } = useTelegramWebApp();
  const { storeId } = useParams<{ storeId: string }>();
  const router = useRouter();
  const { data: user } = useUserState();
  const { data: store, isLoading, error } = useStoreDetailsQuery(storeId);
  const isOwner = user && store && store.vendor.userId === user.userId;

  const handleShare = () => {
    copyToClipboard(window.location.href);
    webApp?.HapticFeedback.impactOccurred('light');
  };

  const handleEdit = () => router.push(`/stores/${store?.id}/edit`);
  const handleAddProduct = () => router.push(`/stores/${store?.id}/products/new`);
  const handleViewAll = () => router.push(`/stores/${store?.id}/products`);
  const handleDelete = () => router.push(`/stores/${store?.id}/delete`);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error || !store) return <ErrorPage />;

  return (
    <AppLayout>
      {/* Store Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {store.logo?.url && (
            <Image
              src={store.logo.url}
              alt={store.displayName}
              width={48}
              height={48}
              className="aspect-square rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-xl font-bold">{store.displayName}</h1>
            <div>{store.categories?.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
            <StarRating rating={store.vendorScore} />
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
      {store.storeBio && (
        <p className="mb-4 text-sm leading-snug text-gray-700">{store.storeBio} </p>
      )}

      {/* Contact & Working Hours */}
      <div className="mb-6 space-y-1 text-sm text-gray-600">
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

      {/* Products Section */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
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
          <div className="mt-4 text-center">
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
