'use client';

import { Button, Form, Input, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { hapticFeedback } from '@telegram-apps/sdk';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AppLayout from '@/libs/common/components/AppLayout';
import { PageHeader } from '@/libs/common/components/page-header';
import { ProductAttributeFields } from '@/libs/products/components/product-attributes-field';
import { ProductTypeSelector } from '@/libs/products/components/product-type-selector';
import { ProductVariantFields } from '@/libs/products/components/product-variants-field';
import { useProductDetails, useUpdateProductMutation } from '@/libs/products/hooks';
import { UpdateProductFormData, updateProductSchema } from '@/libs/products/schemas';
import { ProductPhotosUploader } from '@/libs/products/components/product-photos-uploader';

export default function EditProductPage() {
  const { storeId, productId } = useParams<{ storeId: string; productId: string }>();
  const storeIdNum = parseInt(storeId, 10);
  const productIdNum = parseInt(productId, 10);
  const { data: product } = useProductDetails(storeIdNum, productIdNum);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product?.name,
      price: product?.price,
      description: product?.description,
      imageUrls: product?.image.map((m) => m.url),
      productType: product?.productType,
      downloadLink: product?.downloadLink,
      stock: product?.stock,
      attributes: product?.attributes,
      variants: product?.variants,
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

  const { mutateAsync } = useUpdateProductMutation(storeIdNum, productIdNum);
  const router = useRouter();

  const onSubmit = async (data: UpdateProductFormData) => {
    try {
      const result = await mutateAsync(data);
      toast.success('Product updated successfully!');
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/${result.store.id}`);
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
          {...register('price', { valueAsNumber: true })}
          isInvalid={!!errors.price}
          errorMessage={errors.price?.message}
        />

        <Textarea
          label="Description"
          {...register('description')}
          placeholder="Write a short product description..."
        />

        <ProductTypeSelector name="productType" control={control} errors={errors} />

        {productType === 'physical' && (
          <Input
            label="Stock Quantity"
            type="number"
            {...register('stock', { valueAsNumber: true })}
          />
        )}

        {productType === 'digital' && (
          <Input
            label="Download Link"
            {...register('downloadLink')}
            isInvalid={!!errors.downloadLink}
            errorMessage={errors.downloadLink?.message}
          />
        )}

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
          {isSubmitting ? 'Updating...' : 'Edit Product'}
        </Button>
      </Form>
    </AppLayout>
  );
}
