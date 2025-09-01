import { Input } from '@heroui/react';
import { useFormContext } from 'react-hook-form';
import { AddressDto } from '@/libs/location/types';

export function GeoPointForm() {
  const { register } = useFormContext<AddressDto>();
  return (
    <div className="flex w-full gap-x-3">
      <Input disabled {...register('geoPoint.latitude')} label="Latitude"></Input>
      <Input disabled {...register('geoPoint.longitude')} label="Longitude"></Input>
    </div>
  );
}
