import { Select, SelectItem } from '@heroui/react';
import { UseFormRegister } from 'react-hook-form';
import { AddressDto, CanonicalLocationDto, CanonicalLocationType } from '@/libs/location/types';

interface Props {
  reg: UseFormRegister<AddressDto>;
  data: CanonicalLocationDto[];
  type: CanonicalLocationType;
}

export function CanonicalLocationForm({ reg, data, type }: Props) {
  return (
    <Select {...reg(`${type}.id`)}>
      {data.map((item) => (
        <SelectItem key={item.id}>{item.name}</SelectItem>
      ))}
    </Select>
  );
}
