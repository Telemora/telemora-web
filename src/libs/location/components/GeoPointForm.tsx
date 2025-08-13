import { Input } from '@heroui/react';
import { UseFormRegister } from 'react-hook-form';
import { AddressDto } from '@/libs/location/types';

interface Props {
  register: UseFormRegister<AddressDto>;
}

export function GeoPointForm({ register }: Props) {
  return (
    <div>
      <Input {...register('geoPoint.latitude')}></Input>
      <Input {...register('geoPoint.longitude')}></Input>
    </div>
  );
}
