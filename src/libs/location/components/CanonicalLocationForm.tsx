import { Form, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { canonicalLocationSchema } from '@/libs/location/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export function CanonicalLocationForm() {
  const { register } = useForm({
    resolver: zodResolver(canonicalLocationSchema),
  });

  return (
    <Form>
      <Input {...register('name')} label="Name" />
      <Input {...register('type')} readOnly />
    </Form>
  );
}
