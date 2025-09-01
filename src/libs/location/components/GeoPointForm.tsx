import { Input } from '@heroui/react';
import { UseFormRegister } from 'react-hook-form';
import { AddressDto } from '@/libs/location/types';

interface Props {
  register: UseFormRegister<AddressDto>;
}

export function GeoPointForm({ register }: Props) {
  return (
    <div className="flex w-full gap-x-3">
      <Input disabled {...register('geoPoint.latitude')} label="Latitude"></Input>
      <Input disabled {...register('geoPoint.longitude')} label="Longitude"></Input>
    </div>
  );
}
