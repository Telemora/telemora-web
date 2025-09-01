import { Select, SelectItem } from '@heroui/react';
import { useFormContext } from 'react-hook-form';
import { AddressDto, CanonicalLocationDto, CanonicalLocationType } from '@/libs/location/types';

interface Props {
  data: CanonicalLocationDto[];
  type: CanonicalLocationType;
}

export function CanonicalLocationForm({ data, type }: Props) {
  const { register } = useFormContext<AddressDto>();
  return (
    <Select {...register(`${type}.id`)} label={type}>
      {data.map((item) => (
        <SelectItem key={item.id}>{item.name}</SelectItem>
      ))}
    </Select>
  );
}
