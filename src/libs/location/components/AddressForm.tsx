import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAddressSchema } from '@/libs/location/schemas';
import { Form, Input, Select, SelectItem, Switch } from '@heroui/react';
import { AddressType } from '@/libs/location/types';

export function AddressForm() {
  const { register } = useForm({
    resolver: zodResolver(createAddressSchema),
  });

  return (
    <Form>
      <Input {...register('label')} label="Label" />
      <Input {...register('streetLine1')} label="Street Line 1" />
      <Input {...register('streetLine2')} label="Street Line 2" />
      <Input {...register('postalCode')} label="Postal Code" />
      <Select {...register('type')}>
        {Object.values<string>(AddressType).map((type) => (
          <SelectItem>{type}</SelectItem>
        ))}
      </Select>
      <Switch {...register('isDefault')} />
    </Form>
  );
}
