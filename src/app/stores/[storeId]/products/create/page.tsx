'use client';

import { Button, Form, Input, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';
import { ProductAttributeFields } from '@/libs/products/components/product-attributes-field';
import { ProductTypeSelector } from '@/libs/products/components/product-type-selector';
import { ProductVariantFields } from '@/libs/products/components/product-variants-field';
import { useCreateProductMutation } from '@/libs/products/hooks';
import { CreateProductFormData, createProductSchema } from '@/libs/products/schemas';
import { ProductType } from '@/libs/products/types';
import { ProductPhotosUploader } from '@/libs/products/components/product-photos-uploader';

export default function CreateProductPage() {
  const { storeId } = useParams();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productType: ProductType.PHYSICAL,
      attributes: [],
      variants: [],
      imageUrls: [],
    },
  });

  const productType = watch('productType');

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({ control, name: 'attributes' });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control, name: 'variants' });

  const { mutateAsync } = useCreateProductMutation(parseInt(storeId as string, 10));
  const router = useRouter();

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      const result = await mutateAsync(data);
      toast.success('Product created successfully!');
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.store.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create components');
    }
  };

  return (
    <AppLayout>
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

        <ProductAttributeFields
          fields={attributeFields}
          register={register}
          append={appendAttribute}
          remove={removeAttribute}
          name="attributes"
        />

        <ProductVariantFields
          fields={variantFields}
          register={register}
          append={appendVariant}
          remove={removeVariant}
          name="variants"
        />

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
    </AppLayout>
  );
}
