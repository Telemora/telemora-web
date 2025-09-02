'use client';

import { Button, Form, Input, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { ProductPhotosUploader } from '@/libs/products/components/product-photos-uploader';
import { ProductTypeSelector } from '@/libs/products/components/product-type-selector';
import { useProductDetails, useUpdateProductMutation } from '@/libs/products/hooks';
import { UpdateProductDto } from '@/libs/products/types';
import { updateProductDtoSchema } from '@/libs/products/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';

export default function EditProductPage() {
  const { webApp } = useTelegramWebApp();
  const { storeId, productId } = useParams<{ storeId: string; productId: string }>();
  const storeIdNum = parseInt(storeId, 10);
  const productIdNum = parseInt(productId, 10);
  const { data: product } = useProductDetails(storeIdNum, productIdNum);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProductDto>({
    resolver: zodResolver(updateProductDtoSchema),
  });

  const { mutateAsync } = useUpdateProductMutation(storeIdNum, productIdNum);
  const router = useRouter();

  const onSubmit = async (data: UpdateProductDto) => {
    try {
      const result = await mutateAsync(data);
      toast.success('Product updated successfully!');
      webApp.HapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.store.id}/${result.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create components');
    }
  };

  return (
    <AppLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader title="Edit Product" />

        <ProductPhotosUploader />

        <Input
          label="Product Name"
          {...register('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <Input
          label="Price (TON)"
          type="number"
          {...register('basePrice', { valueAsNumber: true })}
          isInvalid={!!errors.basePrice}
          errorMessage={errors.basePrice?.message}
        />

        <Textarea
          label="Description"
          {...register('description')}
          placeholder="Write a short product description..."
        />

        <ProductTypeSelector name="productType" control={control} errors={errors} />

        <Button
          type="submit"
          color="primary"
          fullWidth
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Edit Product'}
        </Button>
      </Form>
    </AppLayout>
  );
}
