import { Input } from '@heroui/react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<FieldValues>;
}

export function GeoPointForm({ register }: Props) {
  return (
    <div>
      <Input {...register('latitude')}></Input>
      <Input {...register('longitude')}></Input>
    </div>
  );
}
