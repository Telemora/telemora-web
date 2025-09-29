'use client';

import { Button, Form, Input, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PageHeader } from '@/libs/common/components/PageHeader';
import { ProductTypeSelector } from '@/libs/products/components/ProductTypeSelector';
import { useCreateProductMutation } from '@/libs/products/hooks';
import { CreateProductDto, ProductType, ProductVisibility } from '@/libs/products/types';
import { ProductPhotosUploader } from '@/libs/products/components/ProductPhotosUploader';
import { createProductDtoSchema } from '@/libs/products/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';

export default function CreateProductPage() {
  const { webApp } = useTelegramWebApp();
  const { storeId } = useParams<{ storeId: string }>();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductDto>({
    resolver: zodResolver(createProductDtoSchema),
    defaultValues: {
      productType: ProductType.PHYSICAL,
      attributes: [],
      variants: [],
      name: '',
      visibility: ProductVisibility.DRAFT,
      quantityAvailable: 0,
      currency: 'TON',
      basePrice: 0,
      description: '',
    },
  });

  const { mutateAsync } = useCreateProductMutation(storeId);
  const router = useRouter();

  const onSubmit = async (data: CreateProductDto) => {
    try {
      const result = await mutateAsync(data);
      toast.success('Product created successfully!');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.store.slug}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create components');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-20">
        <PageHeader title="Create New Product" />

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
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </Button>
      </Form>
    </>
  );
}
