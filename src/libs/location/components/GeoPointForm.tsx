import { Input } from '@heroui/react';
import { useFormContext } from 'react-hook-form';
import { AddressDto } from '@/libs/location/types';

export function GeoPointForm() {
  const { getValues } = useFormContext<AddressDto>();
  return (
    <div className="flex w-full gap-x-3">
      <Input
        disabled
        type="number"
        value={getValues('geoPoint.latitude')?.toString()}
        label="Latitude"
      ></Input>
      <Input
        disabled
        type="number"
        value={getValues('geoPoint.longitude')?.toString()}
        label="Longitude"
      ></Input>
    </div>
  );
}
